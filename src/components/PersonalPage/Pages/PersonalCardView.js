import React from 'react';
import CardItem from './CardItem';
import './PersonalCardView.scss';
import imgsrc from '../../../resources/imgs/web.jpeg';
import img_new from '../../../resources/imgs/new.jpeg';

function PersonalCardView(){
    
    var cardlist=[
        {
        img_src: imgsrc,
        text:'프로젝트 1',
        path:'/services',
        label:'shop'
    },
    {
        img_src: imgsrc,
        text:'프로젝트 2',
        path:'/services',
        label:'shop'
    },
    {
        img_src: imgsrc,
        text:'프로젝트 3',
        path:'/services',
        label:'shop'
    },
    {
        img_src: imgsrc,
        text:'프로젝트 2',
        path:'/services',
        label:'shop'
    },
    {
        img_src: imgsrc,
        text:'프로젝트 3',
        path:'/services',
        label:'shop'
    }]

    return(
        <div className='cardview'>
            <div className='cardview__title'>
                <h1>내 디자인</h1>
            </div>
            <div className='cardview__container'>
                <div className='carview__wrapper'>
                    <ul className='cardview__items'>
                        <CardItem src={img_new} text="새로운 웹사이트 만들기" path="/main" label="new"/>
                        
                        {
                            cardlist.map((item,idx)=>{
                                return <CardItem src={item.img_src} text={item.text} label={item.label} path={item.path}/>
                            })
                        }
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default PersonalCardView;