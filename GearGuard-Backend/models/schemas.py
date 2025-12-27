from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

class UserBase(BaseModel):
    name: str
    role: str

class UserResponse(UserBase):
    user_id: int
    class Config: orm_mode = True

class EquipmentBase(BaseModel):
    name: str
    serial_number: str
    department: str
    assigned_to: Optional[int]
    maintenance_team_id: Optional[int]
    default_technician_id: Optional[int]
    purchase_date: Optional[date]
    warranty_end_date: Optional[date]
    location: Optional[str]
    is_scrapped: Optional[bool] = False

class EquipmentResponse(EquipmentBase):
    equipment_id: int
    class Config: orm_mode = True

class RequestBase(BaseModel):
    request_type: str
    subject: str
    description: Optional[str]
    equipment_id: int
    state: Optional[str] = "New"
    scheduled_date: Optional[date]
    duration_hours: Optional[float]

class RequestResponse(RequestBase):
    request_id: int
    created_at: datetime
    updated_at: datetime
    class Config: orm_mode = True
