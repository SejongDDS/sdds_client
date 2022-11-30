import React,{useEffect, useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { orderState, productState, tokenState, websiteState } from '../../../recoil/Recoil';
import { getOrders } from '../Controller/DashboardController';
import OrderTable from '../Table/OrderTable';
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
    let website = useRecoilValue(websiteState);
    const accessToken=useRecoilValue(tokenState);

    const tableColumn=['주문아이디','구매자','상품이름','수량','배송 상태','주소','수정/변경']
    const [order,setOrder]=useRecoilState(orderState);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getOrders(accessToken,website).then((data)=> setOrder(data));


        setLoading(false)
    })
    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

    return(
        <>
            <OrderManageContainer>
                <ManagerHeader page_url={"http://www.hyeonuk.co.kr/"+website+"/"} domain={"테스트"}/>

                <OrdersContainer>
                    <ManagerSidebar/>
                    <OrdersBlock>
                        <OrderTableBlock>
                            <h1>주문 관리</h1>
                            <hr/>
                            <OrderTable columns={tableColumn} data={order} kind={true}/>
                        </OrderTableBlock>
                    </OrdersBlock>
                </OrdersContainer>
            </OrderManageContainer>


        </>
    )
}

export default OrderManagePage;