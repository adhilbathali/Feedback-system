from fastapi import APIRouter, HTTPException, status, Depends
from ..database import get_db
from sqlalchemy.orm import Session
from ..utils import oauth2
from .. import schemas
from ..controllers import ManagerTeamController
from typing import List
from ..utils import enusure_manager


router = APIRouter(
    prefix="/manager/team",
    tags=["manage team"])

# Get the assigned employees for a specific manager
@router.get("/", response_model = List[schemas.UserOut])
def get_team(db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    return ManagerTeamController(db).get_team(user.id)


# Assign employee to a specific manager
@router.patch('/', response_model = schemas.UserOut)
def assign_employee(payload: schemas.EmailPayload, db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    return ManagerTeamController(db).assign_employee(user.id, payload.email)

# Remove employee from the group
@router.patch('/{employee_id}')
def remove_employee(employee_id: int, db: Session = Depends(get_db), user: schemas.UserOut = Depends(oauth2.get_current_user)):
    enusure_manager(user)
    return ManagerTeamController(db).remove_employee(employee_id, user.id)


