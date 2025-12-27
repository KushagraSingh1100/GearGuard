from sqlalchemy import Column, Integer, String, Enum, Date, DateTime, Boolean, ForeignKey, DECIMAL
from datetime import datetime
from database import Base

class User(Base):
    __tablename__ = "users"
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    role = Column(Enum("User", "Technician", "Manager", name="user_roles"))

class MaintenanceTeam(Base):
    __tablename__ = "maintenance_teams"
    team_id = Column(Integer, primary_key=True, autoincrement=True)
    team_name = Column(String(100))

class TeamMember(Base):
    __tablename__ = "team_members"
    id = Column(Integer, primary_key=True, autoincrement=True)
    team_id = Column(Integer, ForeignKey("maintenance_teams.team_id"))
    user_id = Column(Integer, ForeignKey("users.user_id"))

class Equipment(Base):
    __tablename__ = "equipment"
    equipment_id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    serial_number = Column(String(100))
    department = Column(String(100))
    assigned_to = Column(Integer, ForeignKey("users.user_id"))
    maintenance_team_id = Column(Integer, ForeignKey("maintenance_teams.team_id"))
    default_technician_id = Column(Integer, ForeignKey("users.user_id"))
    purchase_date = Column(Date)
    warranty_end_date = Column(Date)
    location = Column(String(150))
    is_scrapped = Column(Boolean, default=False)

class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"
    request_id = Column(Integer, primary_key=True, autoincrement=True)
    request_type = Column(Enum("Corrective", "Preventive", name="request_types"))
    subject = Column(String(150))
    description = Column(String(500))
    equipment_id = Column(Integer, ForeignKey("equipment.equipment_id"))
    maintenance_team_id = Column(Integer, ForeignKey("maintenance_teams.team_id"))
    assigned_to = Column(Integer, ForeignKey("users.user_id"))
    state = Column(Enum("New", "In Progress", "Repaired", "Scrap", name="request_states"))
    scheduled_date = Column(Date)
    duration_hours = Column(DECIMAL(5,2))
    created_by = Column(Integer, ForeignKey("users.user_id"))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
