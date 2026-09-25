import type { TrackResult } from '../types/track';
import TrackCard from './TrackCard';
import TrackCardSkeleton from './TrackCardSkeleton';
import './TrackList.css';

function TrackList({ tracks, loading = false }: { tracks: TrackResult[], loading?: boolean }) {
    return (
        <div className='track-list' aria-busy={loading}>
            {loading
                ? Array.from({ length: 8 }, (_, i) => <TrackCardSkeleton key={i} />)
                : tracks.map((track) => <TrackCard key={track.id} track={track} />)}
        </div>
    )
}

export default TrackList
