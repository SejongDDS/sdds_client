export const addCommands = (editor) => {
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

    // 앞으로가기 버튼
    editor.Commands.add("domain", {
        run: (editor) =>
            editor.Modal.open({
                title: "도메인 설정", // string | HTMLElement
                content: "<input></input><button>확인</button>", // string | HTMLElement
            }),
    });
};
