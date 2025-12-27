from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
from models import models
from models.schemas import TeamCreate, TeamMemberCreate



router = APIRouter(prefix="/teams", tags=["Teams"])

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

# Create Team
@router.post("/")
def create_team(
    payload: TeamCreate,
    db: Session = Depends(get_db)
):
    new_team = models.MaintenanceTeam(
        team_name=payload.team_name
    )
    db.add(new_team)
    db.commit()
    db.refresh(new_team)
    return new_team


# Get All Teams
@router.get("/")
def get_teams(db: Session = Depends(get_db)):
    return db.query(models.MaintenanceTeam).all()

# Add Team Member
@router.post("/add-member")
def add_member(
    payload: TeamMemberCreate,
    db: Session = Depends(get_db)
):
    member = models.TeamMember(
        team_id=payload.team_id,
        user_id=payload.user_id
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    return {"message": "User added to team", "data": member}

