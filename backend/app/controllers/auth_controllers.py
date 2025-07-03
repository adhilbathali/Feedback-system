from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from .. import schemas, models
from ..utils import password_utils, oauth2

class AuthController:
    def __init__(self, db:Session):
        self.db = db

    def create_user(self, user: models.User) -> schemas.AuthResponse:

        # Check if user already exists
        existing_email = self.db.query(models.User).filter(models.User.email == user.email).first()
        if existing_email:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"User with email:{user.email} already exists")
        
        # Hash Password
        user.password = password_utils.hash(user.password)

        # DB operations
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        # get JWT access token
        access_token = oauth2.create_access_token(data={"user_id": user.id, "role":user.role})
        return {'token': access_token, "token_type": "bearer", "user": user}
    
    def user_login(self, user_credentials: schemas.UserLogin) -> schemas.AuthResponse:

        # Check whether credentials are valid
        user = self.db.query(models.User).filter(models.User.email == user_credentials.username).first()
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
        
        # Check whether the password is correct
        if not password_utils.verify(user_credentials.password, user.password):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")
        
        # get JWT access token
        access_token = oauth2.create_access_token(data={"user_id": user.id, "role":user.role})
        return {'access_token': access_token, "token_type": "bearer", 'user' : user}
    

