<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store'


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
  store.cart = JSON.parse(localStorage.getItem('cart')) || [];
  const savedCart = localStorage.getItem('cart');
 

  if (this.$route.params.dish) {
    this.dish = this.$route.params.dish;
  }
},

  methods: {
    addToCartHandler(dish) {
  const existingDishIndex = store.cart.findIndex(item => item.id === dish.id);

  if (existingDishIndex !== -1) {
    // Se il piatto è già nel carrello, aggiorna solo la quantità
    store.cart[existingDishIndex].quantity++;
  } else {
    // Se il piatto non è nel carrello, aggiungilo con quantità 1
    store.addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      quantity: 1, // Imposta la quantità iniziale a 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(store.cart));
  console.log('Piatto aggiunto al carrello:', dish);
  this.errorMessage = ''; // Pulisci eventuali messaggi di errore precedenti
},
  removeFromCartHandler(index) {
    store.removeFromCart(index);
    localStorage.setItem('cart', JSON.stringify(store.cart));
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
