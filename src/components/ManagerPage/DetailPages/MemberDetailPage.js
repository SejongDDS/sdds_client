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
import { deleteOrder, deleteProduct, getMemberDetail, getOrders, getProductDetail, getProducts, updateOrder, updateProduct } from '../Controller/DashboardController';


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

function MemberDetailPage(){
    let website = useRecoilValue(websiteState);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // test
    const accessToken=useRecoilValue(tokenState);
    
    const [data,setData]=useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getMemberDetail(accessToken,website,id).then((data)=>{
            setData(data.member)
            console.log(data.member)
        })
        setLoading(false)
    },[])

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

    return(
        <>
        <OrderDetailContainer>
            <ManagerHeader page_url={"http://www.hyeonuk.co.kr/"+website+"/"} domain={website}/>

            <OrdersContainer>
                <ManagerSidebar/>

                <OrdersBlock>
                    
                    <OrderTableBlock>
                        <h1>회원 상세 정보</h1>
                        <hr/>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    회원 ID
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={id} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        회원 Email
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.email}  />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        전화번호
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.phone}  />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        생년월일
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={data.birth}  />
                                </Col>
                                </Form.Group>

                                
                        </Form>

                        <OrderButtonBlock>
                        
                            <Link to={`/manager/${website}/member`}>
                                <Button variant="secondary">돌아가기</Button>

                            </Link>
                        
                        </OrderButtonBlock>
                    </OrderTableBlock>
                </OrdersBlock>
            </OrdersContainer>
            

        </OrderDetailContainer>
        

        
        </>
    )
}

export default MemberDetailPage;