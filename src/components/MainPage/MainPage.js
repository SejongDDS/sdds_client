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

import html from "./layout/layout";

function MainPage() {
    const [editor, setEditor] = useState(null);
    // const [assets, setAssets] = useState([]);
    let domain = ""; //도메인 입력에 사용될 변수 - 서버로 보낼때 다시 사용

    // const { pageId } = useParams();

    // const { pageStore } = useSelector((state) => state);
    // const { pages } = pageStore;

    const iframePrivacyPart = () => {
        return {
            __html: '<iframe src="./layout/product_layout.html" width="100%" height="700px"></iframe>',
        };
    };

    const LandingPage = {
        html: "",
        css: null,
    };

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
            deviceManager: deviceManager, // 좌측 상단에 기기변경 표시하는것
            //selectorManager: selectorManager,
            // assetManager: { assets: assets, upload: false },
            storageManager: storageManager, //저장 설정
            panels: panels, //상단 메뉴바 관리
            domComponents: {
                // options
            },
            // canvas: {
            //     styles: styles,
            //     scripts: ["https://code.jquery.com/jquery-3.6.1.slim.min.js"],
            // },
            i18n: { locale: "ko", messages: { ko } }, //한글 패치
            // components: "<h1>hello world. help me...</h1>", //LandingPage.html,
            // style: LandingPage.css,

            plugins: [
                gjsBlockBasic,
                // 파일 다운 설정
                (editor) =>
                    ExportFile(editor, {
                        filenamePfx: domain, //파일 이름 앞 글자
                        // filename: "temp",
                        // addExportBtn: 1,
                        // btnLabel: "zip",
                        root: {
                            css: {
                                "style1.css": (ed) => ed.getCss(),
                            },
                            "test1.html": (ed) =>
                                `<!doctype html>
                     <html lang="en">
                     <head>
                     <meta charset="utf-8">
                     <link rel="stylesheet" href="./css/style1.css">
                       
            </head>
            <body>${ed.getHtml()}<div>hi</div></body>
          </html>`,
                        },
                    }),
                gjs_navbar,
                gjs_forms,
                gjs_img_editor,
                gjs_bg_custom,
            ],
            pluginsOpts: {
                gjsBlockBasic: {},
                ExportFile: {},
                gjs_navbar: {},
                gjs_forms: {},
                gjs_img_editor: {},
                gjs_bg_custom: {},
            },
        });

        addCommands(editor, domain);

        editor.BlockManager.add("my-first-block", {
            label: "Simple block",
            content: {
                content:
                    '<script src="https://code.jquery.com/jquery-3.6.1.slim.min.js"></script><textarea name="editor1"></textarea>',
            },
        }); //스크립트 코드를 만드는 곳에 넣으려면 이걸 쓰면 됨

        editor.BlockManager.add("test-block2", {
            label: "Test block2",
            attributes: { class: "fa fa-text" },
            content: {
                script: "alert('alert 추가 테스트');",
                content:
                    '<textarea name="editor1"></textarea><script>alert("avl 시험보세요");</script>',
            },
        }); //스크립트 코드를 바로 실행하려면 이걸 쓰면 됨

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

    // alert(LandingPage.html);
    editor.setComponents(html);
    //editor.setStyle();

    //     editor.addComponents(`<div>
    //     <span data-gjs-type="custom-component" data-gjs-prop="someValue" title="foo">
    //       Hello!
    //     </span>
    //   </div>`);

    // editor.on("storage:start:load", () => {
    //     "<div><h1>안녕하세요!!</h1></div>";
    // });

    return (
        <div className="App">
            <div id="editor"></div>
        </div>
    );
}
//추가 테스트
export default MainPage;
