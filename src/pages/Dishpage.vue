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
      showMessage: false,
      store,
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
computed: {
    filteredDishes() {
      return this.dishes.filter((dish) => dish.restaurant_id === this.restaurantId);
    },
  },
  methods: {
    addToCartHandler(dish) {
      // Verifica se il carrello è vuoto o se il ristorante del piatto corrisponde al ristorante nel carrello
      if (store.cart.length === 0 || store.cart[0].restaurant_id === dish.restaurant_id) {
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
            quantity: 1,
            restaurant_id: dish.restaurant_id // Aggiungi l'ID del ristorante al piatto nel carrello
          });
        }

        localStorage.setItem('cart', JSON.stringify(store.cart));
        
        this.errorMessage = ''; // Pulisci eventuali messaggi di errore precedenti
      } else {
        // Mostra un messaggio di errore se il ristorante del piatto è diverso dal ristorante nel carrello
        this.errorMessage = 'Impossibile effettuare un ordine da più ristoranti.';
      }
      this.showMessage = true;
setTimeout(() => {
  this.showMessage = false;
  this.$refs.successMessage.classList.add('hidden');
}, 1000);
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
      const filteredDishes = response.data.results.filter(dish => dish.visible);
      
      this.dishes = filteredDishes;
    })
    .catch((error) => {
      console.error(error);
    });
    },
    clearCart() {
      if(confirm('Sei Sicuro di voler svuotare il carrello?')){

        // Svuota il carrello nell'oggetto store
        store.clearCart();
  
        // Svuota anche il carrello nel localStorage
        localStorage.removeItem('cart');
  
        // ricarica la pagina dopo lo svuotamento
        location.reload();
      }

    },
  },

};
</script>
<template>
    
      <HeaderComponent></HeaderComponent>
      <div v-if="showMessage"  class="div-add-message">
        <div class="success-message">
          Piatto aggiunto al carrello!
        </div>
      </div>
      <h2 class="text-center my-4 fw-bold">Lista Piatti</h2>
      <div class="container d-flex flex-wrap min-height justify-content-center">
      
        <div v-for="dish in filteredDishes" :key="dish.id" class="card m-2 mb-5 mx-3" style="width: 18rem;"  >
          <template v-if="dish.thumb" >
            <div class="min-space">
              <img :src="store.imgPath+'/' + dish.thumb" class="card-img-top card-img" alt="Restaurant Image">
            </div>
                </template>
          <div class="card-body d-flex flex-column justify-content-between">
            <h2 class="card-title text-capitalize fw-semibold fs-3">{{ dish.name }}</h2>
            <h4 class="card-text fs-5">{{ dish.price }}€</h4>
            <p class="card-text fs-5"><small>{{ dish.description }}</small></p>
            <button class="fw-semibold px-3" type="button" @click="addToCartHandler(dish)">Aggiungi al Carrello</button>

          </div>
        </div>
      </div>
       <!-- Messaggio di errore -->
      <div class="overlay" v-if="errorMessage">
        <div>
          <div class="error-message text-center rounded-5">
          {{ errorMessage }}
          <div class="text-center fs-5 btn btn-danger py-1 mt-2" @click="clearCart">Svuota carrello</div>
          <button class="text-center fs-4 mt-4" @click="resetError">Ho capito</button>
          </div>
        </div>
      </div>

      <FooterComponent></FooterComponent>
    
  </template>
  
<style scoped lang="scss">


.min-height{
  min-height: 380px;
}
.card{
  * {
    font-family: 'Montserrat', sans-serif; 
  }

  min-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
    max-width: 250px;
    max-height: 110px;
    word-wrap: break-word;
    overflow: hidden;
  }
  
}
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
.min-space{
  height: 200px;
  width: 18rem;
}
.card-img{
  height: 200px;
  object-fit: cover;
  object-position: center;
}
.div-add-message {
  position: fixed;
  z-index: 5;
  top: 50px;
  left: calc(50vw - 200px);
  animation-name: myAnimation;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;

  .success-message {
    width: 400px;
    color: green;
    border-radius: 20px;
    font-size: 1.5rem;
    height: 5vh;
    display: flex;
    align-items: center;
    background-color: white;
    padding: 10px;
    border: 3px solid green;
    text-align: center;
    z-index: 5;
    opacity: 1;
  }
}
@keyframes myAnimation{
  0%{
    opacity: 1;
    transform: rotateX(90deg);
  }
  50%{
    opacity: 0.7;
    transform: rotateX(0deg);
  }
  100%{
    display: none;
    opacity: 0.2;
    transform: rotateX(90deg);
  }
}


.success-message {
  font-size: 2rem;
  height: 30vh;
  display: flex;
  align-items: center;
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  z-index: 5;
}
.overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Opacità dello sfondo */
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 10; /* Assicura che l'overlay sia sopra gli altri elementi */
}

.error-message {
    font-size: 2rem;
    height: 15vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  text-align: center;
  z-index: 5; 
  margin-top: 20px;
  button{
margin: 0 20px;
  }
}
</style>
