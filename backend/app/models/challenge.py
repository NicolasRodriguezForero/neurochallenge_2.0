from sqlalchemy import Column, Integer, String, Boolean, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid

from app.db.session import Base

class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=False)
    level = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    link = Column(String(255), nullable=False)
    
    # Relationships
    games = relationship("Game", back_populates="challenge")
