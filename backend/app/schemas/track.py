from pydantic import BaseModel

class TrackMetadata(BaseModel):
    song: str
    artist: str
    album: str
    
class TrackResult(BaseModel):
    id: int
    title: str
    artist: str
    album: str