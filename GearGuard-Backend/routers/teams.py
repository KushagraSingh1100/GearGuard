from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models

router = APIRouter(prefix="/teams", tags=["Teams"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Create Team
@router.post("/")
def create_team(team_name: str, db: Session = Depends(get_db)):
    new_team = models.MaintenanceTeam(team_name=team_name)
    db.add(new_team); db.commit(); db.refresh(new_team)
    return new_team

# Get All Teams
@router.get("/")
def get_teams(db: Session = Depends(get_db)):
    return db.query(models.MaintenanceTeam).all()

# Add Team Member
@router.post("/add-member")
def add_member(team_id: int, user_id: int, db: Session = Depends(get_db)):
    member = models.TeamMember(team_id=team_id, user_id=user_id)
    db.add(member); db.commit(); db.refresh(member)
    return {"message": "User added to team", "data": member}
