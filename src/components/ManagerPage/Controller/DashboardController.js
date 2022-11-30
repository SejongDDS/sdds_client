import React from 'react';
import axios from 'axios';
import { selector, useRecoilValue } from 'recoil';
import { getToken, productState, tokenState, websiteState } from '../../../recoil/Recoil';

export const asyncProductQuery=selector({
    key:'asyncProductQuery',
    get: async ({get}) => {
        let website=get(websiteState);
        let token =get(tokenState);
        const response = await axios.get('http://52.231.107.168:3000/api/v1/product/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    },
    set: ({set},newValue)=>{
        set(productState,newValue)
    }
})
export const getProducts =async (token,website)=> {
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/product/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const getProductDetail= async(token,website,id) =>{
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/product/'+website+"/"+id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const updateProduct = async (token,id,website,name,price,count,category_name) => {
    let data={
        website_url: website,
        name: name,
        price: price.toString(),
        count: count.toString(),
        category_name:category_name
    }
    console.log(data)

    try{
        const response = await axios.post('http://52.231.107.168:3000/api/v1/product/'+id,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response);

    }catch(err){
        console.log(err);
    }
}


export const addProduct = async (name,price,category,website,count,thumbnail,images,token)=>{
    const frm = new FormData();
    frm.append('name',name);
    frm.append('price',price);
    frm.append('count',count);
    frm.append('website_url',website);
    frm.append('category_name',category);
    let thumbnails=[...thumbnail];
    thumbnails.forEach(ele => frm.append('thumbnail_image',ele))


    let imgs=[...images];
    imgs.forEach(img => frm.append('main_image',img));
    
    try{
        const response=await axios.post('http://52.231.107.168:3000/api/v1/product',frm,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
    }catch(err){
        console.log(err);
    }
    
}

export const deleteProduct= async (token,id,website) => {
    try{
        const response = await axios.delete('http://52.231.107.168:3000/api/v1/product/'+id+'?website_url='+website,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response);
    }catch(err){
        console.log(err);
    }
}

export const getOrders = async (token,website) => {
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/orders/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const getOrderDetail = async(token,website,id)=>{
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/orders/'+website+"/"+id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}

export const updateOrder = async (token,id,count,shipping_address,order_status) => {
    let data={
        count: count,
        shipping_address: shipping_address,
        order_status: order_status
    }
    try {
        const response = await axios.post('http://52.231.107.168:3000/api/v1/orders/'+id,data,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response);
    }catch(err){
        console.log(err);
    }
}

export const deleteOrder= async (token,id) => {
    try{
        const response = await axios.delete('http://52.231.107.168:3000/api/v1/orders/'+id,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log(response);
    }catch(err){
        console.log(err);
    }
}

export const getMembers = async (token,website)=> {
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/member/all/'+website,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }catch(err){
        console.log(err);
    }
}

export const getMemberDetail= async(token,website,id)=>{
    try {
        const response = await axios.get('http://52.231.107.168:3000/api/v1/member/'+website+"/"+id,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    }catch(err){
        console.log(err);
    }
}




