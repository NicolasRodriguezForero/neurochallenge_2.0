from fastapi import APIRouter
from app.models import user as user_models, result as result_models
from app.schemas.score import UserRanking, ChallengeRanking
from app.api.dependencies.session import SessionDep

router = APIRouter()

@router.get("/ranking/general", response_model=list[UserRanking])
def get_general_ranking(db: SessionDep, limit: int = 10):

    users = (
        db.query(user_models.User)
        .order_by(user_models.User.total_score.desc())
        .limit(limit)
        .all()
    )
    
    return users

@router.get("/ranking/challenge/{challenge_id}", response_model=list[ChallengeRanking])
def get_challenge_ranking(challenge_id: str, db: SessionDep, limit: int = 10):
    from sqlalchemy import func
    from app.models import game as game_models
    results = (
        db.query(
            user_models.User.id.label("user_id"),
            user_models.User.username,
            game_models.Game.challenge_id.label("challenge_id"),
            func.max(result_models.Result.score).label("score")
        )
        .join(game_models.Game, game_models.Game.user_id == user_models.User.id)
        .join(result_models.Result, result_models.Result.game_id == game_models.Game.id)
        .filter(game_models.Game.challenge_id == challenge_id)
        .group_by(user_models.User.id, user_models.User.username, game_models.Game.challenge_id)
        .order_by(func.max(result_models.Result.score).desc())
        .limit(limit)
        .all()
    )
    return [
        ChallengeRanking(
            user_id=row.user_id,
            username=row.username,
            challenge_id=row.challenge_id,
            score=row.score
        ) for row in results
    ]
