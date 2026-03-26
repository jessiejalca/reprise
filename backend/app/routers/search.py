from fastapi import APIRouter
from app.services.tracks import search_tracks

router = APIRouter()


@router.get("/search")
def search(q: str):
    return search_tracks(q)