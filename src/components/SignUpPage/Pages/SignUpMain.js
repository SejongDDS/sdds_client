import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";

import Modal_SignUp from "./Modal_SignUp";
import "./SignUpMain.scss";

import axios from "axios";
import { useRecoilState } from "recoil";

import logo from "../../../resources/imgs/logo.png";

function SighUpMain() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

            <div className="list_submit">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();

                        axios({
                            method: "post",
                            url: "http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000/api/v1/user/sign-up",
                            data: {
                                login_id: state.login_id,
                                password: state.password,
                                phone_number: state.phone_number,
                                email: state.email,
                            },
                        })
                            .then(function (res) {
                                //회원가입 후 받은 로그 출력
                                console.log(res);

                                // 회원가입 완료 안내 페이지로 이동
                                // window.location.href = "../";

                                // 가입 후 완료 모달 띄우기
                                setModalIsOpen(true);
                            })
                            .catch(function (error) {
                                //오류 로그 출력
                                console.log(error);

                                //오류 모달 표시
                                // -- 빈칸에 뭘 표시할 수  있?

                                //202(정보가 이미 존재하면) - 그 정보 표시
                            });
                    }}
                >
                    <span>가입하기</span>
                </button>
            </div>
        </div>
    );
}

export default SighUpMain;
