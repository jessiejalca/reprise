import type { TrackResult } from "../types/track"

function TrackCard({ track }: {track: TrackResult}) {
    return (
        <div className="track-card">
            <img className="track-card-art" />
            <div className="track-card-info">
                <h2 className="track-card-title type-song">{track.title}</h2>
                <p className="track-card-meta type-body">{track.artist} • {track.album}</p>
            </div>
        </div>
    )
}

export default TrackCard