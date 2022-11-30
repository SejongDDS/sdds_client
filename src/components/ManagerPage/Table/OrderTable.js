import React,{useState} from 'react';
import styled from'styled-components';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyModalDataState, modifyModalShowState, orderState, productState } from '../../../recoil/Recoil';

const StyledButton = styled.button`
    /*공통 스타일*/
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;


    /*크기*/
    height: 2rem;
    font-size: 1rem;

    /*색상 */
    background: #228be6;
    &:hover{
        background: #339af0;
    }
    &:active{
        background: #1c7ed6;
    }

    
`

const OrderTable = (probs) => {
    const [modifyModalShow,setModifyModalShow]=useRecoilState(modifyModalShowState);
    const [modifyModalData,setModifyModalData]=useRecoilState(modifyModalDataState);
    const [visible,setVisible]=useState(probs.kind)
    const orders=useRecoilValue(orderState);

    const handleClose= () => setModifyModalShow(false);
    return (
        <>
        <table class="table">
        <thead class="thead-light">
            <tr>
                {
                    probs.columns.map((item)=>{
                        return(<th scope="col">{item}</th>)
                    })
                }
            
            </tr>
        </thead>
        <tbody>
            
            {
                    orders.map((item)=>{
                        return(
                            <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.buyer}</td>
                                <td>{item.product.name}</td>
                                <td>{item.count}</td>
                                <td>{item.shipping_address}</td>
                                <td>{item.order_status}</td>
                                
                                {visible && 
                                <td>
                                    <Link to={`/manager/${item.website}/order/detail?id=${item.id}`}>
                                    <StyledButton variant="primary" size="sm" >수정/변경</StyledButton>
                                    </Link>
                                </td>
                                }
                                
                                
                                
                            </tr>
                            
                            </>
                        )
                            
                        
                    })
                    
            }

            
        </tbody>
        </table>

        </>
    );
};

export default OrderTable;