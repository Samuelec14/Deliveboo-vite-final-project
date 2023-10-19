<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import MainComponent from '../components/MainComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import Searchbar from '../components/Searchbar.vue';

import axios from 'axios';
import { store } from '../store';

export default {
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent,
        Searchbar
    },
    data() {
        return {
            restaurants: [],
            types: [],
            store,
            searchValue: '',
            loading: false
        };
    },
    methods: {
        // SEARCH RESTAURANTS
        async fetchRestaurants(param) {

            this.loading = true;

            if (param == '') {
                param = 'all';
            }
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant/results/${param}`)
            .then(response => {
                this.restaurants = response.data.restaurants;
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
            });
        },

        // SEARCH TYPES -> gives an array of types
        async fetchTypes() {
            this.loading = true;
            axios.get(`http://127.0.0.1:8000/api/type/type`)
            .then(response => {
                this.types = response.data.results; 
                this.loading = false;               
            })
            .catch(error => {
                console.error(error);
            });
        },

        // Makes the page scroll to top (duh)
        scrollToTop() {
            document.body.scrollIntoView();
        },

        // Go to the dish page of each restaurant
        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },

        // Gets value from searchbar and performs a search with said value
        getValue(value) {
            this.searchValue = value;
            this.fetchRestaurants(this.searchValue);
        }
    },
    mounted() {
        this.fetchRestaurants(this.searchValue);
        this.fetchTypes();
    },
};
</script>

<template>
<div>
<!-- Header Component -->
<HeaderComponent></HeaderComponent>

<!-- Searchbar Component -->
<Searchbar @value="getValue" />

<div class="container">
    <div class="row">

    <!-- Print Restaurants by Type -->
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-12 col-md-6 col-lg-4 my-3">
        <div class="card" style="width: 100%;" @click="navigateToDish(restaurant.id)">
        <img :src="store.imgPath + restaurant.thumb" class="card-img-top" alt="Restaurant Image">
        <div class="card-body">
            <h2 class="card-title">{{ restaurant.name }}</h2>
            <h4 class="card-text">Tipologie del ristorante</h4>
            <p class="card-text">{{ restaurant.address }}</p>
            <h3 class="phone-number p-3">{{ restaurant.phone_number }}</h3>
        </div>
        </div>
    </div>

    <!-- Error Message -->
    <div v-if="restaurants.length === 0 && !loading" class="col-12 text-center">
        <h2>Nessun ristorante corrisponde a questa tipologia</h2>
    </div>
    </div>
</div>

<div class="container">
    <h3 class="text-center my-4">SCEGLI PER TIPOLOGIA</h3>
    <div class="row">
    <!-- Display Types -->
        <div v-for="type in types" :key="type.id" @click="fetchRestaurants(type.name); scrollToTop();" class="col-12 col-md-6 col-lg-4 my-3">
            <div class="card w-100">
                <img :src="store.imgPath + type.thumb" class="card-img-top" :alt="type.name">
                <div class="card-body">
                    <h2 class="card-title">{{ type.name }}</h2>
                    <h4>vedi i più vicini a te</h4>
                </div>
            </div>
        </div>
    </div>
</div>

    <!-- Footer Component -->
    <FooterComponent></FooterComponent>
  </div>
</template>

<style scoped lang="scss">
.card {
    cursor: pointer;
}

.phone-number {
    color: blue;
}
</style>
