import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/songs';
import Hero from '../components/Hero';
import TrackList from '../components/TrackList';
import type { TrackResult } from '../types/track';

function SearchPage() {
    const [searchParams] = useSearchParams()
    const [tracks, setTracks] = useState<TrackResult[]>([])
    const [loading, setLoading] = useState(false)

    const q = searchParams.get("q")

    useEffect(() => {
        if (!q) return

        const fetchResults = async () => {
            setLoading(true)
            const data = await searchTracks(q)
            setTracks(data)
            setLoading(false)
        }

        fetchResults()
    }, [q])

    console.log(tracks)

    return (
        <main>
            {!q && <Hero />}
            {q && loading && <p>Loading...</p>}
            {q && !loading && tracks.length > 0 && <TrackList tracks={tracks} />}
            {q && !loading && tracks.length === 0 && <p>No results found</p>}
        </main>
    )
}

export default SearchPage