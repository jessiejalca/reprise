import type { TrackResult } from "../types/track"

function TrackCard({ track }: {track: TrackResult}) {
    return (
        <div className="track-card">
            <img />
            <h2>{track.title}</h2>
            <p>{track.artist} • {track.album}</p>
        </div>
    )
}

export default TrackCard