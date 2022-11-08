import React,{useState} from 'react';
import CardItem from './CardItem';
import './PersonalCardView.scss';
import imgsrc from '../../../resources/imgs/web.jpeg';
import img_new from '../../../resources/imgs/new.jpeg';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import {Card,Button} from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';

const CardViewContainer=styled.div`
    background: #fff;
`

const CardViewTitle=styled.div`
    padding-top: 4rem;
    text-align: center;
`
const CardCarouselBlock=styled.div`
    padding:40px;
    justify-align:center;
    text-algin: center;
`


function PersonalCardView(){
    
    var cardlist=[
        {
        img_src: imgsrc,
        text:'프로젝트 1',
        path:'/manager',
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

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
          slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };


    return(
        <CardViewContainer>
            <CardViewTitle>
                <h1>내 디자인</h1>
            </CardViewTitle>
            <CardCarouselBlock>
            <Carousel responsive={responsive}>
                <Card style={{ width: '25rem' }}>
                    <Card.Img variant="top" src={img_new} style={{height: '20rem'}} />
                    <Card.Body>
                        <Card.Title>새로운 웹사이트 만들기</Card.Title>
                        <Card.Text>
                        주저하지말고 SDDS를 이용해서 웹사이틀 만들어보세요!
                        </Card.Text>
                        <Button variant="primary" href="/main">새로운 페이지 생성하러 이동</Button>
                    </Card.Body>
                </Card>
                
                
                {
                    cardlist.map((item,idx)=>{
                        return (

                                <CardItem src={item.img_src} text={item.text} label={item.label} path={item.path}/>

                        )
                    })
                }
            </Carousel>
            </CardCarouselBlock>
            
        </CardViewContainer>
    )
}

export default PersonalCardView;