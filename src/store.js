import { reactive, watch } from 'vue';

export const store = reactive({
  imgPath: 'http://127.0.0.1:8000/storage',
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  clearCart() {
    this.cart = []; 
  },
  addToCart(dish) {
    store.cart.push(dish);
    localStorage.setItem('cart', JSON.stringify(store.cart));
  },

  removeFromCart(index) {
    store.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(store.cart));
  }
});

watch(() => store.cart, (newCart) => {
  localStorage.setItem('cart', JSON.stringify(newCart));
});
