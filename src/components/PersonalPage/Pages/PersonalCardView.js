import React,{useEffect, useState} from 'react';
import CardItem from './CardItem';
import './PersonalCardView.scss';
import imgsrc from '../../../resources/imgs/web.jpeg';
import img_new from '../../../resources/imgs/new.jpeg';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import {Card,Button} from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState, orderState, productState, tokenState, visitState, websiteState } from '../../../recoil/Recoil';
import axios from 'axios';

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

    const accessToken=useRecoilValue(tokenState);
    const [websiteList,setWebsiteList]=useRecoilState(visitState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWebsites = async () => {
        try{
            setError(null);
            setWebsiteList(null);

            setLoading(true);
            const response= await axios.get('http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000/api/v1/website',{
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            );
            setWebsiteList(response.data)
            
        } catch(e){
            setError(e);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchWebsites();
        console.log(websiteList);
    },[]);

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

    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생</div>
    if (!websiteList) return null;

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
                        
                        <Button variant="primary" href="/main">새로운 페이지 생성하러 이동</Button>
                    </Card.Body>
                </Card>
                
                
                {
                    websiteList.map((item,idx)=>{
                        return (

                                <CardItem src={imgsrc} text={item.website_url} path={"/manager/"+item.website_url}/>

                        )
                    })
                }
            </Carousel>
            </CardCarouselBlock>
            
        </CardViewContainer>
    )
}

export default PersonalCardView;