from enum import Enum
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Sentiment(str, Enum):
    negative = "negative"
    neutral = "neutral"
    positive = "positive"

class FeedbackBase(BaseModel):
    sentiment: Sentiment
    description: str
    strengths: List[str]
    to_improve: List[str]

class FeedbackCreate(FeedbackBase):
    pass

class FeedbackEdit(FeedbackBase):
    pass

class FeedbackOut(FeedbackBase):
    id: int
    giver_id: int
    reciever_id: int
    acknowledged: bool
    acknowledged_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class config:
        orm_mode = True

