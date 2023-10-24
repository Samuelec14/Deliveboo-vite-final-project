<script>
import RedRoundedBtn from './buttons/RedRoundedBtn.vue';
import YellowRoundedBtn from './buttons/YellowRoundedBtn.vue';
import RedPillBtn from './buttons/RedPillBtn.vue';
import { inject } from 'vue';
import { computed, watch } from 'vue';
import { store } from '../store'; 


export default {
    props: {
    isCartPage: {
      type: Boolean,
      default: false,
    },
    // ... Altre opzioni del componente ...
  },
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
        // Calcola la somma totale delle quantità di tutti i piatti nel carrello utilizzando computed
        const totalItemsInCart = computed(() => {
            return store.cart.reduce((total, item) => total + parseInt(item.quantity), 0);
        });

        // Aggiorna il numero totale di piatti nel carrello quando il carrello cambia
        watch(() => store.cart, () => {
            // Non è necessario fare nulla qui, computed si aggiornerà automaticamente
        });

        return {
            totalItemsInCart
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

    <nav class="d-flex align-items-center py-1 shadow">
        <div class="h-100 w-100">
            <a href="/">
                <img class="h-100 pb-2 pt-1" src="https://cdn.discordapp.com/attachments/1152273399687680124/1160956224053977218/Schermata_2023-10-09_alle_17.04.34.png?ex=65368bbd&is=652416bd&hm=3f2695ca5a4128db780fac44f0306cd4ab3b66ec0b812a1de3474d0c4efa3cae&" alt="">
            </a>
        </div>
        
        <!-- ELEMENTO CARRELLO  -->
        <span class="cart d-flex" v-if="!isCartPage">
      <img class="mb-3" @click="navigateToCart" width="35" height="35" src="https://img.icons8.com/material-outlined/24/shopping-cart--v1.png" alt="shopping-cart"/>
      <span class="number-cart d-flex justify-content-center align-items-center" v-if="totalItemsInCart > 0">
        {{ totalItemsInCart }}
      </span>
    </span>
        
        <div class="link"> 
            <ul class="ps-3 pt-2">
                <!-- <YellowRoundedBtn> Test </YellowRoundedBtn> -->
                <!-- <RedPillBtn> Test </RedPillBtn> -->

                <li class="fs-5"><a href="http://127.0.0.1:8000/register">Lavora con noi</a></li>
                <li class="fs-5"><a href="">Contatti</a></li>
            </ul>
        </div>
    </nav>



</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: 'Montserrat', sans-serif;
}

nav {
    background-color: $bg-color;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8%;
    align-items: center;
    background-color: $bg-color;
    padding: 0 8%;

    div {
        img {
            width: 80px;
            height: 80px;
        }
    }

    .link li a {
        white-space: nowrap;
    }

    .link {
        ul {
            list-style: none;
            display: flex;
            justify-content: center; 
            align-items: center;
            
            li {
                margin: 0 10px;
                background-color: transparent;
                padding: 5px;
                cursor: pointer;
            a {
                text-decoration: none;
            }
            
            
            
                
                
                button.transparent-button {
                    background: transparent;
                    border: none;
                    color: #000;
                    font-size: 20px;
                    cursor: pointer;
                    outline: none;
                    padding: 10px 20px;
                    transition: color 0.3s ease;
                    &:hover {
                        background: #d1d1d1;
                        border-radius: 30px;
                    }
                }
            }
            li:hover{
                font-weight: 600;
            }
        }
    }
}

.link li a,
.link li button.transparent-button {
    color: #000; /* Imposta il colore dei link su nero */
    text-decoration: none; /* Rimuovi la sottolineatura dei link */
}



.navbar-brand img {
    width: 80px;

    @media (max-width: 768px) {
        nav {
            flex-direction: column; /* Imposta la direzione dei flex items su colonna */
            align-items: center; /* Centra verticalmente */
            padding: 10px; /* Aggiungi spazio ai lati */
        }
    
        .h-100 {
            width: 80px; /* Riduci la larghezza dell'immagine */
            height: 80px; /* Riduci l'altezza dell'immagine */
            margin-bottom: 10px; /* Aggiungi spazio tra l'immagine e i pulsanti */
        }
    
        .link {
            ul {
                flex-direction: column; /* Imposta i pulsanti su colonna */
                align-items: center; /* Centra orizzontalmente */
                list-style: none;
                padding: 0;
                
                li {
                    margin: 5px 0; /* Aggiungi spazio tra i pulsanti */
                }
            }
        }
    
        .login {
            margin-top: 10px; /* Aggiungi spazio sopra il pulsante di login */
        }
    
        .navbar-toggler {
            order: 1; /* Cambia l'ordine dell'hamburger menu */
        }
    }
    
}

@media (max-width: 992px) {
    nav {
        
        align-items: center; /* Centra i componenti verticalmente */
        padding: 10px; /* Aggiungi spazio ai lati */

        .link {
            ul {
                
                align-items: center; /* Centra i pulsanti verticalmente */
                text-align: center; /* Centra il testo dei pulsanti */
            }
        }
    }
}




</style>