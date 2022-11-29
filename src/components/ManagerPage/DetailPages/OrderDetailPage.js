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
import { deleteOrder, deleteProduct, getOrders, getProductDetail, getProducts, updateOrder, updateProduct } from '../Controller/DashboardController';


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
    
    const [orders,setOrders]=useRecoilState(orderState);
    const [count,setCount]=useState(0);
    const [shipping_address,setShipping_Address]=useState('');
    const [order_status,setOrder_Status]=useState("PENDING")
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        //getOrderDetail(accessToken,website,id).then((data)=>setData(data));
        setLoading(false)
    },[])

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

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
            <ManagerHeader page_url={"https://google.com"} domain={website}/>

            <OrdersContainer>
                <ManagerSidebar/>

                <OrdersBlock>
                    
                    <OrderTableBlock>
                        <h1>주문 상세 정보</h1>
                        <hr/>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    주문 ID
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={id} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문 상품
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue='주문 상품'  />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문자
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue='주문자'  />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문 수량
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder='주문 수량' onChange={onChangeCount} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문자 주소
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder='주문자 주소' onChange={onChangeAddress} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문 상태
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder='주문 상태' onChange={onChangeStatus}/>
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        주문 취소
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue='주문 취소'  />
                                </Col>
                                </Form.Group>
                        </Form>

                        <OrderButtonBlock>
                        <ButtonGroup aria-label="Basic example">
                            <Link to={`/manager/${website}/order`}>
                                <Button variant="secondary">취소</Button>

                                <Button variant="secondary">수정</Button>


                                <Button variant="secondary">삭제</Button>
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