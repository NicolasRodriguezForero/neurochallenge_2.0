import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import useAuth from "@/hooks/useAuth";
import { Menu, X, Sparkles } from "lucide-react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to md+
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 overflow-visible ${
        scrolled 
          ? "glass-effect shadow-lg dark:shadow-primary/20" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        {/* Logo */}
        <div
          className="font-bold text-xl tracking-tight cursor-pointer flex items-center gap-2 group py-2"
          onClick={() => navigate({ to: "/" })}
        >
          <div className="relative">
            <img
              src="/neural.png"
              alt="NeuroChallenge"
              className="w-10 h-10 group-hover:rotate-180 transition-transform duration-500"
            />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary dark:text-primary animate-pulse-glow" />
          </div>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent dark:from-[var(--neon-cyan)] dark:via-[var(--neon-purple)] dark:to-[var(--neon-pink)] block" style={{ lineHeight: '2.5rem', paddingBottom: '4px', paddingTop: '2px' }}>
            NeuroChallenge
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
          >
            Home
          </Link>
          <a
            href="/#features"
            className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
          >
            Features
          </a>
          <Link
            to="/challenges"
            className="px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
          >
            Challenges
          </Link>

          <div className="w-px h-6 bg-border mx-2" />

          {isAuthenticated && user ? (
            <Button 
              variant="outline" 
              className="dark:border-primary/50 dark:text-primary dark:hover:bg-primary/10"
            >
              <Link to="/signin" className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.username}
              </Link>
            </Button>
          ) : (
            <Button className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/80 dark:shadow-lg dark:shadow-primary/50">
              <Link to="/signin">Sign In</Link>
            </Button>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 hover:bg-accent/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        className={`md:hidden glass-effect border-t border-border transition-all duration-300 ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <a
            href="/#features"
            className="block px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <Link
            to="/challenges"
            className="block px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-accent/50 transition-all"
            onClick={() => setMenuOpen(false)}
          >
            Challenges
          </Link>
          
          <div className="pt-2">
            {isAuthenticated && user ? (
              <Button 
                variant="outline" 
                className="w-full dark:border-primary/50 dark:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                <Link to="/signin" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  {user.username}
                </Link>
              </Button>
            ) : (
              <Button 
                className="w-full bg-primary hover:bg-primary/90 dark:shadow-lg dark:shadow-primary/50"
                onClick={() => setMenuOpen(false)}
              >
                <Link to="/signin">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
