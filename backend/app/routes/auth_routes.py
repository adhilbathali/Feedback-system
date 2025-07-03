from ..database import get_db
from fastapi import status, Depends, HTTPException, Response, Body, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas
from ..controllers import AuthController

router = APIRouter(
    tags=["auth"]
)

# Sign up
@router.post('/signup', status_code=status.HTTP_201_CREATED)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    user = models.User(**user.dict())
    return AuthController(db).create_user(user)

# Login Up
@router.post('/login', response_model=schemas.AuthResponse)
def login(user_credentials: schemas.UserLogin = Depends(), db: Session = Depends(get_db)):
    return AuthController(db).user_login(user_credentials)