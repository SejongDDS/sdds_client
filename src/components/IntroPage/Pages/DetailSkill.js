import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import "./DetailSkill.css";
import deploy from "../../../resources/imgs/deploy.png";
import domain from "../../../resources/imgs/domain.png";
import draganddrop from "../../../resources/imgs/drag-and-drop.png";
import dynamic from "../../../resources/imgs/dynamic.png";
import nocode from "../../../resources/imgs/no-code.png";
import template from "../../../resources/imgs/template.png";

function DetailSkill(){

    return(
        <div className='detail__container'>
            <h1>홈페이지 생성에 필요한 기능을<br/>모두 제공합니다</h1>
            <div className='box__container'>
                <div className='detail__box'>
                    <div className='detail__box__in'>
                    <img className="box__img" src={dynamic} alt="반응형디자인"></img>
                    <p className='box__title'>반응형 디자인</p>
                    <p className='box__description'>PC에서 한번만 작업하세요.<br/>테블릿, 모바일에서는 자동으로<br/>최적화되어 노출됩니다.</p>
                    </div>
                </div>
                <div className='detail__box'>
                <div className='detail__box__in'>
                    <img className="box__img" src={template} alt="다양한 템플릿"></img>
                    <p className='box__title'>다양한 템플릿</p>
                    <p className='box__description'>제작하고자 하는 테마별<br/>주제별 다양한 디자인 테플릿을<br/>무료로 제공합니다.</p>
                    </div>
                </div>
                <div className='detail__box'>
                <div className='detail__box__in'>
                    <img className="box__img" src={draganddrop} alt="디자인 에디터"></img>
                    <p className='box__title'>디자인 에디터</p>
                    <p className='box__description'>Drag and Drop을 기반으로한<br/>스마트한 디자인 에디터를 통해<br/>원하는 디자인으로 쉽게<br/>수정, 변경이 가능합니다.</p>
                </div>
                </div>
            </div>
            <div className='box__container'>
                <div className='detail__box'>
                <div className='detail__box__in'>
                    <img className="box__img" src={domain} alt="원하는 도메인"></img>
                    <p className='box__title'>원하는 도메인</p>
                    <p className='box__description'>페이지, 게시판, 쇼핑몰 등<br/>홈페이지를 제작시 원하는<br/>도메인의 이름으로<br/>제작가능합니다.</p>
                </div>
                </div>
                <div className='detail__box'>
                <div className='detail__box__in'>
                    <img className="box__img" src={nocode} alt="No Code"></img>
                    <p className='box__title'>No Code</p>
                    <p className='box__description'>제작하고자 하는 웹 페이지를<br/>어떠한 코드 작성없이<br/>원하는대로 제작가능합니다.</p>
                </div>
                </div>
                <div className='detail__box'>
                <div className='detail__box__in'>
                    <img className="box__img" src={deploy} alt="자동 배포"></img>
                    <p className='box__title'>자동 배포</p>
                    <p className='box__description'>SDDS의 자동 배포 기능을 통해<br/>내 사이트를 빠르게<br/>만들어줍니다.</p>
                </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSkill;