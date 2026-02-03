# echo "Waiting for database..."

# while ! nc -z db 5432; do
#   sleep 0.1
# done

# echo "Database is ready!"

# echo "Running migrations..."
# alembic upgrade head

# # Esperar un momento para asegurar que las migraciones se completen
# echo "Waiting for migrations to complete..."
# sleep 5

echo "Starting FastAPI application..."
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# echo "Creating admin user..."
# python -m app.db.create_admin_user
