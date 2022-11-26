'use strict'

import { register } from "./auth.js";
import { createSubmitHandler } from "./util.js";




let ctx = null;

export function showRegisterView(context) {

    ctx = context;

    const template = ctx.html`
    <section id="registerPage">
        <form class="registerForm" @submit=${e=> createSubmitHandler(e, registerHandler)}>
            <img src="./images/logo.png" alt="logo" />
            <h2>Register</h2>
            <div class="on-dark">
                <label for="email">Email:</label>
                <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
            </div>
    
            <div class="on-dark">
                <label for="password">Password:</label>
                <input id="password" name="password" type="password" placeholder="********" value="">
            </div>
    
            <div class="on-dark">
                <label for="repeatPassword">Repeat Password:</label>
                <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
            </div>
    
            <button class="btn" type="submit">Register</button>
    
            <p class="field">
                <span>If you have profile click <a href="javascript:void(0)" @click=${goToLogin}>here</a></span>
            </p>
        </form>
    </section>`;

    ctx.render(template, ctx.main);

}

async function registerHandler({ email, password, repeatPassword }, form) {
    try {
        if(!email || !password || !repeatPassword){
            throw new Error('All fields are requared!');
        }
        if (password != repeatPassword) {
            throw new Error('Password don\`t match Confirm Password!');
        }
        await register(email, password);
        form.reset();
        ctx.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}

function goToLogin(){
    ctx.page.redirect('/login')
}