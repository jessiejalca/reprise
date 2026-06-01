import { IoSearch, IoLanguage, IoDownload } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchTracks } from '../services/songs';
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
            <section className="hero" aria-labelledby="hero-heading">
                <h1 id="hero-heading">Master languages through your favorite music.</h1>
                <p className="subtitle">Translate the lyrics and turn them into Anki flashcards instantly.</p>
            </section>
            <section className="blocks">
                <div>
                    <IoSearch size={28} className='icon' />
                    <h2>1. Search for a song</h2>
                    <p>Find the tracks you love listening to every day.</p>
                </div>
                <div>
                    <IoLanguage size={28} className='icon' />
                    <h2>2. Choose your lines</h2>
                    <p>See the translations side-by-side and pick the lines you want to practice.</p>
                </div>
                <div>
                    <IoDownload size={28} className='icon' />
                    <h2>3. Export to Anki</h2>
                    <p>Turn your selected lyrics into high-quality flashcards.</p>
                </div>
            </section>
        </main>
    )
}

export default SearchPage