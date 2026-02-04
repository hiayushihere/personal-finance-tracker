from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import UserCreate, UserLogin
from ..models import User
from ..auth import hash_password, verify_password, create_access_token
from ..dependencies import get_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    clean_password = user.password.strip()

    new_user = User(
        name=user.name.strip(),
        email=user.email.strip(),
        password=hash_password(clean_password)
    )

    db.add(new_user)
    db.commit()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(db_user.id)
    return {
        "access_token": token,
        "token_type": "bearer"
    }
