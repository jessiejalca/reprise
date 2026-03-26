from fastapi import FastAPI
from app.routers import search

app = FastAPI(title="Reprise")

@app.get("/health")
def health_check():
    return {"status": "ok"}


app.include_router(search.router)