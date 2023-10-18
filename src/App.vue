<script>
import HeaderComponent from './components/HeaderComponent.vue';
import MainComponent from './components/MainComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import { reactive } from 'vue';

export const store = reactive({
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  // ... altre proprietà del tuo store
});

export default {
  name: "App",
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
  data() {
    return{

    }
  },
  methods: {

  }
}
</script>

<template>

<HeaderComponent />

<MainComponent />
<FooterComponent />

</template>

<style lang="scss">
@use "assets/scss/main.scss";
@use "./assets/scss/partials/variables.scss" as *;


</style>
