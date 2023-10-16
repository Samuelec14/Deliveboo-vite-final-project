<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import { mapMutations } from 'vuex';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store';

export default {
  props: {
    dish: Object 
    required: true
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      dishes: [],
      restaurantId: null,
    };
  },
  props: {
    restaurant_id: {
      type: Number,
      required: true,
    },
    dish: {
      type: Object,
      required: true
    }
  },
  watch: {
    restaurant_id(newValue, oldValue) {
      this.fetchDishes();
    },
  },
  created() {
    const routeRestaurantId = this.$route.params.restaurant_id;
    this.restaurantId = parseInt(routeRestaurantId);
    this.fetchDishes();
  },
  methods: {
    ...mapMutations(['addToCart']),
    addToCartHandler(dish) {
    console.log('Piatto aggiunto al carrello:', this.dish);
    store.cart.push(this.dish);
    this.addToCart(dish);
    this.$router.push({ name: 'cart', params: { dish: dish } });
    console.log('Dishes in cart:', store.cart);
    this.$emit('addToCart', this.dish);
  },
    fetchDishes() {
      axios.get(`http://127.0.0.1:8000/api/dish/dish/${this.restaurantId}`)
        .then(response => {
          this.dishes = response.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
   
  },
  computed: {
    filteredDishes() {
      return this.dishes.filter(dish => dish.restaurant_id === this.restaurantId);
    },
  },
};
</script>

<template>
    <div>
      <HeaderComponent></HeaderComponent>
      <h2 class="text-center my-4">Lista Piatti</h2>
      <div class="container d-flex flex-wrap">
        <div v-for="dish in filteredDishes" :key="dish.id" class="card m-2" style="width: 18rem;">
          <img :src="dish.thumb" class="card-img-top" alt="...">
          <div class="card-body">
            <h2 class="card-title">{{ dish.name }}</h2>
            <h4 class="card-text">{{ dish.price }}€</h4>
            <p class="card-text">{{ dish.description }}</p>
            <button @click="addToCartHandler(dish)">Aggiungi al Carrello</button>

          </div>
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
<style scoped lang="scss">
button{
    background-color: orange;
    color: black;
    border-radius: 10px;
    border: none;
    padding: 5px;
}
button:hover{
    cursor: pointer;
    border: 1px solid black;
}
</style>
