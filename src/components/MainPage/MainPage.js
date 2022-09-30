import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";
// import gjsBlockBasic from "grapesjs-plugin-toolbox";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import grapesjsPluginExport from 'grapesjs-plugin-export'

function MainPage() {
    const [editor, setEditor] = useState(null);
    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            plugins: [
                gjsBlockBasic,
                grapesjsPluginExport
            ],
            pluginsOpts: {
                gjsBlockBasic: {},
                grapesjsPluginExport: {},
            },
        });
        setEditor(editor);
    }, []);

    return (
        <div className="Main">
            <div id="editor"></div>
        </div>
    );
}


export default MainPage;
