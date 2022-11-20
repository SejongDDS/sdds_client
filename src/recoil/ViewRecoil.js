import {atom} from 'recoil';

export const manageErrorState=atom({
    key:'managerErrorState',
    default:null
})

export const manageLoadingState=atom({
    key: 'manageLoadingState',
    default:false
})