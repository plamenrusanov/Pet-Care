'use strict'
import { get, post } from "./api.js";
import { setUserData } from "./util.js";


const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login(email, password){
    const data = await post(endpoints.login, {email, password});
    setUserData(data);
    return data;
}

export async function register(email, password){
    const data = await post(endpoints.register, {email, password});
    setUserData(data);
    return data;
}

export async function logout(){
    await get(endpoints.logout);
}