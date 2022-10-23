import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import grapesjsPluginExport from "grapesjs-plugin-export";
import { panels } from "./util/Panels";
import {
    styleManager,
    layerManager,
    traitManager,
    selectorManager,
    deviceManager,
    storageManager,
} from "./util/Managers";
import { addCommands } from "./util/Commands";
import { scripts, styles } from "./util/Canvas";
import ko from "./lang/korean";

import $ from "jquery";

import Sidebar from "./Pages/Sidebar";
import TopNav from "./Pages/TopNav";
import PageSection from "./util/PageSection";

// html에 스크립트 들어가는거 확인
// 그래프ql -> rest로 바꿔달라고?, 리코일
// 플러그인 - 페이지

function MainPage() {
    const [editor, setEditor] = useState(null);
    // const [assets, setAssets] = useState([]);
    let domain = ""; //도메인 입력에 사용될 변수

    // const { pageId } = useParams();

    // const { pageStore } = useSelector((state) => state);
    // const { pages } = pageStore;

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
            deviceManager: deviceManager,
            selectorManager: selectorManager,
            // assetManager: { assets: assets, upload: false },
            storageManager: storageManager, //저장 설정
            panels: panels, //상단 메뉴바 관리
            canvas: {
                styles: styles,
                scripts: ["https://code.jquery.com/jquery-3.6.1.slim.min.js"],
            },
            i18n: { messages: { ko } }, //한글 패치
            plugins: [gjsBlockBasic, grapesjsPluginExport],
            pluginsOpts: {
                gjsBlockBasic: {},
                grapesjsPluginExport: {},
            },
        });

        addCommands(editor, domain);

        // editor.on("run:preview", () => {
        //     console.log("It will trigger when we click on preview icon");
        //     // This will be used to hide border
        //     editor.stopCommand("sw-visibility");
        //     // This will hide the sidebar view
        //     navbar.removeClass("sidebar");
        //     // This will make the main-content to be full width
        //     mainContent.removeClass("main-content");

        //     // This will hide top panel where we have added the button
        //     panelTopBar.addClass("d-none");
        // });

        // editor.on("stop:preview", () => {
        //     // This event is reverse of the above event.
        //     console.log("It will trigger when we click on cancel preview icon");
        //     editor.runCommand("sw-visibility");
        //     navbar.addClass("sidebar");
        //     mainContent.addClass("main-content");
        //     panelTopBar.removeClass("d-none");
        // });

        // editor.on("component:selected", (component) => {
        //     const newTool = {
        //         icon: "fa fa-plus-square",
        //         title: "Check Toolbar",
        //         commandName: "new-tool-cmd",
        //         id: "new-tool",
        //     };

        //     const defaultToolbar = component.get("toolbar");
        //     const checkAlreadyExist = defaultToolbar.find(
        //         (toolbar) => toolbar.command === newTool.commandName
        //     );
        //     if (!checkAlreadyExist) {
        //         defaultToolbar.unshift({
        //             id: newTool.id,
        //             attributes: { class: newTool.icon, title: newTool.title },
        //             command: newTool.commandName,
        //         });
        //         component.set("toolbar", defaultToolbar);
        //     }
        // });

        // editor.BlockManager.add("my-first-block", {
        //     label: "Simple block",
        //     content:
        //         '<div><script src="https://code.jquery.com/jquery-3.6.1.slim.min.js"></script></div>',
        // }); //이거 안먹음

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
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h3 logo">SDDS_</span>
                    </div>
                </nav>
                {/* <PageSection pages={pages} /> */}
                <Sidebar />
            </div>
            {/* 여기까지가 사이드 바 */}
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
