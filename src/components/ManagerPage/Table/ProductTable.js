import React,{useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyModalDataState, modifyModalShowState, productState } from '../../../recoil/Recoil';


const ProductTable = (probs) => {
    const [modifyModalShow,setModifyModalShow]=useRecoilState(modifyModalShowState);
    const [modifyModalData,setModifyModalData]=useRecoilState(modifyModalDataState);
    const [visible,setVisible]=useState(probs.kind)
    const products=useRecoilValue(productState);

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

export default ProductTable;
