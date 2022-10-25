import React from 'react';

import styled from 'styled-components';
import Table from '../../utils/Table';
import { useRecoilState } from 'recoil';
import { productState } from '../../../recoil/Recoil';
import { Link } from 'react-router-dom';

const ProductStateBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    height: 100%;
    text-align: center;
    align-items: center;

    padding: 10px 20px;
    
`
const ProductLinkBlock=styled.div`
    text-align: right;
    padding: 4px 8px;
    

`
const ProductLink=styled(Link)`
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: inherit;
`

function ProductStateContainer(){
    const tableColumn=['상품아이디','상품이름','가격','카테고리']
    const [product,setProduct]=useRecoilState(productState)

    
    return(
    <ProductStateBlock>
        <ProductLinkBlock>
            <ProductLink to="/manager/product" >자세히보기</ProductLink>
        </ProductLinkBlock>
        
        <h2>상품 관리</h2>
        <hr/>
        <Table columns={tableColumn} data={product.slice(0,7)}/>
    </ProductStateBlock>
    )
}
export default ProductStateContainer;