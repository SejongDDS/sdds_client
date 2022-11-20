import React,{useState} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modifyModalDataState, modifyModalShowState, orderState, productState } from '../../../recoil/Recoil';


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
                                <td>{item.buyer.id}</td>
                                <td>{item.product.name}</td>
                                <td>{item.count}</td>
                                <td>{item.shipping_address}</td>
                                <td>{item.order_status}</td>
                                
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

export default OrderTable;