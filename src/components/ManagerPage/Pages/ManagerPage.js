import React, { useEffect,useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';
import styled from 'styled-components';
import OrderStateContainer from '../Container/OrderStateContainer';
import TableStateContainer from '../Container/TableStateContainer';
import ProductStateContainer from '../Container/ProductStateContainer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState, orderState, productState, tokenState } from '../../../recoil/Recoil';
import axios from 'axios';
import { asyncProductQuery, getProducts } from '../Controller/DashboardController';

const ManagerContainer=styled.div`
    height:150vh;
    
`
const DashboardContainer =styled.div`
    display:flex;
    width:100%;
    height:100%;

`

const StateContainer = styled.div`
    width: 80%;
    height:100%;
    background: gray;
    display: grid;
    grid-template-areas:
        "chart chart"
        "order table"
        "product product";
    gap:10px;
    padding:10px;
`

const OrderContainer = styled.div`
    grid-area: order;
    

`
const ChartContainer = styled.div`
    grid-area: chart;

`
const TableContainer= styled.div`
    grid-area: table;

`

const ProductContainer= styled.div`
    grid-area: product;

`

function ManagerPage(){
    let {website} = useParams();

    
    
    const accessToken=useRecoilValue(tokenState);
    
    const [product,setProduct]=useRecoilState(productState)
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
        <ManagerContainer>
            <ManagerHeader page_url={"https://google.com"} domain={website}/>
            
            <DashboardContainer>
            <ManagerSidebar/>
            <StateContainer>
                
                <ChartContainer>
                    <OrderStateContainer/>
                </ChartContainer>
                <OrderContainer>
                    <OrderStateContainer/>
                </OrderContainer>
                <TableContainer>
                    <TableStateContainer/>
                </TableContainer>
                <ProductContainer>
                    <ProductStateContainer/>
                </ProductContainer>
            </StateContainer>
            </DashboardContainer>
            
        </ManagerContainer>
    )
}

export default ManagerPage;