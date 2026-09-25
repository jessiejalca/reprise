import { useSearchParams } from 'react-router-dom';

function EmptyResults({ query }: { query: string }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleClear = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        setSearchParams(params)
    }

    return (
        <section id='empty-results' role='status'>
            <p className='type-label'>No results</p>
            <h2 className='type-title'>Nothing matched “{query}”</h2>
            <p className='hint'>Check the spelling, try fewer words, or search by the artist's name instead.</p>
            <button type='button' onClick={handleClear}>Clear search</button>
        </section>
    )
}

export default EmptyResults
