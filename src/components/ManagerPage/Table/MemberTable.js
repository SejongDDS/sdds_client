import React,{useState} from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState, modifyModalDataState, modifyModalShowState, orderState, productState } from '../../../recoil/Recoil';
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

const MemberTable = (probs) => {
    const [visible,setVisible]=useState(probs.kind)
    const members=useRecoilValue(memberState);

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
                    members.map((item)=>{
                        return(
                            <>
                            <tr>
                                <td>{item.id}</td>
                                
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.birth}</td>
                                
                                {visible && 
                                <td>
                                    <Link to={`/manager/${item.website}/member/detail?id=${item.id}`}>
                                    <StyledButton variant="primary" size="sm">수정/변경</StyledButton>
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

export default MemberTable;