<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import MainComponent from '../components/MainComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import Homepage from './Homepage.vue';
import RestaurantPage from './RestaurantsPage.vue';
import { store } from '../store';


export default {
    name: "App",
    components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Homepage,
    RestaurantPage,
    setup() {
        return { store };
    }
},
    data() {
        return{

        }
    },
    methods: {

    }
}
</script>

<template>
    <router-view>

        
    </router-view>

</template>

<style lang="scss">
@use "../assets/scss/main.scss";
@use "../assets/scss/partials/variables.scss" as *;

</style>
