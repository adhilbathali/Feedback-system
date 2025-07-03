from ..database import Base
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, ForeignKey, ARRAY, text
from sqlalchemy import Enum as SQLEnum
from sqlalchemy.orm import relationship
from enum import Enum


class Sentiment(str, Enum):
    negative = "negative"
    neutral = "neutral"
    positive = "positive"


class Feedback(Base):
    __tablename__="feedbacks"

    id = Column(Integer, nullable=False, primary_key=True)
    sentiment = Column(SQLEnum(Sentiment), nullable=False)
    giver_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    reciever_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(String)
    strengths = Column(ARRAY(String), nullable=False)
    to_improve = Column(ARRAY(String), nullable=False)
    acknowledged = Column(Boolean, server_default=text("false"), nullable=False)
    acknowledged_at = Column(TIMESTAMP(timezone=True), onupdate=text("now()"))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"))
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=text("now()"), server_default=text("now()"))
    