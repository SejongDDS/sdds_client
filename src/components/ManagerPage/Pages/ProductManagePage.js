import React,{useState} from 'react';
import styled from 'styled-components';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';
import { modifyModalDataState, modifyModalShowState, productState } from '../../../recoil/Recoil';
import { useRecoilState } from 'recoil';
import Table from '../../utils/Table';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import NewProductModal from '../../utils/Modal/NewProductModal';
import UpdateProductModal from '../../utils/Modal/UpdateProductModal';

const ProductManageContainer=styled.div`
    height:100vh;
`

const ProductsContainer=styled.div`
    display:flex;
    width:100%;
    height:100%;
`
const ProductsBlock=styled.div`
    width: 80%;

    background: gray;
    
    padding:10px;
`

const ProductTableBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    min-height: 50vh;
    text-align: center;
    align-items: center;
    margin-bottom: 10px;

    padding: 20px;

`

const ProductButtonBlock=styled.div`
    text-align:right;

    margin-right:20px;
    margin-bottom:20px;
`

function ProductManagePage(){
    const tableColumn=['상품아이디','상품이름','가격','카테고리','수정/변경']
    const [product,setProduct]=useRecoilState(productState)
    const [addModalShow,setAddModalShow] = useState(false);
    

    



    return(
        <>
        <ProductManageContainer>
            <ManagerHeader page_url={"https://google.com"} domain={"테스트"}/>

            <ProductsContainer>
                <ManagerSidebar/>

                <ProductsBlock>
                    
                    <ProductTableBlock>
                        <h1>상품 관리</h1>
                        <hr/>
                        <ProductButtonBlock><Button variant="primary" onClick={()=>setAddModalShow(true)}>상품 추가</Button></ProductButtonBlock>
                        
                        <Table columns={tableColumn} data={product} kind={true}/>

                    </ProductTableBlock>
                </ProductsBlock>
            </ProductsContainer>
            

        </ProductManageContainer>
        
        <NewProductModal show={addModalShow} onHide={()=> setAddModalShow(false)}/>
        <UpdateProductModal/>
        
        </>
    )
}

export default ProductManagePage;