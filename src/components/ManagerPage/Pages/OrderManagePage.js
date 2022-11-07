import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { orderState, productState } from '../../../recoil/Recoil';
import UpdateOrderModal from '../../utils/Modal/UpdateOrderModal';
import Table from '../../utils/Table';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';

const OrderManageContainer=styled.div`
    height:100vh;
`

const OrdersContainer=styled.div`
    display:flex;
    width:100%;
    height:100%;
`

const OrdersBlock=styled.div`
    width:80%;
    background: gray;
    padding:10px;
`

const OrderTableBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    min-height: 50vh;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;

    padding: 20px;
`

const OrderButtonBlock=styled.div`
    text-align:right;

    margin-right:20px;
    margin-bottom:20px;
`

function OrderManagePage(){
    const tableColumn=['주문아이디','상품이름','구매자','주문상태','주소','주문 날짜','수정/변경']
    const [order,setOrder]=useRecoilState(orderState);
    
    return(
        <>
            <OrderManageContainer>
                <ManagerHeader page_url={"https://google.com"} domain={"테스트"}/>

                <OrdersContainer>
                    <ManagerSidebar/>
                    <OrdersBlock>
                        <OrderTableBlock>
                            <h1>주문 관리</h1>
                            <hr/>
                            <Table columns={tableColumn} data={order} kind={true}/>
                        </OrderTableBlock>
                    </OrdersBlock>
                </OrdersContainer>
            </OrderManageContainer>

            <UpdateOrderModal/>
        </>
    )
}

export default OrderManagePage;