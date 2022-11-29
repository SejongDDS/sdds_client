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
    default:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VyX2xvZ2luX2lkIjoiMTExMSIsImlhdCI6MTY2OTQ1NDQyMSwiZXhwIjoxNjcyMDQ2NDIxfQ.mvmPiq720tg76Tdvi3aOonpYQ5uq_9DH3zlPEH4ZtIQ",
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
