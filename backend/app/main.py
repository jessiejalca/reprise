from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import songs
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Reprise")

origins = [
    "http://localhost",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(songs.router)