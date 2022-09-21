import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import Modal_SignUp from "./Modal_SignUp";
import "./SignUpMain.scss";

import logo from "../../../resources/imgs/logo.png";

const SIGNUP_MUTATION = gql`
    mutation (
        $login_id: String!
        $password: String!
        $phone_number: String!
        $email: String!
    ) {
        signUp(
            createUserInput: {
                login_id: $login_id
                password: $password
                phone_number: $phone_number
                email: $email
            }
        ) {
            error
            statusCode
            ok
        }
    }
`;

function SighUpMain() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [SighUpMutation, { data }] = useMutation(SIGNUP_MUTATION, {
        onSuccess: () => {
            console.log("onSuccess");
        },
        onError: () => {
            console.log("onError");
        },
        onCompleted: () => {
            console.log("clear~");
        },
    });

    const [state, setState] = useState({
        login_id: "",
        password: "",
        phone_number: "",
        email: "",
    });

    return (
        <div className="signup_page">
            {/*가입 완료시 띄울 모달창 */}
            <Modal_SignUp
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />

            <div className="logo">
                <img src={logo} className="header-logo" alt="React" />
            </div>

            <div className="text_input">
                <label htmlFor="login_id">아이디</label>
                <input
                    className="input-blank"
                    value={state.login_id}
                    onChange={(e) =>
                        setState({ ...state, login_id: e.target.value })
                    }
                    type="text"
                />
            </div>

            <div className="text_input">
                <label htmlFor="password">비밀번호</label>
                <input
                    className="input-blank"
                    value={state.password}
                    onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                    }
                    type="password"
                />
            </div>

            <div className="text_input">
                <label htmlFor="pw_check">비밀번호 확인</label>
                <input className="input-blank" type="password" />
            </div>

            <div className="text_input">
                <label htmlFor="name">이메일</label>
                <input
                    className="input-blank"
                    type="email"
                    value={state.email}
                    onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                    }
                    placeholder="example@gmail.com"
                />
            </div>

            <div className="text_input">
                <label htmlFor="phone_number">휴대폰 번호</label>
                <input
                    className="input-blank"
                    type="tel"
                    value={state.phone_number}
                    onChange={(e) =>
                        setState({ ...state, phone_number: e.target.value })
                    }
                    placeholder="010-0000-0000"
                />
            </div>

            <div className="list_submit">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        SighUpMutation({
                            variables: {
                                login_id: state.login_id,
                                password: state.password,
                                phone_number: state.phone_number,
                                email: state.email,
                            },
                        });

                        // 가입 후 완료 모달 띄우기
                        setModalIsOpen(true);
                    }}
                >
                    <span>가입하기</span>
                </button>
            </div>
        </div>
    );
}

export default SighUpMain;
