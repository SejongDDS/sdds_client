import "../styles/web_builder.scss";

//명령들 한번에 묶어서 추가하는 함수
export const addCommands = (editor, domain) => {
    editor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("Mobile"),
    });
    // 다운로드 버튼
    editor.Commands.add("export", {
        run: (editor) => editor.runCommand("gjs-export-zip"),
        // run: (editor) => {
        //     const exportData = {
        //         html: editor.getHtml(),
        //         css: editor.getCss(),
        //     };
        //     console.log("exprotData :>> ", exportData);
        // },
        // 위 코드는 텍스트로 html, css 받는 코드
    });

    // 뒤로가기 버튼
    editor.Commands.add("undo", {
        run: (editor) => editor.UndoManager.undo(),
    });

    // 앞으로가기 버튼
    editor.Commands.add("redo", {
        run: (editor) => editor.UndoManager.redo(),
    });

    //domain 입력 변수 설정
    const title = document.createElement("b");
    title.innerHTML = "도메인 설정";

    const content = document.createElement("input");
    content.value = domain;
    content.focus = true;
    content.size = 40;
    content.placeholder = "도메인에 들어갈 단어를 입력해주세요.";

    content.style.margin = "20px";
    content.style.backgroundColor = "#2D2D2D";
    content.style.border = "#222222 1px solid";
    content.style.color = "#ffffff";
    content.style.height = "30px";

    // const content1 = document.createElement("b");
    // content1.innerHTML = "확인";

    // //이거 합쳐지는거 안되는거 해결 방안?? or 버튼 빼버리기
    // content.insertAdjacentElement("beforebegin", content1);

    // console.log(content);
    // 앞으로가기 버튼
    editor.Commands.add("domain", {
        run: (editor) =>
            //변경 필요: 여기 값을 props로 전달 받아서 콘텐츠에 나오게
            editor.Modal.open({
                title: title,
                content: content,
                attributes: {
                    class: "pannel-domain-modal",
                },
            }),
    });
};
