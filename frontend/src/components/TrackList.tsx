import type { TrackResult } from '../types/track';
import TrackCard from './TrackCard';

function TrackList({ tracks }: { tracks: TrackResult[] }) {
    return (
        <div className='tracks-container'>
            {tracks.map((track) => (
                <TrackCard key={track.id} track={track} />
            ))}
        </div>
    )
}

export default TrackList