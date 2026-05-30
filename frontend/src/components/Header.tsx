import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header id='banner'>
            <Link to='/' className="logo">Reprise</Link>
            <div className='search-input-wrapper'>
                <IoSearch size={16} className='icon' />
                <input id="searchbar" type="text" placeholder="Search songs or artists..." />
            </div>
            <div></div>
        </header>
    )
}

export default Header