'use strict'
import { getUserData } from "./util.js";

const host = 'http://localhost:3030';

async function request(method, url, body){

    let options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },     
    }

    const user = getUserData();
    if(user){
        options.headers['X-Authorization'] = user.accessToken;
    }

    if(body){
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(host + url, options);
    
        if(response.status == 204){
            return response;
        }
    
        const data = response.json();
        if(response.ok == false){
            throw new Error(data.message);
        }

        return data;
        
    } catch (error) {
        throw error
    }


}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');