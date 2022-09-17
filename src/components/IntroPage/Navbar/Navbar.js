import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Button from '../../utils/Button';
import './Navbar.css';

function Navbar(){
    const [click, setClick] = useState(false);
    
    
    const handleClick= () => setClick(!click);

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-logo' >
                    SDDS
                    <i class="fa-solid fa-laptop-code"></i>
                </Link>
                <div className='menu-icon'>
                    <i className = {click ? 'fas fa-times' : 'fas fa-bars' } />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>주요기능</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>템플릿</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links-moblie'>
                            Login
                        </Link>
                    </li>
                    

                </ul> 
                <Button className="btn" buttonStyle='btn--pink' buttonSize='btn--medium' name='Login'>Login</Button>
                <Button className="btn" buttonStyle='btn--white' buttonSize='btn--medium' name='시작하기'>시작하기</Button>
            </div>

        </nav>
    )
}

export default Navbar;