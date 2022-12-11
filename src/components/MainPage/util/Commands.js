import "../styles/web_builder.scss";
import axios from "axios";
import { dom } from "@fortawesome/fontawesome-svg-core";

//명령들 한번에 묶어서 추가하는 함수
export const addCommands = (editor, domain, page_id, page_count, token) => {
    editor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("Mobile"),
    });
    // 다운로드 버튼
    editor.Commands.add("export", {
        run: () => {
            if (domain === "") {
                alert("도메인을 입력하고 다시 시도해주세요!");
            } else {
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
                        console.log(res);

                        if (res.data === true) {
                            alert(
                                "이미 존재하는 도메인입니다.\n새로운 도메인을 입력해주세요."
                            );
                        } else {
                            //다운로드 코드
                            editor.runCommand("gjs-export-zip");

                            setTimeout(() => {
                                if (page_id === "0") {
                                    //포토폴리오 레이아웃
                                    for (let i = 1; i <= page_count; i++) {
                                        //페이지 수만큼 반복
                                        if (i === 1) {
                                            //첫 페이지의 경우
                                            let code = `
                                            <!doctype html>
                                            <html lang="ko">
                                            <head>
                                                <meta charset="utf-8">
                                                <link rel="stylesheet" href="./css/style.css">
                                            </head>
                                            ${editor.Pages.get("page-1")
                                                .getMainComponent()
                                                .toHTML()}
                                            </html>`;
                                            sessionStorage.setItem(
                                                "html",
                                                code
                                            );
                                            console.log(
                                                sessionStorage.getItem("html")
                                            );
                                        } else {
                                            //첫 화면이 아닌 경우
                                            let code =
                                                `
                                            <!doctype html>
                                            <html lang="ko">
                                            <head>
                                                <meta charset="utf-8">
                                                <link rel="stylesheet" href="./css/style` +
                                                i +
                                                `.css">
                                            </head>
                                            ${editor.Pages.get("page-" + i)
                                                .getMainComponent()
                                                .toHTML()}
                                            </html>`;
                                            sessionStorage.setItem(
                                                "html" + i,
                                                code
                                            );
                                            console.log(
                                                sessionStorage.getItem(
                                                    "html" + i
                                                )
                                            );
                                        }
                                    }
                                } else {
                                    // 쇼핑몰 레이아웃 전송의 경우
                                    // console.log("쇼핑몰임" + page_count);
                                    for (
                                        let index = 1;
                                        index <= page_count;
                                        index++
                                    ) {
                                        // console.log("쇼핑몰 인덱스: " + index);
                                        if (index === 1) {
                                            let code = `
                                            <!doctype html>
                                            <html lang="ko">
                                            <head>
                                                <meta charset="utf-8">
                                                <link rel="stylesheet" href="./css/style.css">
                                            </head>
                                            ${editor.Pages.get("layout-page-1")
                                                .getMainComponent()
                                                .toHTML()}
                                            </html>`;
                                            sessionStorage.setItem(
                                                "html",
                                                code
                                            );
                                            console.log(
                                                sessionStorage.getItem("html")
                                            );
                                        } else {
                                            let code =
                                                `
                                            <!doctype html>
                                            <html lang="ko">
                                            <head>
                                                <meta charset="utf-8">
                                                <link rel="stylesheet" href="./css/style` +
                                                index +
                                                `.css">
                                            </head>
                                            ${editor.Pages.get(
                                                "layout-page-" + index
                                            )
                                                .getMainComponent()
                                                .toHTML()}
                                            </html>`;
                                            sessionStorage.setItem(
                                                "html" + index,
                                                code
                                            );
                                            console.log(
                                                sessionStorage.getItem(
                                                    "html" + index
                                                )
                                            );
                                        }
                                    }
                                }
                                console.log("domain: " + domain);
                                const frm = new FormData();

                                frm.append("website_url", domain);

                                //받는건 레이아웃 동일하게 받아도 됨
                                for (let i = 1; i <= page_count; i++) {
                                    //첫 페이지의 경우
                                    if (i === 1) {
                                        let html = new File(
                                            [sessionStorage.getItem("html")],
                                            "index.html"
                                        );

                                        let css = new File(
                                            [sessionStorage.getItem("style")],
                                            "style.css"
                                        );

                                        console.log(
                                            "style: " +
                                                sessionStorage.getItem("style")
                                        );

                                        frm.append("html", html);
                                        frm.append("css", css);
                                    } else {
                                        //첫 페이지가 아닌 경우 (index에 맞춰서 저장)
                                        let html = new File(
                                            [
                                                sessionStorage.getItem(
                                                    "html" + i
                                                ),
                                            ],
                                            "index" + i + ".html"
                                        );

                                        let css = new File(
                                            [
                                                sessionStorage.getItem(
                                                    "style" + i
                                                ),
                                            ],
                                            "style" + i + ".css"
                                        );

                                        console.log(
                                            "style" +
                                                i +
                                                " : " +
                                                sessionStorage.getItem(
                                                    "style" + i
                                                )
                                        );

                                        frm.append("html", html);
                                        frm.append("css", css);
                                    }
                                }
                                // let html = new File(
                                //     [sessionStorage.getItem("html")],
                                //     "index.html"
                                // );
                                // let html2 = new File(
                                //     [sessionStorage.getItem("html2")],
                                //     "index2.html"
                                // );
                                // let css = new File(
                                //     [sessionStorage.getItem("style")],
                                //     "style.css"
                                // );
                                // let css2 = new File(
                                //     [sessionStorage.getItem("style2")],
                                //     "style2.css"
                                // );
                                // frm.append("html", html);
                                // frm.append("html", html2);
                                // frm.append("css", css);
                                // frm.append("css", css2);

                                axios
                                    .post(
                                        "http://52.231.107.168:3000/api/v1/website",
                                        frm,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    )
                                    .then((data) => console.log(data))
                                    .catch((err) => console.log(err));
                                axios
                                    .post(
                                        "http://52.231.107.168:3000/api/v1/member/sign-up/" +
                                            domain,
                                        {
                                            login_id: domain + "_admin",
                                            password: domain + "_admin",
                                            email: domain + "_admin@naver.com",
                                            phone: domain + "_admin",
                                            birth: domain + "_admin",
                                        },
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    )
                                    .then((data) => {
                                        console.log(data);
                                        console.log("domain: " + domain);

                                        // if (page_id === "0") {
                                        //     window.location.href =
                                        //         "http://www.hyeonuk.co.kr/" +
                                        //         domain +
                                        //         "/";
                                        // } else {
                                        //     window.location.replace(
                                        //         "/personal"
                                        //     );
                                        // }
                                    })
                                    .catch((err) => console.log(err));
                            }, 1500);
                        }
                    })
                    .catch((err) => console.log(err));
            }
        },
    });

    // 뒤로가기 버튼
    editor.Commands.add("undo", {
        run: (editor) => editor.UndoManager.undo(),
    });

    // 앞으로가기 버튼
    editor.Commands.add("redo", {
        run: (editor) => editor.UndoManager.redo(),
    });

    // //domain 입력 변수 설정
    // const title = document.createElement("b");
    // title.innerHTML = "도메인 설정";

    // const content = document.createElement("input");
    // content.value = domain;
    // content.focus = true;
    // content.size = 40;
    // content.placeholder = "도메인에 들어갈 단어를 입력해주세요.";

    // content.style.margin = "20px";
    // content.style.backgroundColor = "#2D2D2D";
    // content.style.border = "#222222 1px solid";
    // content.style.color = "#ffffff";
    // content.style.height = "30px";

    // editor.Commands.add("domain", {
    //     run: (editor) =>{
    //         editor.Modal.open({
    //             title: title,
    //             content: content,
    //             attributes: {
    //                 class: "pannel-domain-modal",
    //             },
    //         })
    //         editor.Modal.close({

    //         })

    //     }
    // });

    // editor.Commands.add("pages", {
    //     run: (editor) => {
    //         //canvas_page 메인 레이아웃 페이지(1은 메인, 2는 상품 정보)
    //         const pageManager = editor.Pages;

    //         const selectedPage = pageManager.getSelected();
    //         const mainPage = pageManager.get("main-layout");
    //         const productPage = pageManager.get("product-page");

    //         console.log("testtes");

    //         if (selectedPage === mainPage) {
    //             pageManager.select(productPage);
    //         } else {
    //             pageManager.select(mainPage);
    //         }

    //         console.log("testtes");
    //     },
    // });
};
