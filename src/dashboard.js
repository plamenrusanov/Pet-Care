'use strict'

import { get } from "./api.js";

const endpoints = {
    redirectToDetails: (id) => `/details/${id}`,
    getAll: '/data/pets?sortBy=_createdOn%20desc&distinct=name'
}

let ctx = null;

export async function showDashboardView(context) {
    ctx = context;
    
    const data = await getAllPets();

    const template = getTemplate(data)
   
    ctx.render(template, ctx.main);
}

async function getAllPets() {
    try {

        const data = await get(endpoints.getAll);

        return data;

    } catch (error) {
        alert(error.message);
    }
}

const getTemplate = (data) =>  ctx.html`
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
        <div class="animals-dashboard">
            ${
                data.length
                ? data.map(el => card(el))
                : ctx.html`<div><p class="no-pets">No pets in dashboard</p></div>`
            }
        </div>
    </section>`;


    const card = (item) => ctx.html`<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src=${item.image}>
    </article>
    <h2 class="name">${item.name}</h2>
    <h3 class="breed">${item.breed}</h3>
    <div class="action">
        <a class="btn" href="/dashboard/${encodeURIComponent(item._id)}">Details</a>
    </div>
    </div>`;

