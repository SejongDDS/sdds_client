import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addProduct, asyncProductQuery, getProducts } from '../../ManagerPage/Controller/DashboardController';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getToken, productState, tokenState } from '../../../recoil/Recoil';

function NewProductModal(props){
    const [name,setName]=useState('');
    const [price,setPrice]=useState(0);
    const [category,setCategory]=useState('');
    const [count,setCount]=useState(0);
    const [thumnail,setThumnail]=useState(null);
    const [images,setImages]=useState(null);
    const token=useRecoilValue(tokenState);
    const [product,setProduct]=useRecoilState(productState);

    const onChangeName=(e)=>{
        setName(e.target.value);
        console.log(name);
    }

    const onChangePrice=(e)=>{
        setPrice(e.target.value);
    }

    const onChangeCategory=(e)=>{
        setCategory(e.target.value);
    }

    const onChangeCount=(e)=>{
        setCount(e.target.value);
    }

    const onChangeThumnail=(e)=>{
        console.log(e.target.files);
        setThumnail(e.target.files);
    }

    const onChangeImages=(e)=>{

        const imageURL=e.target.files;
        console.log(imageURL);
        
        setImages(imageURL);

    }

    const handleAddButton=()=>{
        setProduct([]);
        addProduct(name,price,category,props.website,count,thumnail,images,token)
        getProducts(token,props.website).then((data)=> setProduct(data));
        
        props.onHide();

    }
    return(
        <Modal {...props}>
        <Modal.Header closeButton>
            <Modal.Title>상품 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 이름</Form.Label>
                <Form.Control
                type="text"
                placeholder="상품이름"
                autoFocus
                onChange={onChangeName}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 가격</Form.Label>
                <Form.Control
                type="text"
                placeholder="상품 가격"
                onChange={onChangePrice}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 카테고리</Form.Label>
                <Form.Control
                type="text"
                placeholder="카테고리"
                onChange={onChangeCategory}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 수량</Form.Label>
                <Form.Control
                type="text"
                placeholder="카테고리"
                onChange={onChangeCount}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 대표 사진(썸네일)</Form.Label>
                <Form.Control
                type="file"
                onChange={onChangeThumnail}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 설명 사진</Form.Label>
                <Form.Control
                type="file"
                multiple
                onChange={onChangeImages}
                />
                
                <small id="emailHelp" class="form-text text-muted">최대 5장</small>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
            취소
            </Button>
            <Button variant="primary" onClick={handleAddButton}>
            상품추가하기
            </Button>
        </Modal.Footer>
        </Modal>
    )
}

export default NewProductModal;
