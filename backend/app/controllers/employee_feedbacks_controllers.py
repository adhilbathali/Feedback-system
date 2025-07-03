from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, models
from typing import List
from datetime import datetime


class EmployeeFeedbacksController:
    def __init__(self, db: Session):
        self.db = db
  
    # get timeline of feedbacks for employee
    def get_feedbacks(self, employee_id: int) -> List[schemas.FeedbackOut]:
        feedbacks = self.db.query(models.Feedback).filter(models.Feedback.reciever_id == employee_id).order_by(models.Feedback.updated_at.desc()).all()
        return feedbacks
    
    # Acknowledge a feedback
    def acknowledge_feedback(self, employee_id: int, feedback_id: int) -> schemas.FeedbackOut:
        feedback = self.db.query(models.Feedback).filter(models.Feedback.id == feedback_id).first()
        if not feedback:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Feedback with id:{feedback_id} not found")

        if feedback.reciever_id != employee_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"You are not allowed to give acknowledgement to feedback with id:{feedback_id}")
        
        feedback.acknowledged = True
        print(feedback.acknowledged_at)
        self.db.commit()
        self.db.refresh(feedback)
        print(feedback)
        return feedback


         