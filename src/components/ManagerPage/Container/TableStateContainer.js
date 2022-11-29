import React from 'react';

import styled from 'styled-components';

import { useRecoilState, useRecoilValue } from 'recoil';
import { orderState, websiteState } from '../../../recoil/Recoil';
import { Link } from 'react-router-dom';
import OrderTable from '../Table/OrderTable';

const TableStateBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    height: 100%;
    text-align: center;
    align-items: center;

    padding: 10px 20px;
    
`
const TableLinkBlock=styled.div`
    text-align: right;
    padding: 4px 8px;
    

`
const TableLink=styled(Link)`
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: inherit;
`

function TableStateContainer(){
    const tableColumn=['주문아이디','구매자','상품이름','수량','배송 상태','주소']
    const [order,setOrder]=useRecoilState(orderState)
    const website = useRecoilValue(websiteState);

    return(
    <TableStateBlock>
        <TableLinkBlock>
            <TableLink to={`/manager/${website}/order`} >자세히보기</TableLink>
        </TableLinkBlock>
        
        <h2>주문</h2>
        <hr/>
        <OrderTable columns={tableColumn} data={order}/>
    </TableStateBlock>
    )
}
export default TableStateContainer;