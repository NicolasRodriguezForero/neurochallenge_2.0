from datetime import datetime
import uuid
from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    avatar_url: str|None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    id: uuid.UUID
    username: str
    email: EmailStr
    avatar_url: str|None = None
    created_at: datetime
    is_superuser: bool
    total_score: int

    class Config:
        orm_mode = True

class Token(BaseModel):

    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    """
    Schema for JWT token payload
    """
    sub: str