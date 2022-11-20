import React,{useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { memberState, modifyModalDataState, modifyModalShowState, orderState, productState } from '../../../recoil/Recoil';


const MemberTable = (probs) => {
    const [modifyModalShow,setModifyModalShow]=useRecoilState(modifyModalShowState);
    const [modifyModalData,setModifyModalData]=useRecoilState(modifyModalDataState);
    const [visible,setVisible]=useState(probs.kind)
    const members=useRecoilValue(memberState);

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
                    members.map((item)=>{
                        return(
                            <>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.buyer.id}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.birth}</td>
                                
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

export default MemberTable;