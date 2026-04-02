import pytest
from unittest.mock import patch, MagicMock
from app.services.translation import translate_lines
from app.schemas.translation import TranslatedLine, TranslationRequest

mock_req = TranslationRequest(
    lines=[
        "À ceux qui n'en ont pas",
        "À ceux qui n'en ont pas"
    ],
    to_lang="EN"
)

mock_translations = {
    "translations": [
        {
            "text": "To those who don't have any",
            "detected_source_language": "FR"
        },
        {
            "text": "To those who don't have any",
            "detected_source_language": "FR"
        }
    ]
}


# Given a normal successful response, translate_lines returns the same number of lines, now in the language the user already knows, as well as the language that the user is trying to translate (in case the auto-detect assumed a different language)
def test_translate_lines_returns_translated_lyrics():
    with patch("app.services.translation.requests.post") as mock_post:
        mock_post.return_value.json.return_value = mock_translations
        mock_post.return_value.status_code = 200

        translation = translate_lines(mock_req)

        # We should get a list of the same length and the detected language of the original song's line
        assert isinstance(translation, list)
        assert isinstance(translation[0], TranslatedLine)
        assert len(translation) == 2

        # Make sure the shape of an item in the list is correct
        assert translation[0].text == "To those who don't have any"
        assert translation[0].original_lang == "FR"


# Make sure the function gracefully returns an empty list if an empty list is passed in
def test_translate_lines_returns_empty_list_when_no_results():
    translation = translate_lines(TranslationRequest(lines=[], to_lang="EN"))

    # We should just get an empty list returned
    assert isinstance(translation, list)
    assert translation == []
