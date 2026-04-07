import type { Card, CardRequest } from "../types/card";
import type { TrackResult } from "../types/track";
import type { TranslatedLine } from "../types/translation";
import { request } from "./api";

const searchTracks = async (query: string): Promise<TrackResult[]> => {
    return await request(`/songs/search?q=${encodeURIComponent(query)}`)
}

const fetchLyrics = async (trackId: number): Promise<string[]> => {
    return await request(`/songs/${trackId}/lyrics`)
}

const translateLines = async (lines: string[], toLang: string): Promise<TranslatedLine[]> => {
    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify({ lines, toLang })
    }
    return await request(`/songs/translation`, options)
}

const buildCards = async (req: CardRequest): Promise<Card[]> => {
    const options: RequestInit = {
        method: "POST",
        body: JSON.stringify(req)
    }
    return await request("/songs/cards", options)
}

export { searchTracks, fetchLyrics, translateLines, buildCards }