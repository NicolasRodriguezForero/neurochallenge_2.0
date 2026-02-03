from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.models.user import User
from app.config.environment import SECRET_KEY
from app.schemas.user import TokenPayload
from app.api.dependencies.session import SessionDep


# OAuth2 scheme for token authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")


def get_current_user(
    session: SessionDep, 
    token: str = Depends(oauth2_scheme)
) -> User:
    """
    Get the current user based on JWT token
    
    Args:
        session: Database session
        token: JWT token from request
        
    Returns:
        Current user object
        
    Raises:
        HTTPException: If authentication fails
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY, 
            algorithms=["HS256"]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenPayload(sub=email)
    except JWTError:
        raise credentials_exception
        
    user = session.query(User).filter(User.email == token_data.sub).first()
    if user is None:
        raise credentials_exception
        
    return user


CurrentUserDep = Annotated[User, Depends(get_current_user)]