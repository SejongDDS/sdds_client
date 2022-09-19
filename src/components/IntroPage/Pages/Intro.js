import React from 'react';
import Button from "../../utils/Button";
import web_intro from '../../../resources/imgs/web_intro.png'
import "./Intro.css"
function Intro() {

    return(
        <div className="intro__container">
            <div className='display__container'>
                <div className="img_container">
                    <img className="web_img" src={web_intro} alt="web_img" />
                </div>
                <div className="sentence__container">
                    <p>쉽고 완벽하게,<br/>세종대의<br/>웹페이지 빌더</p>
                </div>
            </div>
            <Button buttonStyle='btn--white' buttonSize='btn--medium' name='시작하기' className='btn'></Button>
        </div>
    )
}

export default Intro;