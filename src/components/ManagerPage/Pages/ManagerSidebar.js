import React from 'react';
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import SidebarItem from './SidebarItem';
import { useRecoilValue } from 'recoil';
import { websiteState } from '../../../recoil/Recoil';

const Side = styled.div`

    display: flex;
    border-right: 1px solid #e0e0e0;
    flex-direction: column;
    align-items: center;

    width: 20%;
    height:100%;

`

const Menu = styled.div`
    margin-top: 70px;
    width: 200px;
    display: flex;
    flex-direction: column;

    
`

function ManagerSidebar(){

    let website=useRecoilValue(websiteState);

    const menus = [
        { name: "대시보드",path:`/manager/${website}`},
        { name: "사용자 관리", path:`/manager/${website}/member`},
        { name: "상품 관리", path:`/manager/${website}/product`},
        { name: "주문 관리", path:`/manager/${website}/order`},
        { name: "통계", path:"/manager/statistic"},
        { name: "환경설정", path:"/manager/setting"}
    ]

    return(
        <Side>
            <Menu>
                {menus.map((menu,index)=>{
                    return(
                        <NavLink 
                        exact
                        style={{color: "gray", textDecoration: "none"}}
                        to={menu.path}
                        key={index}
                        activeStyle={{color: "black"}}
                        >
                            <SidebarItem menu={menu}/>
                        </NavLink>
                    )
                })}
            </Menu>
        </Side>
    )
}

export default ManagerSidebar;