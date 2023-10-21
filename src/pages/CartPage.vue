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
      phone_number: '',
      email: '',
      address: '',
      creditCardNumber: '',
      expiryDate: '',
      securityCode: '',
      orderStatus: null,
      dishesInCart: store.cart,
      showSuccessMessage: false,
      showErrorMessage: false,
    };
  },
  components: {
    HeaderComponent,
    FooterComponent,
  },
  computed: {
    numberOfItemsInCart() {
      return this.dishesInCart.length;
    },
    quantityForDishInCart() {
      return (dishId) => {
        const cartItem = this.dishesInCart.find(item => item.id === dishId);
        return cartItem ? cartItem.quantity : 1; // Ritorna 1 se non è trovato nel carrello
      };
    },
    totalPriceInCart() {
      // Calcola il prezzo totale basandosi sulle quantità dei piatti
      return this.dishesInCart.reduce((total, dish) => {
        return total + (dish.price * this.quantityForDishInCart(dish.id));
      }, 0).toFixed(2);
    },
    totalItemsInCart() {
      // Calcola il numero totale di articoli nel carrello basandosi sulle quantità dei piatti
      return this.dishesInCart.reduce((total, dish) => {
        return total + this.quantityForDishInCart(dish.id);
      }, 0);
    },
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
        console.log('Prezzo del piatto: ' + dish.price);
        return total + dish.price;
      }, 0);
      return parseFloat(totalPrice.toFixed(2));
    },
    clearCart() {
      // Svuota il carrello nell'oggetto store
      store.clearCart();

      // Svuota anche il carrello nel localStorage
      localStorage.removeItem('cart');
    },
    redirectToHome() {
      // Naviga alla home page
      router.push({ name: 'home' });
    },
    submitPaymentForm() {
      console.log('Piatti nel carrello:', this.dishesInCart);
      console.log('Dati del carrello:', this.dishesInCart);

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
        axios.post('https://payments.sandbox.braintree-api.com/graphql', {
            query: `
                mutation ExampleVaultWithTypeFragment($input: VaultPaymentMethodInput!) {
                    vaultPaymentMethod(input: $input) {
                        paymentMethod {
                            id
                            usage
                            details {
                                __typename
                                ... on CreditCardDetails {
                                    cardholderName
                                }
                                ... on PaypalAccountDetails {
                                    payer {
                                        email
                                    }
                                }
                                ... on VenmoAccountDetails {
                                    username
                                }
                                ... on UsBankAccountDetails {
                                    accountHolderName
                                }
                            }
                        }
                        verification {
                            status
                        }
                    }
                }
            `,
            variables: {
                input: {
                    paymentMethodId: "<single-use-payment-method-id>"
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic BASE64_ENCODED(PUBLIC_KEY:PRIVATE_KEY)',
                'Braintree-Version': '2019-01-01'
            }
        })
        .then(response => {
            console.log('Risposta GraphQL:', response.data);

            console.log('successo')
        })
        .catch(error => {
            console.error("Errore durante la richiesta GraphQL:", error);
            // Gestisci l'errore qui
        });
    }
  },
};
</script>

<template>
    <HeaderComponent></HeaderComponent>
    <h2 class="text-center my-4">Lista ordini</h2>
<div class="big-container">
    <div class="my-container d-flex flex-wrap">
      <div v-for="(dish, index) in dishesInCart" :key="index" class="card m-2" style="width: 18rem;">
  <div class="card-body" v-if="dish">
    <h2 class="card-title">{{ dish.name }}</h2>
    <h4 class="card-text">{{ (dish.price * dish.quantity).toFixed(2) }}€</h4> <!-- Aggiorna questa parte -->
    <div class="mb-3">
      <label for="quantity">Quantità:</label>
      <input type="number" id="quantity" class="form-control quantity" v-model="dish.quantity" min="1" required>
    </div>
    <p class="card-text">{{ dish.description }}</p>
    <button @click="removeFromCartHandler(index)" class="btn btn-danger">Rimuovi dal carrello</button>
  </div>
</div>
      
    </div>

    <div v-if="dishesInCart.length === 0" class="not-order my-5">
      <h3 class="text-center">Non ci sono ordini nel tuo carrello.</h3>
    </div>

    <div class="recap-order">
    <h4>
      Totale provvisorio ({{ totalItemsInCart }} {{ totalItemsInCart === 1 ? 'articolo' : 'articoli' }})
    </h4>
    <h2 class="text-center">{{ totalPriceInCart }} €</h2>
    <div class="text-center" v-if="dishesInCart.length > 0">
      <button @click="openPaymentForm" class="btn btn-primary">Procedi all'Ordine</button>
      <button @click="clearCart" class="btn btn-danger">Svuota Carrello</button>
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
  <input type="text" id="creditCardNumber" maxlength="16" class="form-control" required pattern="[0-9]{16}" placeholder="0000-0000-0000-0000">
</div>

<div class="mb-3">
  <label for="expiryDate" class="form-label">Data di Scadenza (MM/YY)</label>
  <input type="text" class="form-control" id="expiryDate" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}" placeholder="(MM/YY)">
</div>

<div class="mb-3">
  <label for="securityCode" class="form-label">Codice di Sicurezza</label>
  <input type="text" id="securityCode" class="form-control" required pattern="[0-9]{3}" placeholder="***">
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
.big-container{
  width: 80%;
  margin: 0 auto;
  display: flex;
}
.recap-order{
  padding: 10px;
  height: 200px;
  border: 1px solid black;
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
.quantity{
  width: 60px;
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
