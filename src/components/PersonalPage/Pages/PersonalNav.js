import React from 'react';
import { Link } from "react-router-dom";
import './PersonalNav.scss'
import Button from '../../utils/Button';

function PersonalNav(){

    return(
        <nav className="personal-navbar">
            <div className="personal-navbar-container">
                <Link to="/" className="personal__logo">
                    SDDS
                    <i className="fa-solid fa-laptop-code"></i>
                </Link>
                
                <Button className="start_btn" buttonStyle="btn--blue" buttonSize="btn--large" name="디자인 시작하기"
                    onClick={() => {
                        window.location.href = "/main";
                    }}
                >
                    디자인 시작하기
                </Button> 

                
            </div>
        
        </nav>
    )
}

export default PersonalNav;