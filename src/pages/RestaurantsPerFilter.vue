<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import Searchbar from '../components/Searchbar.vue';
import axios from 'axios';
import { store } from '../store';

export default {
    components: {
        HeaderComponent,
        FooterComponent,
        Searchbar
    },
    data() {
        return {
            restaurantsPerType: [],
            restaurantsPerName: [],
            store,
            searchValue: ''
        };
    },
    props: {
        search: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.fetchRestaurants(this.search)
        
    },
    methods: {
        async fetchRestaurants(param) {

            if (param == '') {
                param = 'all';
            }
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant/results/${param}`)
            .then(response => {
                this.restaurantsPerType = response.data.restaurantsByType;
                this.restaurantsPerName = response.data.restaurantsByName;
                
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
        },
        getValue(value) {
            this.searchValue = value;
            this.fetchRestaurants(this.searchValue);
        }
    }
};
</script>

<template>
    <HeaderComponent />

    <Searchbar @value="getValue" />
    <div class="container d-flex flex-wrap">
        
            <!-- Print of Restaurants -->

            <!-- PER TYPE -->
            <template v-if="restaurantsPerType.length > 0">
                <div v-for="restaurant in restaurantsPerType" :key="restaurant.id" class="card m-2" style="width: 18rem;" @click="navigateToDish(restaurant.id)">
                    <img :src="store.imgPath+restaurant.thumb" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ restaurant.name }}
                        </h2>
                        <h4 class="card-text">
                            tipologie del ristorante
                        </h4>
                        <p class="card-text">
                            {{ restaurant.address }}
                        </p>
                        <h3 class="phone-number p-3">
                            {{ restaurant.phone_number }}
                        </h3>
                    </div>
                </div>
            </template>

            <!-- PER NAME -->
            <template v-if="restaurantsPerName.length > 0">
                <div v-for="restaurant in restaurantsPerName" :key="restaurant.id" class="card m-2" style="width: 18rem;" @click="navigateToDish(restaurant.id)">
                    <img :src="store.imgPath+restaurant.thumb" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ restaurant.name }}
                        </h2>
                        <h4 class="card-text">
                            tipologie del ristorante
                        </h4>
                        <p class="card-text">
                            {{ restaurant.address }}
                        </p>
                        <h3 class="phone-number p-3">
                            {{ restaurant.phone_number }}
                        </h3>
                    </div>
                </div>
            </template>

            <!-- Error Message -->
            <div v-if="restaurantsPerType.length == 0 && restaurantsPerName.length == 0">
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