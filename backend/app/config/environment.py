from dotenv import load_dotenv
import os

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# JWT configuration
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")
JWT_EXPIRATION = int(os.getenv("JWT_EXPIRATION", "3600"))

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
