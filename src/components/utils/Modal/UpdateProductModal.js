import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { modifyModalDataState, modifyModalShowState, productState, tokenState, websiteState } from '../../../recoil/Recoil';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getProducts, updateProduct } from '../../ManagerPage/Controller/DashboardController';

function UpdateProductModal(){
    
    const [updateModalShow,setUpdateModalShow]=useRecoilState(modifyModalShowState);
    const [updateModalData,setUpdateModalData]=useRecoilState(modifyModalDataState);

    const website=useRecoilValue(websiteState);
    const [name,setName]=useState(updateModalData.name);
    const [price,setPrice]=useState(updateModalData.price);

    const [count,setCount]=useState(updateModalData.count);
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



    const onChangeCount=(e)=>{
        setCount(e.target.value);
    }

    const handleClose= () => setUpdateModalShow(false)

    const handleUpdateButton = () =>{
        updateProduct(token,updateModalData.id,website,name,price,count,updateModalData.category.name);
        getProducts(token,website).then((data)=> setProduct(data));
        setUpdateModalShow(false);
    }

    return(
        <Modal show={updateModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>상품 수정/변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 이름</Form.Label>
                <Form.Control type="text" value={name} onChange={onChangeName}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 가격</Form.Label>
                <Form.Control
                type="text"
                value={price}
                onChange={onChangePrice}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 수량</Form.Label>
                <Form.Control
                type="text"
                value={count}
                onChange={onChangeCount}
                />
            </Form.Group>
            
            
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            취소
            </Button>
            
            <Button variant="outline-primary" onClick={handleUpdateButton}>
            상품 수정하기
            </Button>

            <Button variant="outline-danger">상품 삭제</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default UpdateProductModal;