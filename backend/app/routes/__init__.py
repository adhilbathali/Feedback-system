from fastapi import APIRouter
from .auth_routes import router as auth_routes
from .manager_team_routes import router as manager_team_routes
from .manager_feedbacks_routes import router as manager_feedbacks_routes
from .employee_feedbacks_routes import router as employee_feedbacks_router

router = APIRouter()

router.include_router(auth_routes)
router.include_router(manager_team_routes)
router.include_router(manager_feedbacks_routes)
router.include_router(employee_feedbacks_router)