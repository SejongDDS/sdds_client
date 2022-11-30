import { atom, selector } from "recoil";

export const visitState = atom({
    key: "visitState",
    default: [],
});

export const websiteState = atom({
    key: "websiteState",
    default: "test",
});

export const tokenState = atom({
    key: "tokenState",
    default: "",
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
