import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useRecoilState } from 'recoil';
import { tokenState, websiteState } from '../../../recoil/Recoil';


function CardItem(props){
    const [website,setWebsite]=useRecoilState(websiteState);
    return(
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={props.src} style={{height: '20rem'}} />
            <Card.Body>
                <Card.Title>{props.text}</Card.Title>
                <Button variant="primary" href={props.path} onClick={()=>setWebsite(props.text)}>관리페이지로 이동</Button>
            </Card.Body>
        </Card>
            
    )
}

export default CardItem;