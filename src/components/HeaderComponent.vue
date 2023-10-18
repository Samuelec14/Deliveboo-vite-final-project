<script>
import RedRoundedBtn from './buttons/RedRoundedBtn.vue';
import YellowRoundedBtn from './buttons/YellowRoundedBtn.vue';
import RedPillBtn from './buttons/RedPillBtn.vue';
import { inject } from 'vue';
import { ref, watch } from 'vue';
import { store } from '../store'; 


export default {
    name: "HeaderComponent",
    components:{
        YellowRoundedBtn,
        RedRoundedBtn,
        RedPillBtn
    },
    
    data() {
    return{
        dishes: [],
        restaurantId: null,
        isCartEmpty: true,
        
    }
    },
    setup() {
    // Calcola il numero totale di piatti nel carrello utilizzando un riferimento reattivo
    const cartTotal = ref(store.cart.length);

    // Aggiorna il numero totale di piatti nel carrello quando il carrello cambia
    watch(() => store.cart, () => {
      cartTotal.value = store.cart.length;
    });

    // Restituisci cartTotal per renderlo disponibile nel template
    return {
      cartTotal
    };
  },
    computed: {
    cartItemCount() {
        return this.$store.state.cart.length;
    }
},
    methods: {
        fetchDishes() {
    axios.get(`http://127.0.0.1:8000/api/dish/dish/${this.restaurantId}`)
      .then(response => {
        this.dishes = response.data.results;
        this.isCartEmpty = this.dishes.length === 0; 
      })
      .catch(error => {
        console.error(error);
      });
  },
  navigateToCart() {
      this.$router.push({ name: 'cart' });
    },
    },
    
    
}
</script>

<template>

        <nav class="d-flex align-items-center">
            <div class="h-100 w-100">
                <img class="h-100 pb-2 pt-1" src="https://cdn.discordapp.com/attachments/1152273399687680124/1160956224053977218/Schermata_2023-10-09_alle_17.04.34.png?ex=65368bbd&is=652416bd&hm=3f2695ca5a4128db780fac44f0306cd4ab3b66ec0b812a1de3474d0c4efa3cae&" alt="">
            </div>
            
                <button class="cart d-flex" @click="navigateToCart">
                    <img class="cart-img" src="https://media.istockphoto.com/id/1371799921/vector/shopping-cart-icon-with-long-shadow-on-blank-background-flat-design.jpg?s=612x612&w=0&k=20&c=2IxbpxSInsWm30hUV7-WcScSjdJYt20k5Gfg7G77mYk=" alt="">
                    <span class="number-cart d-flex justify-content-center align-items-center" v-if="cartTotal > 0">
      {{ cartTotal }}
    </span>

                </button>
            
            <div class="link"> 
                <ul>

                    <!-- <YellowRoundedBtn> Test </YellowRoundedBtn> -->
                    <!-- <RedPillBtn> Test </RedPillBtn> -->

                    <li><a href="">Lavora con noi</a></li>
                    <li><a href="">contatti</a></li>
                    <li class="login"><a href="http://127.0.0.1:8000/login">login</a>/<a href="">chi siamo</a></li>
                </ul>
            </div>
        </nav>


</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

*{
     font-family: 'Montserrat', sans-serif; 
}

nav{
    // position: fixed;
    background-color: $bg-color;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 0 8%;
    align-items: center;
    background-color: $bg-color;
    padding: 0 8%;

    div{
        img{
            width:80px;
            height:80px;
        }
    }
    .cart{
        border: 1px solid black;
        .cart-img{
        width: 40px;

    }
    }
    .cart:hover{
        border: 2px solid black;
    
    }
    .link{
        ul{
            
            list-style: none;
            display: flex;
            li{
                margin: 0 10px;
                background-color: orange;
                    padding: 5px;
                    border-radius: 10px;
                    border: 1px solid black;
                a{
                    text-decoration: none;
                    color: black;
                } 
                a:hover{
                    color: blue;
                }
            }

                li:hover{
                    background-color: red;
                    padding: 5px;
                    border-radius: 10px;
                    border: 1px solid black;
                }
        }
    }
}

.navbar-brand img {
    width: 80px;

    @media (max-width: 768px) {
        
    }
  }

  .navbar-nav li {
    margin: 0 10px;
    .nav-link, .transparent-button {
        background-color: transparent;
        border: none;
        text-decoration: none;
        color: #000;
        font-size: 25px;
        cursor: pointer;
        outline: none;
        padding: 10px 20px;
        transition: color 0.3s ease;
        &:hover {
            color: #FF5733;
        }
    }
}  

.transparent-button { 
  background: transparent;
  border: none;
  color: #000; 
  font-size: 25px;
  cursor: pointer;
  outline: none;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.transparent-button:hover {
  color: #FF5733; 
}
.navbar-collapse {
    flex-direction: row !important;  // Overriding Bootstrap's default behavior of 'column' on collapse

    @media (max-width: 992px) {
        justify-content: center;  // Center the buttons on smaller screens
    }

    .navbar-nav {
        flex-direction: row;  // Display the nav items in a row
        justify-content: center;  // Center the items

        li {
            display: inline-block;  // Displaying the list items in line
        }
    }
}



</style>