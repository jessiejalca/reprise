import { Link } from 'react-router-dom';
import { RiArrowRightLine } from "react-icons/ri";

function Header() {
    return (
        <header id='banner'>
            <Link to='/' className="logo">Reprise</Link>
            <p className='global-translate type-label'>Translate<RiArrowRightLine size={18} />English</p>
        </header>
    )
}

export default Header