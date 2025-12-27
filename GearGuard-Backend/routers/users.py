from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models
from models.schemas import UserBase, UserResponse

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Create User
@router.post("/", response_model=UserResponse)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Get All Users
@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

# Get One User
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    return user

# Update User
@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserBase, db: Session = Depends(get_db)):
    user_obj = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user_obj: raise HTTPException(404, "User not found")
    for key, value in user.dict().items():
        setattr(user_obj, key, value)
    db.commit(); db.refresh(user_obj)
    return user_obj

# Delete User
@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not user: raise HTTPException(404, "User not found")
    db.delete(user); db.commit()
    return {"status": "deleted"}
