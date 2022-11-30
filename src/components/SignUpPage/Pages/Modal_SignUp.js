import React from "react";
import Modal from "react-modal";

function Modal_SignUp({ modalIsOpen, setModalIsOpen }) {
    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                        margin: "auto",
                        width: "500px",
                        height: "300px",
                    },
                    content: {
                        border: "2px solid #ddd",
                    },
                }}
            >
                <div className="signup-model">
                    <p>가입이 완료되었습니다.</p>
                    <p>잠시후 홈화면으로 돌아갑니다.</p>
                    <div className="signup-modal-button">
                        <button onClick={() => setModalIsOpen(false)}>
                            <span>확인</span>
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Modal_SignUp;
