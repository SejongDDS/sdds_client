import React,{useState,useParams, useEffect} from 'react';
import styled from 'styled-components';

import { modifyModalDataState, modifyModalShowState, productState, tokenState, websiteState } from '../../../recoil/Recoil';
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
import { deleteProduct, getProductDetail, getProducts, updateProduct } from '../Controller/DashboardController';


const ProductDetailContainer=styled.div`
    height:100vh;
`

const ProductsContainer=styled.div`
    display:flex;
    width:100%;
    height:100%;
`
const ProductsBlock=styled.div`
    width: 80%;

    background: gray;
    text-align:center;
    padding:70px;
`

const ProductTableBlock=styled.div`
    background: white;
    border: none;   
    border-radius: 5px;
    min-height: 50vh;
    text-align: center;
    align-items: center;

    margin: auto;
    padding: 50px 80px;

`

const ProductButtonBlock=styled.div`
    text-align:right;

    margin-right:20px;
    margin-bottom:20px;
`

function ProductDetailPage(){
    let website = useRecoilValue(websiteState);
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // test
    const accessToken=useRecoilValue(tokenState);
    
    const [products,setProducts]=useRecoilState(productState);
    const [data,setData] = useState({});
    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [count,setCount]=useState(0);
    const [category,setCategory]=useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setLoading(true);
        getProductDetail(accessToken,website,id).then((data)=>{
            setData(data);
            setName(data.name);
            setPrice(data.price);
            setCount(data.count);
            setCategory(data.category.name);
        });
        setLoading(false)
    },[])

    if (loading) return <div>로딩중..</div>; 
    if (error) return <div>에러가 발생했습니다</div>;

    const onChangeName=(e)=>{
        setName(e.target.value);
        console.log(name);
    }

    const onChangePrice=(e)=>{
        setPrice(e.target.value);
    }

    const onChangeCount=(e)=>{
        setCount(e.target.value);
    }


    const handleUpdateProduct=(e)=>{
        updateProduct(accessToken,id,website,name,price,count,category)
        getProducts(accessToken,website).then((data)=>setProducts(data));
    }

    const handleDeleteProduct=(e)=>{
        deleteProduct(accessToken,id,website);
        getProducts(accessToken,website).then((data)=>setProducts(data));
    }

    return(
        <>
        <ProductDetailContainer>
            <ManagerHeader page_url={"https://google.com"} domain={website}/>

            <ProductsContainer>
                <ManagerSidebar/>

                <ProductsBlock>
                    
                    <ProductTableBlock>
                        <h1>상품 상세 정보</h1>
                        <hr/>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    상품 ID
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={id} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        상품 이름
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={name} onChange={onChangeName}/>
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        상품 가격
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={price} onChange={onChangePrice} />
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        상품 수량
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control type="text" placeholder={count} onChange={onChangeCount}/>
                                </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        상품 카테고리
                                    </Form.Label>
                                <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={category}  />
                                </Col>
                                </Form.Group>
                        </Form>

                        <ProductButtonBlock>
                        <ButtonGroup aria-label="Basic example">

                                <Button variant="secondary" href={`/manager/${website}/product`}>돌아가기</Button>

                                <Button variant="secondary" onClick={handleUpdateProduct}>수정</Button>

                                <Link to={`/manager/${website}/product`}>
                                    <Button variant="secondary" onClick={handleDeleteProduct}>삭제</Button>
                                </Link>

                        </ButtonGroup>
                        </ProductButtonBlock>
                    </ProductTableBlock>
                </ProductsBlock>
            </ProductsContainer>
            

        </ProductDetailContainer>
        

        
        </>
    )
}

export default ProductDetailPage;