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
      showConfirmMessage: false,
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
    return total + parseInt(this.quantityForDishInCart(dish.id), 10);
  }, 0);
},
  },
  created() {
    const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    
    this.dishesInCart = JSON.parse(savedCart);
  }

  if (this.$route.params.dish) {
    this.dish = this.$route.params.dish;
    
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
    // Rimuovi l'elemento dal carrello
    this.dishesInCart.splice(index, 1);

    // Salva lo stato aggiornato nel localStorage
    localStorage.setItem('cart', JSON.stringify(this.dishesInCart));
  },
    calculateTotalPrice() {
      const totalPrice = this.dishesInCart.reduce((total, dish) => {
        console.log('Prezzo del piatto: ' + dish.price);
        return total + dish.price;
      }, 0);
      return parseFloat(totalPrice.toFixed(2));
    },
    updateCartItemQuantity(index, newQuantity) {
    // Aggiorna la quantità nel carrello
    this.dishesInCart[index].quantity = newQuantity;

    // Salva lo stato aggiornato nel localStorage
    localStorage.setItem('cart', JSON.stringify(this.dishesInCart));
  },
    clearCart() {
      // Svuota il carrello nell'oggetto store
      store.clearCart();

      // Svuota anche il carrello nel localStorage
      localStorage.removeItem('cart');

      // ricarica la pagina dopo lo svuotamento
      location.reload();
    },
    confirmClearCart() {
    this.showConfirmMessage = true; // Mostra il messaggio di conferma
  },
    redirectToHome() {
      // Naviga alla home page
      router.push({ name: 'home' });
    },
  isDishInCart(dishId) {
    return this.dishesInCart.some(item => item.id === dishId);
  },

    submitPaymentForm() {
      console.log('Piatti nel carrello:', this.dishesInCart);
      console.log('Dati del carrello:', this.dishesInCart);
      const dishesWithQuantities = this.dishesInCart.map(dish => ({
  id: dish.id,
  quantity: dish.quantity // Includi la quantità del piatto
}));
      const paymentData = {
        name: this.name,
        last_name: this.last_name,
        phone_number: this.phone_number.toString(), 
        email: this.email,
        address: this.address,
        total_price: this.totalPriceInCart,
        status: 'inviato',
        dishes: dishesWithQuantities
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
          console.error("i dati non sono validi:", error);
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
    <HeaderComponent :isCartPage="true"></HeaderComponent>
    <h2 class="background text-center mb-4">Lista ordini</h2>
<div class="big-container">
    <div class="my-container background d-flex flex-wrap">
      <div v-for="(dish, index) in dishesInCart" :key="dish.id" class="my-card  d-flex m-2 mb-4"  :class="{ 'd-none': !isDishInCart(dish.id) }">
  <div class="card-body d-flex justify-content-around align-items-center" v-if="dish">
    <div class="dish-data">
      <h2 class="card-title fw-bold title-fix" >{{ dish.name }}</h2>
      <p class="card-text description-fix">{{ dish.description }}</p>
      <h4 class="card-text  mt-3 price">{{ (dish.price * dish.quantity).toFixed(2) }}€</h4> <!-- Aggiorna questa parte -->
    </div>
      <div class="mb-3  fs-4 my-quantity">
        <label for="quantity" class="me-2">Quantità: </label>
        <input type="number" id="quantity" class="form-control quantity mb-2" v-model="dish.quantity" @input="updateCartItemQuantity(index, $event.target.value)" min="1" required>
      </div>
    
    <div class="remove-button">
      <button @click="removeFromCartHandler(index)" class="btn btn-danger fs-6 fw-bold">Rimuovi dal carrello</button>

          </div>
    

  </div>
</div>
      
    

    <div v-if="dishesInCart.length === 0" class="not-order my-5 d-flex my-error">
      <h3 class="margin-left text-center fs-2 d-flex align-items-center justify-content-center flex-column">Il tuo carrello Deliveboo è vuoto. <br> aggiungi piatti al tuo carrello. <br>
        <span>
    <div v-if="dishesInCart.length === 0" class="text-center w-100 link-home start-button d-flex justify-content-center ms-5 ">
      <a class="btn btn-success text-white m-4" href="/" style="text-decoration: none;">Inizia subito!</a>

      
    </div></span></h3>
    </div>
  </div>



    <div class="recap-order  ">
    <h4>
      Totale provvisorio <br>({{ totalItemsInCart }}  {{ totalItemsInCart === 1 ? 'articolo' : 'articoli' }})
    </h4>
    <h2 class="text-center">{{ totalPriceInCart }} €</h2>
    <div class="text-center button-container" v-if="dishesInCart.length > 0">
      <button @click="openPaymentForm" class="btn btn-success me-1">Procedi all'Ordine</button>
      <button @click="confirmClearCart" class=" btn btn-danger me-1">Svuota Carrello</button>

    </div>
  </div>
  </div>

        <!-- messaggio di conferma svuota carrello -->
  <div v-if="showConfirmMessage" class="confirmation-message">
    <p>Sei sicuro di voler svuotare il carrello?</p>
    <button @click="clearCart" class="confirm-button">Conferma</button>
    <button @click="showConfirmMessage = false" class="cancel-button">Annulla</button>
  </div>

    <!-- pagamento -->
    
    <div v-if="showPaymentForm">
        <div class="overlay"></div> <!-- Aggiungi l'overlay qui -->
        <div class="payment-form">
    
    <form @submit.prevent="submitPaymentForm" v-if="!orderStatus">
      <h2 class="fw-bold">Procedi al Pagamento</h2>
      <div class="flex">
      <div class="info-container">
      <div class="mb-3">
        <label for="name" class="form-label ">Nome</label>
        <input type="text" class="form-control" id="name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="last_name" class="form-label">Cognome</label>
        <input type="text" class="form-control" id="last_name" v-model="last_name" required>
      </div>
      <div class="mb-3">
        <label for="phone_number" class="form-label">Numero di Telefono</label>
        <input type="number" min="111111111" max='9999999999999' id="phone_number"  class="form-control" v-model="phone_number" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
    
    </div>
      <div class="creditcard-container ">
        <div class="mb-3">
        <label for="address" class="form-label">Indirizzo</label>
        <input type="text"  class="form-control my-input" id="address" v-model="address" required>
      </div>
      <h3 class="fw-bold"> Dati di  Pagamento</h3>
      <div class="mb-3">
        
  <label for="creditCardNumber" class="form-label">Numero della Carta </label>
  <input type="text" id="creditCardNumber" maxlength="16" class="form-control  my-input" required pattern="[0-9]{16}" placeholder="0000-0000-0000-0000">
</div>
<div class="d-flex justify-content-around  aligt-items-center card-data">
<div class="mb-3 date">
  <label for="expiryDate" class="form-label text-center">Data di Scadenza</label>
</div>

<div class="mb-3 code text-center">
  <label for="securityCode" class="form-label ">Codice di Sicurezza</label>
</div>
</div>
<div class="d-flex justify-content-around  aligt-items-center card-data">
<div class="mb-3 date">
  <div class="d-flex justify-content-center"><input type="text" class="form-control" id="expiryDate" required pattern="(0[1-9]|1[0-2])\/[0-9]{2}" placeholder="(MM/YY)"></div>
</div>

<div class="mb-3 code text-center">
  <div class="d-flex justify-content-center"><input type="text" id="securityCode" class="form-control" required pattern="[0-9]{3}" placeholder="***"></div>
</div>
</div>
</div>
</div>
      <!-- Altri campi del modulo come telefono, indirizzo, ecc. -->
    <div class="flex-button ">
      <button type="button" class="btn btn-danger text-light  fw-light" @click="closePaymentForm">Annulla Pagamento</button>
        <button type="submit" class="btn btn-primary  fw-light">Conferma Pagamento</button>
        
    </div>
    </form>
    
  <div v-if="orderStatus === 'success' && showSuccessMessage" class="success-message">
   <h5 class="text-center"> Il tuo Ordine è Stato Completato</h5>
    <button class="green-button btn btn-success border border-dark px-3" type="button" @click="redirectToHome">Torna alla home</button>
  </div>

  <div v-if="orderStatus === 'error'" class="error-message d-flex align-items-center justify-content-between fs-3">
    I dati nell'ordine non sono validi.
    <button type="button" class="btn btn-danger fw-light" @click="closePaymentForm">Annulla Pagamento</button>
  </div>
</div>
<!-- risultato invio ordine -->

    </div>


      <FooterComponent></FooterComponent>
    
</template>
  
  
  

<style scoped lang="scss">

*{
    font-family: 'Montserrat', sans-serif;

  }

.margin-left {
  margin-left:150px;
}

.my-container{
    width: 80%;
    position: relative;
}
.big-container{
  width: 80%;
  margin: 0 auto;
  display: flex;
  min-height: 380px;

  .recap-order{
  position: sticky;
  top: 30px;
  text-align: center;
  padding: 10px;
  max-height: 30vh;
  border: 10px solid #EF6C00;
  border-radius: 30px;
  width: 320px;
  h4{
    line-height:30px;
    font-size: 1.3rem;
  }
  
 

    button{
      margin: 0 auto 15px auto;
      font-weight: lighter;
    }
  
}
}

.my-card{
 background-color: white;
 width: 100%;
 max-height: 200px;
.dish-data{
  width:40%;
}
  h2{
    max-height: 30px;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .description-fix{
max-height: 90px;
overflow: hidden;
}
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
.my-error{
  width:100%;
  position: relative;
  text-align: center;
  left: -4vw;
  h3{
    font-size: 4rem
  }
}
.start-button{
  position: relative;
  left: -5vw;
}
.quantity{
  width: 60px;
}
.creditcard-container{
  padding: 20px;
  h3{
    font-size: 1.3rem;
  }
  .my-input{
    max-width: 100%;
  }
.card-data{
 .date{
  margin-right: 20px;
  input{
    width: 120px;
    text-align: center;
  }
 }
 .code{
  width: 200px;
input{
  min-width: 60px;
  text-align: center;
}
 }
}
}
.info-container{
  padding: 20px;
  min-width: 30vw;
}
.creditcard-container{
  padding: 20px;
  min-width: 30vw;
}

.payment-form {
  * {
    font-family: 'Montserrat', sans-serif; 
  }
  .flex{
    display: flex;
  }
  .flex-button{
    display: flex;
    justify-content: flex-end;
    button{
      margin: 0 10px;
    }
  }
  form{
    padding: 20px;
  }

    
    min-width: 200px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.success-message {
  width: 320px;
  background-color: #dff0d8; /* Colore di sfondo verde per il messaggio di successo */
  color: #3c763d; /* Colore del testo verde scuro */
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6e9c6; /* Bordo verde chiaro */
  border-radius: 5px;
  
}

.error-message {
  background-color: #f2dede; /* Colore di sfondo rosso per il messaggio di errore */
  color: #a94442; /* Colore del testo rosso scuro */
  padding: 10px;
  border: 1px solid #ebccd1; /* Bordo rosso chiaro */
  border-radius: 5px;
  margin-top: 20px;
}



.confirmation-message {
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
  
}

.confirm-button{
  margin: 10px  10px 0 10px;
  color: green;
  cursor: pointer;
  background-color: lightgreen;
  transition: transform 0.3s;
  
}
.cancel-button {
  margin: 10px  10px 0 10px;
  cursor: pointer;
  color: purple;
  background-color: lightcoral;
  transition: transform 0.3s;

  
}
.confirm-button:hover{
  color: black;
  cursor: pointer;
  transform: scale(110%);
  background-color: lightgreen;
}
.cancel-button:hover {
  cursor: pointer;
  color: red;
  transform: scale(110%);
  background-color: lightcoral;
  
  
}
@media (max-width:425px) {
         
  .payment-form {
  * {
    font-family: 'Montserrat', sans-serif; 
   
  }
  form{
    padding: 20px;
  }
.flex{
  display: block;
  
}
.flex-button{
    display: flex;
    flex-direction: column-reverse;
  
    button{
      margin: 10px auto;
      text-align: center;
    }
  }
input{
  max-width: 200px;
}
.my-input{
  max-width: 215px;
}
.card-data{
  max-width: 220px;
}
.success-message{
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  position: sticky;
  top: 40%;
  h5{
    height: 60px;
    word-wrap: break-word;

  }
}
#expiryDate{
  max-width: 90px;
}
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 999;
}
.not-order{
  text-align: center;
  span{
    width: 100%;
    text-align: center;
    .start-button{
      left: -6vh;
    }
  }
  h3{
    text-align: center;
    margin-left: 0;
  }
}
.big-container{
            flex-direction: column-reverse;
            .recap-order{
              max-width: 100%;
              position:relative;
              margin-bottom: 40px;
            }
            .my-container{
              width: 100%;
              .my-card{
                width: 100%;
                max-height: 600px;
                
                .card-body{
                  flex-direction: column;
                  .dish-data{
                    margin-top: 10px;
                    width: 80%;
                  }
                  .price{
                    text-align: center;
                    font-size: 2rem;
                  }
                  .my-quantity{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .quantity{
                    text-align: center;
                  }
                  }
                 
                }
              }
            }
          }
        }


</style>
