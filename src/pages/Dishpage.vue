<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store';
import { inject } from 'vue';


export default {
  props: {
    dish: Object,
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  
  data() {
    return {
      dishes: [],
      restaurantId: null,
      errorMessage: '', 
    };
  },
  props: {
    restaurant_id: {
      type: Number,
      required: true,
    },

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
    addToCartHandler(dish) {
      if (store.cart.length === 0 || (store.cart[0] && store.cart[0].restaurant_id === dish.restaurant_id)) {
        store.addToCart(dish);
        console.log('Piatto aggiunto al carrello:', dish);
        this.errorMessage = ''; // Pulisci eventuali messaggi di errore precedenti
      } else if (store.cart.length > 0) {
        this.errorMessage = 'Impossibile effettuare un ordine da più ristoranti.';
      } else {
        this.errorMessage = '';
      }
    },
    resetError() {
      this.errorMessage = ''; // Resetta il messaggio di errore
    },
    fetchDishes() {
      axios
        .get(`http://127.0.0.1:8000/api/dish/dish/${this.restaurantId}`)
        .then((response) => {
          this.dishes = response.data.results;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    filteredDishes() {
      return this.dishes.filter((dish) => dish.restaurant_id === this.restaurantId);
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
            <button type="button" @click="addToCartHandler(dish)">Aggiungi al Carrello</button>

          </div>
        </div>
      </div>
       <!-- Messaggio di errore -->
       <div class="overlay" v-if="errorMessage">
      <div class="error-message">
        {{ errorMessage }}
        <button @click="resetError">Ho capito</button>
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
.error-message{
    color: red;
}

.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Opacità dello sfondo */
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; /* Assicura che l'overlay sia sopra gli altri elementi */
}

.error-message {
    font-size: 2rem;
    height: 30vh;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  z-index: 5; 
  button{
margin: 0 20px;
  }
}
</style>
