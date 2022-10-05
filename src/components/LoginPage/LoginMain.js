import "./Login.scss";
import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import logo from "../../resources/imgs/logo.png";
import Button from "../utils/Button";


const Login_Mutation = gql`
    mutation ($login_id: String!, $password: String!) {
        login(LoginInput: { login_id: $login_id, password: $password }) {
            error
            statusCode
            ok
            access_token
            refresh_token
        }
    }
`;

function LoginMain() {
    const [Login_mutation, { data }] = useMutation(Login_Mutation);
    const [state, setState] = useState({
        login_id: "",
        password: "",
    });

    return (
        <div className="login_page">
            <div className="logo">
            <img src={logo} className="header-logo" alt="React" />
            </div>

            <div className="text_input">
                <label for="login_id">아이디</label>
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
                <label for="password">비밀번호</label>
                <input
                    className="input-blank"
                    value={state.password}
                    onChange={(e) =>
                        setState({ ...state, password: e.target.value })
                    }
                    type="password"
                />
            </div>

            <div className="logn_button">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        Login_mutation({
                            variables: {
                                login_id: state.login_id,
                                password: state.password,
                            },
                        });
                    }}
                >
                <span>로그인</span>
                </button>
            </div>
            <Button
                    className="nav_btn"
                    buttonStyle="btn--white"
                    buttonSize="btn--medium"
                    name="회원가입"
                    onClick={() => {
                        window.location.href = "/signup";
                    }}
                >
                    회원가입
                </Button>
        </div>
    );
}
export default LoginMain;
