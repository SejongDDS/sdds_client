import React,{useState,useParams, useEffect} from 'react';
import styled from 'styled-components';

import { modifyModalDataState, modifyModalShowState, orderState, productState, tokenState, websiteState } from '../../../recoil/Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ManagerHeader from '../Pages/ManagerHeader';
import ManagerSidebar from '../Pages/ManagerSidebar';
import { Link, useSearchParams } from 'react-router-dom';
import { deleteOrder, deleteProduct, getOrderDetail, getOrders, getProductDetail, getProducts, updateOrder, updateProduct } from '../Controller/DashboardController';


const OrderDetailContainer=styled.div`
    height:100vh;
`

const OrdersContainer=styled.div`
    display:flex;
    width:100%;
    height:100%;
`
const OrdersBlock=styled.div`
    width: 80%;

    background: gray;
    text-align:center;
    padding:70px;
`

const OrderTableBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    min-height: 50vh;
    text-align: center;
    align-items: center;

    margin: auto;
    padding: 50px 80px;

`

const OrderButtonBlock=styled.div`
    text-align:right;

    margin-right:20px;
    margin-bottom:20px;
`

function OrderDetailPage(){
    let website = useRecoilValue(websiteState);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // test
    const accessToken=useRecoilValue(tokenState);
    
    const [data,setData] = useState({});
    const [orders,setOrders]=useRecoilState(orderState);
    const [count,setCount]=useState(0);
    const [shipping_address,setShipping_Address]=useState('');
    const [order_status,setOrder_Status]=useState("PENDING")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getOrderDetail(accessToken,website,id).then((data)=>{
            setData(data)
            setCount(data.count)
            setShipping_Address(data.shipping_address)
            setOrder_Status(data.order_status)
        });
        
        setLoading(false)
    },[])

    if (loading) return <div>?????????..</div>; 
    if (error) return <div>????????? ??????????????????</div>;

    const onChangeCount=(e)=>{
        setCount(e.target.value);
        console.log(count);
    }

    const onChangeAddress=(e)=>{
        setShipping_Address(e.target.value);
    }

    const onChangeStatus=(e)=>{
        setOrder_Status(e.target.value);
    }


    const handleUpdateOrder=(e)=>{
        updateOrder(accessToken,id,count,shipping_address,order_status)
        getOrders(accessToken,website).then((data)=>setOrders(data));
    }

    const handleDeleteOrder=(e)=>{
        deleteOrder(accessToken,id);
        getOrders(accessToken,website).then((data)=>setOrders(data));
    }

    return(
        <>
        <OrderDetailContainer>
            <ManagerHeader page_url={"http://www.hyeonuk.co.kr/"+website+"/"} domain={website}/>

            <OrdersContainer>
                <ManagerSidebar/>

                <OrdersBlock>
                    
                    <OrderTableBlock>
                        <h1>?????? ?????? ??????</h1>
                        <hr/>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    ?????? ID
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={id} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ?????? ??????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.product_id}  />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ?????????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.buyer} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ?????? ??????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={data.count} onChange={onChangeCount} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ????????? ??????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={data.shipping_address} onChange={onChangeAddress} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ?????? ??????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={data.order_status} onChange={onChangeStatus}/>
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        ?????? ??????
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.order_cancel} />
                                </Col>
                                </Form.Group>
                        </Form>

                        <OrderButtonBlock>
                        <ButtonGroup aria-label="Basic example">
                            <Link to={`/manager/${website}/order`}>
                                <Button variant="secondary">??????</Button>

                                <Button variant="secondary" onClick={handleUpdateOrder}>??????</Button>


                                <Button variant="secondary" onClick={handleDeleteOrder}>??????</Button>
                            </Link>
                        </ButtonGroup>
                        </OrderButtonBlock>
                    </OrderTableBlock>
                </OrdersBlock>
            </OrdersContainer>
            

        </OrderDetailContainer>
        

        
        </>
    )
}

export default OrderDetailPage;