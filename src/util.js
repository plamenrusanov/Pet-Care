'use strict'
const userKey = 'user';

export function getUserData(){
    const data = sessionStorage.getItem(userKey);
    return data ? JSON.parse(data) : undefined;
}

export function clearData(){
    sessionStorage.removeItem(userKey);
}

export function setUserData(data){
    sessionStorage.setItem(userKey, JSON.stringify(data));
}

export function createSubmitHandler(event, callback){
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    return callback(data, event.target);
}