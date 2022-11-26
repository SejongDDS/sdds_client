import grapesjs from "grapesjs";
import "../../styles/main.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import { addPages, layoutManager } from "./layout/LayoutManager";

import $ from "jquery";
import axios from "axios";

import Sidebar from "./Pages/Sidebar";
import TopNav from "./Pages/TopNav";
import PageSection from "./util/PageSection";

//grapesjs 라이브러리
import ExportFile from "grapesjs-plugin-export";
import gjsBlockBasic from "grapesjs-blocks-basic";
import gjs_navbar from "grapesjs-navbar"; //위에 네비바 가져오기
import gjs_forms from "grapesjs-plugin-forms"; //form요소들 가져오기
import gjs_img_editor from "grapesjs-tui-image-editor"; //이미지 수정 가져오기
import gjs_bg_custom from "grapesjs-style-bg";
import gjs_pj_manager from "grapesjs-project-manager";
import gjs_tail from "grapesjs-tailwind";

function MainPage() {
    const [editor, setEditor] = useState(null);

    let params = useParams();
    let page_id = params.layout_id;
    let domain = ""; //도메인 입력에 사용될 변수 - 서버로 보낼때 다시 사용

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
            // styleManager: styleManager, //스타일 관리자
            // layerManager: layerManager, // 레이어 관리자
            // traitManager: traitManager, // 컴포넌트 설정
            // deviceManager: deviceManager, // 좌측 상단에 기기변경 표시하는것
            //selectorManager: selectorManager,
            // assetManager: { assets: assets, upload: false },
            storageManager: storageManager, //저장 설정
            panels: panels, //상단 메뉴바 관리
            // domComponents: {
            //     // options
            // },
            projectData: layoutManager,
            // pageManager: true,
            // canvas: {
            //     styles: styles,
            //     scripts: ["https://code.jquery.com/jquery-3.6.1.slim.min.js"],
            // },
            i18n: { locale: "ko", messages: { ko } }, //한글 패치

            plugins: [
                gjsBlockBasic,
                // 파일 다운 설정
                (editor) => {
                    ExportFile(editor, {
                        filenamePfx: "domain", //파일 이름 앞 글자
                        // filename: "temp",
                        // addExportBtn: 1,
                        // btnLabel: "zip",
                        root: {
                            css: {
                                "style.css": (ed) => {
                                    const pageManager = ed.Pages;
                                    const somePage =
                                        pageManager.get("main-layout");
                                    const component =
                                        somePage.getMainComponent();

                                    return ed.getCss({ component });
                                },
                                "style1.css": (ed) => {
                                    const pageManager = ed.Pages;
                                    const somePage =
                                        pageManager.get("product-page");
                                    const component =
                                        somePage.getMainComponent();

                                    return ed.getCss({ component });
                                },
                            },
                            "index.html": (ed) => `<!doctype html>
                                <html lang="ko">
                                <head>
                                    <meta charset="utf-8">
                                    <link rel="stylesheet" href="./css/style.css">
                                </head>
                                ${ed.Pages.get("main-layout")
                                    .getMainComponent()
                                    .toHTML()}
                            </html>`,
                            //위 수정
                            "index1.html": (ed) => `<!doctype html>
                                <html lang="ko">
                                <head>
                                    <meta charset="utf-8">  
                                    <link rel="stylesheet" href="./css/style1.css">
                                </head>
                                ${ed.Pages.get("product-page")
                                    .getMainComponent()
                                    .toHTML()}
                            </html>`,
                        },
                    });
                },
                gjs_navbar,
                gjs_forms,
                gjs_img_editor,
                gjs_bg_custom,
                gjs_pj_manager,
                gjs_tail,
            ],
            pluginsOpts: {
                gjsBlockBasic: {},
                ExportFile: {},
                gjs_navbar: {},
                gjs_forms: {},
                gjs_img_editor: {},
                gjs_bg_custom: {},
                gjs_pj_manager: {},
                gjs_tail: {},
            },
        });

        addPages(editor, page_id);
        addCommands(editor, domain);

        if (page_id !== "0") {
            const panelManager = editor.Panels;
            panelManager.addButton("options", {
                id: "pages",
                className: "fa fa-pager",
                command: "pages",
            });
        }

        // editor.BlockManager.add("my-first-block", {
        //     label: "Simple block",
        //     content: {
        //         content:
        //             '<script src="https://code.jquery.com/jquery-3.6.1.slim.min.js"></script><textarea name="editor1"></textarea>',
        //     },
        // }); //스크립트 코드를 만드는 곳에 넣으려면 이걸 쓰면 됨

        // editor.BlockManager.add("test-block2", {
        //     label: "Test block2",
        //     attributes: { class: "fa fa-text" },
        //     content: {
        //         script: "alert('alert 추가 테스트');",
        //         content:
        //             '<textarea name="editor1"></textarea><script>alert("avl 시험보세요");</script>',
        //     },
        // }); //스크립트 코드를 바로 실행하려면 이걸 쓰면 됨

        //ajax 코드 예시
        // $.ajax({
        //     url: "",
        //     type: "post",
        //     data: { domain: domain },
        //     success: function (data) {},
        //     error: function (err) {},
        // });

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

export default MainPage;
