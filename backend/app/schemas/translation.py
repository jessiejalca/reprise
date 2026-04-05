from app.schemas.base import CamelModel

class TranslationRequest(CamelModel):
    lines: list[str]
    to_lang: str
    
class TranslatedLine(CamelModel):
    text: str
    original_lang: str