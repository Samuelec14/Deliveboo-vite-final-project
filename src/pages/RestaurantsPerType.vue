<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store';

export default {
    components: {
        HeaderComponent,
        FooterComponent,
    },
    data() {
        return {
            restaurants: [],
            store
        };
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.fetchRestaurants()
    },
    methods: {
        async fetchRestaurants() {
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant/${this.type}`)
                .then(response => {
                    this.restaurants = response.data.restaurants;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },
        goback() {
            this.$router.push({ name: 'restaurants'});
        }
    }
};
</script>

<template>
    <HeaderComponent />

    <div class="container d-flex flex-wrap">

            <!-- Print of Restaurants -->
            <div v-for="restaurant in restaurants" :key="restaurant.id" class="card m-2" style="width: 18rem;" v-if="restaurants.length > 0" @click="navigateToDish(restaurant.id)">
                <img :src="store.imgPath+restaurant.thumb" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">{{ restaurant.name }}</h2>
                    <h4 class="card-text">tipologie del ristorante</h4>
                    <p class="card-text">{{ restaurant.address }}</p>
                    <h3 class="phone-number p-3" @click.stop="navigateToDish(restaurant.id)">{{ restaurant.phone_number }}</h3>
                </div>
            </div>

            <!-- Error Message -->
            <div v-else>
                <h2>
                    Nessun ristorante corrisponde a questa tipologia
                </h2>
                <button @click="goback()" class="btn btn-primary">
                    Torna Indietro
                </button>
            </div>
            
        </div>

    <FooterComponent />
</template>

<style scoped lang="scss">
</style>