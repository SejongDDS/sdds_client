import React,{useState} from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import UpdateProductModal from './Modal/UpdateProductModal';
import { useRecoilState } from 'recoil';
import { modifyModalDataState, modifyModalShowState } from '../../recoil/Recoil';

// useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
const Table = (probs) => {
    const [modifyModalShow,setModifyModalShow]=useRecoilState(modifyModalShowState);
    const [modifyModalData,setModifyModalData]=useRecoilState(modifyModalDataState);
    const [visible,setVisible]=useState(probs.kind)

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
                    probs.data.map((item)=>{
                        return(
                            <>
                            <tr>
                                {
                                    Object.values(item).map((value,i)=>(<td>{value}</td>)
                                        
                                    )
                                }
                                {visible && 
                                <td><button variant="primary" size="sm" onClick={() => {
                                    setModifyModalData(item)
                                    setModifyModalShow(true)
                                }}>수정/변경</button></td>
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

export default Table;
