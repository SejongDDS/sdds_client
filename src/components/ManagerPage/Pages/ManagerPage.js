import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerHeader from './ManagerHeader';
import ManagerSidebar from './ManagerSidebar';
import styled from 'styled-components';
import OrderStateContainer from '../Container/OrderStateContainer';
import TableStateContainer from '../Container/TableStateContainer';
import ProductStateContainer from '../Container/ProductStateContainer';

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

    return(
        <ManagerContainer>
            <ManagerHeader page_url={"https://google.com"} domain={"테스트"}/>
            
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