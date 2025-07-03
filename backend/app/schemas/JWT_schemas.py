from pydantic import BaseModel
from typing import Optional
from .user_schemas import Role
from .user_schemas import UserOut


class Token(BaseModel):
    access_token: str
    token_type: str



class TokenData(BaseModel):
    id: Optional[int]
    role: Optional[Role]


class AuthResponse(Token):
    user: UserOut

    class Config:
        orm_mode = True
    