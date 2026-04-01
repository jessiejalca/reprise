from pydantic import BaseModel

class TrackMetadata(BaseModel):
    song: str
    artist: str
    album: str