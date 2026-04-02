from app.schemas.card import Card, CardRequest

# build_cards returns a cleaned up list of dicts with all the info needed to create the cards and the overall deck
def build_cards(request: CardRequest) -> list[Card]:

    # Catch and raise error when the length of original lines and translated lines don't match up
    if len(request.original_lines) != len(request.translated_lines):
        raise ValueError("Original lyrics and translated lyrics should be the same length by number of lines")
    
    # Set up a list to catch all of the Cards we need to create
    cards = []
    
    # Add a card for each of the selected lines
    for i in request.selected_indices:
        
        # Catch and raise error if we get an index that isn't within the range of lines in the song
        if not (0 <= i < len(request.original_lines)):
            raise ValueError(f"The index {i} is out of range of lines provided")
        
        # Set up the context
        lyrics = request.original_lines
        lyrics_context = []
        if i == 0:
            lyrics_context += [lyrics[i], lyrics[i + 1], lyrics[i + 2]]
        elif i == len(lyrics) - 1:
            lyrics_context += [lyrics[i - 2], lyrics[i - 1], lyrics[i]]
        else:
            lyrics_context += [lyrics[i - 1], lyrics[i], lyrics[i + 1]]
                
        # Build the card and add it to the list
        card = Card(
            original=request.original_lines[i],
            translation=request.translated_lines[i].text,
            song=request.metadata.song,
            artist=request.metadata.artist,
            album=request.metadata.album,
            context=lyrics_context
        )
        cards.append(card)
        
        
    return cards