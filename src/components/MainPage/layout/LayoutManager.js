export const layoutManager = {
    pages: [
        {
            id: "page-1",
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
        {
            id: "page-2",
            component: `
            
            <div class="el-X"><div class="el-Y el-A"><div class="media"><img class="mr-3" src="">
<div class="media-body">
            <h5>제목</h5>
            <div>신지훈</div>
            </div>
            </div></div>
            <div class="el-Y el-A"><div class="media">
            <img class="mr-3" src="">
            <div class="media-body">
            <h5>제목</h5>
            <div>신지훈</div>
            </div>
            </div></div>
            <div class="el-Y el-A"><div class="media">
            <img class="mr-3" src="">
            <div class="media-body">
            <h5>제목</h5>
            <div>신지훈</div>
            </div>
            </div></div>
            <div class="el-Y el-A"><div class="media">
            <img class="mr-3" src="">
            <div class="media-body">
            <h5>제목</h5>
            <div>신지훈</div>
            </div>
            </div></div>
            <div class="el-Y el-A"><div class="media">
            <img class="mr-3" src="">
            <div class="media-body">
            <h5>제목</h5>
            <div>신지훈</div>
            </div>
            </div></div>
          </div>          `,
        },
    ],
};
