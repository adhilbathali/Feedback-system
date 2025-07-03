from fastapi import APIRouter, Depends, HTTPException, status
from ..database import get_db
from sqlalchemy.orm import Session
from ..utils import oauth2
from .. import schemas, models
from ..controllers import ManagerFeedbacksController
from typing import List
from ..utils import enusure_manager, ensure_employee

router = APIRouter(
    prefix="/manager",
    tags=["manager feedbacks"]
)

# Get feedbacks of a specific employee
@router.get("/employees/{employee_id}/feedbacks", response_model = List[schemas.FeedbackOut])
def get_feedbacks(employee_id: int, db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)  
    return ManagerFeedbacksController(db).get_feedbacks(user.id, employee_id)


# Give a new feedback to an employee
@router.post("/employees/{employee_id}/feedbacks", status_code=status.HTTP_201_CREATED, response_model=schemas.FeedbackOut)
def give_feedback(employee_id: int, feedback: schemas.FeedbackCreate, db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    feedback = models.Feedback(**feedback.dict())
    return ManagerFeedbacksController(db).give_feedback(user.id, employee_id, feedback)


# Edit a feedback
@router.put("/feedbacks/{feedback_id}", status_code=status.HTTP_201_CREATED, response_model=schemas.FeedbackOut)
def edit_feedback(feedback_id: int, edited_feedback: schemas.FeedbackEdit, user: schemas.UserOut = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    enusure_manager(user)
    return ManagerFeedbacksController(db).edit_feedback(user.id, feedback_id, edited_feedback)


# Delete a feedback
@router.delete("/feedbacks/{feedback_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_feedback(feedback_id: int, db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    return ManagerFeedbacksController(db).delete_feedback(user.id, feedback_id)


# Get Feedbacks History for manager
@router.get("/feedbacks")
def get_feedback_history(db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    return ManagerFeedbacksController(db).get_feedback_history(user.id)