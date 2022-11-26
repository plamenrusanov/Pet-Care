'use strict'

import { del, get, post } from "./api.js";

const endpoints = {
    getById: (id) => `/data/pets/${id}`,
    count: (id) => `/data/donation?where=${encodeURIComponent(`petId="${id}"`)}&count`,
    canDonate: (id, ownerId) => `/data/donation?where=${encodeURIComponent(`petId="${id}" AND _ownerId="${ownerId}"`)}&count`,
    deletePet: (id) => `/data/pets/${id}`,
    createDonate: '/data/donation',
    redirectToEdit: (id) => `/edit/${id}`,
    redirectToDetails: (id) => `/details/${id}`
}

let ctx = null;

export async function showDetailsView(context){
    ctx = context;
    const Id = ctx.params.id;

    
    const data = await get(endpoints.getById(Id));
    const count = await get(endpoints.count(Id));
    let donate = null;
    if(ctx.user){
       donate = await get(endpoints.canDonate(Id, ctx.user._id));
    }

    const template = createTemplate(data, ctx.user, count, donate);
    ctx.render(template, ctx.main);
}

function createTemplate(data, user, count, donate){
    return ctx.html` <section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${data.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${data.name}</h1>
                <h3>Breed: ${data.breed}</h3>
                <h4>Age: ${data.age}</h4>
                <h4>Weight: ${data.weight}</h4>
                <h4 class="donation">Donation: ${count * 100}$</h4>
            </div>
            ${user
                ? displayActions(data, user, donate)
                : ctx.nothing}
        </div>
    </div>
</section>`
}

function displayActions(data, user, donate){
    return ctx.html` 
    <!-- if there is no registered user, do not display div-->
    <div class="actionBtn">
        ${ data._ownerId == user._id
            ? ctx.html`
            <!-- Only for registered user and creator of the pets-->
            <a href="javascript:void(0)" @click=${editHandler} class="edit">Edit</a>
            <a href="javascript:void(0)" @click=${deleteHandler} class="remove">Delete</a>`
            : donate
                ? ctx.nothing
                : ctx.html`
                    <!--(Bonus Part) Only for no creator and user-->
                    <a href="javascript:void(0)" @click=${e => donateHandler(e, data._id)} class="donate">Donate</a>`
            
            }     
    </div>`
}

function editHandler(event){
    event.preventDefault();
    ctx.page.redirect(endpoints.redirectToEdit(ctx.params.id));
}

async function deleteHandler(event){
    event.preventDefault();
    await del(endpoints.deletePet(ctx.params.id));
    ctx.page.redirect('/');
}

async function donateHandler(event, petId){
    event.preventDefault();
    await post(endpoints.createDonate, {petId});
    ctx.page.redirect(endpoints.redirectToDetails(petId));
}