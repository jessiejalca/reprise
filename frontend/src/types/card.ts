import type { TranslatedLine } from "./translation"
import type { TrackMetadata } from "./track"

export interface Card {
    original: string
    translation: string
    song: string
    artist: string
    album: string
    context: string[]
}

export interface CardRequest {
    originalLines: string[]
    translatedLines: TranslatedLine[]
    selectedIndices: number[]
    metadata: TrackMetadata
}