<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import MainComponent from '../components/MainComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store';

export default {
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent,
    },
    data() {
        return {
            restaurants: [],
            types: [],
            store
        };
    },
    methods: {
        async fetchData() {
            try {
                const [restaurantsResponse, typesResponse] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/restaurant/restaurant'),
                    axios.get('http://127.0.0.1:8000/api/type/type')
                ]);

                this.restaurants = restaurantsResponse.data.results;
                this.types = typesResponse.data.results;
            } catch (error) {
                console.error(error);
            }
        },
        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },
        navigateToRestaurants(type) {
            this.$router.push({ name: 'restaurantsType', params: { type: type } });
        }
    },
    mounted() {
        this.fetchData();
    },
};
</script>

<template>
    <div>
        <HeaderComponent></HeaderComponent>
        <h2 class="text-center my-4">I PIÙ VICINI A TE</h2>
        <div class="container">
          <div class="row">
            <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-lg-3 col-md-6 col-sm-12 mb-4">
              <div class="card" style="width: 18rem;" v-if="restaurants.length > 0" @click="navigateToDish(restaurant.id)">
                <img :src="store.imgPath+restaurant.thumb" class="card-img-top" alt="...">
                <div class="card-body">
                    <h2 class="card-title">{{ restaurant.name }}</h2>
                    <h4 class="card-text">tipologie del ristorante</h4>
                    <p class="card-text">{{ restaurant.address }}</p>
                    <h3 class="phone-number p-3" @click.stop="navigateToDish(restaurant.id)">{{ restaurant.phone_number }}</h3>
                </div>
              </div>
                
            </div>
          </div>
            
        </div>

        <div class="container">
  <h3 class="text-center my-4">SCEGLI PER TIPOLOGIA</h3>
  <div class="row">
    <div v-for="type in types" :key="type.id" @click="navigateToRestaurants(type.name)" class="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div class="card mx-auto" style="width: 18rem;" v-if="types.length > 0">
        <img :src="store.imgPath + type.thumb" class="card-img-top" alt="...">
        <div class="card-body">
          <h2 class="card-title">{{ type.name }}</h2>
          <h4>vedi i più vicini a te</h4>
        </div>
      </div>
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
