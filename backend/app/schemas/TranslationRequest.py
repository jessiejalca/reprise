from pydantic import BaseModel

class TranslationRequest(BaseModel):
    lines: list[str]
    to_lang: str