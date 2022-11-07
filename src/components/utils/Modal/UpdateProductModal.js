import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { modifyModalDataState, modifyModalShowState } from '../../../recoil/Recoil';
import { useRecoilState } from 'recoil';

function UpdateProductModal(){
    
    const [updateModalShow,setUpdateModalShow]=useRecoilState(modifyModalShowState);
    const [updateModalData,setUpdateModalData]=useRecoilState(modifyModalDataState);

    const handleClose= () => setUpdateModalShow(false)

    return(
        <Modal show={updateModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>상품 수정/변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 이름</Form.Label>
                <Form.Control type="text" value={updateModalData.name}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 가격</Form.Label>
                <Form.Control
                type="text"
                value={updateModalData.price}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 카테고리</Form.Label>
                <Form.Control
                type="text"
                value={updateModalData.category}
                />
            </Form.Group>
            
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            취소
            </Button>
            
            <Button variant="outline-primary" onClick={handleClose}>
            상품 수정하기
            </Button>

            <Button variant="outline-danger">상품 삭제</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default UpdateProductModal;