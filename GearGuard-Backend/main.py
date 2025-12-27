from fastapi import FastAPI
from routers import users, equipment, teams, requests
from database import Base, engine

app = FastAPI(title="GearGuard Maintenance API")

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(equipment.router)
app.include_router(teams.router)
app.include_router(requests.router)

@app.get("/")
def home():
    return {"message": "GearGuard API Running 🚀"}
