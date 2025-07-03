from .. import schemas
from fastapi import HTTPException, status

def enusure_manager(user: schemas.UserOut):
    if user.role != 'manager':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized role")
    

def ensure_employee(user: schemas.UserOut):
    if user.role != 'employee':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Unauthorized role")

    