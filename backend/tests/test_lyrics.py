import pytest
from unittest.mock import patch, MagicMock
from app.services.lyrics import fetch_lyrics

mock_lyrics = {
    "id": 2,
    "name": "Santé",
    "trackName": "Santé",
    "artistName": "Stromae",
    "albumName": "Multitude",
    "duration": 191.0,
    "instrumental": False,
    "plainLyrics": "À ceux qui n'en ont pas\nÀ ceux qui n'en ont pas",
    "syncedLyrics": "[00:04.14] À ceux qui n'en ont pas\n[00:09.01] À ceux qui n'en ont pas"
}


# Given a normal successful response, fetch_lyrics returns the plain lyrics formatted as a list of lyric lines, separated at each '\n' character
def test_fetch_lyrics_returns_list():
    with patch("app.services.lyrics.requests.get") as mock_get:
        mock_get.return_value.json.return_value = mock_lyrics
        mock_get.return_value.status_code = 200
        
        lyrics = fetch_lyrics(2)
        
        # We should get a list of 2 strings for this sample
        assert isinstance(lyrics, list)
        assert len(lyrics) == 2
        
        # Check that the strings match the lyrics correctly
        assert lyrics[0] == "À ceux qui n'en ont pas"
        assert lyrics[1] == "À ceux qui n'en ont pas"


# Empty strings from blank lines in the lyrics should be filtered out
def test_fetch_lyrics_filters_empty_strings():
    with patch("app.services.lyrics.requests.get") as mock_get:
        # Change mock data so it would generate an empty string to test
        mock_get.return_value.json.return_value = {**mock_lyrics, "plainLyrics": "À ceux qui n'en ont pas\n\nÀ ceux qui n'en ont pas"}
        mock_get.return_value.status_code = 200

        lyrics = fetch_lyrics(2)

        assert len(lyrics) == 2
        assert "" not in lyrics


# If somehow an instrumental or any other track without lyrics slips through, handle it gracefully
def test_fetch_lyrics_returns_empty_list_when_no_lyrics():
    with patch("app.services.lyrics.requests.get") as mock_get:
        mock_get.return_value.json.return_value = {**mock_lyrics, "plainLyrics": None}
        mock_get.return_value.status_code = 200
        
        lyrics = fetch_lyrics(2)
        
        # The function should just return an empty list if there are no lyrics
        assert lyrics == []