import React from "react";
// import Button from "../../utils/Button";
import "./Start.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Start() {
    const navigate = useNavigate();
    navigate("/");
    return (
        <div className="start__container">
            <h1>
                직접 사용해 보는 것 만큼 좋은 방법은 없습니다.
                <br />
                무료로 이용해보세요!
            </h1>

            <button
                type="button"
                class="btn btn-outline-secondary btn-lg btn-block"
                onClick={() => {
                    navigate("/layout");
                }}
            >
                무료로 시작하기
            </button>
            {/* <Button
                buttonStyle="btn--pink"
                buttonSize="btn--large"
                name="무료로 시작하기"
                onClick={() => {
                    window.location.href = "/layout";
                }}
            ></Button> */}
        </div>
    );
}

export default Start;
