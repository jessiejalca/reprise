import useClearSearch from '../hooks/useClearSearch';
import './EmptyResults.css';

function EmptyResults({ query }: { query: string }) {
    const clearSearch = useClearSearch()

    return (
        <section className='empty-results' role='status'>
            <p className='type-label'>No results</p>
            <h2 className='type-title'>Nothing matched “{query}”</h2>
            <p className='hint'>Check the spelling, try fewer words, or search by the artist's name instead.</p>
            <button type='button' className='type-control' onClick={clearSearch}>Clear search</button>
        </section>
    )
}

export default EmptyResults
