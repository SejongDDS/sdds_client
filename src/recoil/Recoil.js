import { atom, selector } from "recoil";

export const visitState = atom({
    key: "visitState",
    default: [],
});

export const websiteState = atom({
    key: "websiteState",
    default: "test1",
});

export const tokenState = atom({
    key: "tokenState",
    default:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoiMTExMSIsImlhdCI6MTY2OTUyOTM0NCwiZXhwIjoxNjcyMTIxMzQ0fQ.k6YpTzdcV3ODyduaI9wNv7JrSYNfBaVh7QJtoV42aqw",
});

export const getToken = selector({
    key: "getToken",
    get: ({ get }) => {
        let token = get(tokenState);
        return token;
    },
});

export const orderState = atom({
    key: "orderState",
    default: [],
});

export const productState = atom({
    key: "productState",
    default: [],
});

export const memberState = atom({
    key: "memberState",
    default: [],
});

export const modifyModalShowState = atom({
    key: "modifyModalShowState",
    default: false,
});

export const modifyModalDataState = atom({
    key: "modifyModalDataState",
    default: [],
});
