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
            restaurantsPerType: [],
            restaurantsPerName: [],
            types: [],
            store,
            searchValue: '',
            loading: false
        };
    },
    methods: {
        async fetchRestaurants(param) {

            this.loading = true;

            if (param == '') {
                param = 'all';
            }
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant/results/${param}`)
            .then(response => {
                this.restaurantsPerType = response.data.restaurantsByType;
                this.restaurantsPerName = response.data.restaurantsByName;
                this.loading = false;
            })
            .catch(error => {
                console.error(error);
            });
        },

        async fetchTypes() {
            axios.get(`http://127.0.0.1:8000/api/type/type`)
            .then(response => {
                this.types = response.data.results;                
            })
            .catch(error => {
                console.error(error);
            });
        },

        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },

        navigateToRestaurants(type) {
            this.$router.push({ name: 'restaurantsFilter', params: { search: type } });
        }
    },
    mounted() {
        this.fetchRestaurants(this.searchValue);
        this.fetchTypes();
    },
};
</script>

<template>
    
        <HeaderComponent></HeaderComponent>

        <Searchbar />
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
            <div v-if="restaurantsPerType.length == 0 && restaurantsPerName.length == 0 && loading == false">
                <h2>
                    Nessun ristorante corrisponde a questa tipologia
                </h2>
                <button @click="goback()" class="btn btn-primary">
                    Torna Indietro
                </button>
            </div>
        </div>

        <div class="container">
            <h3 class="text-center my-4">SCEGLI PER TIPOLOGIA</h3>
            <div class="container d-flex flex-wrap justify-content-center mb-4">
                <div v-for="type in types" :key="type.id" @click="navigateToRestaurants(type.name)" class="card m-2" style="width: 18rem;" v-if="types.length > 0">
                    <img :src="store.imgPath+type.thumb" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title">{{ type.name }}</h2>
                        <h4>vedi i più vicini a te</h4>
                    </div>
                </div>
            </div>
        </div>

        <FooterComponent></FooterComponent>
    
</template>

<style scoped lang="scss">
.card {
    cursor: pointer;
}

.phone-number {
    color: blue;
}
</style>
