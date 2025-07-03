from fastapi import status, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import schemas, models
from typing import List


class ManagerFeedbacksController:
    def __init__(self, db: Session):
        self.db = db
    
    def get_feedbacks(self, giver_id: int, reciever_id: int) -> List[schemas.FeedbackOut]:
        feedbacks = self.db.query(models.Feedback).filter(models.Feedback.giver_id == giver_id).filter(models.Feedback.reciever_id == reciever_id).order_by(models.Feedback.updated_at.desc())
        return feedbacks
    
    def give_feedback(self, giver_id: int, reciever_id: int, feedback: models.Feedback) -> schemas.FeedbackOut:
        reciever = self.db.query(models.User).filter(models.User.id == reciever_id).first()
        if not reciever:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'User with id:{reciever_id} not found')
        
        # Manager can't give feedback if the employee is not assigned to their team
        if reciever.manager_id != giver_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to give feedback")

        feedback.giver_id = giver_id
        feedback.reciever_id = reciever_id
        self.db.add(feedback)
        self.db.commit()
        self.db.refresh(feedback)
        return feedback


    def edit_feedback(self, manager_id: int, feedback_id: int, edited_feedback: schemas.FeedbackEdit) -> schemas.FeedbackOut:
        feedback_query = self.db.query(models.Feedback).filter(models.Feedback.id == feedback_id)
        feedback = feedback_query.first()
        if not feedback:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Feedback with id:{feedback_id} not found")
        
        # Check whether the feedback belongs to the manager
        if feedback.giver_id != manager_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"You are not allowed to edit the feedback")
        
        feedback_query.update(edited_feedback.dict(), synchronize_session=False)
        self.db.commit()
        self.db.refresh(feedback)
        return feedback
    

    def delete_feedback(self, manager_id: int, feedback_id: int) -> None:
        feedback_query = self.db.query(models.Feedback).filter(models.Feedback.id == feedback_id)
        feedback = feedback_query.first()
        if not feedback:            
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Feedback with id:{feedback_id} not found")

        # Check whether the feedback belongs to the manager
        if feedback.giver_id != manager_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"You are not allowed to edit the feedback")
        
        feedback_query.delete(synchronize_session=False)
        self.db.commit()
        return None
    
    def get_feedback_history(self, manager_id: int) -> List[schemas.FeedbackOut]:
        feedbacks = self.db.query(models.Feedback).filter(models.Feedback.giver_id == manager_id).order_by(models.Feedback.updated_at.desc()).all()
        return feedbacks

