from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    postgres_password: str
    postgres_db: str
    postgres_user: str
    algorithm: str
    access_token_expire_minutes: int
    secret_key: str

    class Config:
        env_file = ".env"

settings = Settings()