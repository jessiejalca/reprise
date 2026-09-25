import { useSearchParams } from 'react-router-dom';

// Returns a handler that removes the search query from the URL, keeping other params like the filter
function useClearSearch() {
    const [searchParams, setSearchParams] = useSearchParams()

    return () => {
        const params = new URLSearchParams(searchParams)
        params.delete('q')
        setSearchParams(params)
    }
}

export default useClearSearch
