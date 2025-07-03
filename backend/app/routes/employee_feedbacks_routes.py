from fastapi import APIRouter, Depends
from ..database import get_db
from sqlalchemy.orm import Session
from ..utils import oauth2, ensure_employee
from .. import schemas
from ..controllers import EmployeeFeedbacksController

router = APIRouter(
    prefix="/employee/feedbacks",
    tags=["employee feedbacks"]
)

# Get all feedbacks for employee
@router.get('/')
def get_feedbacks(db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    ensure_employee(user)
    return EmployeeFeedbacksController(db).get_feedbacks(user.id)


# Acknowledge a feedback
@router.patch("/{feedback_id}/acknowledge", response_model=schemas.FeedbackOut)
def acknowledge_feedback(feedback_id: int, user: schemas.UserOut = Depends(oauth2.get_current_user), db: Session = Depends(get_db)):
    ensure_employee(user)
    return EmployeeFeedbacksController(db).acknowledge_feedback(user.id, feedback_id)

