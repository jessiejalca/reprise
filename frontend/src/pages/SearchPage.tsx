import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/songs';
import { EmptyResults, Hero, Search, TrackList } from '../components';
import type { TrackResult } from '../types/track';
import useDebouncedValue from '../hooks/useDebouncedValue';

function SearchPage() {
    const [searchParams] = useSearchParams()
    // Remember which query the results belong to, so a new query counts as loading from its very first render
    const [results, setResults] = useState<{ query: string, tracks: TrackResult[] }>({ query: '', tracks: [] })

    const q = searchParams.get("q")
    const filter = searchParams.get("filter") ?? "All"

    // Wait for a pause in typing before searching, but apply a cleared search straight away
    const debouncedQ = useDebouncedValue(q, 300)
    const query = q ? debouncedQ : null

    const loading = Boolean(query) && results.query !== query
    const tracks = results.tracks

    useEffect(() => {
        if (!query) return

        const controller = new AbortController()

        const fetchResults = async () => {
            try {
                // TODO: pass `filter` through to searchTracks once the backend supports filtering by field
                const data = await searchTracks(query, controller.signal)
                setResults({ query, tracks: data })
            } catch (error) {
                // Stale request, cancelled by a newer keystroke — ignore it so it can't clobber state
                if (error instanceof DOMException && error.name === 'AbortError') return
                setResults({ query, tracks: [] })
                throw error
            }
        }

        fetchResults()

        // Cancel this request if the query changes again before it resolves
        return () => controller.abort()
    }, [query, filter])

    return (
        <main>
            <Hero collapsed={Boolean(query)} />
            <Search />
            {query && loading && <TrackList tracks={[]} loading />}
            {query && !loading && tracks.length > 0 && <TrackList tracks={tracks} />}
            {query && !loading && tracks.length === 0 && <EmptyResults query={query} />}
        </main>
    )
}

export default SearchPage
