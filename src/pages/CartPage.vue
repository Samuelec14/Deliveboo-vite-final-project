<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { store } from '../store';
export default {
   
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
        removeFromCartHandler(index) {
            store.removeFromCart(index);
        },
        calculateTotalPrice() {
        const totalPrice = this.dishesInCart.reduce((total, dish) => {
            console.log('Prezzo del piatto: ' + dish.price); // Debug: stampa il prezzo nel console.log
            return total + dish.price;
        }, 0);
        return parseFloat(totalPrice.toFixed(2));
    }
    }
};
</script>

<template>
   
      <HeaderComponent></HeaderComponent>
      <h2 class="text-center my-4">Lista ordini</h2>
      <div class="container d-flex ">
      <div class="my-container d-flex flex-wrap">
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
      <div class="recap-order">
        <h4>Totale provvisorio ({{ numberOfItemsInCart }} {{ numberOfItemsInCart === 1 ? 'articolo' : 'articoli' }}  ) </h4>
        <h2 class="text-center">{{ totalPriceInCart }} €</h2>
        <div class="text-center "> <button>Procedi all'Ordine</button></div>
      </div>
    </div>
      <FooterComponent></FooterComponent>
    
  </template>
  
  
  

<style scoped lang="scss">
.my-container{
    width: 70%;
}
</style>
