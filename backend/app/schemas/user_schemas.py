from enum import Enum
from pydantic import BaseModel, EmailStr
from datetime import datetime
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from typing import Optional

class Role(str, Enum):
    manager = "manager"
    employee = "employee"

class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Role

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime
    feedback_count: Optional[int] = None

    class Config:
        from_attributes: True


class UserLogin(OAuth2PasswordRequestForm):
    pass

class EmailPayload(BaseModel):
    email: EmailStr