import {atom,selector} from 'recoil';

export const visitState=atom({
    key:'visitState',
    default:[]
})

export const websiteState=atom({
    key:'websiteState',
    default:'test'
})

export const tokenState=atom({
    key:'tokenState',
    default:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJ1c2VyX2xvZ2luX2lkIjoidWdpIiwiaWF0IjoxNjY4OTQ2NTY3LCJleHAiOjE2NzE1Mzg1Njd9.82pDFRUKZHaWjG73Uq7tuzMTkrfCXyvn0qM5g00QYWY"
})

export const getToken=selector({
    key:'getToken',
    get:({get})=>{
        let token = get(tokenState);
        return token
    }
})

export const orderState=atom({
    key:'orderState',
    default:[
        
    ]
});

export const productState=atom({
    key:'productState',
    default:[
        
    ]
});

export const memberState=atom({
    key:'memberState',
    default:[]
})

export const modifyModalShowState=atom({
    key:'modifyModalShowState',
    default:false
})

export const modifyModalDataState=atom({
    key:'modifyModalDataState',
    default:[]
})