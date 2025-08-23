from sqlalchemy import create_engine, Column, Integer, String, Date, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session
from sqlalchemy.sql.functions import func
from config import DATABASE
from decorator import contextmanager

engine = create_engine(DATABASE.get("url"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

@contextmanager
def get_db_session():
    session = SessionLocal()

    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
    finally:
        session.close()

def set_db_tables():
    Base.metadata.create_all(bind=engine)

class FormData(Base):
    __tablename__ = "form_data"

    id = Column(Integer, primary_key=True, autoincrement=True)
    submitted = Column(DateTime, server_default=func.now())
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    message = Column(String)
