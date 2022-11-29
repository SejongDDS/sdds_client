import React,{useState} from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyModalDataState, modifyModalShowState, productState } from '../../../recoil/Recoil';
import { Link } from 'react-router-dom';

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

const ProductTable = (probs) => {

    const [visible,setVisible]=useState(probs.kind)
    const products=useRecoilValue(productState);


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
                    products.map((item)=>{
                        return(
                            <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.count}</td>
                                <td>{item.category.name}</td>
                                
                                {visible && 
                                <td><Link to={`/manager/${item.website.website_url}/product/detail?id=${item.id}`}><StyledButton variant="primary" size="sm">수정/변경</StyledButton></Link></td>
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

export default ProductTable;
