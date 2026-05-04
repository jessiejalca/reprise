import { IoSearch } from 'react-icons/io5';

function Header() {
    return (
        <header>
            <a className="logo" href='/'>Reprise</a>
            <div className='search-input-wrapper'>
                <IoSearch size={16} className='icon' />
                <input id="searchbar" type="text" placeholder="Search songs or artists..." />
            </div>
            <div></div>
        </header>
    )
}

export default Header