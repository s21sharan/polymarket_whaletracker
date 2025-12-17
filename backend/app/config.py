import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    # Polymarket / Clob
    POLYMARKET_API_KEY: str = os.getenv("POLYMARKET_API_KEY", "")
    POLYMARKET_SECRET: str = os.getenv("POLYMARKET_SECRET", "")
    POLYMARKET_PASSPHRASE: str = os.getenv("POLYMARKET_PASSPHRASE", "")
    HOST: str = "https://clob.polymarket.com"
    CHAIN_ID: int = 137  # Polygon Mainnet

    # Bot Configuration
    MY_ADDRESS: str = os.getenv("MY_WALLET_ADDRESS", "")

    class Config:
        env_file = ".env"

settings = Settings()
