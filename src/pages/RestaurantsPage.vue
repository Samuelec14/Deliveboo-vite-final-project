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
            types: [],
            store,
            searchValue: '',
            loading: false,
            
        };
    },
    computed: {
        searchMessage() {
            if (this.store.restaurants && this.store.restaurants.length > 0 && !this.showError) {
            return 'Stai cercando:';
            } else {
            return 'Nessun ristorante disponibile per la tua ricerca';
            }
        }
    },
    methods: {

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
        async fetchRandomRestaurants() {
            this.loading = true;
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant`)
            .then(response => {
                this.store.restaurants = response.data.results; 
                this.loading = false;               
            })
            .catch(error => {
                console.error(error);
            });
        },

        // Go to the dish page of each restaurant
        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        }
    },
    mounted() {
        this.fetchTypes();
        this.fetchRandomRestaurants();

    },
};
</script>

<template>
    <div class="background ">
        <!-- Header Component -->
        <HeaderComponent></HeaderComponent>
    
        <!-- Searchbar Component -->
        <Searchbar />
    
    <div id="main-container" class="container pb-5">
        <div class="row">
            <div class="col-12 text-center my-3">
                <h2>{{ searchMessage }}</h2>
            </div>


            <!-- Print Restaurants by Type -->
            <template v-if="store.restaurants && store.restaurants.length > 0">
                <div v-for="restaurant in store.restaurants" :key="restaurant.id" class="col-12 col-md-6 col-lg-4 my-3">
                    <div class="card" style="width: 100%;" @click="navigateToDish(restaurant.id)">
                    <template v-if="restaurant.thumb">
                        <img :src="store.imgPath+'/' + restaurant.thumb" class="card-img-top" alt="Restaurant Image">
                    </template>
                    <div class="card-body">
                        <h2 class="card-title">{{ restaurant.name }}</h2>
                        <!-- <h4 class="card-text">Tipologie del ristorante</h4> -->
                        <p class="card-text">{{ restaurant.address }}</p>
                        <h3 class="phone-number p-3">{{ restaurant.phone_number }}</h3>
                    </div>
                    </div>
                </div>
            </template>

            <!-- Messaggio se l'array è vuoto -->
        
        </div>
    </div>
  
      <!-- Footer Component -->
      <FooterComponent></FooterComponent>
    </div>
</template>

<style scoped lang="scss">

* {
    font-family: 'Montserrat', sans-serif; 
}

.background {
    background-color: #F6F7E9;
}


#main-container {
    min-height: 800px;
}

.card {
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 10px; 
    background-color: #f9f9f9; 
}


.card-img-top {
    height: 200px;
    max-height: 300px;
    object-fit: contain; 
    object-position: center;
    width: 100%;
}

.card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;  
    padding-bottom: 5px;  
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.phone-number {
    color: orange;
}
</style>
