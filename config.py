from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", case_sensitive=True
    )
    
    # Flask Config
    SECRET_KEY: str = "SECRET_KEY"
    SESSION_TYPE: str = "filesystem"

    # Azure EntraID
    DATABASE_URL: str = "sqlite:///formdata.db"
    AZURE_CLIENT_ID: str = "AZURE_CLIENT_ID"
    AZURE_CLIENT_SECRET: str = "AZURE_CLIENT_SECRET"
    AZURE_TENANT_ID: str = "AZURE_TENANT_ID"
    AUTHORITY:str = "AUTHORITY"
    SCOPE: list[str] = ["User.Read"]


# Singleton, DO NOT MUTATE
settings = Settings()

# if __name__ == "__main__":
    # print(settings.AUTHORITY)


