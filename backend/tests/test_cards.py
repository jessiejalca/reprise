import pytest
from app.services.cards import build_cards

mock_original_lines = [
    "À ceux qui n'en ont pas",
    "Rosa, Rosa",
    "Quand on fout le bordel, tu nettoies",
    "Et toi, Albert",
    "Quand on trinque, tu ramasses les verres"
]

mock_translated_lines = [
    {"text": "To those who don't have any", "original_lang": "FR"},
    {"text": "Rosa, Rosa", "original_lang": "FR"},
    {"text": "When we make a mess, you clean it up", "original_lang": "FR"},
    {"text": "And you, Albert", "original_lang": "FR"},
    {"text": "When we clink glasses, you collect them", "original_lang": "FR"}
]

mock_selected_indices = [0, 2, 4]

mock_metadata = {
    "song": "Santé",
    "artist": "Stromae",
    "album": "Multitude"
}


# build_cards returns the correct and expected number of lines
def test_build_cards_filters_lines_by_indices():
    cards = build_cards(mock_original_lines, mock_translated_lines, mock_selected_indices, mock_metadata)
    
    # We should get 3 cards in this list
    assert isinstance(cards, list)
    assert len(cards) == 3
    
    # Check that we have the right lines from both lists (the 1st, 3rd, & 5th)
    assert cards[0]["original"] == "À ceux qui n'en ont pas"
    assert cards[0]["translation"] == "To those who don't have any"
    assert cards[1]["original"] == "Quand on fout le bordel, tu nettoies"
    assert cards[1]["translation"] == "When we make a mess, you clean it up"
    assert cards[2]["original"] == "Quand on trinque, tu ramasses les verres"
    assert cards[2]["translation"] == "When we clink glasses, you collect them"
    
# build_cards gives 3-line context appropriately depending on where the line is in the songs
def test_build_cards_gives_correct_context():
    cards = build_cards(mock_original_lines, mock_translated_lines, mock_selected_indices, mock_metadata)
    
    assert isinstance(cards[0]["context"], list)
    
    # If building for the first line of the song, give the next two lines
    assert cards[0]["context"] == [
        "À ceux qui n'en ont pas",
        "Rosa, Rosa",
        "Quand on fout le bordel, tu nettoies",
    ]
    
    # If building for the last line of the song, give the previous two lines
    assert cards[2]["context"] == [
        "Quand on fout le bordel, tu nettoies",
        "Et toi, Albert",
        "Quand on trinque, tu ramasses les verres"
    ]
    
    # If building for any other line, give one line before and one after
    assert cards[1]["context"] == [
        "Rosa, Rosa",
        "Quand on fout le bordel, tu nettoies",
        "Et toi, Albert"
    ]

# build_cards returns cards in the right shape
def test_build_cards_formats_cards_correctly():
    cards = build_cards(mock_original_lines, mock_translated_lines, mock_selected_indices, mock_metadata)
    
    # Check the rest of the card's formatting that we didn't check in the last two tests
    assert cards[0]["song"] == "Santé"
    assert cards[0]["artist"] == "Stromae"
    assert cards[0]["album"] == "Multitude"

# build_cards handles an empty list of selected indices gracefully
def test_build_cards_returns_empty_list_when_no_selected_indices():
    cards = build_cards(mock_original_lines, mock_translated_lines, [], mock_metadata)
    
    # Empty list in, empty list out
    assert cards == []

# build_cards handles an out of range selected index gracefully
def test_build_cards_raises_error_for_out_of_range_index():
    out_of_range_indices = [0, 5]
    
    # Raise error when the index is out of range
    with pytest.raises(ValueError, match="out of range"):
        build_cards(mock_original_lines, mock_translated_lines, out_of_range_indices, mock_metadata)

# build_cards handles mismatched original v translated line lists gracefully
def test_build_cards_raises_error_when_lines_mismatch():
    mismatched_original = [
        "Et toi, Albert",
        "Quand on trinque, tu ramasses les verres"
    ]
    
    # Raise error when number of lines mismatch
    with pytest.raises(ValueError, match="same length"):
        build_cards(mismatched_original, mock_translated_lines, mock_selected_indices, mock_metadata)