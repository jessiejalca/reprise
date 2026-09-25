import type { TrackResult } from '../types/track';
import TrackCard from './TrackCard';
import TrackCardSkeleton from './TrackCardSkeleton';

function TrackList({ tracks, loading = false }: { tracks: TrackResult[], loading?: boolean }) {
    return (
        <div id='tracks-container' aria-busy={loading}>
            {loading
                ? Array.from({ length: 8 }, (_, i) => <TrackCardSkeleton key={i} />)
                : tracks.map((track) => <TrackCard key={track.id} track={track} />)}
        </div>
    )
}

export default TrackList
