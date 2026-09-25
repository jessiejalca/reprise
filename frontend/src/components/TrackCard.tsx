import type { TrackResult } from "../types/track"

function TrackCard({ track }: {track: TrackResult}) {
    return (
        <div className="track-card">
            <img />
            <div>
                <h2>{track.title}</h2>
                <p>{track.artist} • {track.album}</p>
            </div>
        </div>
    )
}

export default TrackCard