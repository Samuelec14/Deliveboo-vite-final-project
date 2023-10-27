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

    <nav class="navbar navbar-expand-lg">
      <div class="d-flex justify-content-between align-items-center w-100">
        <a class="navbar-brand" href="/">
          <img src="https://cdn.discordapp.com/attachments/1152273399687680124/1160956224053977218/Schermata_2023-10-09_alle_17.04.34.png" alt="Logo" class="logo">
        </a>
        
        <div class="d-flex align-items-center">
          <span class="cart m-3" v-if="!isCartPage">
            <img @click="navigateToCart" src="https://img.icons8.com/material-outlined/24/shopping-cart--v1.png" alt="Carrello" class="cart-icon">
            <span class="cart-count m-3" v-if="totalItemsInCart > 0">{{ totalItemsInCart }}</span>
          </span>

          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item text-right fs-5 me-3"><a class="nav-link" href="http://127.0.0.1:8000/register">Lavora con noi</a></li>
          <li class="nav-item text-right fs-5"><a class="nav-link" href="#">Contatti</a></li>
        </ul>
      </div>
    </nav>
  
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: 'Montserrat', sans-serif;
}

.nav-link {
  white-space: nowrap; 
}


.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.navbar-brand {
  margin-right: auto;
}

.cart {
  z-index: 2;
}

.navbar-toggler {
  z-index: 2;
}

#navbarNav {
  z-index: 1;
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

.navbar-toggler {
    order: 2;
    display: none;
}

.cart-icon {
    width: 35px;
    height: 35px;
    
    cursor: pointer;
}


.navbar-brand img {
    width: 80px;

}

    @media (max-width: 992px) {
    nav {
        
        align-items: center; 
        padding: 10px; 

        .link {
            ul {
                
                align-items: center; 
                text-align: center; 
            }
        }
    }
}

    @media (max-width: 768px) {
        nav {
        justify-content: space-between;

        .cart {
            order: 0;
        }

        .link {
            display: none;
        }

        .navbar-toggler {
            display: block;
        }
    }
}

@media (max-width: 576px) {
    nav {
        justify-content: space-between;

        .cart {
            order: 0;
        }

        .link {
            display: none;
        }

        .navbar-toggler {
            display: block;
        }
    }
}


@media (max-width: 400px) {
    nav {
        justify-content: space-between;

        .cart {
            order: 0;
        }

        .link {
            display: none;
        }

        .navbar-toggler {
            display: block;
        }
    }
}



</style>