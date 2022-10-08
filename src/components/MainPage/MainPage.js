import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { panels } from "./util/Panels";
import { styleManager } from "./util/StyleManager";
import { addCommands } from "./util/Commands";
import { storageManager } from "./util/StorageManager";
import ko from "./lang/korean";

function MainPage() {
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            styleManager: styleManager, //스타일 관리자
            storageManager: storageManager, //저장 설정
            panels: panels, //상단 메뉴바 관리
            i18n: { messages: { ko } }, //한글 패치
            plugins: [gjsBlockBasic, grapesjsPluginExport],
            pluginsOpts: {
                gjsBlockBasic: {},
                grapesjsPluginExport: {},
            },
        });

        addCommands(editor);

        setEditor(editor);
    }, []);

    return (
        <div className="Main">
            <div id="editor"></div>
        </div>
    );
}
//추가 테스트
export default MainPage;
