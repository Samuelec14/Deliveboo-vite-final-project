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
    imgPath() {
      return store.imgPath;
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
            thumb: dish.thumb, 
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
  isDishInCart(dishId) {
    return store.cart.some(item => item.id === dishId);
  },
  getQuantityInCart(dishId) {
    const cartItem = store.cart.find(item => item.id === dishId);
    return cartItem ? cartItem.quantity : 0;
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

        // Svuota il carrello nell'oggetto store
        store.clearCart();
  
        // Svuota anche il carrello nel localStorage
        localStorage.removeItem('cart');
  
        // ricarica la pagina dopo lo svuotamento
        location.reload();

    },
  },

};
</script>
<template>
    
      <HeaderComponent></HeaderComponent>
    
      <div class="background-page">
      <h2 class="text-center py-4">Lista Piatti</h2>
      <div class="my-container  min-height justify-content-center">
      
        <div v-for="dish in filteredDishes" :key="dish.id" class=" d-flex m-2 mb-5 mx-3 new-card" 
     :class="{ 'dish-in-cart': isDishInCart(dish.id) }">          
     
          <div class="card-body d-flex  justify-content-between">
            <div class="description-container">
            <h2 class="card-title text-capitalize fw-semibold fs-3">{{ dish.name }}</h2>
            <p class="card-text fs-5"><small class="description">{{ dish.description }}</small></p>
            <h4 class="card-text price fs-4">{{ dish.price }}€</h4>
          </div>
          <div class="container-button">
            <div v-if="getQuantityInCart(dish.id) > 0">
              <h4>QT: {{ getQuantityInCart(dish.id) }}</h4>
            </div>
            <div>
            <button class="fw-bold text-capitalize" type="button" @click="addToCartHandler(dish)">Aggiungi</button>
            <button  v-if="getQuantityInCart(dish.id) > 0" @click="removeFromCartHandler(store.cart.findIndex(item => item.id === dish.id))" class="remove-button">Rimuovi</button>
          </div>
          </div><div></div>
          <div class="min-space">
            <template v-if="!dish.thumb">
              <h4 class="if-not-image">immagine non disponibile</h4>
            </template>
            <template v-else>
              <img :src="store.imgPath + '/' + dish.thumb" class="card-img-top card-img" alt="Restaurant Image">
            </template>
          </div>

          </div>
        </div>
      </div>
       <!-- Messaggio di errore -->
      <div class="overlay" v-if="errorMessage">
        <div>
          <div class="error-message text-center rounded-5">
          {{ errorMessage }}
          <div class="d-flex align-items-center my-clean">  
          <div class="confirm-button" @click="clearCart">Svuota carrello</div>
          <button class="cancel-button" @click="resetError">Ho capito</button>
        </div>
          </div>
        </div>
      </div>
    </div>
      <FooterComponent></FooterComponent>
    
  </template>
  
<style scoped lang="scss">

.my-container{
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .min-height{
  min-height: 380px;
}
}

.quantity{
  width: 50px;
}


.new-card{
  width: 45%;
  flex-wrap: wrap;
  padding: 10px;
  border-radius: 10px;
  border: 4px;
  background-color: white;
  border-bottom: 1px solid orange;
  transition: box-shadow 0.3s;
}
.new-card:hover{
  box-shadow: 0 3px orangered;
}
.dish-in-cart {
  border-bottom: 1px solid green;
  transition: border 0.3s;
 
}
.dish-in-cart:hover{
  box-shadow: 0 3px green;
}
.card{
  * {
    font-family: 'Montserrat', sans-serif; 
  }

 .card-body{
  max-width: 100%;
  overflow: hidden;
 }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.price{
    text-align: center;
  }
.background-page{
  width: 100%;
  background-color: rgb(230, 226, 226);
}
.container-button{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  button{
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 0;
    margin-right: 10px;
    font-size: 0.8rem;
    transition: border 0.2s;
    }
    .remove-button{
      font-weight: bold;
      padding: 0;
      margin: 0;
      color: red;
      background-color: transparent;
      font-size: 0.8rem;
      margin-top: 10px;
    }
    .remove-button:hover{
      border: none;
      color: black;
     
    }
}
.description-container{
  width: 270px;
  overflow: hidden;
  
  .description{
    font-family: 'Montserrat', sans-serif;
  }

  h2{
    text-align: center;
    max-width: 250px;
    height: 65px;
    word-wrap: break-word;
    overflow: hidden;
  }
  p{
    word-wrap: break-word;
    overflow: hidden;
    height: 90px;
    margin-left: 10px;
  }
}


button{
    background-color: orange;
    color: black;
    border-radius: 10px;
    border: none;
    padding: 5px;
    transition: border 0.3s;
}
button:hover{
    cursor: pointer;
    border: 1px solid black;
}
.error-message{
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  color: red;
  font-weight: bold;
}

.my-clean{
  margin-top: 20px;
}
.confirm-button{
  color: yellow;
  font-weight: lighter;
  cursor: pointer;
  background-color: orange;
  border-radius: 10px;
  padding: 10px;
  height: auto;
  
}
.cancel-button {
  padding: 10px;
  height: auto;
  cursor: pointer;
  color: green;
  background-color: lightgreen;
  font-weight: lighter;
}
.confirm-button:hover{
 
  cursor: pointer;
  transform: scale(110%);
  border: 1px solid black;
  
}
.cancel-button:hover {
  cursor: pointer;
  transform: scale(110%);

}
.min-space{
  height: 200px;
  overflow: hidden;
  .if-not-image{
    margin: 50% auto;
    font-size: 0.7rem;
    width: 100%;
    word-break: break-all;
  }
 
}
.card-img{
  height: 200px;
  width: 200px;
  max-width: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 5;
  border-radius: 10px;
  
}
.div-add-message {
  position: fixed;
  z-index: 100;
  top: 50px;
  left: calc(50vw - 200px);
  animation-name: myAnimation;
    animation-duration: 1000ms;
    animation-fill-mode: forwards;
}



.success-message {
  font-family: 'Montserrat', sans-serif;
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

    font-family: 'Montserrat', sans-serif;


    font-size: 2rem;
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

@media (max-width:425px) {

  .error-message{
    height: 400px;
    .my-clean{
      margin-top: 20px;
      div{
        height: auto;
      }
      button{
        height: auto;
      }
    }
  }
 
  .description-container{
  width: 200px;
  }
.new-card:hover{
  box-shadow:  3px orangered;
}

  .new-card{
    width: 100%;
    border: 1px solid orange;
  transition: box-shadow 0.3s;
    
  }
  .dish-in-cart {
  border: 1px solid green;
  transition: border 0.3s;
 
}
.dish-in-cart:hover{
  box-shadow: 0 3px green;
}
  .card-body{
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    .description-container{
    p{
      height: auto;
    
      max-height: 95px;
    }
  }
    .container-button{
      margin: 20px 0;
    }
    h2{
      max-height: 60px;
    }
    
    .min-space{
      .if-not-image{
        text-align: center;
      }
    }
  }
  
    .div-add-message{
    width: 100%;
    height: 100px;
    .success-message{
    width: 70%;
    height: 80px;
    text-align: center;
    margin: 0 auto;
  }

  }
 
  
}

</style>
