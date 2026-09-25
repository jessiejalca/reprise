import useClearSearch from '../hooks/useClearSearch';
import './ResultsSummary.css';

// `count` is null while the search is still loading
function ResultsSummary({ query, count }: { query: string, count: number | null }) {
    const clearSearch = useClearSearch()

    const status = count === null
        ? 'Searching'
        : `${count} ${count === 1 ? 'result' : 'results'}`

    return (
        <div className='results-summary'>
            <p className='type-label' aria-live='polite'>{status} · {query}</p>
            <button type='button' className='type-control' onClick={clearSearch}>Clear</button>
        </div>
    )
}

export default ResultsSummary
