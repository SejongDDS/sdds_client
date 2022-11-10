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
import axios from "axios";

import Sidebar from "./Pages/Sidebar";
import TopNav from "./Pages/TopNav";
import PageSection from "./util/PageSection";

import gjs_navbar from "grapesjs-navbar"; //위에 네비바 가져오기
import gjs_forms from "grapesjs-plugin-forms"; //form요소들 가져오기
import gjs_img_editor from "grapesjs-tui-image-editor"; //이미지 수정 가져오기
import gjs_bg_custom from "grapesjs-style-bg";

// html에 스크립트 들어가는거 확인
// 플러그인 - 페이지

function MainPage() {
    const [editor, setEditor] = useState(null);
    // const [assets, setAssets] = useState([]);
    let domain = ""; //도메인 입력에 사용될 변수

    // const { pageId } = useParams();

    // const { pageStore } = useSelector((state) => state);
    // const { pages } = pageStore;

    //ajax 코드 예시
    // $.ajax({
    //     url: "",
    //     type: "post",
    //     data: { domain: domain },
    //     success: function (data) {},
    //     error: function (err) {},
    // });

    useEffect(() => {
        // $(".panel__devices").html("");
        // $(".panel__basic-actions").html("");
        // $(".panel__editor").html("");
        // $("#blocks").html("");
        // $("#styles-container").html("");
        // $("#layers-container").html("");
        // $("#trait-container").html("");

        // const navbar = $("#navbar");
        // const mainContent = $("#main-content");
        // const panelTopBar = $("#main-content > .navbar-light");

        const editor = grapesjs.init({
            container: "#editor",
            allowScripts: 1,
            fromElement: true,
            styleManager: styleManager, //스타일 관리자
            // layerManager: layerManager, // 레이어 관리자
            // traitManager: traitManager, // 컴포넌트 설정
            deviceManager: deviceManager, // 좌측 상단에 기기변경 표시하는것
            //selectorManager: selectorManager,
            // assetManager: { assets: assets, upload: false },
            storageManager: storageManager, //저장 설정
            panels: panels, //상단 메뉴바 관리
            // canvas: {
            //     styles: styles,
            //     scripts: ["https://code.jquery.com/jquery-3.6.1.slim.min.js"],
            // },
            i18n: { locale: "ko", messages: { ko } }, //한글 패치
            plugins: [
                gjsBlockBasic,
                grapesjsPluginExport,
                gjs_navbar,
                gjs_forms,
                gjs_img_editor,
                gjs_bg_custom,
                "grapesjs-component-code-editor",
            ],
            pluginsOpts: {
                gjsBlockBasic: {},
                grapesjsPluginExport: {},
                gjs_navbar: {},
                gjs_forms: {},
                gjs_img_editor: {},
                gjs_bg_custom: {},
                "grapesjs-component-code-editor": {},
            },
        });

        addCommands(editor, domain);

        editor.BlockManager.add("my-first-block", {
            label: "Simple block",
            content: {
                content:
                    '<script src="https://code.jquery.com/jquery-3.6.1.slim.min.js"></script><textarea name="editor1"></textarea>',
            },
        }); //이거 안먹음

        editor.BlockManager.add("test-block2", {
            label: "Test block2",
            attributes: { class: "fa fa-text" },
            content: {
                script: "alert('avl 시험보세요');",
                content:
                    '<textarea name="editor1"></textarea><script>alert("avl 시험보세요");</script>',
            },
        });

        setTimeout(() => {
            let categories = editor.BlockManager.getCategories();
            categories.each((category) => category.set("open", false));
        }, 1000);

        setEditor(editor);
    }, []);

    return (
        <div className="App">
            <div id="editor"></div>
        </div>
    );
}
//추가 테스트
export default MainPage;
