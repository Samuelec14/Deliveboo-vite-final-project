import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/Homepage.vue';
import RestaurantsPage from './pages/RestaurantsPage.vue';
import Dishpage from './pages/Dishpage.vue';
import RestaurantsPerFilter from './pages/RestaurantsPerFilter.vue';
import CartPage from './pages/CartPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {
        //     path: '/',
        //     name: 'home',
        //     component: HomePage
        // },
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
            path: '/cart',
            name: 'cart',
            component: CartPage,
        },
        {
            path: '/restaurant/results/:search',
            name: 'restaurantsFilter',
            component: RestaurantsPerFilter,
            props: true
        }
    ]
});

export { router };

