from fastapi import APIRouter
from app.services.tracks import search_tracks
from app.services.lyrics import fetch_lyrics

router = APIRouter()


@router.get("/songs/search")
def search(q: str):
    return search_tracks(q)

@router.get("/songs/{track_id}/lyrics")
def lyrics(track_id: int):
    return fetch_lyrics(track_id)