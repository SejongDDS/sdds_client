import React from 'react';
import Button from "../../utils/Button";
function Intro() {

    return(
        <div className="intro_container">
            <div className='display_container'>
                <div className="img_container">
                    <img className="web_img" src="../../../resources/imgs/web_intro.png" alt="web_img" />
                </div>
                <div className="sentence_container">
                    <p>쉽고 완벽하게,<br/>세종대의<br/>웹페이지 빌더</p>
                </div>
            </div>
            <Button buttonStyle='btn--white' buttonSize='btn--medium' name='시작하기'></Button>
        </div>
    )
}

export default Intro;