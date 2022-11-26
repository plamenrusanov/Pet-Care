'use strict'
import { login } from "./auth.js";
import { createSubmitHandler } from "./util.js";

let ctx = null;

export function showLoginView(context) {
    ctx = context;
    const template = context.html`
    <section id="loginPage">
        <form class="loginForm" @submit=${e => createSubmitHandler(e, loginHandler)}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Login</h2>
            <div>
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div>
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Login</button>
    
            <p class="field">
                <span>If you don't have profile click <a href="javascript:void(0)" @click=${goToRegister}>here </a> </span> </p> </form> </section>`;

    context.render(template, context.main);
}

async function loginHandler({ email, password }, form) {
    try {
        if(!email || !password){
            throw new Error('All fields are requared!')
        }
        await login(email, password);
        form.reset();
        ctx.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}

function goToRegister(){
    ctx.page.redirect('/register');
}

