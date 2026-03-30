import requests

LRCLIB_BASE_URL = "https://lrclib.net/api"

def fetch_lyrics(track_id: int) -> list:
    r = requests.get(f"{LRCLIB_BASE_URL}/get/{track_id}")
    data = r.json()
    
    # Get only the lyrics as a list from the track data object returned, but return an empty list if there aren't any lyrics at all
    lyrics = data["plainLyrics"]
    
    if lyrics is None:
        return []

    lyrics_list = lyrics.split("\n")
    return [line for line in lyrics_list if line.strip()]