import { createRouter, createWebHistory } from "vue-router";

import RestaurantsPage from './pages/RestaurantsPage.vue';
import Dishpage from './pages/Dishpage.vue';
import CartPage from './pages/CartPage.vue';
import UsPage from './pages/UsPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: RestaurantsPage
        },
        {
            path: '/dish/:restaurant_id',
            name: 'dish',
            component: Dishpage,
            props: true,
        },
        {
            path: '/us',
            name: 'us',
            component: UsPage,
            props: true,
        },
        {
            path: '/cart',
            name: 'cart',
            component: CartPage,
        }
    ]
});

export { router };

