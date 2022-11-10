import {atom} from 'recoil';

export const visitState=atom({
    key:'visitState',
    default:[]
})

export const tokenState=atom({
    key:'tokenState',
    default:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VyX2xvZ2luX2lkIjoidWdpIiwiaWF0IjoxNjY4MDU2NjU4LCJleHAiOjE2NzA2NDg2NTh9.gQj5j94TmI9wl7NPGQHaFEgy9g-tCj9p1sY5e75WgKc"
})

export const websiteState=atom({
    key:'websiteState',
    default:[]
})

export const orderState=atom({
    key:'orderState',
    default:[
        {
            id:1,
            product:"프로덕트 이름",
            buyer: 1,
            order_status:"배송중",
            address:"서울",
            date:"2022-10-22"

        },
        {
            id:1,
            product:"프로덕트 이름",
            buyer: 1,
            order_status:"배송중",
            address:"서울",
            date:"2022-10-22"

        },
        
    ]
});

export const productState=atom({
    key:'productState',
    default:[
        {
            id:1,
            name:"mac",
            price:17000000,
            count:0,
            category:"컴퓨터"
        },
        {
            id:1,
            name:"mac",
            price:17000000,
            category:"컴퓨터"
        },
        {
            id:1,
            name:"mac",
            price:17000000,
            category:"컴퓨터"
        },
        {
            id:1,
            name:"mac",
            price:17000000,
            category:"컴퓨터"
        },
        {
            id:1,
            name:"mac",
            price:17000000,
            category:"컴퓨터"
        }
    ]
});

export const modifyModalShowState=atom({
    key:'modifyModalShowState',
    default:false
})

export const modifyModalDataState=atom({
    key:'modifyModalDataState',
    default:[]
})