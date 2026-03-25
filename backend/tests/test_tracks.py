import pytest
from unittest.mock import patch, MagicMock
from app.services.tracks import search_tracks

mock_tracks = [
    {
        "id": 1,
        "name": "Alors on danse",
        "trackName": "Alors on danse",
        "artistName": "Stromae",
        "albumName": "Cheese",
        "duration": 207.0,
        "instrumental": False,
        "plainLyrics": "Alors on danse\nAlors on danse\nAlors on danse",
        "syncedLyrics": "[00:47.00] Alors on danse\n[00:51.00] Alors on danse\n[00:55.00] Alors on danse"
    },
    {
        "id": 2,
        "name": "Santé",
        "trackName": "Santé",
        "artistName": "Stromae",
        "albumName": "Multitude",
        "duration": 191.0,
        "instrumental": False,
        "plainLyrics": "À ceux qui n'en ont pas\nÀ ceux qui n'en ont pas",
        "syncedLyrics": "[00:04.14] À ceux qui n'en ont pas\n[00:09.01] À ceux qui n'en ont pas"
    },
    {
        "id": 3,
        "name": "Instrumental Test",
        "trackName": "Instrumental Test",
        "artistName": "Test Artist",
        "albumName": "Test Album",
        "duration": 180.0,
        "instrumental": True,
        "plainLyrics": None,
        "syncedLyrics": None
    }
]


# Given a normal successful response, search_tracks returns a list with the right shape
def test_search_tracks_returns_list():
    with patch("app.services.tracks.requests.get") as mock_get:
        mock_get.return_value.json.return_value = mock_tracks
        mock_get.return_value.status_code = 200
        
        results = search_tracks("Stromae")
        
        # We should get a list, but "Instrumental Test" should get filtered, so we should only get 2 results
        assert isinstance(results, list)
        assert len(results) == 2
        
        # For the tracks left, we should only get the fields we care about; specifically these:
        first = results[0]
        assert first["id"] == 1
        assert first["title"] == "Alors on danse" # renamed from trackName
        assert first["artist"] == "Stromae" # renamed from artistName
        assert first["album"] == "Cheese" # renamed from albumName
        # And not these:
        assert "duration" not in first
        assert "instrumental" not in first
        assert "plainLyrics" not in first
        assert "syncedLyrics" not in first
        
        
# Make sure that specifically instrumental tracks are excluded from our returned list
def test_search_tracks_filters_instrumental():
    with patch("app.services.tracks.requests.get") as mock_get:
        mock_get.return_value.json.return_value = mock_tracks
        mock_get.return_value.status_code = 200
        
        results = search_tracks("Stromae")
        
        # None of the results should have instrumental == True; check by making sure the track with id 3 is not present
        result_ids = [r["id"] for r in results]
        assert 3 not in result_ids
        
        
# Make sure the function gracefully returns an empty list rather than crashing or returning None when the API returns nothing
def test_search_tracks_returns_empty_list_when_no_results():
    with patch("app.services.tracks.requests.get") as mock_get:
        mock_get.return_value.json.return_value = []
        mock_get.return_value.status_code = 200
        
        results = search_tracks("xyznonexistent")
        
        assert isinstance(results, list)
        assert len(results) == 0