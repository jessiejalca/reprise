from fastapi import APIRouter
from app.schemas import TranslationRequest
from app.services.tracks import search_tracks
from app.services.lyrics import fetch_lyrics
from app.services.translation import translate_lines

router = APIRouter()

@router.get("/songs/search")
def search(q: str):
    return search_tracks(q)

@router.get("/songs/{track_id}/lyrics")
def lyrics(track_id: int):
    return fetch_lyrics(track_id)

@router.post("/songs/translation")
def translation(req: TranslationRequest):
    return translate_lines(req.lines, req.to_lang)