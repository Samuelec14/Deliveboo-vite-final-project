<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { store } from '../store';
import { router } from '../router';
import axios from 'axios';

export default {
  data() {
    return {
      showPaymentForm: false,
      name: '',
      last_name: '',
      phone_number:'',
      email:'',
      address:'',
      orderStatus: null,
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
    redirectToHome() {
      // Naviga alla home page
      router.push({ name: 'home' });
    },
    submitPaymentForm() {
      const paymentData = {
        name: this.name,
        last_name: this.last_name,
        phone_number: this.phone_number.toString(),
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
        axios.post('http://localhost:8000/api/orders', paymentData)
        .then(response => {
          console.log('Ordine inviato con successo:', response.data);
          this.orderStatus = 'success'; // Imposta lo stato dell'ordine su 'success'
          store.clearCart(); // Svuota il carrello
          this.showSuccessMessage = true; // Mostra il messaggio di successo
          this.showErrorMessage = false; // Nascondi il messaggio di errore
        })
        .catch(error => {
          console.error("Errore durante l'invio dell'ordine:", error);
          this.orderStatus = 'error'; // Imposta lo stato dell'ordine su 'error'
          this.showErrorMessage = true; // Mostra il messaggio di errore
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
        <h2 class="text-center">{{ totalPriceInCart.toFixed(2) }} €</h2>
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
    <form @submit.prevent="submitPaymentForm" v-if="!orderStatus">
      <div class="mb-3">
        <label for="name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="last_name" class="form-label">Cognome</label>
        <input type="text" class="form-control" id="last_name" v-model="last_name" required>
      </div>
      <div class="mb-3">
        <label for="phone_number" class="form-label">numero di telefono</label>
        <input type="number" min="111111111" max='9999999999999' id="phone_number"  class="form-control" v-model="phone_number" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">indirizzo</label>
        <input type="text"  class="form-control" id="address" v-model="address" required>
      </div>
      <div class="mb-3">
      <label for="creditCardNumber" class="form-label">Numero della Carta di Credito</label>
      <input type="text" id="creditCardNumber" class="form-control" >
    </div>
    <div class="mb-3">
      <label for="expiryDate" class="form-label">Data di Scadenza</label>
      <input type="text" class="form-control" id="expiryDate" placeholder="MM/YY" >
    </div>
    <div class="mb-3">
      <label for="securityCode" class="form-label">Codice di Sicurezza</label>
      <input type="text" id="securityCode" class="form-control"  >
    </div>
      <!-- Altri campi del modulo come telefono, indirizzo, ecc. -->
      <button type="submit" class="btn btn-primary">Conferma Pagamento</button>
      <button type="button" class="btn btn-secondary" @click="closePaymentForm">Annulla Pagamento</button>
    </form>
    
  <div v-if="orderStatus === 'success' && showSuccessMessage" class="success-message">
    L'ordine è stato inviato con successo!
    <button type="button" @click="redirectToHome">Torna alla home</button>
  </div>

  <div v-if="orderStatus === 'error'" class="error-message">
    Si è verificato un errore durante l'invio dell'ordine. Riprova più tardi.
    <button type="button" class="btn btn-secondary" @click="closePaymentForm">Annulla Pagamento</button>
  </div>
</div>
<!-- risultato invio ordine -->

    </div>


      <FooterComponent></FooterComponent>
    
  </template>
  
  
  

<style scoped lang="scss">
.my-container{
    width: 80%;
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
.success-message {
  background-color: #dff0d8; /* Colore di sfondo verde per il messaggio di successo */
  color: #3c763d; /* Colore del testo verde scuro */
  padding: 10px;
  border: 1px solid #d6e9c6; /* Bordo verde chiaro */
  border-radius: 5px;
  margin-top: 20px;
}

.error-message {
  background-color: #f2dede; /* Colore di sfondo rosso per il messaggio di errore */
  color: #a94442; /* Colore del testo rosso scuro */
  padding: 10px;
  border: 1px solid #ebccd1; /* Bordo rosso chiaro */
  border-radius: 5px;
  margin-top: 20px;
}
</style>
