import "./Login.scss";
import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import logo from "../../resources/imgs/logo.png";
import Button from "../utils/Button";
import { useSetRecoilState } from "recoil";
import { tokenState } from "../../recoil/Recoil";
import axios from "axios";

//access_token을 recoil로 저장해야 함

function LoginMain() {
    const [state, setState] = useState({
        login_id: "",
        password: "",
    });

    const setToken = useSetRecoilState(tokenState);

    // console.log(token);

    return (
        <div className="login_page">
            <div
                className="logo"
                onClick={(e) => {
                    window.location.href = "/";
                }}
            >
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

            <div className="btn-login">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();

                        //로그인 post 전송
                        axios({
                            method: "post",
                            url: "http://52.231.107.168:3000/api/v1/login",
                            data: {
                                login_id: state.login_id,
                                password: state.password,
                            },
                        })
                            .then((res) => {
                                console.log(res);
                                if (res.data.statusCode === 200) {
                                    // access_token포함 계정 정보 리코일 저장]
                                    setToken(res.data.access_token);

                                    // 홈 화면으로 이동 (성공 신호 넘어오면 )
                                    window.location.href = "/";
                                } else {
                                    //이거 아디 비번 아래에 글자 뜨는걸로 변경??
                                    window.alert(
                                        "아이디 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요."
                                    );
                                }
                            })
                            .catch(function (error) {
                                //오류 로그 출력
                                console.log(error);
                            });
                    }}
                >
                    <span>로그인</span>
                </button>
            </div>

            <div className="btn-signup">
                <button
                    type="button"
                    onClick={(e) => {
                        window.location.href = "/signup";
                    }}
                >
                    <span>회원가입</span>
                </button>
            </div>
        </div>
    );
}
export default LoginMain;
