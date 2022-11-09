import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewProductModal(props){
    

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
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 가격</Form.Label>
                <Form.Control
                type="text"
                placeholder="상품 가격"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 카테고리</Form.Label>
                <Form.Control
                type="text"
                placeholder="카테고리"
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 사진</Form.Label>
                <Form.Control
                type="file"

                />
            </Form.Group>
            
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
            취소
            </Button>
            <Button variant="primary" onClick={props.onHide}>
            상품추가하기
            </Button>
        </Modal.Footer>
        </Modal>
    )
}

export default NewProductModal;
