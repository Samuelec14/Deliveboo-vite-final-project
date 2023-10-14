import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/Homepage.vue';
import RestaurantsPage from './pages/RestaurantsPage.vue';
import Dishpage from './pages/Dishpage.vue';


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
        {
            path: '/dish/:restaurant_id',
            name: 'dish',
            component: Dishpage,
            props: true,
        },
    ]
});

export { router };