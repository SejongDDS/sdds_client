const layout_pages = [
    `
    <div class="gjs-row" id="title-row">
    <div class="gjs-cell" id="title-cell">
        <div id="title-text">SDDS.COM</div>
    </div>
</div>

<div class="gjs-row" data-gjs-removable="false"></div>

<div class="gjs-row content-container" data-gjs-removable="false">
    <div class="gjs-cell products-container" id="products-container" data-gjs-removable="false">
        <div class="gjs-row category-container" id="row-0" data-gjs-removable="false">

            <div class="gjs-cell card-container" id="card-0" data-gjs-removable="false">
                <div class="img-container" id="img-0" data-gjs-removable="false">
                    
                </div>
                <p class="product-name" id="name-0" data-gjs-removable="false">상품 준비중입니다.</p>
                <p class="product-price" id="price-0" data-gjs-removable="false"></p>
            </div>

            <div class="gjs-cell card-container" id="card-1" data-gjs-removable="false">
                <div class="img-container" id="img-1" data-gjs-removable="false">
                </div>
                <p class="product-name" id="name-1" data-gjs-removable="false">상품 준비중입니다.</p>
                <p class="product-price" id="price-1" data-gjs-removable="false"></p>
            </div>

            <div class="gjs-cell card-container" id="card-2" data-gjs-removable="false">
                <div class="img-container" id="img-2" data-gjs-removable="false">
                </div>
                <p class="product-name" id="name-2" data-gjs-removable="false">상품 준비중입니다.</p>
                <p class="product-price" id="price-2" data-gjs-removable="false"></p>
            </div>

        </div>
    </div>
</div>

<div class="gjs-row" data-gjs-removable="false"></div>

<script>
    // <img
    //                 class="product-img"
    //                 src="https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fexam-154961781.jpg&type=sc960_832"
    //                 alt="상품 이미지"
    //                 ></img>

    const serverUrl = "http://52.231.107.168:3000";

    const split_domain = location.href.split("/");
    const website_url = split_domain[3];
    // const website_url = "test1";
    
    console.log("website_url : " + website_url);

    //쿼리로 데이터 넘겨주고 페이지 이동
    function changePage(product_id){
        location.href="index2.html?product_id=" + product_id;
    }

    //물품 JSON 데이터 받아오기
    async function loadData(){
        let product = await fetch(serverUrl + "/api/v1/product/" + website_url + "/summary", {
            headers : {
                //토큰은 유동적으로 받아줘야 할듯
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
            },
        })

        let productData = await product.json();

        return productData;
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
        //onclick은 카드 만드는 함수 뒤에 추가

        let e2 = document.createElement("div");
        e2.className = "img-container";
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
    
    //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
    function add_img(parent_id, img_url) {
        let img = document.createElement('img');
        img.className = "product-img";
        img.src = img_url;
        document.getElementById(parent_id).appendChild(img);
    }

    loadData().then(res => {
        // 테스트용 이미지 주소
        console.log(res);
        const ex_img = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fexam-154961781.jpg&type=sc960_832";

        res.forEach((element, index) => {
            if (index > 2){
                if((index % 3) === 0){
                    add_product_row(parseInt(index / 3));
                    //console.log("inside: " + index + " and " + (index / 3));
                }
                //console.log("outside: " + index + " and " + (index / 3));
                add_product_card(index);
            }

            let card = document.getElementById("card-" + index);
            card.setAttribute("onClick", "changePage(" + element.id + ")");

            let name = document.getElementById('name-' + index);
            name.innerHTML = element.name;

            let price = document.getElementById('price-' + index);
            price.innerHTML = element.price.toLocaleString('ko-KR') + "원"; 

            let thumbnail_url = element.thumbnail_url;
            add_img("img-" + index, thumbnail_url);
            console.log(thumbnail_url);
        });
    })
    .catch((err) => console.log(err));
</script>

<style>* {
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
    min-width: 290px;
    max-width: 290px;
    height: 530px;
    background-color: white;
    border-radius: 3px;
    padding: 0px;
    margin: 0px 40px 0px 40px;

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;

}
.card-container:hover{
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.img-container {
    width: 290px;
    max-width: 290px;
    height: 290px;
    max-height: 290px;
}

.product-img {
    width: 290px;
    height: 290px;
}

.product-info{
    position: relative;
}

.product-name {
    height: 20%;
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
            <div class="gjs-row" id="title-row" data-gjs-removable="false">
                <div class="gjs-cell" id="title-cell" data-gjs-removable="false">
                    <div id="title-text" data-gjs-removable="false">SDDS.COM</div>
                </div>
            </div>

            <div class="gjs-row" data-gjs-removable="false"></div>

            <div class="gjs-row content-container" data-gjs-removable="false">
                <div class="gjs-cell products-container" id="products-container" data-gjs-removable="false">
    
                    <div class="gjs-row card-container" id="card-0" data-gjs-removable="false">
                        <div class="gjs-cell img-container" id="img-0" data-gjs-removable="false">
                        </div>
                        <div class="gjs-cell product-info" id="info-0" data-gjs-removable="false">
                            <p class="product-name" id="name-0" data-gjs-removable="false">상품명</p>
                            <p class="product-price" id="price-0" data-gjs-removable="false">가격</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="gjs-row" data-gjs-removable="false"></div>

            <script>

                //긴 화면으로 표현하는 레이아웃
                const serverUrl = "http://52.231.107.168:3000";

                const split_domain = location.href.split("/");
                const website_url = split_domain[3];

                console.log("website_url : " + website_url);

                //쿼리로 데이터 넘겨주고 페이지 이동
                function sendData(product_id){
                    location.href="index2.html?" + product_id;
                }

                //물품 JSON 데이터 받아오기
                async function loadData(){
                    let product = await fetch(serverUrl + "/api/v1/product/" + website_url + "/summary" , {
                        headers: {
                            //토큰은 유동적으로 받아줘야 할듯
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    })

                    let productData = await product.json();

                    return productData;
                }

                //카드 추가하는 함수(매개변수: json파일 index)
                function add_product_card(index){
                    let e1 = document.createElement("div");
                    e1.className = "gjs-row card-container";
                    e1.id = "card-" + index;
                    e1.onclick = "javascript:sendData(" + (index + 1 ) + ")";
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

                //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
                function add_img(parent_id, img_url) {
                    let img = document.createElement('img');
                    img.className = "product-img";
                    img.src = img_url;
                    document.getElementById(parent_id).appendChild(img);
                }
                
                loadData().then(res => {
                    // 테스트용 이미지 주소
                    // const thumbnail = "https://blackboard.sejong.ac.kr/bbcswebdav/institution/login/images/sejong.png";

                    res.forEach((element, index) => {
                        if(index != 0){
                            //새로운 카드를 생성하는 코드
                            add_product_card(index);
                        }
                        let card = document.getElementById("card-" + index);
                        card.setAttribute("onClick", "sendData(" + element.id + ")");

                        let name = document.getElementById('name-' + index);
                        name.innerHTML = element.name;

                        let price = document.getElementById('price-' + index);
                        price.innerHTML = element.price.toLocaleString('ko-KR') + "원";

                        let thumbnail_url = element.thumbnail_url;
                        add_img("img-" + index, thumbnail_url);

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
    padding: 0px;
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
}

.product-img {
    height: 100%;
    max-width: 530px;
    margin: auto;
}

.product-info{
    position: relative;
}

.product-name {
    height: 30%;
    font-size: 34px;
    font-weight: 400;
    color: #2c2c2c;
    padding: 10px 0px;
}

.product-price {
    font-size: 16px;
    color: #4b4b4b;
    padding: 5px 0;
}


</style>
`,
];

export const layoutManager = {
    pages: [
        {
            id: "page-0",
            component: "",
        },
        {
            id: "layout-page-2",
            component: `
            <body id="ino3">
            <div class="gjs-row" id="title-row" data-gjs-removable="false">
                <div class="gjs-cell" id="title-cell" data-gjs-removable="false">
                    <div id="title-text" data-gjs-removable="false">SDDS.COM</div>
                </div>
            </div>

            <div class="gjs-row" data-gjs-removable="false"></div>

            <div class="gjs-row" id="container-product" data-gjs-removable="false">
                <div class="gjs-cell" id="container-product-thumbnail" data-gjs-removable="false"></div>
                <div class="gjs-cell" id="container-product-info" data-gjs-removable="false">
                    <div class="gjs-cell" id="product-name" data-gjs-removable="false">상품 이름</div>
                    <div class="gjs-cell" id="product-price" data-gjs-removable="false">가격</div>
                    <div class="gjs-cell" id="product-count" data-gjs-removable="false">남은 개수</div>

                    <div class="gjs-cell" id="container-product-count" data-gjs-removable="false">
                        <span id="product-count-minus" onclick='count("minus")' data-gjs-removable="false">-</span>
                        <input id="product-count-value" type="text" value="1" data-gjs-removable="false"/>
                        <span id="product-count-plus" onclick='count("plus")' data-gjs-removable="false">+</span>
                    </div>
                    
                    <button type="button" id="btn-order" onclick="" data-gjs-removable="false">
                        주문하기
                    </button>
                </div>
            </div>

            <div class="gjs-row" data-gjs-removable="false"></div>
            
            <div class="gjs-row" id="container-description" data-gjs-removable="false">
                <div class="gjs-cell" id="description-text" data-gjs-removable="false">
                    상품상세정보
                </div>
            </div>

            <div class="gjs-row" id="container-detail" data-gjs-removable="false">
                <div class="gjs-cell" id="container-detail-img" data-gjs-removable="false">
                    <!-- 동적인 개수의 이미지가 들어갈 위치 -->
                </div>
            </div>

            <script>
                const serverUrl = "http://52.231.107.168:3000";

                const split_domain1 = location.href.split("/");
                const website_url = split_domain1[3];

                const split_domain2 = location.href.split("?");
                const split_data = split_domain2[1].split("&");
                const product_id = split_data[0].split("=")[1];

                //물품 JSON 데이터 받아오기
                async function loadData(){
                    let product = await fetch(serverUrl + "/api/v1/product/" + website_url + "/" + product_id, {
                        headers: {
                            //토큰은 유동적으로 받아줘야 할듯
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    })

                    let productData = await product.json();

                    console.log(productData);
                    
                    return productData;
                }

                //쿼리로 데이터 넘겨주고 페이지 이동
                function changePage(product_id){
                    let countElement = document.getElementById("product-count-value");
                    let count = countElement.value;

                    location.href="index3.html?product_id=" + product_id + "&count=" + count;
                }

                //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
                function add_img(parent_id, img_url) {
                    let img = document.createElement('img');
                    img.className = "product-img";
                    img.src = img_url;
                    document.getElementById(parent_id).appendChild(img);
                }

                window.onload = function() {
                    // 버튼 JS 설정
                    let e2 = document.getElementById("product-count-minus");
                    e2.setAttribute("onClick", "count('minus')");

                    let e3 = document.getElementById("product-count-plus");
                    e3.setAttribute("onClick", "count('plus')");
                }

                // 썸네일은 서버에서 받아와야 함
                const ex_img = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fexam-154961781.jpg&type=sc960_832";
                
                loadData().then(res => {
                    let orderBtn = document.getElementById("btn-order");
                    let countElement = document.getElementById("product-count-value");

                    orderBtn.setAttribute("onClick", "changePage(" + product_id +")");

                    let name = document.getElementById('product-name');
                    name.innerHTML = res.name;

                    let price = document.getElementById('product-price');
                    price.innerHTML = res.price.toLocaleString('ko-KR') + "원";

                    let count = document.getElementById('product-count');
                    count.innerHTML = res.count + "개 남았습니다.";

                    let thumbnail_url = res.thumbnail_url;
                    add_img("container-product-thumbnail", thumbnail_url)

                    let ary_main_url = res.main_url;
                    ary_main_url.forEach(element => {
                        add_img("container-detail-img", element);
                    });
                })
                .catch((err) => console.log(err));
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
        {
            id: "layout-page-3",
            component: `
            <div class="gjs-row" id="title-row" data-gjs-removable="false">
                <div class="gjs-cell" id="title-cell" data-gjs-removable="false">
                    <div id="title-text" data-gjs-removable="false">SDDS.COM</div>
                </div>
            </div>

            <div class="gjs-row" data-gjs-removable="false"></div>

            <div class="gjs-row product-order-container-row" data-gjs-removable="false">
                <div class="gjs-cell product-order-container-cell" data-gjs-removable="false">
                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title" data-gjs-removable="false">상품 이름</li>
                        <li class="product-content" id="blank-name" data-gjs-removable="false">MACBOOK Air</li>
                    </ul>

                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title" data-gjs-removable="false">상품 가격</li>
                        <li class="product-content" id="blank-price" data-gjs-removable="false">1,920,000 원</li>
                    </ul>

                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title" data-gjs-removable="false">주문 개수</li>
                        <li class="product-content" id="blank-count" data-gjs-removable="false">1 개</li>
                    </ul>

                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title" data-gjs-removable="false">휴대전화</li>
                        <input class="input-blank" type="tel" name="tel" id="order-tel" placeholder=" - 를 제외하고 입력해주세요"/ data-gjs-removable="false">
                    </ul>

                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title"data-gjs-removable="false">배송지 주소</li>
                        <input 
                            class="input-blank"
                            type="text"
                            id="address_kakao"
                            name="address"
                            placeholder="주소를 입력해주세요"
                            data-gjs-removable="false"
                            
                        />
                        <input
                            class="input-blank"
                            id="detail-address"
                            placeholder="상세 주소를 입력해주세요"
                            data-gjs-removable="false"
                        />
                    </ul>

                    <ul class="text-space" data-gjs-removable="false">
                        <li class="cell-title" data-gjs-removable="false">배송 메모</li>
                        <select class="selbox" id="blank-memo" name="selbox" data-gjs-removable="false">
                            <option value="1">배송 시 요청사항을 선택해주세요</option>
                            <option value="2">부재 시 경비실에 맡겨주세요</option>
                            <option value="3">부재 시 택배함에 넣어주세요</option>
                            <option value="4">부재시 집 앞에 놔주세요</option>
                            <option value="5">배송 전 연락 바랍니다</option>
                            <option value="6">파손의 위험이 있는 상품입니다. 배송 시 주의해 주세요.</option>
                            <option value="direct">직접입력</option>
                        </select>
                        <br/>
                        <input class="input-blank" type="text" id="selboxDirect" name="selboxDirect" data-gjs-removable="false"/>
                    </ul>

                    <button type="button" id="btn-order" onclick="send_order(1)" data-gjs-removable="false" >
                        주문하기
                    </button>
                    
                </div>
            </div>

            <div class="gjs-row" d ata-gjs-removable="false"></div>
            
            <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
            <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
            <script>

                $(function(){
                    $("#selboxDirect").hide();

                    $(".selbox").change(function(){
                        if($(".selbox").val() == "direct"){
                            $("#selboxDirect").show();
                        } else {
                            $("#selboxDirect").hide();
                        }
                    })
                });
                
                window.onload = function(){
                document.getElementById("address_kakao").addEventListener("click", function(){ //주소입력칸을 클릭하면
                //카카오 지도 발생
                new daum.Postcode({
                    oncomplete: function(data) { //선택시 입력값 세팅
                        document.getElementById("address_kakao").value = data.address; // 주소 넣기
                        document.getElementById("detail-address").focus(); //상세입력 포커싱
                        
                    }}).open();
                });
                }

                const serverUrl = "http://52.231.107.168:3000";

                const split_domain1 = location.href.split("/");
                const website_url = split_domain1[3];

                const split_domain2 = location.href.split("?");
                const split_data = split_domain2[1].split("&");
                const product_id = split_data[0].split("=")[1];
                const count = split_data[1].split("=")[1];

                console.log("product id = " + product_id + " & count = " + count);

                //물품 JSON 데이터 받아오기
                async function loadData(){
                    let product = await fetch(serverUrl + "/api/v1/product/" + website_url + "/" + product_id, {
                        headers: {
                            //토큰은 유동적으로 받아줘야 할듯
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    })

                    let productData = await product.json();

                    console.log(productData);
                    
                    return productData;
                }

                async function load_member_id(){
                    //여기 고치기 #######################
                    let member1 = await fetch(serverUrl + "/api/v1/member/all/" + website_url, {
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                        },
                    });

                    console.log(member1);

                    let memberData = await member1.json();

                    return memberData.members[0].id;
                }

                function send_order(product_id){
                    alert("주문이 완료되었습니다.");
                    location.href="index.html";

                    const countElement = document.getElementById('product-count');
                    let count = countElement.value;

                    const addressElement = document.getElementById('address_kakao');
                    const detailAddressElement = document.getElementById('detail-address');
                    let address = addressElement.value + " " + detailAddressElement.value;
                    
                    // const telElement = document.getElementById('order-tel');
                    // let tel = telElement.value;
                    
                    let order = fetch(serverUrl + "/api/v1/orders/", {
                        method: "POST",
                        headers: {
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoidGVzdDEyMzQiLCJpYXQiOjE2NjgzNjM2NTcsImV4cCI6MTY3MDk1NTY1N30.nEl8jXeuwa1qog0JxeaoXxxOO6vy3_q8Pj6aTMiOJ7Y",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "count": count,
                            "shipping_address": address,
                            "etc": "Unknown Type: any",
                            "website_url": website_url,
                            "product_id": product_id,
                            "user_id":  userId,
                            //유져 아이디도 주소 파라미터로 받아야??
                        }),
                    })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                    .then(() => alert("상품 주문이 완료되었습니다."))
                    .catch((err) => console.log(err));
                    //주문 성공 모달 띄울지?
                    //그냥 확인 취소 뜨는 창 뜨는거 하면 될듯

                    console.log(count + " address: " + address + "tel: " + tel);
                }
                
                //이미지 추가하는 함수(매개변수: 부모요소 id, 불러올 이미지 url)
                function add_img(parent_id, img_url) {
                    let img = document.createElement('img');
                    img.className = "product-img";
                    img.src = img_url;
                    document.getElementById(parent_id).appendChild(img);
                }

                window.onload = function() {
                    let orderCount = document.getElementById('blank-count');
                    orderCount.innerHTML = count + " 개";

                    let e2 = document.getElementById("btn-order");
                    e2.setAttribute("onClick", "send_order(1)");
                }

                // 썸네일은 서버에서 받아와야 함
                const ex_img = "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fexam-154961781.jpg&type=sc960_832";
                
                loadData().then(res => {
                    load_member_id().then(res1 => {
                        let orderBtn = document.getElementById("btn-order");
                        orderBtn.setAttribute("onClick", "send_order(" + res1 +")");
                    });

                    let name = document.getElementById('blank-name');
                    name.innerHTML = res.name;

                    let price = document.getElementById('blank-price');
                    price.innerHTML = res.price.toLocaleString('ko-KR') + " 원";
                })
                .catch((err) => console.log(err));
            </script>


            <style>


            * {
            box-sizing: border-box;
            font-size: 12px;
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
        }
        
        #title-text{
            padding: 30px 40px 30px 40px;
            font-size: 34px;
            font-weight: 900;
        }
        
        #title-text:hover{
            cursor:pointer;
        }
        
        .product-order-container-cell{
            margin-left: 10%;
        }
        
        .text-space{
            display: table;
            line-height: 24px;
            border-bottom: 1px solid #ddd;
            width: 80vw;
        }
        
        .cell-title{
            display: table-cell;
            width: 190px;
            min-width: 190px;
            padding: 10px 0 10px 10px;
            font-weight: bold;
        }
        
        .product-content{
            display: table-cell;
            padding: 10px 0 10px 10px;
            font-weight: 400;
        }
        
        .input-blank{
            height: auto;
            width: 50vw;
            padding: .8em .5em;
            margin: auto;
            margin-bottom: 15px;
        }
        
        .selbox{
            height: auto;
            width: 50vw;
            padding: .8em .5em;
            margin-bottom: 15px;
        }
        
        #btn-order {
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
            margin-left: 37%;
            margin-top: 50px;
        }
        
        #btn-order:hover{
            cursor:pointer;
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

export const addPages = (editor, page_id, page_count) => {
    // editor.on("load", () => {

    // });
    const pageManager = editor.Pages;

    if (page_id === "0") {
        for (let i = 1; i <= page_count; i++) {
            pageManager.add({
                id: "page-" + i,
                component: `
                <style>
                    .btn-order1 {
                        width: 220px;
                        height: 55px;
                        
                        text-align: center;
                        font-size: 30px;
                        display: block;
                        margin: auto;
                        
                        background: #ff5b59;
                        color: #fff;
                        border: 1px solid #ff5b59;
                    }

                    .btn-order2 {
                        width: 200px;
                        height: 60px;

                        text-align: center;
                        padding: 15px 30px;
                        border-radius: 50px;
                        margin: auto;
                        

                        background: #fff
                        border: 2px solid #bfbfbf;
                        color: #bfbfbf;
                    }

                    .btn-order3 {
                        width: 240px;
                        height: 60px;

                        display: block;
                        font-size: 18px;
                        outline: none;  
                        transition: .3s linear;
                        border-radius: 6px;
                        margin: auto;

                        background-color: #00a8ff;
                        border: none;
                        color: #fff;
                    }
                
                </style>`,
            });
            console.log("page add : " + i);
        }

        const somePage = pageManager.get("page-1");
        pageManager.select(somePage);
    } else {
        pageManager.add({
            id: "layout-page-1",
            component: layout_pages[page_id - 1],
        });

        const somePage = pageManager.get("layout-page-1");
        pageManager.select(somePage);
    }
};
