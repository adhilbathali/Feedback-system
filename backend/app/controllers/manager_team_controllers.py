from sqlalchemy.orm import Session
from ..database import get_db
from typing import List
from .. import schemas, models
from fastapi import HTTPException, status
from ..utils import ensure_employee


class ManagerTeamController:
    def __init__(self, db: Session):
        self.db = db 

    def get_team(self, manager_id: int) -> List[schemas.UserOut]:
        # Get the users with corresponding manager_id
        team_members_query = self.db.query(models.User)
        team_members = team_members_query.filter(models.User.manager_id == manager_id).all()
        for member in team_members:
            member.feedback_count = len(member.get_all_feedbacks(self.db))
        return team_members
    
    def assign_employee(self, manager_id: int, email) -> schemas.UserOut:
        # Get the user with corresponding email
        user_query = self.db.query(models.User).filter(models.User.email == email)
        user = user_query.first()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with email:{email} not found")

        ensure_employee(user)   
        user.manager_id = manager_id
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def remove_employee(self, employee_id: int, manager_id: int) -> None:
        # Get the user
        user = self.db.query(models.User).filter(models.User.id == employee_id).first()
        feedbacks_query = self.db.query(models.Feedback).filter(models.Feedback.giver_id == manager_id).filter(models.Feedback.reciever_id == employee_id)
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User doesn't exists")
        
        ensure_employee(user)
        if user.manager_id == manager_id:
            user.manager_id = None
            feedbacks_query.delete(synchronize_session=False)
        
        self.db.commit()
        return {"message": "successfully removed"}
        
        
    

        
        