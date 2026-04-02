import requests
import os
from app.schemas.translation import TranslatedLine, TranslationRequest

DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

def translate_lines(request: TranslationRequest) -> list[TranslatedLine]:
    # If there's nothing to translate, send nothing back before calling API
    if not request.lines:
        return []
    
    # Set up the API header
    api_key = os.getenv("DEEPL_API_KEY")
    response = requests.post(
        DEEPL_API_URL,
        headers={
            "Authorization": f"DeepL-Auth-Key {api_key}",
            "Content-Type": "application/json"
        },
        json={
            "text": request.lines,
            "target_lang": request.to_lang
        }
    )
    
    # Return the translated lyrics with the detected original language in the expected cleaned up format
    raw_data = response.json()
    translated_lyrics = []
    for translation in raw_data["translations"]:
        line = TranslatedLine(
            text=translation["text"],
            original_lang=translation["detected_source_language"]
        )
        translated_lyrics.append(line)
    
    return translated_lyrics