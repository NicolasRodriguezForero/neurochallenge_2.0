import time
from app.models.user import User
from app.config.security import get_password_hash


attempts = 3

while attempts > 0:
    
    try: 
        from app.db.session import SessionLocal
        session = SessionLocal()
        
        admin_user = session.query(User).filter(User.is_superuser == True).first()

        if not admin_user:
            
            print("Creating first admin user...")
            
            admin_password = get_password_hash("admin")
            
            user_db = User(
                username="admin",
                email="admin@admin.com",
                password=admin_password,
                is_superuser=True
            )
            
            session.add(user_db)
            session.commit()
            session.refresh(user_db)
            
            print("Admin user created successfully.")
            
            break
        
        else:
            print("Admin user already exists.")

    except:
        print("Error creating admin user.")
        
    attempts -= 1
    
    if attempts > 0:
        print(f"Retrying in 5 seconds... {attempts} attempts left.")
        time.sleep(5)
