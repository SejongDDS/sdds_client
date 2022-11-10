import { atom } from "recoil";

export const visitState = atom({
    key: "visitState",
    default: [],
});

export const orderState = atom({
    key: "orderState",
    default: [
        {
            id: 1,
            product: "프로덕트 이름",
            buyer: 1,
            order_status: "배송중",
            address: "서울",
            date: "2022-10-22",
        },
        {
            id: 1,
            product: "프로덕트 이름",
            buyer: 1,
            order_status: "배송중",
            address: "서울",
            date: "2022-10-22",
        },
    ],
});

export const productState = atom({
    key: "productState",
    default: [
        {
            id: 1,
            name: "mac",
            price: 17000000,
            category: "컴퓨터",
        },
        {
            id: 1,
            name: "mac",
            price: 17000000,
            category: "컴퓨터",
        },
        {
            id: 1,
            name: "mac",
            price: 17000000,
            category: "컴퓨터",
        },
        {

            id: 1,
            name: "mac",
            price: 17000000,
            category: "컴퓨터",
        },
        {
            id: 1,
            name: "mac",
            price: 17000000,
            category: "컴퓨터",
        },
    ],
});

export const modifyModalShowState=atom({
    key:'modifyModalShowState',
    default:false
})

export const modifyModalDataState=atom({
    key:'modifyModalDataState',
    default:[]
})

//현재 로그인 유져 정보를 담는 atom
export const userState = atom({
    key: "userState",
    default: [],
});