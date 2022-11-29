import React,{useState,useParams, useEffect} from 'react';
import styled from 'styled-components';
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';
import { modifyModalDataState, modifyModalShowState, productState, tokenState, websiteState } from '../../../recoil/Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductTable from '../Table/ProductTable';
import { asyncProductQuery, getProducts } from '../Controller/DashboardController';
import { Link } from 'react-router-dom';

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
    let website = useRecoilValue(websiteState);
    const accessToken=useRecoilValue(tokenState);
    const tableColumn=['상품아이디','상품이름','가격','수량','카테고리','수정/변경']
    const [product,setProduct]=useRecoilState(productState);

    const [addModalShow,setAddModalShow] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);

        getProducts(accessToken,website).then((data)=> setProduct(data)).then(()=>console.log(product));

        console.log(product);
        setLoading(false)
    },[])

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;



    return(
        <>
        <ProductManageContainer>
            <ManagerHeader page_url={"http://www.hyeonuk.co.kr/"+website+"/"} domain={website}/>

            <ProductsContainer>
                <ManagerSidebar/>

                <ProductsBlock>
                    
                    <ProductTableBlock>
                        <h1>상품 관리</h1>
                        <hr/>
                        <ProductButtonBlock>
                            <Link to={`/manager/${website}/product/new`}>
                            <Button variant="primary">상품 추가</Button>
                            </Link>
                            </ProductButtonBlock>

                        <ProductTable columns={tableColumn} data={product} kind={true}/>

                    </ProductTableBlock>
                </ProductsBlock>
            </ProductsContainer>
            

        </ProductManageContainer>
        

        
        </>
    )
}

export default ProductManagePage;