from fastapi import APIRouter

from app.api.routes import users
from app.api.routes import scores
# from app.api.routes import challenges


api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(scores.router, prefix="/scores", tags=["scores"])
# api_router.include_router(challenges.router, prefix="/challenges", tags=["challenges"])

