from pydantic import BaseModel
from app.schemas.track import TrackMetadata
from app.schemas.translation import TranslatedLine

class Card(BaseModel):
    original: str
    translation: str
    song: str
    artist: str
    album: str
    context: list[str]
    
class CardRequest(BaseModel):
    original_lines: list[str]
    translated_lines: list[TranslatedLine]
    selected_indices: list[int]
    metadata: TrackMetadata