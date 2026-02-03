from sqlalchemy import Column, Integer, DateTime, ForeignKey, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.db.session import Base

class Result(Base):
    __tablename__ = "results"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    game_id = Column(UUID(as_uuid=True), ForeignKey("games.id"), nullable=False)
    score = Column(Integer, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    time = Column(Integer, nullable=True)  # Time taken in seconds/milliseconds

    # Relationships
    game = relationship("Game", back_populates="results")
