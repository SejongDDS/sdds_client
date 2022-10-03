import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { panels } from "./util/Panels";
import { styleManager } from "./util/StyleManager";
import { addCommands } from "./util/Commands";

function MainPage() {
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            styleManager: styleManager,
            panels: panels,
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
