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
    return{
        restaurants: [],
    }
    },
    mounted() {
    this.fetchRestaurants();
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
  },
}
</script>

<template>

    <HeaderComponent></HeaderComponent>
    <div class="container d-flex flex-wrap">
    <div v-for="restaurant in restaurants" :key="restaurant.id" class="card m-2" style="width: 18rem;">
      <img :src="restaurant.thumb" class="card-img-top" alt="...">
      <div class="card-body">
        <h2 class="card-title">{{ restaurant.name }}</h2>
        <h4 class="card-text">tipologie del ristorante</h4>
        <p class="card-text">{{ restaurant.address }}</p>
        <h3>{{ restaurant.phone_number }}</h3>
      </div>
    </div>
</div>
    <FooterComponent></FooterComponent>
        
       
        


</template>



<style scoped lang="scss">

</style>