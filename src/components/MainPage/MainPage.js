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
    let page_count = ""; //페이지 수(레이아웃의 경우 자동 3, 포트폴리오는 처음에 입력받음)
    let domain = ""; //도메인 입력에 사용될 변수

    if (page_id !== "0") {
        page_count = 3;
    }

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
                                    if (page_id === "0") {
                                        const somePage =
                                            pageManager.get("page-1");
                                        const component =
                                            somePage.getMainComponent();
                                        sessionStorage.setItem(
                                            "style",
                                            ed.getCss({ component })
                                        );
                                        return ed.getCss({ component });
                                    } else {
                                        const somePage =
                                            pageManager.get("layout-page-1");
                                        const component =
                                            somePage.getMainComponent();
                                        sessionStorage.setItem(
                                            "style",
                                            ed.getCss({ component })
                                        );
                                        return ed.getCss({ component });
                                    }
                                    // console.log(
                                    //     "<Main> : " +
                                    //         sessionStorage.getItem("style")
                                    // );
                                },
                                "style2.css": (ed) => {
                                    const pageManager = ed.Pages;
                                    for (let i = 2; i <= page_count; i++) {
                                        console.log(i);
                                        if (page_id === "0") {
                                            const somePage = pageManager.get(
                                                "page-" + i
                                            );
                                            const component =
                                                somePage.getMainComponent();
                                            sessionStorage.setItem(
                                                "style" + i,
                                                ed.getCss({ component })
                                            );
                                        } else {
                                            const somePage = pageManager.get(
                                                "layout-page-" + i
                                            );
                                            const component =
                                                somePage.getMainComponent();
                                            sessionStorage.setItem(
                                                "style" + i,
                                                ed.getCss({ component })
                                            );
                                        }
                                    }

                                    // const somePage = pageManager.get("page-2");
                                    // const component =
                                    //     somePage.getMainComponent();

                                    // sessionStorage.setItem(
                                    //     "style2",
                                    //     ed.getCss({ component })
                                    // );
                                    // // console.log(
                                    //     "<Main> : " +
                                    //         sessionStorage.getItem("style2")
                                    // );

                                    //리턴 없이 해도 되는지?? ##########
                                    // return ed.getCss({ component });
                                },
                            },
                            "index.html": (ed) => {
                                if (page_id === "0") {
                                    let code = `<!doctype html>
                                <html lang="ko">
                                <head>
                                    <meta charset="utf-8">
                                    <link rel="stylesheet" href="./css/style.css">
                                </head>
                                ${ed.Pages.get("page-1")
                                    .getMainComponent()
                                    .toHTML()}
                                </html>`;
                                    return code;
                                }

                                // sessionStorage.setItem("html", code);
                                // console.log(sessionStorage.getItem("html"));
                            },
                            //위 수정
                            "index2.html": (ed) => {
                                if (page_id === "0") {
                                    let code = `<!doctype html>
                                    <html lang="ko">
                                    <head>
                                        <meta charset="utf-8">
                                        <link rel="stylesheet" href="./css/style2.css">
                                    </head>
                                    ${ed.Pages.get("page-2")
                                        .getMainComponent()
                                        .toHTML()}
                                    </html>`;

                                    // sessionStorage.setItem("html2", code);
                                    // console.log(sessionStorage.getItem("html2"));

                                    return code;
                                }
                            },
                        },
                    });
                },
                gjs_navbar,
                gjs_forms,
                gjs_img_editor,
                gjs_pj_manager,
                gjs_tail,
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
            //isComponent: (el) => el.tagName == "11",
            model: {
                defaults: {
                    traits: [
                        // Strings are automatically converted to text types
                        //"name", // Same as:
                        { type: "text", name: "버튼 이름" },
                        //"placeholder",
                        {
                            type: "select", // Type of the trait
                            label: "클릭시", // The label you will see in Settings
                            name: "onclick", // The name of the attribute/property to use on component
                            options: [
                                {
                                    id: "location.href='./index.html'",
                                    name: "페이지 1으로 이동",
                                },
                                {
                                    id: "location.href='./index2.html'",
                                    name: "페이지 2으로 이동",
                                },
                                {
                                    id: "location.href='./index3.html'",
                                    name: "페이지 3으로 이동",
                                },
                                {
                                    id: "location.href='./index4.html'",
                                    name: "페이지 4으로 이동",
                                },

                                // 이거 css도 적용하기
                            ],
                        },
                        {
                            type: "select",
                            label: "버튼 꾸미기",
                            name: "class",
                            options: [
                                {
                                    id: "",
                                    name: "버튼 디자인을 선택해주세요!",
                                },
                                {
                                    id: "btn-order1",
                                    name: "프리셋 1",
                                },
                                {
                                    id: "btn-order2",
                                    name: "프리셋 2",
                                },
                                {
                                    id: "btn-order3",
                                    name: "프리셋 3",
                                },

                                // 이거 css도 적용하기
                            ],
                        },
                        {
                            type: "checkbox",
                            label: "사용 불가능하게",
                            name: "disabled",
                        },
                        // {
                        //     type: "button",
                        //     // ...
                        //     text: "Click me",
                        //     full: true, // Full width button
                        //     command: (editor) => alert("Hello"),
                        //     // or you can just specify the Command ID
                        //     // command: "some-command",
                        // },
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
        if (page_id === "0") {
            title.innerHTML = "도메인 및 페이지 수 설정";
        } else {
            title.innerHTML = "도메인 설정";
        }

        const domainModal_container = document.createElement("div");

        const content = document.createElement("input");
        content.className = "basic-input";
        content.value = domain;
        content.focus = true;
        content.size = 45;
        content.placeholder = "도메인에 들어갈 단어를 입력해주세요.";

        if (page_id === "0") {
            var pageInput = document.createElement("input");
            pageInput.className = "basic-input";
            pageInput.value = page_count;
            pageInput.size = 45;
            pageInput.placeholder = "만들 페이지 수를 입력해주세요.";
        }

        const btn = document.createElement("button");
        btn.className = "domain-btn";
        btn.type = "button";
        btn.setAttribute("data-close-modal", "");

        const span = document.createElement("span");
        span.innerHTML = "적용";

        btn.appendChild(span);
        domainModal_container.appendChild(content);
        if (page_id === "0") {
            domainModal_container.appendChild(pageInput);
        }

        domainModal_container.appendChild(btn);

        //여기 while문 쓰면될듯 ###################### 설정 안되면 안꺼지게 && 다시 안켜지게
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
                    if (page_id === "0") {
                        //아닌 경우도 입력 #######
                        page_count = pageInput.value;

                        // 입력 안된거 있으면 다시 켬
                        if (domain === "" || page_count === "") {
                            alert("도메인 및 페이지 수 입력을 완료해주세요");

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
                                    "http://52.231.107.168:3000/api/v1/website/check/" +
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
                                        addCommands(
                                            editor,
                                            domain,
                                            page_id,
                                            page_count,
                                            token
                                        );
                                    }
                                })
                                .catch((err) => console.log(err));
                        }
                    } else {
                        if (domain === "") {
                            alert("도메인을 입력해주세요");

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
                                    "http://52.231.107.168:3000/api/v1/website/check/" +
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
                                        addCommands(
                                            editor,
                                            domain,
                                            page_id,
                                            page_count,
                                            token
                                        );
                                    }
                                })
                                .catch((err) => console.log(err));
                        }
                    }

                    addCommands(editor, domain, page_id, page_count, token);

                    //페이지 여러개 설정
                    addPages(editor, page_id, page_count);

                    const panelManager = editor.Panels;
                    panelManager.addButton("options", {
                        id: "pages",
                        className: "fa fa-pager",
                        command: "pages",
                        attributes: { title: "다른 페이지 보기" },
                    });

                    //아래 코드 수정 #########################

                    //domain 입력 변수 설정
                    const page_title = document.createElement("p");
                    page_title.className = "domain_title";
                    page_title.innerHTML = "페이지 설정";

                    const pageModal_container = document.createElement("div");

                    const pageInfo_container = document.createElement("div");
                    pageInfo_container.className = "modal-info-container";

                    const page_info = document.createElement("b");
                    page_info.className = "modal-info-text";
                    if (page_id === "0") {
                        page_info.innerHTML =
                            "현재 선택 가능 페이지: 1 ~ " + page_count;
                    } else {
                        page_info.innerHTML =
                            "<h5>쇼핑몰 변경 가능 페이지</h5>1: 메인 페이지</br>2: 상품 상세정보 페이지</br>3: 주문 확인 페이지";
                    }

                    const page_content = document.createElement("input");
                    page_content.className = "domain-input";
                    page_content.value = "";
                    page_content.focus = true;
                    page_content.size = 34;
                    page_content.placeholder = "이동할 페이지를 입력해주세요.";

                    const page_btn = document.createElement("button");
                    page_btn.className = "domain-btn";
                    page_btn.type = "button";
                    page_btn.setAttribute("data-close-modal", "");

                    const page_span = document.createElement("span");
                    page_span.innerHTML = "적용";

                    page_btn.appendChild(page_span);
                    pageModal_container.appendChild(pageInfo_container);
                    pageInfo_container.appendChild(page_info);
                    pageModal_container.appendChild(page_content);
                    pageModal_container.appendChild(page_btn);

                    editor.Commands.add("pages", {
                        run: (editor) => {
                            editor.Modal.open({
                                title: page_title,
                                content: pageModal_container,
                                attributes: {
                                    class: "pannel-pages-modal",
                                },
                            });
                            editor.Modal.onceClose(() => {
                                if (page_id === "0") {
                                } else {
                                }

                                const newPageId = page_content.value;

                                if (newPageId >= 1 && newPageId <= page_count) {
                                    const pageManager = editor.Pages;

                                    if (page_id === "0") {
                                        let newPage = pageManager.get(
                                            "page-" + page_content.value
                                        );
                                        pageManager.select(newPage);

                                        alert(
                                            page_content.value +
                                                " 페이지로 변경되었습니다."
                                        );
                                    } else {
                                        const newPage = pageManager.get(
                                            "layout-page-" + page_content.value
                                        );
                                        pageManager.select(newPage);
                                    }
                                } else {
                                    alert(
                                        "올바르지 않은 페이지 숫자입니다.\n페이지 숫자만을 입력해주세요.\n(예) 2"
                                    );
                                    editor.Modal.open({
                                        title: page_title,
                                        content: pageModal_container,
                                        attributes: {
                                            class: "pannel-pages-modal",
                                        },
                                    });
                                }
                            });
                        },
                    });
                });
            },
        });

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
            {/* <div className="side_page"></div> */}
            <div className="main-content">
                <div id="editor"></div>
            </div>
        </div>
    );
}

export default MainPage;
