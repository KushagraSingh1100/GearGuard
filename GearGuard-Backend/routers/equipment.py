from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models
from models.schemas import EquipmentBase, EquipmentResponse

router = APIRouter(prefix="/equipment", tags=["Equipment"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Create Equipment
@router.post("/", response_model=EquipmentResponse)
def create_equipment(item: EquipmentBase, db: Session = Depends(get_db)):
    eq = models.Equipment(**item.dict())
    db.add(eq); db.commit(); db.refresh(eq)
    return eq

# Get All Equipment
@router.get("/", response_model=list[EquipmentResponse])
def get_equipment(db: Session = Depends(get_db)):
    return db.query(models.Equipment).all()

# Get Single Equipment
@router.get("/{id}", response_model=EquipmentResponse)
def get_single_equipment(id: int, db: Session = Depends(get_db)):
    data = db.query(models.Equipment).filter(models.Equipment.equipment_id == id).first()
    if not data: raise HTTPException(404, "Equipment not found")
    return data

# Update Equipment
@router.put("/{id}", response_model=EquipmentResponse)
def update_equipment(id: int, item: EquipmentBase, db: Session = Depends(get_db)):
    eq = db.query(models.Equipment).filter(models.Equipment.equipment_id == id).first()
    if not eq: raise HTTPException(404, "Equipment not found")
    for key, value in item.dict().items():
        setattr(eq, key, value)
    db.commit(); db.refresh(eq)
    return eq

# Delete Equipment
@router.delete("/{id}")
def delete_equipment(id: int, db: Session = Depends(get_db)):
    eq = db.query(models.Equipment).filter(models.Equipment.equipment_id == id).first()
    if not eq: raise HTTPException(404, "Equipment not found")
    db.delete(eq); db.commit()
    return {"message": "deleted"}
