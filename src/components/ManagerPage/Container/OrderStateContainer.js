import React from 'react';
import styled from 'styled-components';

const OrderStateBlock=styled.div`
    background: white;
    border: none;
    border-radius: 5px;
    height: 100%;
    text-align: center;
    align-items: center;

    padding: 10px 20px;
    h2 {
        margin-top: 20px;
        
    }

`
const OrderDataBlock=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;    

`
const OrderMenuBlock=styled.div`
    font-size:20px;
    color:gray;
    margin: 10px;

    
`

const OrderNumber=styled.span`
    color: red;
    margin:10px;
`

function OrderStateContainer(){

    return(
        <OrderStateBlock>
            <h2>오늘의 주문</h2>
            <hr/>
            <OrderDataBlock>
                <OrderMenuBlock>신규 주문 <OrderNumber>0</OrderNumber></OrderMenuBlock>
                <OrderMenuBlock>취소 관리 <OrderNumber>0</OrderNumber></OrderMenuBlock>
                <OrderMenuBlock>환불 관리 <OrderNumber>0</OrderNumber></OrderMenuBlock>
                <OrderMenuBlock>반품 관리 <OrderNumber>0</OrderNumber></OrderMenuBlock>
            </OrderDataBlock>
        </OrderStateBlock>
    )
}

export default OrderStateContainer;