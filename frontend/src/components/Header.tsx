import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

function Header() {
    const [searchParams, setSearchParams] = useSearchParams()

    const makeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Add the query to the search params for reading
        setSearchParams(`?q=${e.target.value}`)
    }

    return (
        <header id='banner'>
            <Link to='/' className="logo">Reprise</Link>
            <div className='search-input-wrapper'>
                <IoSearch size={16} className='icon' />
                <input 
                    id="searchbar" 
                    type="text" 
                    placeholder="Search songs or artists..."  
                    value={searchParams.get("q") ?? ""} 
                    onChange={makeQuery} 
                />
            </div>
            <div></div>
        </header>
    )   
}

export default Header