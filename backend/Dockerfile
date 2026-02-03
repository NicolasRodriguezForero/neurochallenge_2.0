FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

# No necesitamos copiar el código porque lo montaremos como volumen
# COPY . .

# Command to run Alembic migrations and start the FastAPI application
# CMD ["sh", "-c", "alembic upgrade head && python -m app.db.create_admin_user && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"]
