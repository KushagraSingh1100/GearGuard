from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models
from models.schemas import RequestBase, RequestResponse

router = APIRouter(prefix="/requests", tags=["Maintenance Requests"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Create Request
@router.post("/", response_model=RequestResponse)
def create_request(req: RequestBase, created_by: int, db: Session = Depends(get_db)):
    new = models.MaintenanceRequest(**req.dict(), created_by=created_by)
    db.add(new); db.commit(); db.refresh(new)
    return new

# Get All Requests
@router.get("/", response_model=list[RequestResponse])
def get_requests(db: Session = Depends(get_db)):
    return db.query(models.MaintenanceRequest).all()

# Update State (Kanban move)
@router.put("/{request_id}/state")
def update_state(request_id: int, state: str, db: Session = Depends(get_db)):
    req = db.query(models.MaintenanceRequest).filter(models.MaintenanceRequest.request_id == request_id).first()
    if not req: raise HTTPException(404, "Request not found")
    req.state = state
    db.commit()
    return {"message": "state updated", "state": req.state}

# Delete Request
@router.delete("/{request_id}")
def delete_request(request_id: int, db: Session = Depends(get_db)):
    req = db.query(models.MaintenanceRequest).filter(models.MaintenanceRequest.request_id == request_id).first()
    if not req: raise HTTPException(404, "Request not found")
    db.delete(req); db.commit()
    return {"message": "deleted"}
