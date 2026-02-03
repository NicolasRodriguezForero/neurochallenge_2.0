from app.models.user import User
from app.models.challenge import Challenge
from app.models.result import Result
from app.models.details import Detail
from app.models.game import Game

# Expose all models
__all__ = ["User", "Challenge", "Result", "Game", "Detail"]