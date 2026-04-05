from app.schemas.base import CamelModel
from app.schemas.track import TrackMetadata
from app.schemas.translation import TranslatedLine

class Card(CamelModel):
    original: str
    translation: str
    song: str
    artist: str
    album: str
    context: list[str]
    
class CardRequest(CamelModel):
    original_lines: list[str]
    translated_lines: list[TranslatedLine]
    selected_indices: list[int]
    metadata: TrackMetadata