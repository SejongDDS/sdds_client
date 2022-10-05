import React from 'react';
import {Link} from 'react-router-dom';


function CardItem(props){
    return(
        <>
            <li className='cardview__item'>
                <Link className='cardview__item__link' to={props.path}>
                <figure className='cardview__item__img-wrap' data-category={props.label}>
                    <img
                        className='cardview__item__img'
                        alt='Travel Image'
                        src={props.src}
                    />
                </figure>
                <div className='cardview__item__info'>
                    <h5 className='cardview__item__text'>{props.text}</h5>
                </div>
                </Link>
            </li>
        </>
    )
}

export default CardItem;