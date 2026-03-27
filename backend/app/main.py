from fastapi import FastAPI
from app.routers import songs

app = FastAPI(title="Reprise")

@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(songs.router)