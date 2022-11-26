'use strict'
import { logout } from "./auth.js";
import { clearData } from "./util.js";


let ctx = null;

export function showNavigation(context, next) {
    ctx = context
    const navElement = document.querySelector('header nav');
    const template = navView(ctx.user);
    ctx.render(template, navElement);
    next();
}



const navView = (isLoggedIn) => ctx.html`            
<section class="logo">
    <img src="./images/logo.png" alt="logo">
</section>
<ul>
    <!--Users and Guest-->
    <li><a href="/">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${heplNav(isLoggedIn, logoutHandler)}

</ul>`;



function heplNav(isLog, logoutHandler) {
    if (isLog) {
        return ctx.html`
            <li><a href="/create">Create Postcard</a></li>
            <li><a href="javascript:void(0)" @click=${logoutHandler}>Logout</a></li>`;
    } else {
        return ctx.html`
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>`;
    }
}

async function logoutHandler(event) {
    event.preventDefault();
    try {
        logout();
        clearData();
        ctx.page.redirect('/');

    } catch (error) {
        alert(error.message);
    }
}