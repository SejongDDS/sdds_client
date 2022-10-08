import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManagerHeader from './Pages/ManagerHeader';
import ManagerSidebar from './Pages/ManagerSidebar';
import styled from 'styled-components';

const ManagerContainer=styled.div`
    height:100vh;
`

function ManagerPage(){

    return(
        <ManagerContainer>
            <ManagerHeader page_url={"https://google.com"} domain={"테스트"}/>
            <ManagerSidebar/>


        </ManagerContainer>
    )
}

export default ManagerPage;