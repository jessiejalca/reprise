import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/songs';
import { Hero, Search, TrackList } from '../components';
import type { TrackResult } from '../types/track';

function SearchPage() {
    const [searchParams] = useSearchParams()
    // Remember which query the results belong to, so a new query counts as loading from its very first render
    const [results, setResults] = useState<{ query: string, tracks: TrackResult[] }>({ query: '', tracks: [] })

    const q = searchParams.get("q")
    const filter = searchParams.get("filter") ?? "All"

    const loading = Boolean(q) && results.query !== q
    const tracks = results.tracks

    useEffect(() => {
        if (!q) return

        const controller = new AbortController()

        const fetchResults = async () => {
            try {
                // TODO: pass `filter` through to searchTracks once the backend supports filtering by field
                const data = await searchTracks(q, controller.signal)
                setResults({ query: q, tracks: data })
            } catch (error) {
                // Stale request, cancelled by a newer keystroke — ignore it so it can't clobber state
                if (error instanceof DOMException && error.name === 'AbortError') return
                setResults({ query: q, tracks: [] })
                throw error
            }
        }

        fetchResults()

        // Cancel this request if `q` changes again (e.g. the next keystroke) before it resolves
        return () => controller.abort()
    }, [q, filter])

    return (
        <main>
            <Hero />
            <Search />
            {q && loading && <TrackList tracks={[]} loading />}
            {q && !loading && tracks.length > 0 && <TrackList tracks={tracks} />}
            {q && !loading && tracks.length === 0 && <p>No results found</p>}
        </main>
    )
}

export default SearchPage
