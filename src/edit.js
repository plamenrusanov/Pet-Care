import { get, put } from "./api.js";
import { createSubmitHandler } from "./util.js";


let ctx = null;

export async function showEditView(context) {
    ctx = context;
    const data = await get(`/data/pets/${ctx.params.id}`)
    const template = createTemplate(data);
    ctx.render(template, ctx.main);
}


const createTemplate = (data) => ctx.html`
    <section id="editPage">
        <form class="editForm" @submit=${e=> createSubmitHandler(e, editHandler)}>
            <img src="${data.image}">
            <div>
                <h2>Edit PetPal</h2>
                <div class="name">
                    <label for="name">Name:</label>
                    <input name="name" id="name" type="text" .value=${data.name}>
                </div>
                <div class="breed">
                    <label for="breed">Breed:</label>
                    <input name="breed" id="breed" type="text" .value=${data.breed}>
                </div>
                <div class="Age">
                    <label for="age">Age:</label>
                    <input name="age" id="age" type="text" .value=${data.age}>
                </div>
                <div class="weight">
                    <label for="weight">Weight:</label>
                    <input name="weight" id="weight" type="text" .value=${data.weight}>
                </div>
                <div class="image">
                    <label for="image">Image:</label>
                    <input name="image" id="image" type="text" .value=${data.image}>
                </div>
                <button class="btn" type="submit">Edit Pet</button>
            </div>
        </form>
    </section>`;

async function editHandler({ name, breed, age, weight, image }, form) {
    await put(`/data/pets/${ctx.params.id}`, { name, breed, age, weight, image });
    form.reset();
    ctx.page.redirect(`/dashboard/${ctx.params.id}`);
}