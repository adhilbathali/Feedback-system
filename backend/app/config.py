from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_hostname: str
    database_port: str
    database_password: str
    database_name: str
    database_username: str
    algorithm: str
    access_token_expire_minutes: int
    secret_key: str

settings = Settings()