# NeuroChallenge 2.0 -- Next Steps

This document describes the current state of the application, what is working, what is broken, what is missing, and provides a detailed implementation plan for a future agent to execute.

---

## Table of Contents

1. [Current State: What Works](#1-current-state-what-works)
2. [What Is Broken](#2-what-is-broken)
3. [What Is Missing](#3-what-is-missing)
4. [Things to Modify (Working but Need Changes)](#4-things-to-modify-working-but-need-changes)
5. [Implementation Plan](#5-implementation-plan)

---

## 1. Current State: What Works

### Backend

- **User Registration** (`POST /api/users/register`): Creates users with bcrypt-hashed passwords, UUID primary keys. File: `backend/app/api/routes/users.py:13-32`.
- **User Login** (`POST /api/users/login`): Validates credentials and returns a JWT token. File: `backend/app/api/routes/users.py:34-50`.
- **Get Current User** (`GET /api/users/me`): Returns the authenticated user via JWT. File: `backend/app/api/routes/users.py:52-57`.
- **General Ranking** (`GET /api/scores/ranking/general`): Returns top users by `total_score`. File: `backend/app/api/routes/scores.py:8-18`.
- **Challenge Ranking** (`GET /api/scores/ranking/challenge/{id}`): Returns top scores per challenge via Game+Result join. File: `backend/app/api/routes/scores.py:20-46`.
- **Database Models**: `User`, `Challenge`, `Game`, `Result`, `Detail` -- all defined with UUID PKs and proper relationships. File: `backend/app/models/`.
- **Docker Compose**: 5-service stack (PostgreSQL 15, FastAPI backend, Vite/Nginx frontend, Nginx reverse proxy, Adminer). File: `docker-compose.yml`.

### Frontend

- **Authentication Flow**: Full `AuthProvider` context with login, logout, JWT token persistence in localStorage, and auto-rehydration on mount. File: `frontend/src/hooks/useAuth.tsx`.
- **Theme System**: Light/dark mode toggle with localStorage persistence and system preference detection. File: `frontend/src/contexts/ThemeContext.tsx`.
- **Landing Page**: Hero section, animated logo, features grid, stats cards, testimonials, about section. File: `frontend/src/routes/index.tsx`.
- **Sign In Page**: Tabbed Login/Signup interface. Login form is connected to the API. File: `frontend/src/routes/signin.tsx`.
- **Challenge List Page**: Displays challenge cards in a responsive grid with skeleton loading. File: `frontend/src/routes/challenges/index.tsx`.
- **Reaction Time Challenge**: 5-round reaction time test measuring click latency in ms. File: `frontend/src/components/Challenges/ReactionTimeChallenge.tsx`.
- **Sequence Memory**: Simon-Says style 3x3 grid progressive memory game. File: `frontend/src/components/Challenges/SequenceMemory.tsx`.
- **Aim Trainer**: 30-second target clicking game. File: `frontend/src/components/Challenges/AimTrainer.tsx`.
- **Tic-Tac-Toe**: Classic game vs AI with easy/medium/hard difficulty (minimax for hard). File: `frontend/src/components/Challenges/TicTacToe.tsx`.
- **Tic-Tac-Toe Infinite**: Variant where each player has max 3 symbols; oldest removed when placing a 4th. File: `frontend/src/components/Challenges/TicTacToeInfinite.tsx`. **NOTE: This component has critical bugs -- see Section 2.**
- **Header**: Fixed nav bar with scroll-aware glass effect, responsive hamburger menu, auth-aware (shows user initial if logged in). File: `frontend/src/components/Header.tsx`.
- **Mouse Glow Effect**: Mouse-following radial gradient, disabled on game pages. File: `frontend/src/components/MouseGlow.tsx`.

---

## 2. What Is Broken

### 2.1 Tic-Tac-Toe Infinite -- Critical Bugs

File: `frontend/src/components/Challenges/TicTacToeInfinite.tsx`

The component was copied from the standard `TicTacToe.tsx` and the removal mechanic was bolted on, but the AI logic, win/draw detection, and UI guards were **never updated** to account for the infinite mode rules. The following bugs exist:

#### Bug A (Critical): Minimax/hardBot ignores the removal mechanic (lines 102-169)
The minimax algorithm plays standard Tic-Tac-Toe in its head. It never removes oldest symbols when a player exceeds 3 marks, and uses `isBoardFull` as a terminal condition which can never trigger in infinite mode (max 6 of 9 cells occupied). The hard AI is **not unbeatable** as labeled -- it's playing a fundamentally different game.

#### Bug B (Critical): mediumBot's `findWinningMove` doesn't account for removal (lines 61-100)
When the bot has 3 symbols and tries to "win" by completing a line, placing the new symbol removes its oldest one. If the oldest symbol is part of the winning pattern, the win is destroyed. The bot thinks it's winning but actually isn't. Same issue applies to blocking the player.

#### Bug C (Moderate): No draw detection -- game can loop forever (lines 47-49, 220, 242)
`isBoardFull` checks if all 9 cells are occupied, but with MAX_SYMBOLS=3 per player, only 6 cells can ever be filled. The draw check is dead code. If neither player can win, the game loops infinitely with no termination.

#### Bug D (Moderate): Bot cannot consider cells freed by its own removal (line 228)
The bot receives the current board and looks for `null` cells. But if the bot has 3 symbols, `placeMove` will free a cell. The AI never considers placing on the cell its oldest symbol occupies, missing potential winning moves.

#### Bug E (Moderate): Player can't place on their own about-to-be-removed cell (line 205)
The guard `board[index] !== null` prevents clicking occupied cells, but the player's oldest symbol will vanish on placement. The player should be able to "re-use" that cell.

#### Bug F (Moderate): Stale closure in setTimeout (lines 227-229)
`botMoves` is captured by the closure at call time, not execution time. Fragile under React 18 strict mode or concurrent features.

#### Bug G (Moderate): `hardBot` mutates the input board array (lines 155-159)
`currentBoard[i] = 'O'` directly mutates the board passed in. Works by accident due to synchronous execution but is unsafe.

#### Bug H (Minor): `checkWinner` has a side effect (lines 31-44)
Calls `setWinningPattern()` inside what looks like a pure function. If ever called speculatively (e.g., by minimax), it would corrupt UI state.

#### Bug I (Minor): "0 more until removal" text is confusing (lines 413-415, 425-427)
When a player has 3 symbols, the counter shows "0 more until removal" instead of something like "Next move removes oldest."

#### Bug J (Minor): No visual indicator for the oldest symbol about to be removed
Players have to remember which of their 3 marks they placed first. There should be a visual cue (fade, pulse, border) on the oldest mark.

### 2.2 Backend: Duplicate function in users.py

File: `backend/app/api/routes/users.py:52-64`

Two functions named `get_current_user` are defined -- one for `GET /me` and one for `POST /me`. Python silently overwrites the first with the second. The GET endpoint is effectively lost. The POST `/me` is also redundant and should be removed.

### 2.3 Backend: Challenges route not wired up

File: `backend/app/api/main.py:5,12`

The challenges import and router inclusion are commented out. Additionally, the route file (`backend/app/api/routes/challenges.py`) imports from `app.schemas.challenge.Challenge` and `app.schemas.game` which are empty/non-existent, so uncommenting would cause an import crash.

### 2.4 Backend: Alembic migration is a no-op

File: `backend/alembic/versions/4ab70e556d5a_initial.py`

The initial migration contains only `pass` in both `upgrade()` and `downgrade()`. Tables are created via `Base.metadata.create_all()` in `main.py`, bypassing Alembic entirely.

---

## 3. What Is Missing

### 3.1 Frontend: Signup not connected to API

File: `frontend/src/components/SignUp/SignUp.tsx:32-37`

The signup form has a `TODO` comment and uses a `setTimeout` to simulate an API call instead of actually calling `POST /api/users/register`.

### 3.2 Frontend: Challenge data is hardcoded

File: `frontend/src/lib/challenges.ts`

`getChallenges()` returns hardcoded mock data (5 challenges). Has a `TODO` to connect to the API. Should fetch from `GET /api/challenges/` once the backend route is active.

### 3.3 Backend: Missing schemas

- `backend/app/schemas/challenge.py` -- **Empty file.** Needs `Challenge`, `ChallengeCreate` Pydantic schemas.
- `backend/app/schemas/game.py` -- **Does not exist.** Needed by `challenges.py` route. Needs `Game`, `GameCreate` schemas.
- `backend/app/schemas/result.py` -- **Does not exist.** Needed for score submission.

### 3.4 No score/result submission

There is no endpoint for submitting game results. The `Result` model exists in the database, but there are no routes or schemas to create result records. Challenge scores in the frontend are displayed to the user but never persisted.

### 3.5 No route protection

Challenge routes in the frontend are not guarded by authentication. Any visitor can play challenges without logging in. If scores should be saved, authentication should be required (or at least optional with a prompt to sign up to save scores).

### 3.6 No user profile/dashboard page

The README vision mentions a progress dashboard, but no profile or dashboard route exists.

### 3.7 No testing

Zero test files exist. No test framework is configured for either frontend (vitest, jest) or backend (pytest).

### 3.8 CORS is fully open

File: `backend/app/main.py`

`allow_origins=["*"]` is set. Appropriate for development only; needs to be restricted for production.

---

## 4. Things to Modify (Working but Need Changes)

### 4.1 Infinite Tic-Tac-Toe (see Section 2.1)

The game technically runs but the AI is fundamentally broken for the infinite ruleset. The full fix requires:

1. **Rewrite the AI functions** (`easyBot`, `mediumBot`, `hardBot`, `minimax`) to be aware of the removal mechanic. The minimax must simulate `placeMove` (including oldest-symbol removal) at each tree node, and use a modified terminal condition since the board never fills up.
2. **Implement a proper draw condition** -- e.g., detect repeated board states (cycle detection) or impose a maximum move count.
3. **Allow placement on cells occupied by the player's own oldest symbol** when at MAX_SYMBOLS (update the guard at line 205 and the `disabled` attribute at line 438).
4. **Make the bot consider cells that will be freed** by its own removal when selecting a move.
5. **Separate `checkWinner` side effect** -- extract `setWinningPattern` out of the function, make it pure.
6. **Use functional state updates or refs** inside `setTimeout` to avoid stale closures.
7. **Add visual indicator** for the oldest symbol (e.g., reduced opacity, pulsing border, or a subtle animation).
8. **Fix the "X more until removal" text** to say "Next move removes oldest" when at max.
9. **Avoid mutating the board array** in `hardBot` -- use spread copies.

### 4.2 Light Mode Color Scheme

The current light mode uses generic OKLCH values that don't match the intended brand. Replace with the following palette:

```
/* Target Light Mode Palette */
--porcelain:      hsla(100, 100%, 99%, 1);   /* Near-white background */
--fresh-sky:      hsla(200, 67%, 55%, 1);    /* Primary blue */
--deep-twilight:  hsla(259, 61%, 23%, 1);    /* Dark purple accent */
--brown-red:      hsla(359, 58%, 39%, 1);    /* Destructive/error red */
--light-green:    hsla(105, 95%, 78%, 1);    /* Success/highlight green */
```

#### Where to apply these colors

File: `frontend/src/index.css` -- `:root` block (lines ~6-44)

Map the palette to the existing CSS variable system:

| CSS Variable | New Value (from palette) | Notes |
|---|---|---|
| `--background` | `--porcelain` | Main page background |
| `--foreground` | `--deep-twilight` | Text color -- the dark purple provides good contrast on porcelain |
| `--primary` | `--fresh-sky` | Primary buttons, links, accents |
| `--primary-foreground` | `--porcelain` | Text on primary-colored elements |
| `--accent` | `--deep-twilight` | Secondary accent (cards, highlights) |
| `--accent-foreground` | `--porcelain` | Text on accent elements |
| `--destructive` | `--brown-red` | Error states, destructive actions |
| `--ring` | `--fresh-sky` | Focus rings |
| `--card` | `--porcelain` | Card backgrounds |
| `--card-foreground` | `--deep-twilight` | Card text |
| `--secondary` | Derive from `--light-green` or a tint of `--fresh-sky` | Secondary elements |
| `--muted` | A soft tint of `--fresh-sky` (e.g., ~95% lightness) | Muted backgrounds |
| `--muted-foreground` | A mid-tone of `--deep-twilight` | Muted text |
| `--border` | A light tint of `--fresh-sky` | Borders |
| `--input` | Slightly off `--porcelain` | Input backgrounds |

Also update the neon accent variables for light mode (`--neon-cyan`, `--neon-pink`, etc.) to harmonize with the new palette. The `--light-green` color should be used for success states and the neon-green accent.

**Important**: Convert the HSL values to OKLCH to match the existing color space used in the CSS, OR switch the entire `:root` block to HSL. Be consistent. The dark mode can remain as-is (its neon aesthetic works well).

Additionally, review and update any **hardcoded colors** in components that don't use the CSS variable system (search for `bg-`, `text-`, `border-` with literal color values in all `.tsx` files).

### 4.3 Animations Overhaul

The animation system needs cleanup, consolidation, and improvement. Here is the current state and what needs to change:

#### Current State

**10 custom keyframes** defined in `frontend/src/index.css` (lines 190-332):
- `fade-in`, `fade-in-up`, `fade-in-down`, `spin-slow`, `bounce-slow`, `hero-fade-in`, `gradient-shift`, `pulse-glow`, `slide-in-right`, `slide-in-left`

**5 of these are duplicated** as inline `<style>` in `frontend/src/routes/index.tsx` (lines 119-145):
- `fade-in`, `fade-in-up`, `spin-slow`, `bounce-slow`, `hero-fade-in`

**5 animation classes are never used** in any component:
- `animate-hero-fade-in`, `animate-gradient-shift` (only used internally by `.gradient-neon`), `animate-bounce-slow`, `animate-slide-in-right`, `animate-slide-in-left`

#### What Needs to Be Done

1. **Remove the duplicate `<style>` block** in `frontend/src/routes/index.tsx` (lines ~118-146). All keyframes are already defined in `index.css`.

2. **Remove unused animations**: Delete `hero-fade-in`, `bounce-slow`, `slide-in-right`, `slide-in-left` keyframes and their classes from `index.css` if they are not going to be used. Keep `gradient-shift` only if `.gradient-neon` is used.

3. **Improve entrance animations**: The current `fade-in-up` has a 1.2s duration which feels sluggish. Consider:
   - Reducing durations: `fade-in` to 0.5-0.6s, `fade-in-up` to 0.6-0.8s, `fade-in-down` to 0.5-0.7s.
   - Using `cubic-bezier` easing for more natural motion (e.g., `cubic-bezier(0.16, 1, 0.3, 1)` for a smooth deceleration).
   - Reducing `translateY` distance from 40px to 20-24px for subtlety.

4. **Standardize the animation pattern**: Currently animations are applied inconsistently:
   - Some pages use `animate-fade-in-down` for headers, `animate-fade-in-up` for content.
   - Some components use `animate-pulse-glow` for decorative blobs (18 occurrences across pages).
   - Staggered delays use inline `style={{ animationDelay: "Xs" }}` -- this is fine but should be consistent.

5. **Consider adding**:
   - A `scale-in` animation for game elements (targets, tiles) -- currently they just appear.
   - A `slide-up` animation for modals/results screens.
   - Smooth transitions between game states (waiting > playing > finished) instead of instant swaps.

6. **Files that use animations** (for reference during modification):

   | Animation Class | Files Using It |
   |---|---|
   | `animate-pulse-glow` | `Header.tsx:53`, `routes/index.tsx:23-24`, `routes/challenges/aim-trainer.tsx:17-18,35`, `routes/challenges/reaction-time.tsx:17-18,35`, `routes/challenges/sequence-memory.tsx:18-19,36`, `routes/challenges/index.tsx:30-31,38,42`, `routes/signin.tsx:21-22,29`, `AimTrainer.tsx:87` |
   | `animate-fade-in-up` | `routes/index.tsx:29,39,63,69,75`, `routes/challenges/*.tsx` (wrapper divs), `routes/signin.tsx:25`, `Feature.tsx:11`, `SequenceMemory.tsx:184`, `ChallengeCardSkeleton.tsx:12`, `CallToActionSection.tsx:3` |
   | `animate-fade-in-down` | `routes/challenges/aim-trainer.tsx:33`, `routes/challenges/reaction-time.tsx:33`, `routes/challenges/sequence-memory.tsx:34`, `routes/challenges/index.tsx:36` |
   | `animate-fade-in` | `routes/index.tsx:32`, `SignUp.tsx:122`, `CallToActionSection.tsx:15` |
   | `animate-spin-slow` | `AnimatedLogo.tsx:6` |

---

## 5. Implementation Plan

### Phase 1: Fix Broken Things (Priority: High)

#### 1.1 Fix Tic-Tac-Toe Infinite
- Rewrite AI (`easyBot`, `mediumBot`, `hardBot`, `minimax`) to simulate removal at each move.
- Implement draw detection (cycle detection or max move count).
- Update cell click guards to allow placement on own oldest cell.
- Make `checkWinner` a pure function; move `setWinningPattern` to the caller.
- Use refs or functional state updates inside `setTimeout`.
- Add visual indicator for oldest symbol (opacity or pulsing border).
- Fix "0 more until removal" text.
- Stop mutating board arrays -- use copies.

#### 1.2 Fix Backend Bugs
- Remove the duplicate `POST /me` handler in `backend/app/api/routes/users.py` (lines 59-64). Keep only the `GET /me`.
- Create `backend/app/schemas/challenge.py` with `Challenge` and `ChallengeCreate` Pydantic models matching the `Challenge` SQLAlchemy model.
- Create `backend/app/schemas/game.py` with `Game` and `GameCreate` Pydantic models.
- Create `backend/app/schemas/result.py` with `Result` and `ResultCreate` Pydantic models.
- Fix the `challenges.py` route to use `SessionDep` instead of the inconsistent `get_db` import.
- Uncomment the challenges route in `backend/app/api/main.py`.

### Phase 2: Complete Missing Features (Priority: High)

#### 2.1 Connect Frontend Signup to API
- In `frontend/src/components/SignUp/SignUp.tsx`, replace the `setTimeout` stub with a `fetch` call to `POST /api/users/register`.
- On success, call `changeTab("login")` and show a success toast.
- Handle errors (email already registered, validation errors).

#### 2.2 Connect Challenge List to API
- In `frontend/src/lib/challenges.ts`, replace the hardcoded mock data with a `fetch` call to `GET /api/challenges/`.
- Handle loading and error states in `frontend/src/routes/challenges/index.tsx`.
- Seed the database with the 5 existing challenges so the API returns data.

#### 2.3 Build Score Submission System
- Create a `POST /api/results/` endpoint that accepts: `challenge_id`, `score`, `time` (optional). It should:
  - Require authentication (JWT).
  - Create a `Game` record linking the user to the challenge.
  - Create a `Result` record with the score.
  - Update the user's `total_score`.
- In each challenge component (`ReactionTimeChallenge.tsx`, `SequenceMemory.tsx`, `AimTrainer.tsx`, `TicTacToe.tsx`, `TicTacToeInfinite.tsx`), add a "Save Score" button or auto-submit on game finish if the user is authenticated.
- Show a prompt to sign up/log in if not authenticated.

#### 2.4 Fix Alembic Migrations
- Write a proper initial migration that creates all tables (User, Challenge, Game, Result, Detail).
- Remove `Base.metadata.create_all()` from `backend/app/main.py` and rely on Alembic for schema management.
- Add a seed script to populate the `Challenge` table with the 5 existing challenges.

### Phase 3: Visual Overhaul (Priority: Medium)

#### 3.1 Apply New Light Mode Color Scheme
- Convert the 5 HSL colors to OKLCH (or switch the `:root` block to HSL).
- Update all CSS variables in the `:root` block of `frontend/src/index.css`.
- Update neon accent variables for light mode to harmonize with the new palette.
- Search for hardcoded Tailwind color classes in all `.tsx` files and replace with CSS variable equivalents where needed.
- Test all pages in light mode to verify contrast and readability.
- Leave dark mode as-is unless adjustments are needed for consistency.

#### 3.2 Animation Cleanup and Improvement
- Delete the duplicate `<style>` block in `frontend/src/routes/index.tsx` (lines ~118-146).
- Remove unused keyframes and classes from `index.css`: `hero-fade-in`, `bounce-slow`, `slide-in-right`, `slide-in-left`.
- Tune animation timings: reduce durations, use `cubic-bezier` easing, reduce `translateY` distances.
- Add new animations for game elements (scale-in for targets/tiles, slide-up for results).
- Add smooth state transitions in challenge components.
- Ensure all pages follow a consistent animation pattern (headers fade-in-down, content fade-in-up, decorative elements pulse-glow).

### Phase 4: Polish and Production Readiness (Priority: Low)

#### 4.1 Route Protection
- Add authentication guards to challenge routes (or at minimum, to score submission).
- Redirect unauthenticated users to `/signin` when trying to access protected features.

#### 4.2 User Profile/Dashboard
- Create a `/profile` or `/dashboard` route.
- Display user stats, challenge history, and a progress chart.

#### 4.3 Security Hardening
- Restrict CORS origins in `backend/app/main.py` to the actual frontend domain.
- Add rate limiting to auth endpoints.
- Add input validation/sanitization.

#### 4.4 Testing
- Set up pytest for the backend with test fixtures for the database.
- Set up vitest for the frontend.
- Write unit tests for critical paths: auth flow, score submission, AI logic.

#### 4.5 Additional Challenges
- The README vision mentions 30+ challenges. New challenges can follow the existing pattern:
  1. Create a component in `frontend/src/components/Challenges/`.
  2. Create a route file in `frontend/src/routes/challenges/`.
  3. Add the challenge to the `Challenge` database table.

---

## Quick Reference: Key File Paths

| Area | File |
|---|---|
| CSS Variables & Animations | `frontend/src/index.css` |
| Root Layout | `frontend/src/routes/__root.tsx` |
| Landing Page (has duplicate animations) | `frontend/src/routes/index.tsx` |
| Auth Hook | `frontend/src/hooks/useAuth.tsx` |
| Theme Context | `frontend/src/contexts/ThemeContext.tsx` |
| Challenge Mock Data | `frontend/src/lib/challenges.ts` |
| Signup Form (not connected) | `frontend/src/components/SignUp/SignUp.tsx` |
| Login Form | `frontend/src/components/SignUp/Login.tsx` |
| TicTacToe Infinite (broken) | `frontend/src/components/Challenges/TicTacToeInfinite.tsx` |
| Backend API Router | `backend/app/api/main.py` |
| Backend Users Route | `backend/app/api/routes/users.py` |
| Backend Challenges Route (disabled) | `backend/app/api/routes/challenges.py` |
| Backend Scores Route | `backend/app/api/routes/scores.py` |
| Challenge Schema (empty) | `backend/app/schemas/challenge.py` |
| Docker Compose | `docker-compose.yml` |
| Vite Config (proxy) | `frontend/vite.config.ts` |
