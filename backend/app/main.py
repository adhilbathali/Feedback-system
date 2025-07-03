from fastapi import FastAPI
from . import models
from .database import engine
from .routes import router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(router)

origins = ['*']

# Allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # 👈 allow all origins
    allow_credentials=True,
    allow_methods=["*"],          # 👈 allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # 👈 allow all headers
)


# root
@app.get("/")
def root():
    return {"message":"hello, world"}



