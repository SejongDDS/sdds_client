import React from "react";
import styled from "styled-components";

const Item = styled.div`
    margin-bottom:30px;

    border: none;

    &:hover{
        border-bottom: solid;
        color:black;
        animation: 0.3s ease-in-out;
    }

`

function SidebarItem({ menu }) {
    return (
        <Item>
            <p>{menu.name}</p>
        </Item>
    );
}

export default SidebarItem;