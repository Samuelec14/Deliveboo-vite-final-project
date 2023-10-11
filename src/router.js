import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/Homepage.vue';
import RestaurantsPage from './pages/RestaurantsPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/restaurants',
            name: 'restaurants',
            component: RestaurantsPage
        },
    ]
});

export { router };