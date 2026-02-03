from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.db.session import Base

class Game(Base):
    __tablename__ = "games"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    challenge_id = Column(UUID(as_uuid=True), ForeignKey("challenges.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="games")
    challenge = relationship("Challenge", back_populates="games")
    results = relationship("Result", back_populates="game")
