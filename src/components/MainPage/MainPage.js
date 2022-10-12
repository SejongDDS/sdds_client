import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { panels } from "./util/Panels";
import {
    styleManager,
    layerManager,
    traitManager,
    selectorManager,
} from "./util/Managers";
import { addCommands } from "./util/Commands";
import { storageManager } from "./util/StorageManager";
import ko from "./lang/korean";

import $ from "jquery";

import Sidebar from "./Pages/Sidebar";
import TopNav from "./Pages/TopNav";

function MainPage() {
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        $(".panel__devices").html("");
        $(".panel__basic-actions").html("");
        $(".panel__editor").html("");
        $("#blocks").html("");
        $("#styles-container").html("");
        $("#layers-container").html("");
        $("#trait-container").html("");

        const navbar = $("#navbar");
        const mainContent = $("#main-content");
        const panelTopBar = $("#main-content > .navbar-light");

        const editor = grapesjs.init({
            container: "#editor",
            styleManager: styleManager, //스타일 관리자
            layerManager: layerManager,
            traitManager: traitManager,
            selectorManager: selectorManager,
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
        editor.on("run:preview", () => {
            console.log("It will trigger when we click on preview icon");
            // This will be used to hide border
            editor.stopCommand("sw-visibility");
            // This will hide the sidebar view
            navbar.removeClass("sidebar");
            // This will make the main-content to be full width
            mainContent.removeClass("main-content");

            // This will hide top panel where we have added the button
            panelTopBar.addClass("d-none");
        });
        editor.on("stop:preview", () => {
            // This event is reverse of the above event.
            console.log("It will trigger when we click on cancel preview icon");
            editor.runCommand("sw-visibility");
            navbar.addClass("sidebar");
            mainContent.addClass("main-content");
            panelTopBar.removeClass("d-none");
        });
        editor.on("component:selected", (component) => {
            const newTool = {
                icon: "fa fa-plus-square",
                title: "Check Toolbar",
                commandName: "new-tool-cmd",
                id: "new-tool",
            };

            const defaultToolbar = component.get("toolbar");
            const checkAlreadyExist = defaultToolbar.find(
                (toolbar) => toolbar.command === newTool.commandName
            );
            if (!checkAlreadyExist) {
                defaultToolbar.unshift({
                    id: newTool.id,
                    attributes: { class: newTool.icon, title: newTool.title },
                    command: newTool.commandName,
                });
                component.set("toolbar", defaultToolbar);
            }
        });

        setTimeout(() => {
            let categories = editor.BlockManager.getCategories();
            categories.each((category) => category.set("open", false));
        }, 1000);

        setEditor(editor);
    }, []);

    return (
        <div className="App">
            <div
                id="navbar"
                className="sidenav d-flex flex-column overflow-scroll position-fixed"
            >
                //상단 바
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h3 logo">SDDS_</span>
                    </div>
                </nav>
                {/* <PageSection pages={pages} /> */}
                <Sidebar />
            </div>
            <div
                className="main-content position-relative w-85 start-15"
                id="main-content"
            >
                <TopNav />
                <div id="editor"></div>
            </div>
        </div>
    );
}
//추가 테스트
export default MainPage;
