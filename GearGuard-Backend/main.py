from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routers import users, equipment, teams, requests

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="GearGuard API",
    description="Maintenance Management System API",
    version="1.0.0"
)

# Configure CORS - CRITICAL for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # React default
        "http://localhost:5173",  # Vite default
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "*"  # Allow all origins (use specific origins in production)
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(users.router)
app.include_router(equipment.router)
app.include_router(teams.router)
app.include_router(requests.router)

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to GearGuard API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "users": "/users",
            "equipment": "/equipment",
            "teams": "/teams",
            "requests": "/requests"
        }
    }

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "GearGuard API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)