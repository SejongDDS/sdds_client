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

function MainPage() {
    const [editor, setEditor] = useState(null);
    // const [assets, setAssets] = useState([]);
    let domain = ""; //도메인 입력에 사용될 변수 - 서버로 보낼때 다시 사용
    const txt = "12321312333333";
    // const { pageId } = useParams();

    // const { pageStore } = useSelector((state) => state);
    // const { pages } = pageStore;

    // const iframePrivacyPart = () => {
    //     return {
    //         __html: '<iframe src="./layout/product_layout.html" width="100%" height="700px"></iframe>',
    //     };
    // };

    // const LandingPage = {
    //     html: "",
    //     css: null,
    // };

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
            components: {},
            projectData: {
                pages: [
                    {
                        component: `
                        <script>
                // 서버 url
                const serverUrl = "http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000";

                //물품 JSON 데이터 받아오기
                async function loadData(){
                    let product = await fetch(serverUrl + "/api/v1/user", {
                        headers: {
                            //토큰은 유동적으로 받아줘야 할듯
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    })

                    let productData = await product.json();

                    return productData;
                }
                
                //주문 수 카운트할 
                function count(type){
                    const resultElement = document.getElementById('product-count-value');
                    let number = resultElement.value;

                    if (type === 'plus') {
                        number = parseInt(number)    + 1;
                    } else if (type === 'minus' & number > 0) {
                        number = parseInt(number) - 1;
                    }

                    resultElement.value = number;
                }
                
                //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
                function add_img(id, url) { 
                    var img = document.createElement('img'); 
                    img.src = url; 
                    document.getElementById(id).appendChild(img);
                }

                //이거 안쓸듯?
                function add_element(perent_id, text, id) { 
                    var element = document.createElement("div"); 
                    element.innerHTML = text;
                    element.id = id;
                    document.getElementById(perent_id).appendChild(element);
                }
                // 이건 서버에서 받아와야 함
                const thumbnail = "https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png";
            </script>
            <div class="gjs-row" id="title-row">
                <div class="gjs-cell" id="title-cell">
                    <div id="title-text">SDDS.COM</div>
                </div>
            </div>

            <div class="gjs-row" id="container-product">
                <div class="gjs-cell" id="container-product-thumbnail"></div>
                <div class="gjs-cell" id="container-product-info">
                    <div class="gjs-cell" id="product-name">
                        상품 이름</div>
                    <div class="gjs-cell" id="product-price">가격</div>
                    <div class="gjs-cell" id="product-count">남은 개수</div>

                    <div class="gjs-cell" id="container-product-count">
                        <span id="product-count-minus" onclick='count("minus")'>-</span>
                        <input id="product-count-value" type="text" value="1"/>
                        <span id="product-count-plus" onclick='count("plus")'>+</span>
                    </div>
                    
                    <button type="button" id="btn-order" onclick="">
                        주문하기
                    </button>
                </div>
            </div>
            
            <div class="gjs-row" id="container-description">
                <div class="gjs-cell" id="description-text">
                    상품상세정보
                </div>
            </div>

            <div class="gjs-row" id="container-detail">
                <div class="gjs-cell" id="container-detail-img">
                    <!-- 동적인 개수의 이미지가 들어갈 위치 -->
                </div>
            </div>

            <!-- <script>
                //이미지 받는것 임시로 3개 넣음
                const array_url = [
                    "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA5MDVfMjY1%2FMDAxNTA0NTc5ODY3MTk1.CfryoPb-b9Bu3XNMQ-BMn-VsaFOQmT2z-V-J093dNIgg.u8-x0rtUJwZTS01c0yENynZMrU8aoUQjoe4aOQ6l0Hog.JPEG.msinvestment%2F%25B8%25B6%25B4%25C3%25B6%25F3%25B8%25E95%25C1%25B6%25C0%25FD.jpg&type=a340",
                    "https://sitem.ssgcdn.com/23/32/34/item/1000456343223_i1_600.jpg",
                    "https://sitem.ssgcdn.com/94/48/90/item/1000055904894_i1_1200.jpg"
                ];

            </script> -->

            <!-- <script>
                //모든 제품 설명 이미지 아래에 추가
                array_url.forEach(element => {
                    add_img("container-detail-img", element);
                });

                //데이터는 이렇게 받으면 댐
                loadData().then(res => console.log(res.login_id));

            </script> -->

            <script>
                loadData().then(res => {
                    let name = document.getElementById('product-name');
                    el.innerHTML = res.name;

                    let price = document.getElementById('product-price');
                    el.innerHTML = res.price + "원";

                    let count = document.getElementById('product-count');
                    el.innerHTML = res.count + "개 남았습니다.";

                    let thumbnail_url = res.image.thumbnail_url[0];
                    add_img("container-product-thumbnail", thumbnail_url)

                    let ary_url = res.image.main_url;
                    ary_url.forEach(element => {
                        add_img("container-detail-img", element);
                    });
                })
            </script>
            <style>

* {
    box-sizing: border-box;
}
body {
    margin: 0;
}
.gjs-row {
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: nowrap;
    padding: 10px;
}

.gjs-cell {
    min-height: 75px;
    flex-grow: 1;
    flex-basis: 100%;
}

#title-row{
    width: 100%;
    box-shadow: rgba(55, 55, 55, 0.2) 0 0 5px 0;
    margin: auto;
    margin-bottom: 100px;
}

#title-text{
    padding: 30px 40px 30px 40px;
    font-size: 34px;
    font-weight: 900;
}

#title-text:hover{
    cursor:pointer;
}

#container-product {
    width: 80%;

    padding: 10px 10px 150px 10px;
    margin: auto;
    margin-bottom: 150px;
}

#container-product-thumbnail {
    width: 60%;
    color: black;
    display: inline-block;
}

#container-product-thumbnail img{
    width: 600px;
    height: 600px;

    margin: auto;
}

#container-product-info {
    position: relative;
    width: 40%;
    padding-left: 100px;
}

#product-name {
    font-size: 2.3em;
    font-weight: 500;
    padding: 10px;
    margin: 50px 0 30px 30px;
}
#product-price {
    font-size: 2em;
    font-weight: 500;
    padding: 10px;
    margin: 50px 0 30px 30px;
}
#product-count {
    font-size: 1.5em;
    font-weight: 500;
    padding: 10px;
    margin: 50px 0 30px 30px;
}


#container-product-count{
    margin: 50px 0 30px 30px;
}

#product-count-minus, #product-count-plus{
    cursor:pointer;
    width:40px;
    height:40px;
    background:#f2f2f2;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    padding:8px 5px 8px 5px;
    border:1px solid #ddd;
    display: inline-block;
    vertical-align: middle;
}

#product-count-value{
    height:40px;
    width: 100px;
    text-align: center;
    font-size: 26px;
    border:1px solid #ddd;
    display: inline-block;
    vertical-align: middle;
}



#btn-order {
    position: absolute;
    width: 220px;
    height: 55px;
    
    text-align: center;
    font-size: 30px;
    display: block;
    
    float: bottom;
    bottom: 0;
    
    background: #ff5b59;
    color: #fff;
    border: 1px solid #ff5b59;
    margin: 50px 0 0 30px;
}

#btn-order:hover{
    cursor:pointer;
}

#container-description {
    width: 60%; 
    margin: 300px auto 150px auto;
}

#description-text {
    font-size:1.5em;
    font-weight: 500;
    border-bottom: 4px solid black;
}

#container-detail-img img {
    display: block;
    width: 60%;
    text-align:center;
    margin:auto;
}


@media (max-width: 768px) {
    .gjs-row {
        flex-wrap: wrap;
    }
}

            </style>
                      `,
                    },
                ],
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
    // editor.setComponents(JSON.stringify("<h1>ㅎㅇㅇㅇㅇ</h1>"));
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
