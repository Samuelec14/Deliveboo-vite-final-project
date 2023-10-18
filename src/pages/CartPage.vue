<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { store } from '../store';
import axios from 'axios';
export default {
  data() {
    return {
      showPaymentForm: false,
      name: '',
      last_Name: '',
      phone_number:'',
      email:'',
      address:'',
      creditCardNumber: '',
      expiryDate: '',
      securityCode: ''
    
    };
  },
    components: {
        HeaderComponent,
        FooterComponent,
    },
    computed: {
        dishesInCart() {
            return store.cart;
        },
        numberOfItemsInCart() {
        return this.dishesInCart.length;
        },
        totalPriceInCart() {
          const total = this.dishesInCart.reduce((accumulator, dish) => {
              const price = parseFloat(dish.price); // Converti il prezzo in un numero
              return accumulator + price;
          }, 0);
          return parseFloat(total.toFixed(2));
}
    },
    created() {
        if (this.$route.params.dish) {
    this.dish = this.$route.params.dish;
        // Puoi fare qualcosa con this.dish qui
    }
},
    methods: {
      openPaymentForm() {
      this.showPaymentForm = true;
    },
    closePaymentForm() {
      this.showPaymentForm = false;
    },

        removeFromCartHandler(index) {
            store.removeFromCart(index);
        },
        calculateTotalPrice() {
        const totalPrice = this.dishesInCart.reduce((total, dish) => {
            console.log('Prezzo del piatto: ' + dish.price); //
            return total + dish.price;
        }, 0);
        return parseFloat(totalPrice.toFixed(2));
    },
  
    submitPaymentForm() {
      const paymentData = {
        name: this.name,
        last_name: this.last_Name,
        phone_number: this.phone_number,
        email: this.email,
        address: this.address,
        creditCardNumber: this.creditCardNumber,
        expiryDate: this.expiryDate,
        securityCode: this.securityCode,
        total_price: this.totalPriceInCart,
        status: 'inviato', // Imposta lo stato a 'inviato'
        dishes: this.dishesInCart.map(dish => dish.id), // Invia solo gli ID dei piatti
      };


      // Invia i dati al backend usando Axios
      axios.post('/api/orders', paymentData)
        .then(response => {
          console.log('Ordine inviato con successo:', response.data);
          // Esegui altre azioni come il reindirizzamento alla pagina di conferma
        })
        .catch(error => {
          console.error("Errore durante l'invio dell'ordine:", error);
        });
    }
  }
};
</script>

<template>
   
      <HeaderComponent></HeaderComponent>
      <h2 class="text-center my-4">Lista ordini</h2>
      <div class="container d-flex ">
        <div class="my-container d-flex flex-wrap" v-if="dishesInCart.length > 0">
  <!-- Mostra i piatti nel carrello solo se ci sono piatti -->
  <div v-for="(dish, index) in dishesInCart" :key="index" class="card m-2" style="width: 18rem;">
    <div v-if="dish"> <!-- Utilizza v-if su un div o span -->
      <div class="card-body">
        <h2 class="card-title">{{ dish.name }}</h2>
        <h4 class="card-text">{{ dish.price }}€</h4>
        <p class="card-text">{{ dish.description }}</p>
        <button @click="removeFromCartHandler(index)">Rimuovi dal carrello</button>
      </div>
    </div>
  </div>
</div>
<div v-else class="not-order my-5" >
  <!-- Messaggio quando il carrello è vuoto -->
  <h3 class="text-center">Non ci sono ordini nel tuo carrello.</h3>
</div>
      <div class="recap-order">
        <h4>Totale provvisorio ({{ numberOfItemsInCart }} {{ numberOfItemsInCart === 1 ? 'articolo' : 'articoli' }}  ) </h4>
        <h2 class="text-center">{{ totalPriceInCart }} €</h2>
        <div class="text-center" v-if="dishesInCart.length > 0">
          <button @click="openPaymentForm">Procedi all'Ordine</button>
        </div>

      </div>
    </div>

    <!-- pagamento -->
    
    <div v-if="showPaymentForm">
        <div class="overlay"></div> <!-- Aggiungi l'overlay qui -->
        <div class="payment-form">
    <h2>Dettagli Pagamento</h2>
    <form @submit.prevent="submitPaymentForm">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="last_name" class="form-label">Cognome</label>
        <input type="text" class="form-control" v-model="last_Name" required>
      </div>
      <div class="mb-3">
        <label for="phone_number" class="form-label">numero di telefono</label>
        <input type="number" min="10" class="form-control" v-model="phone_number" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">email</label>
        <input type="email" class="form-control" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">indirizzo</label>
        <input type="text" min="10" class="form-control" v-model="address" required>
      </div>
      <div class="mb-3">
      <label for="creditCardNumber" class="form-label">Numero della Carta di Credito</label>
      <input type="text" class="form-control" v-model="creditCardNumber" >
    </div>
    <div class="mb-3">
      <label for="expiryDate" class="form-label">Data di Scadenza</label>
      <input type="text" class="form-control" v-model="expiryDate" placeholder="MM/YY" >
    </div>
    <div class="mb-3">
      <label for="securityCode" class="form-label">Codice di Sicurezza</label>
      <input type="text" class="form-control" v-model="securityCode" >
    </div>
      <!-- Altri campi del modulo come telefono, indirizzo, ecc. -->
      <button type="submit" class="btn btn-primary">Conferma Pagamento</button>
      <button type="button" class="btn btn-secondary" @click="closePaymentForm">Annulla Pagamento</button>
    </form>
</div>
    </div>
      <FooterComponent></FooterComponent>
    
  </template>
  
  
  

<style scoped lang="scss">
.my-container{
    width: 70%;
    position: relative;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 998; 
}

.payment-form {
    width: 60%;
    min-width: 400px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.not-order{
  width: 70%;
  min-height: 300px;
}

</style>
