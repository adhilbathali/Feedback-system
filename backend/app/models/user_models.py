from ..database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, ARRAY, text
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import Session
from .feedback_models import Feedback
from enum import Enum


class Role(str, Enum):
    manager = "manager"
    employee = "employee"


class User(Base):
    __tablename__= "users"

    id = Column(Integer, nullable=False, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(SQLEnum(Role), nullable=False)
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

    def get_all_feedbacks(self, db : Session):
        return db.query(Feedback).filter(
            (Feedback.giver_id == self.id) | (Feedback.reciever_id == self.id)
        ).all()
