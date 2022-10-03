import React from 'react';
import './PersonalPage.scss';
import Navbar from './Pages/PersonalNav';
import PersonalCardView from './Pages/PersonalCardView';


function PersonalPage(){
    return(
        <div className='personal-page'>
            <Navbar/>
            <PersonalCardView/>
        </div>
    )
}

export default PersonalPage;