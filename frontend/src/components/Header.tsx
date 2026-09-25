import { Link } from 'react-router-dom';
import { RiArrowRightLine } from "react-icons/ri";
import './Header.css';

function Header() {
    return (
        <header className='banner'>
            <Link to='/' className="logo type-title">Reprise</Link>
            <p className='global-translate type-label'>Translate<RiArrowRightLine size={18} />English</p>
        </header>
    )
}

export default Header