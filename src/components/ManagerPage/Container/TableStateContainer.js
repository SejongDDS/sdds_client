import React from 'react';

import styled from 'styled-components';
import Table from '../../utils/Table';
import { useRecoilState } from 'recoil';
import { productState } from '../../../recoil/Recoil';

const TableStateBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    height: 100%;
    text-align: center;
    align-items: center;

    padding: 10px 20px;
`

function TableStateContainer(){
    const tableColumn=['회원아이디','이름','가격','카테고리']
    const [product,setProduct]=useRecoilState(productState)

    return(
    <TableStateBlock>
        <Table columns={tableColumn} data={product}/>
    </TableStateBlock>
    )
}
export default TableStateContainer;