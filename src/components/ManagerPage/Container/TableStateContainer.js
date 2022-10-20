import React from 'react';

import styled from 'styled-components';
import Table from '../../utils/Table';
import { useRecoilState } from 'recoil';
import { orderState } from '../../../recoil/Recoil';
import { Link } from 'react-router-dom';

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
    const tableColumn=['주문아이디','상품이름','구매자 번호','배송 상태','주소','주문날짜']
    const [order,setOrder]=useRecoilState(orderState)

    return(
    <TableStateBlock>
        <TableLinkBlock>
            <TableLink to="/manager/order" >자세히보기</TableLink>
        </TableLinkBlock>
        
        <h2>주문</h2>
        <hr/>
        <Table columns={tableColumn} data={order.slice(0,7)}/>
    </TableStateBlock>
    )
}
export default TableStateContainer;