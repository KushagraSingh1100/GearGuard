from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# --- MySQL Credentials ---
USER = "root"
PASSWORD = "Hamza%402005"
HOST = "localhost"
DATABASE = "gearguard"

DATABASE_URL = f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}/{DATABASE}"

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
