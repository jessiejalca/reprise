import { useSearchParams } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import './Search.css';

function Search() {
    const filters = ['All', 'Title', 'Artist', 'Album']
    const [searchParams, setSearchParams] = useSearchParams()

    const q = searchParams.get('q') ?? ''
    const filter = searchParams.get('filter') ?? 'All'

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        params.set('q', e.target.value)
        setSearchParams(params)
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(searchParams)
        params.set('filter', e.target.value)
        setSearchParams(params)
    }

    return (
        <section className='search'>
            <div className="searchbar">
                <RiSearchLine size={24} color="#8A7D70" />
                <input
                    type="text"
                    className="type-body"
                    placeholder='Search by title, artist or album…'
                    value={q}
                    onChange={handleQueryChange}
                />
            </div>
            <div className='search-filter'>
                {filters.map((f) => (
                    <label key={f} className='type-control'>
                        <input
                            type='radio'
                            name='filters'
                            value={f}
                            checked={filter === f}
                            onChange={handleFilterChange}
                        />
                        {f}
                    </label>
                ))}
            </div>
        </section>
    )
}

export default Search