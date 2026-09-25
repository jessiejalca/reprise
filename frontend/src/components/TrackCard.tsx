import type { TrackResult } from "../types/track"

const SLEEVE_COUNT = 8

// Pick a stable gradient (1–8) from the album, so every track on an album shares the same fallback sleeve
function sleeveFor(track: TrackResult) {
    let hash = 0
    for (const char of `${track.artist}|${track.album}`) {
        hash = (hash * 31 + char.charCodeAt(0)) | 0
    }
    return Math.abs(hash) % SLEEVE_COUNT + 1
}

function TrackCard({ track }: {track: TrackResult}) {
    return (
        <div className="track-card">
            <div className={`track-card-art sleeve-${sleeveFor(track)}`}>
                <span className="track-card-record" aria-hidden="true" />
                <img className="track-card-cover" />
            </div>
            <div className="track-card-info">
                <h2 className="track-card-title type-song">{track.title}</h2>
                <p className="track-card-meta type-body">{track.artist} • {track.album}</p>
            </div>
        </div>
    )
}

export default TrackCard