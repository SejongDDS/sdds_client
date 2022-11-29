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
import { useRecoilValue } from "recoil";
import { tokenState } from "../../recoil/Recoil";

function MainPage() {
    const [editor, setEditor] = useState(null);
    const token = useRecoilValue(tokenState);

    let params = useParams();
    let page_id = params.layout_id;
    let domain = ""; //도메인 입력에 사용될 변수

    useEffect(() => {
        const editor = grapesjs.init({
            container: "#editor",
            allowScripts: 1,
            fromElement: true,
            // styleManager: styleManager, //스타일 관리자
            // layerManager: layerManager, // 레이어 관리자
            // traitManager: traitManager, // 컴포넌트 설정
            // deviceManager: deviceManager, // 좌측 상단에 기기변경 표시하는것
            // selectorManager: selectorManager,
            // assetManager: { assets: assets, upload: false },
            // storageManager: storageManager, //저장 설정
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
                // ExportFile,
                // 파일 다운 설정
                (editor) => {
                    ExportFile(editor, {
                        filenamePfx: "downloadCode", //파일 이름 앞 글자
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

                                    sessionStorage.setItem(
                                        "style",
                                        ed.getCss({ component })
                                    );
                                    // console.log(
                                    //     "<Main> : " +
                                    //         sessionStorage.getItem("style")
                                    // );
                                    return ed.getCss({ component });
                                },
                                "style2.css": (ed) => {
                                    const pageManager = ed.Pages;
                                    const somePage =
                                        pageManager.get("product-page");
                                    const component =
                                        somePage.getMainComponent();

                                    sessionStorage.setItem(
                                        "style2",
                                        ed.getCss({ component })
                                    );
                                    // console.log(
                                    //     "<Main> : " +
                                    //         sessionStorage.getItem("style2")
                                    // );

                                    return ed.getCss({ component });
                                },
                            },
                            "index.html": (ed) => {
                                let code = `<!doctype html>
                            <html lang="ko">
                            <head>
                                <meta charset="utf-8">
                                <link rel="stylesheet" href="./css/style.css">
                            </head>
                            ${ed.Pages.get("main-layout")
                                .getMainComponent()
                                .toHTML()}
                            </html>`;

                                // sessionStorage.setItem("html", code);
                                // console.log(sessionStorage.getItem("html"));

                                return code;
                            },
                            //위 수정
                            "index2.html": (ed) => {
                                let code = `<!doctype html>
                                <html lang="ko">
                                <head>
                                    <meta charset="utf-8">
                                    <link rel="stylesheet" href="./css/style2.css">
                                </head>
                                ${ed.Pages.get("product-page")
                                    .getMainComponent()
                                    .toHTML()}
                                </html>`;

                                // sessionStorage.setItem("html2", code);
                                // console.log(sessionStorage.getItem("html2"));

                                return code;
                            },
                        },
                    });
                },
                gjs_navbar,
                gjs_forms,
                gjs_img_editor,
                gjs_pj_manager,
                //gjs_tail,
            ],
            pluginsOpts: {
                gjsBlockBasic: {},
                ExportFile: {},
                gjs_navbar: {},
                gjs_forms: {},
                gjs_img_editor: {},
                gjs_pj_manager: {},
            },
        });

        //domain 입력 변수 설정
        const title = document.createElement("b");
        title.innerHTML = "도메인 설정";

        const content = document.createElement("input");
        content.id = "domain_value";
        content.value = domain;
        content.focus = true;
        content.size = 40;
        content.placeholder = "도메인에 들어갈 단어를 입력해주세요.";

        content.style.margin = "20px";
        content.style.backgroundColor = "#2D2D2D";
        content.style.border = "#222222 1px solid";
        content.style.color = "#ffffff";
        content.style.height = "30px";

        //페이지 2개로 변경
        addPages(editor, page_id);

        editor.Commands.add("domain", {
            run: (editor, domain) => {
                editor.Modal.open({
                    title: title,
                    content: content,
                    attributes: {
                        class: "pannel-domain-modal",
                    },
                });
                editor.Modal.onceClose(() => {
                    domain = content.value;
                    addCommands(editor, domain, page_id, token);
                });
            },
        });

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

        // setTimeout(() => {
        //     let categories = editor.BlockManager.getCategories();
        //     categories.each((category) => category.set("open", false));
        // }, 1000);

        setEditor(editor);
    }, []);

    return (
        <div className="App">
            <div id="editor"></div>
        </div>
    );
}

export default MainPage;
