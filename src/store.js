import { reactive } from 'vue';

export const store = reactive({
  imgPath: 'http://127.0.0.1:8000/storage',
  cart: [],

  addToCart(dish) {
    store.cart.push(dish);
  },

  removeFromCart(index) {
    store.cart.splice(index, 1);
  }
});
