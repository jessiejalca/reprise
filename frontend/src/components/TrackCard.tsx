import type { TrackResult } from "../types/track"

function TrackCard({ track }: {track: TrackResult}) {
    return (
        <div className="track-card">
            <h2>{track.title}</h2>
            <p>{track.album}</p>
            <p>{track.artist}</p>
        </div>
    )
}

export default TrackCard