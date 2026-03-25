import requests

LRCLIB_BASE_URL = "https://lrclib.net/api"


def search_tracks(query: str) -> list:
    params = {'q': query}
    r = requests.get(f"{LRCLIB_BASE_URL}/search", params=params)
    data = r.json()
    
    # For each record, skip instrumental tracks, and clean up the remaining tracks
    tracks = []
    for record in data:
        if not record["instrumental"]:
            track = {
                "id": record["id"],
                "title": record["trackName"],
                "artist": record["artistName"],
                "album": record["albumName"]
            }
            tracks.append(track)
        
    return tracks