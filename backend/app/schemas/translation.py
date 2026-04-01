from pydantic import BaseModel

class TranslationRequest(BaseModel):
    lines: list[str]
    to_lang: str
    
class TranslatedLine(BaseModel):
    text: str
    original_lang: str