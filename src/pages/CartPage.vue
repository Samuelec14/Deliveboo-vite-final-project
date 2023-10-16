<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { store } from '../store';
import { mapState, mapMutations } from 'vuex';
export default {
    props: {
    dish: {
        type: Object,
        required: true
    }
},
    components: {
        HeaderComponent,
        FooterComponent,
    },
    computed: {
        dishesInCart() {
            return store.cart;
        }
    },
    computed: {
    ...mapState(['cart']),
  },
    created() {
        if (this.$route.params.dish) {
    this.dish = this.$route.params.dish;
        // Puoi fare qualcosa con this.dish qui
    }
},
    methods: {
        ...mapMutations(['removeFromCart']),
    removeFromCartHandler(index) {
      this.removeFromCart(index);
        }
    }
};
</script>

<template>
    <div>
      <HeaderComponent></HeaderComponent>
      <h2 class="text-center my-4">Lista ordini</h2>
      <div class="container d-flex flex-wrap">
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
      <FooterComponent></FooterComponent>
    </div>
  </template>
  
  
  

<style scoped lang="scss">

</style>
