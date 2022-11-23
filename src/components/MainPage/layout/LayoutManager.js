const layout_pages = [
    `
<div class="gjs-row" id="title-row">
<div class="gjs-cell" id="title-cell">
    <div id="title-text">SDDS.COM</div>
</div>
</div>

<div class="gjs-row content-container">
<div class="gjs-cell products-container" id="products-container">
    <div class="gjs-row category-container" id="row-0">

        <div class="gjs-cell card-container" id="card-0">
            <div class="gjs-row img-container" id="img-0">
                <img
                id="product-img"
                src="https://simg.ssgcdn.com/trans.ssg?src=/cmpt/banner/202211/2022111615435268563124244412_116.jpg&w=400&h=240&edit=c&t=06179a79dc81cbee9ce2714acc0b0e89016b473e"
                alt="상품 이미지"
            ></img>
            </div>
            <p class="product-name" id="name-0">상품명</p>
            <p class="product-price" id="price-0">가격</p>
        </div>

        <div class="gjs-cell card-container" id="card-1">
            <div class="gjs-row img-container" id="img-1">
                <img
                id="product-img"
                src="https://simg.ssgcdn.com/trans.ssg?src=/cmpt/banner/202211/2022111615435268563124244412_116.jpg&w=400&h=240&edit=c&t=06179a79dc81cbee9ce2714acc0b0e89016b473e"
                alt="상품 이미지"
                ></img>
            </div>
            <p class="product-name" id="name-1">상품명</p>
            <p class="product-price" id="price-1">가격</p>
        </div>

        <div class="gjs-cell card-container" id="card-2">
            <div class="gjs-row img-container" id="img-2">
                <img
                id="product-img"
                src="https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png"
                alt="상품 이미지"
            ></img>
            </div>
            <p class="product-name" id="name-2">상품명</p>
            <p class="product-price" id="price-2">가격</p>
        </div>

    </div>
</div>
</div>

<script>

//긴 화면으로 표현하는 것

// const serverUrl = "http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000";

//물품 JSON 데이터 받아오기
async function loadData(){
    let product = await fetch(serverUrl + "/api/v1/product/test/summary", {
        headers : {
            //토큰은 유동적으로 받아줘야 할듯
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
        },
    })

    let productData = await product.json();

    return productData;
}

//이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
function add_img(id, url) {
    let img = document.createElement('img');
    img.className = "product-img";
    img.src = url;
    document.getElementById(id).appendChild(img);
}

//새로운 열을 추가하는 함수(매개변수: 해당 카드의 (인덱스 / 3))
function add_product_row(index){
    let e1 = document.createElement("div");
    e1.className = "gjs-row category-container";
    e1.id = "row-" + index;
    document.getElementById("products-container").appendChild(e1);
}

//카드 추가하는 함수(매개변수: json파일 index)
function add_product_card(index){
    let e1 = document.createElement("div");
    e1.className = "gjs-cell card-container";
    e1.id = "card-" + index;
    document.getElementById("row-" + parseInt(index / 3)).appendChild(e1);

    let e2 = document.createElement("div");
    e2.className = "gjs-row img-container";
    e2.id = "img-" + index;
    document.getElementById("card-" + index).appendChild(e2);

    let e3 = document.createElement("p");
    e3.className = "product-name";
    e3.id = "name-" + index;
    e3.innerHTML = "상품명";
    document.getElementById("card-" + index).appendChild(e3);

    let e4 = document.createElement("p");
    e4.className = "product-price";
    e4.id = "price-" + index;
    e4.innerHTML = "가격";
    document.getElementById("card-" + index).appendChild(e4);
}

loadData().then(res => {
    // 테스트용 이미지 주소
    const thumbnail = "https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png";

    res.forEach((element, index) => {
        if (index > 2){
            if((index % 3) === 0){
                add_product_row(parseInt(index/3));
                //console.log("inside: " + index + " and " + (index / 3));
            }
            //console.log("outside: " + index + " and " + (index / 3));
            add_product_card(index);
        }

        let name = document.getElementById('name-' + index);
        name.innerHTML = element.name;

        let price = document.getElementById('price-' + index);
        price.innerHTML = element.price.toLocaleString('ko-KR') + "원";

        //이미지 유동적으로 넣는 코드 ****************수정필요
        //이미지 크기 조정하는 css 작성하기
        // let img_url = element.main_url[0];
        // add_img("img-container img-" + count, img_url)
        add_img("img-" + index, thumbnail)

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

.content-container{
align-items: center;
min-width: 200px;
max-width: 80vw;

margin: auto;
}

.products-container {
align-items: center;
vertical-align: middle;
justify-content: center;
}

.category-container {
display: flex;
justify-content: center;
height: auto;
align-items: center;
margin: 20px 0px;
}

.card-container {
min-width: 150px;
max-width: 25vw;
background-color: white;
height: 430px;
border-radius: 3px;
padding: 10px;
margin: 0px 40px 0px 40px;

box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
transition: 0.3s;

}
.card-container:hover{
cursor: pointer;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.img-container {
/* width: 100%; */
height: 50%;
}

#product-img {
width: 100%;
height: auto;
margin: auto;
}

.product-info{
position: relative;
}

.product-name {
font-size: 32px;
font-weight: 400;
color: #2c2c2c;
padding: 10px;
}

.product-price {
font-size: 20px;
color: #4b4b4b;
padding: 5px 10px;
}

</style>
`,
    `
<div class="gjs-row" id="title-row">
    <div class="gjs-cell" id="title-cell">
        <div id="title-text">SDDS.COM</div>
    </div>
</div>
<div class="gjs-row content-container">
    <div class="gjs-cell products-container" id="products-container">

        <div class="gjs-row card-container" id="card-0">
            <div class="gjs-cell img-container" id="img-0"></div>
            <div class="gjs-cell product-info" id="info-0">
                <p class="product-name" id="name-0">상품명</p>
                <p class="product-price" id="price-0">가격</p>
            </div>
        </div>

    </div>
</div>

<script>

    //긴 화면으로 표현하는 것
    
    const serverUrl = "http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000";

    //물품 JSON 데이터 받아오기
    async function loadData(){
        let product = await fetch(serverUrl + "/api/v1/product/test/summary", {
            headers: {
                //토큰은 유동적으로 받아줘야 할듯
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
            },
        })

        let productData = await product.json();

        return productData;
    }
    
    //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
    function add_img(id, url) {
        let img = document.createElement('img');
        img.className = "product-img";
        img.src = url;
        document.getElementById(id).appendChild(img);
    }

    //카드 추가하는 함수(매개변수: json파일 index)
    function add_product_card(index){
        let e1 = document.createElement("div");
        e1.className = "gjs-row card-container";
        e1.id = "card-" + index;
        document.getElementById("products-container").appendChild(e1);

        let e2 = document.createElement("div");
        e2.className = "gjs-cell img-container";
        e2.id = "img-" + index;
        document.getElementById("card-" + index).appendChild(e2);

        let e3 = document.createElement("div");
        e3.className = "gjs-cell product-info";
        e3.id = "info-" + index;
        document.getElementById("card-" + index).appendChild(e3);

        let e4 = document.createElement("p");
        e4.className = "product-name";
        e4.id = "name-" + index;
        e4.innerHTML = "상품명";
        document.getElementById("info-" + index).appendChild(e4);

        let e5 = document.createElement("p");
        e5.className = "product-price";
        e5.id = "price-" + index;
        e5.innerHTML = "가격";
        document.getElementById("info-" + index).appendChild(e5);
    }
    
    loadData().then(res => {
        // 테스트용 이미지 주소
        const thumbnail = "https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png";

        res.forEach((element, index) => {
            if(index != 0){
                //새로운 카드를 생성하는 코드
                add_product_card(index);
            }

            let name = document.getElementById('name-' + index);
            name.innerHTML = element.name;

            let price = document.getElementById('price-' + index);
            price.innerHTML = element.price.toLocaleString('ko-KR') + "원";

            //이미지 유동적으로 넣는 코드 ****************수정필요
            // let img_url = element.main_url[0];
            // add_img("img-container img-" + count, img_url)
            add_img("img-" + index, thumbnail)

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

.content-container{
position: relative;
}

.products-container {
position: absolute;
left: 10vw;
align-items: center;
vertical-align: middle;
justify-content: center;
}

.card-container {
min-width: 150px;
background-color: white;
height: 40vh;
width: 80vw;
border-radius: 3px;
padding: 10px;
margin: 30px 0px 90px 0px;

box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
transition: 0.3s;

}
.card-container:hover{
cursor: pointer;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.img-container {
float: left;
margin: 10px;
}

.product-img {
height: 100%;
padding-left: 15%;
margin: auto;
}

.product-info{
position: relative;
}

.product-name {
font-size: 34px;
font-weight: 400;
color: #2c2c2c;
padding: 10px 0px;
}

.product-price {
font-size: 16px;
color: #4b4b4b;
padding: 5px 0px;
}

</style>
`,
];

export const layoutManager = {
    pages: [
        {
            id: "product-page",
            component: `
            
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
            <script>
                // 서버 url
                const serverUrl = "http://simplelinuxvm-foic5rddd76ve.koreacentral.cloudapp.azure.com:3000";

                //물품 JSON 데이터 받아오기
                async function loadData(){
                    let product = await fetch(serverUrl + "/api/v1/product/test/1", {
                        headers: {
                            //토큰은 유동적으로 받아줘야 할듯
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    })

                    let productData = await product.json();

                    return productData;
                }
                
                //주문 수 카운트할 함수
                function count(type){
                    const resultElement = document.getElementById('product-count-value');
                    let number = resultElement.value;

                    if (type === 'plus') {
                        number = parseInt(number) + 1;
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
                
                const thumbnail = "https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png";

                loadData().then(res => {
                    let name = document.getElementById('product-name');
                    name.innerHTML = res.name;

                    let price = document.getElementById('product-price');
                    price.innerHTML = res.price.toLocaleString('ko-KR') + "원";

                    let count = document.getElementById('product-count');
                    count.innerHTML = res.count + "개 남았습니다.";

                    // let thumbnail_url = res.image.thumbnail_url[0];
                    // add_img("container-product-thumbnail", thumbnail_url)

                    let ary_url = res.image.main_url;
                    add_img("container-detail-img", res.image.main_url);
                    // ary_url.forEach(element => {
                    //     add_img("container-detail-img", element);
                    // });
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
};

export const addPages = (editor, page_id) => {
    editor.on("load", () => {
        const pageManager = editor.Pages;

        pageManager.add({
            id: "main-layout",
            component: layout_pages[page_id - 1],
        });

        const somePage = pageManager.get("main-layout");
        pageManager.select(somePage);
    });
};
