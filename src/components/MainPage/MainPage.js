import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { panels } from "./util/Panels";

function MainPage() {
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            panels: panels,
            plugins: [gjsBlockBasic, grapesjsPluginExport],
            pluginsOpts: {
                gjsBlockBasic: {},
                grapesjsPluginExport: {},
            },
        });

        editor.Commands.add("export", {
            // run: (editor) => {
            //     const exportData = {
            //         html: editor.getHtml(),
            //         css: editor.getCss(),
            //     };
            //     console.log("exprotData :>> ", exportData);
            // },
            run: (editor) => editor.runCommand("gjs-export-zip"),
        });

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
