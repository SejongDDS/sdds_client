import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardItem(props){
    return(
        <Card style={{ width: '25rem' }}>
            <Card.Img variant="top" src={props.src} style={{height: '20rem'}} />
            <Card.Body>
                <Card.Title>{props.text}</Card.Title>
                <Card.Text>
                    {props.label}
                </Card.Text>
                <Button variant="primary" href={props.path}>관리페이지로 이동</Button>
            </Card.Body>
        </Card>
            
    )
}

export default CardItem;