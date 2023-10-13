<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import MainComponent from '../components/MainComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';

export default {
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent,
    },
    data() {
        return {
            restaurants: [],
            dishes: [], 
        };
    },
    mounted() {
        this.fetchRestaurants();
        this.fetchDish();
    },
    methods: {
        fetchRestaurants() {
            axios.get('http://127.0.0.1:8000/api/restaurant/restaurant')
                .then(response => {
                    this.restaurants = response.data.results;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        fetchDish() {
            axios.get('http://127.0.0.1:8000/api/dish/dish')
                .then(response => {
                    this.dishes = response.data.results; // Utilizza "dishes" invece di "dishs"
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
  
};
</script>

<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <h2 class="text-center my-4">Lista Piatti</h2>
        <div class="container d-flex flex-wrap">
            <div v-for="dish in dishes" :key="dish.id" class="card m-2" style="width: 18rem;">
                <img :src="dish.thumb" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">{{ dish.name }}</h2>
                    <h4 class="card-text">{{ dish.price }}</h4>
                    <p class="card-text">{{ dish.description }}</p>
                </div>
            </div>
        </div>
        <FooterComponent></FooterComponent>
    </div>
</template>

<style scoped lang="scss">

</style>
