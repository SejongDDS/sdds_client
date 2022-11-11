import React from "react";
import Button from "../../utils/Button";
import "./Start.css";

function Start() {
    return (
        <div className="start__container">
            <h1>
                직접 사용해 보는 것 만큼 좋은 방법은 없습니다.
                <br />
                무료로 이용해보세요!
            </h1>
            <Button
                buttonStyle="btn--pink"
                buttonSize="btn--large"
                name="무료로 시작하기"
                onClick={() => {
                    window.location.href = "/layout";
                }}
            ></Button>
        </div>
    );
}

export default Start;
