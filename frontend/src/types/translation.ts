export interface TranslationRequest {
    lines: string[]
    toLang: string
}

export interface TranslatedLine {
    text: string
    originalLang: string
}