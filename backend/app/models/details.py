import uuid
from sqlalchemy import UUID, Column, String
from app.db.session import Base


class Detail(Base):
    __tablename__ = "details"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    name = Column(String, index=True)
    description = Column(String)
