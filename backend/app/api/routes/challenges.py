from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models import challenge as challenge_models
from app.models import game as game_models
from app.db.session import get_db
from app.schemas.challenge import Challenge
from app.schemas.game import GameCreate, Game

router = APIRouter()


@router.get("/", response_model=list[Challenge])
def get_all_challenges(db: Session = Depends(get_db)):
    challenges = db.query(challenge_models.Challenge).all()
    if not challenges:
        raise HTTPException(status_code=404, detail="No challenges found")
    return challenges


@router.post("/games", response_model=Game)
def create_game(game: GameCreate, db: Session = Depends(get_db)):
    new_game = game_models.Game(**game.dict())
    db.add(new_game)
    db.commit()
    db.refresh(new_game)
    return new_game