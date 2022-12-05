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

        // 설정 추가 예시
        editor.DomComponents.addType("button", {
            isComponent: (el) => el.tagName == "BUTTON",
            model: {
                defaults: {
                    traits: [
                        // Strings are automatically converted to text types
                        "name", // Same as: { type: 'text', name: 'name' }
                        "placeholder",
                        {
                            type: "select", // Type of the trait
                            label: "클릭시", // The label you will see in Settings
                            name: "onclick", // The name of the attribute/property to use on component
                            options: [
                                { id: "text", name: "홈 화면" },
                                { id: "email", name: "상세 화면" },
                                { id: "password", name: "주문 화면" },
                                { id: "test()", name: "로그인 화면" },
                            ],
                        },
                        {
                            type: "checkbox",
                            name: "required",
                        },
                        {
                            type: "button",
                            // ...
                            text: "Click me",
                            full: true, // Full width button
                            command: (editor) => alert("Hello"),
                            // or you can just specify the Command ID
                            command: "some-command",
                        },
                    ],
                    // As by default, traits are binded to attributes, so to define
                    // their initial value we can use attributes
                    attributes: { type: "text", required: true },
                },
            },
        });

        // const cmp = editor.DomComponents;
        // const eded = cmp.getWrapper().find("products-container")[0];
        // const test = eded.get("components");
        // test.removable = false;

        // const component = editor.DomComponents.getWrapper().find(
        //     ".products-container"
        // )[0];
        // component.set({ removable: false });

        // component.components(`<div>Add some content inside</div>`);

        // editor.TraitManager.addType("href-next", {
        //     // Expects as return a simple HTML string or an HTML element
        //     createInput({ trait }) {
        //         // Here we can decide to use properties from the trait
        //         const traitOpts = trait.get("options") || [];
        //         const options = traitOpts.length
        //             ? traitOpts
        //             : [
        //                   { id: "url", name: "URL" },
        //                   { id: "email", name: "Email" },
        //               ];

        //         // Create a new element container and add some content
        //         const el = document.createElement("div");
        //         el.innerHTML = `
        //         <select class="href-next__type">
        //           ${options
        //               .map(
        //                   (opt) =>
        //                       `<option value="${opt.id}">${opt.name}</option>`
        //               )
        //               .join("")}
        //         </select>
        //         <div class="href-next__url-inputs">
        //           <input class="href-next__url" placeholder="Insert URL"/>
        //         </div>
        //         <div class="href-next__email-inputs">
        //           <input class="href-next__email" placeholder="Insert email"/>
        //           <input class="href-next__email-subject" placeholder="Insert subject"/>
        //         </div>
        //       `;

        //         // Let's make our content interactive
        //         const inputsUrl = el.querySelector(".href-next__url-inputs");
        //         const inputsEmail = el.querySelector(
        //             ".href-next__email-inputs"
        //         );
        //         const inputType = el.querySelector(".href-next__type");
        //         inputType.addEventListener("change", (ev) => {
        //             switch (ev.target.value) {
        //                 case "url":
        //                     inputsUrl.style.display = "";
        //                     inputsEmail.style.display = "none";
        //                     break;
        //                 case "email":
        //                     inputsUrl.style.display = "none";
        //                     inputsEmail.style.display = "";
        //                     break;
        //             }
        //         });

        //         return el;
        //     },
        // });

        // editor.DomComponents.addType("link", {
        //     model: {
        //         defaults: {
        //             traits: [
        //                 {
        //                     type: "href-next",
        //                     name: "href",
        //                     label: "New href",
        //                 },
        //             ],
        //         },
        //     },
        // });

        //domain 입력 변수 설정
        const title = document.createElement("b");
        title.className = "domain_title";
        title.innerHTML = "도메인 설정";

        const domainModal_container = document.createElement("div");

        const content = document.createElement("input");
        content.className = "domain-input";
        content.value = domain;
        content.focus = true;
        content.size = 50;
        content.placeholder = "도메인에 들어갈 단어를 입력해주세요.";

        const btn = document.createElement("button");
        btn.className = "domain-btn";
        btn.type = "button";
        btn.setAttribute("data-close-modal", "");

        const span = document.createElement("span");
        span.innerHTML = "적용";

        btn.appendChild(span);
        domainModal_container.appendChild(content);
        domainModal_container.appendChild(btn);

        editor.Commands.add("domain", {
            run: (editor, domain) => {
                editor.Modal.open({
                    title: title,
                    content: domainModal_container,
                    attributes: {
                        class: "pannel-domain-modal",
                    },
                });
                editor.Modal.onceClose(() => {
                    domain = content.value;

                    addCommands(editor, domain, page_id, token);

                    //아래 코드 수정 #########################

                    // console.log(domain);
                    if (domain === "") {
                        alert("도메인을 입력해주세요!");

                        editor.Modal.open({
                            title: title,
                            content: domainModal_container,
                            attributes: {
                                class: "pannel-domain-modal",
                            },
                        });
                    } else {
                        // 이거 테스트할 필요가 있음 -- 중복 테스트하는 코드
                        axios
                            .get(
                                "https://sddsapi.paas-ta.org/api/v1/website/check/" +
                                    domain,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            )
                            .then((res) => {
                                if (res.data === true) {
                                    alert(
                                        "이미 존재하는 도메인입니다.\n새로운 도메인을 입력해주세요."
                                    );

                                    // 다시 모달 오픈
                                    editor.Modal.open({
                                        title: title,
                                        content: domainModal_container,
                                        attributes: {
                                            class: "pannel-domain-modal",
                                        },
                                    });
                                } else {
                                    addCommands(editor, domain, page_id, token);
                                }
                            })
                            .catch((err) => console.log(err));
                    }
                });
            },
        });

        //페이지 2개로 설정
        addPages(editor, page_id);

        if (page_id !== "0") {
            const panelManager = editor.Panels;
            panelManager.addButton("options", {
                id: "pages",
                className: "fa fa-pager",
                command: "pages",
                attributes: { title: "다른 페이지 보기" },
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

        setEditor(editor);
    }, []);

    return (
        <div className="App">
            <div className="side_page"></div>
            <div className="main-content">
                <div id="editor"></div>
            </div>
        </div>
    );
}

export default MainPage;
