from pydantic import BaseModel
from uuid import UUID

class UserRanking(BaseModel):
    id: UUID
    username: str
    total_score: int

    class Config:
        orm_mode = True

class ChallengeRanking(BaseModel):
    user_id: UUID
    username: str
    challenge_id: UUID
    score: int

    class Config:
        orm_mode = True