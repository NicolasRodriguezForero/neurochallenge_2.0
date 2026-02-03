from datetime import timedelta
from fastapi import APIRouter, HTTPException
from app.schemas.user import Token, UserCreate, UserLogin, UserPublic
from app.models import user as user_models
from app.api.dependencies.session import SessionDep
from app.config.security import create_access_token, get_password_hash, verify_password
from app.config.environment import JWT_EXPIRATION
from app.api.dependencies.deps import CurrentUserDep


router = APIRouter()

@router.post("/register", response_model=UserPublic)
def register_user(user: UserCreate, db: SessionDep):

    db_user = db.query(user_models.User).filter(user_models.User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    password_hash = get_password_hash(user.password)
    
    new_user = user_models.User(
        username=user.username,
        email=user.email,
        password=password_hash,
        avatar_url=user.avatar_url
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=Token)
def login_user(user: UserLogin, db: SessionDep):

    db_user = db.query(user_models.User).filter(user_models.User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token_expires = timedelta(minutes=JWT_EXPIRATION)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
    
@router.get("/me", response_model=UserPublic)
def get_current_user(current_user: CurrentUserDep):
    """
    Get the current logged-in user
    """
    return current_user

@router.post("/me", response_model=UserPublic)
def get_current_user(current_user: CurrentUserDep):
    """
    Get the current logged-in user
    """
    return current_user