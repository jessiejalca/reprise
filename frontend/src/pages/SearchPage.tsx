import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/songs';
import { Hero, Search, TrackList } from '../components';
import type { TrackResult } from '../types/track';

function SearchPage() {
    const [searchParams] = useSearchParams()
    const [tracks, setTracks] = useState<TrackResult[]>([])
    const [loading, setLoading] = useState(false)

    const q = searchParams.get("q")
    const filter = searchParams.get("filter") ?? "All"

    useEffect(() => {
        if (!q) return

        const controller = new AbortController()

        const fetchResults = async () => {
            setLoading(true)
            try {
                // TODO: pass `filter` through to searchTracks once the backend supports filtering by field
                const data = await searchTracks(q, controller.signal)
                setTracks(data)
                setLoading(false)
            } catch (error) {
                // Stale request, cancelled by a newer keystroke — ignore it so it can't clobber state
                if (error instanceof DOMException && error.name === 'AbortError') return
                setLoading(false)
                throw error
            }
        }

        fetchResults()

        // Cancel this request if `q` changes again (e.g. the next keystroke) before it resolves
        return () => controller.abort()
    }, [q, filter])

    console.log(tracks)

    return (
        <main>
            <Hero />
            <Search />
            {q && loading && <p>Loading...</p>}
            {q && !loading && tracks.length > 0 && <TrackList tracks={tracks} />}
            {q && !loading && tracks.length === 0 && <p>No results found</p>}
        </main>
    )
}

export default SearchPage