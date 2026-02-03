from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.db.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_superuser = Column(Boolean, default=False)
    total_score = Column(Integer, default=0)
    
    # Relationships
    # results = relationship("Result", back_populates="user")
    games = relationship("Game", back_populates="user")
    # ranking = relationship("Ranking", back_populates="user", uselist=False)
