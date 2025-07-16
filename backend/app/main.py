from fastapi import FastAPI
from . import models
from .database import engine
from .routes import router
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


# root
@app.get("/")
def root():
    return {"message":"hello, world"}



