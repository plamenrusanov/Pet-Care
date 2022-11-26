'use strict'
import { render, html, nothing} from "../node_modules/lit-html/lit-html.js";
import page  from '../node_modules/page/page.mjs';
import { showCreateView } from './createPet.js';
import { showDashboardView } from './dashboard.js';
import { showDetailsView } from './details.js';
import { showEditView } from './edit.js';
import { showLoginView } from './login.js';
import { showNavigation } from "./navigation.js";
import { showRegisterView } from './register.js';
import { getUserData } from "./util.js";
import { showWelcomePage } from './welcomePage.js';



page(decoreContext);
page(showNavigation);
page('/index.html', '/');
page('/', showWelcomePage);
page('/login', showLoginView);
page('/register', showRegisterView);
page('/dashboard', showDashboardView);
page('/dashboard/:id', showDetailsView);
page('/create', showCreateView);
page('/edit/:id', showEditView);
page('*', parseURL);
page('126777f5-3277-42ad-b874-76d043b069cb', parseURL);

page.start();


function decoreContext(ctx, next){
    ctx.html = html;
    ctx.render = render;
    ctx.nothing = nothing;
    ctx.user = getUserData();
    ctx.main = document.getElementById('content');
    next();
}

function parseURL(ctx, next){
    console.log('parse');
}

