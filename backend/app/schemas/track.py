from app.schemas.base import CamelModel

class TrackMetadata(CamelModel):
    song: str
    artist: str
    album: str
    
class TrackResult(CamelModel):
    id: int
    title: str
    artist: str
    album: str