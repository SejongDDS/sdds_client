import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRecoilState } from 'recoil';
import { modifyModalDataState, modifyModalShowState } from '../../../recoil/Recoil';

function UpdateOrderModal(){
    const [updateModalShow,setUpdateModalShow]=useRecoilState(modifyModalShowState);
    const [updateModalData,setUpdateModalData]=useRecoilState(modifyModalDataState);

    const handleClose= () => setUpdateModalShow(false)

    return(
        <Modal show={updateModalShow} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>주문 수정/변경</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>주문 아이디</Form.Label>
                <Form.Control 
                type="text"
                value={updateModalData.id}
                readOnly="true"
                ></Form.Control>
                
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>상품 이름</Form.Label>
                <Form.Control 
                type="text"
                value={updateModalData.product}
                readOnly="true"
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>구매자</Form.Label>
                <Form.Control 
                type="text"
                value={updateModalData.buyer}
                readOnly="true"
                ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>주문상태</Form.Label>
                <Form.Control type="text" value={updateModalData.order_status}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>주소</Form.Label>
                <Form.Control
                type="text"
                value={updateModalData.address}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>주문 날짜</Form.Label>
                <Form.Control 
                type="text"
                value={updateModalData.date}
                readOnly="true"
                ></Form.Control>
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

            <Button variant="outline-danger">주문 삭제</Button>
        </Modal.Footer>
        </Modal>
    )
}

export default UpdateOrderModal;