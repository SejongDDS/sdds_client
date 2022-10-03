export const addCommands = (editor) => {
    // 뒤로가기 버튼
    editor.Commands.add("undo", {
        run: (editor) => editor.UndoManager.undo(),
    });

    // 앞으로가기 버튼
    editor.Commands.add("redo", {
        run: (editor) => editor.UndoManager.redo(),
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
};
