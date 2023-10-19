<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

import axios from 'axios';
import { store } from '../store';

export default {
    name:'App',
    components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    },
    data() {
        return {
            // storage dinamico 
            restaurants: [],
            types: [],
            store,
            searchValue: '',
            loading: false,

            // storage statico 
            search: "",
            currentIndex: 0,
            imageContainerWidth: 0,
            dragging: false,
            dragStartX: 0,
            sliderPosition: 0,
            imagesInfo: [
                { src: "typologies/pizza.jpeg", alt: "Pizza", caption: "Pizza" },
                { src: "typologies/italiana.jpeg", alt: "Italiana", caption: "Cucina italiana" },
                { src: "typologies/burger.jpeg", alt: "Hamburger", caption: "Hamburger Gourmet" },
                { src: "typologies/cinese.jpeg", alt: "cinese", caption: "Cucina Cinese" },
                { src: "typologies/messicana.jpeg", alt: "messicana", caption: "Cucina Messicana" },
                { src: "typologies/sushi.jpeg", alt: "sushi", caption: "Sushi" },
                { src: "typologies/cucinathai.jpeg", alt: "HamThailandia", caption: "Cucina Thailandese" },
                { src: "typologies/vegana2.jpeg", alt: "vegana", caption: "Vegano" },
                { src: "typologies/vegetariana.jpeg", alt: "vegetariana", caption: "Vegetariano" },
            ],
            cards: [
                { name: "Bella Napoli", image: "restourants/bellanapoli.png", id: 1 },
                { name: "Dolce Tavola", image: "restourants/la-dolce-tavola.jpeg", id: 2 },
                { name: "Buns", image: "restourants/buns.jpeg", id: 3 },
                { name: "Sakura", image: "restourants/sakura.jpeg", id: 4 },
                { name: "Pancho Villa", image: "restourants/panchovilla.png", id: 5 },
                { name: "Sushi Eatery", image: "restourants/sushi-eatery.jpeg", id: 6 },
                { name: "Pagoda", image: "restourants/pagoda.jpeg", id: 7 },
                { name: "Veggie", image: "restourants/veggie.jpeg", id: 8 },
                { name: "Verde Eden", image: "restourants/verdeeden.png", id: 9 },
            ],
        };
    },

    mounted() {
        // per carosello 
        if (this.$refs.imageContainer) {
            this.imageContainerWidth = this.$refs.imageContainer.offsetWidth;
            this.scrollImages();
        }

        // per luca memb 
        this.fetchRestaurants(this.searchValue);
        this.fetchTypes();
    },
    methods: {
        // metodi carosello 
        scrollLeft() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
                this.scrollImages();
            }
        },
        scrollRight() {
            if (this.currentIndex < this.imagesInfo.length - 1) {
                this.currentIndex++;
                this.scrollImages();
            }
        },
        scrollImages() {
            const offset = this.currentIndex * this.imageContainerWidth;
            this.$refs.imageContainer.style.transform = `translateX(-${offset}px)`;
        },
        startDrag(event) {
            this.dragging = true;
            this.dragStartX = event.clientX - this.sliderPosition;
        },
        handleDrag(event) {
            if (this.dragging) {
                const newSliderPosition = event.clientX - this.dragStartX;
                if (newSliderPosition >= 0) {
                    this.sliderPosition = newSliderPosition;
                }
            }
        },
        endDrag() {
            this.dragging = false;
        },
        emitValue(value) {
            this.$emit("value", value);
        },

        // metodi luca memb 
        // SEARCH RESTAURANTS
        async fetchRestaurants(param) {

        this.loading = true;

        if (param == '') {
            param = 'all';
        }
        axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant/results/${param}`)
        .then(response => {
            this.restaurants = response.data.restaurants;
            this.loading = false;
        })
        .catch(error => {
            console.error(error);
        });
        },

        // SEARCH TYPES -> gives an array of types
        async fetchTypes() {
        this.loading = true;
        axios.get(`http://127.0.0.1:8000/api/type/type`)
        .then(response => {
            this.types = response.data.results; 
            this.loading = false;               
        })
        .catch(error => {
            console.error(error);
        });
        },

        // Makes the page scroll to top (duh)
        scrollToTop() {
        document.body.scrollIntoView();
        },

        // Go to the dish page of each restaurant
        navigateToDish(restaurantId) {
        this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },

        // Gets value from searchbar and performs a search with said value
        getValue(value) {
        this.searchValue = value;
        this.fetchRestaurants(this.searchValue);
        }
            },
        };
</script>


<template>
    <main>
        <div class="row h-100">
            <div id="left-side" class="col-12 col-md-6 col-lg-6">
                <div class="box py-5 h-100">
                    <h1 class="slogan">
                        Il gusto, <br />
                        a casa tua!
                    </h1>
                    <input type="text" v-model="search" @keyup.enter="emitValue(search)" />
                </div>
            </div>
    
            <div class="col-12 col-md-6 col-lg-6 image-container d-flex align-items-center justify-content-start">
                <img src="/panino.png" alt="Delicious sandwich" class="panino-image" />
            </div>
        </div>
    </main>

    <h2 class="d-flex align-items-center justify-content-center mt-5" >Cosa vuoi mangiare?</h2>

    <div class="px-5 py-2 sticky bg-white">
        <div class="mx-4">
            <carousel :items-to-show="5.5" :items-to-scroll="1" :wrapAround="true" :snap-align="center" touch-drag="true">

                <!-- <slide v-for="(imageInfo, index) in imagesInfo" :key="index" class="image-figure">
                    <a href="" class="text-decoration-none text-black">
                        <div class="img-container d-block h-100" style="width: 90%;"> 
                            <img :src="imageInfo.src" :alt="imageInfo.alt" class="image">
                            <figcaption class="image-caption mt-2">{{ imageInfo.caption }}</figcaption>
                        </div>
                    </a>
                </slide> -->

                
                <slide v-for="type in types" :key="type.id" @click="fetchRestaurants(type.name); scrollToTop();">
                        <div class="img-container d-block h-100" style="width: 70%;"> 
                                <img :src="store.imgPath + type.thumb" :alt="type.name" class="image">
                                <figcaption class="image-caption mt-2">{{ type.name }}</figcaption>
                        </div>
                </slide> 
        

                <template #addons>
                    <navigation />
                    <pagination />
                </template>
            </carousel>
        </div>
    </div>

    <div class="image-typologies">
        <figure v-for="(imageInfo, index) in imagesInfo" :key="index" class="image-figure">
            <div class="d-block">
                <img :src="imageInfo.src" :alt="imageInfo.alt" class="image">
            </div>
            <figcaption class="image-caption">{{ imageInfo.caption }}</figcaption>
        </figure>
    </div>


    <h2 class="d-flex align-items-center justify-content-center mt-4" >Scegli il tuo ristorante preferito</h2>
    <div class="restourants">
        <div class="grid">
            <div
            v-for="(card, index) in cards"
            :key="index"
            class="card custom-card"
            :style="{ backgroundImage: `url(${card.image})` }"
            >
                <router-link :to="'/pagina/' + card.id">
                    <span class="custom-name">{{ card.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: "Alfa Slab One", serif;
}

.carousel__next{
    background-color: lightblue !important;
}

.sticky{
    position: sticky;
    top: 0;
}

main {
    height: calc(100vh - 100px);
    background-image: url("/bg-3.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 0 8%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

.row {
    width: 100%;
    text-align: center;

    @media (max-width: 992px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #left-side {
        z-index: 1;
        .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .slogan {
                color: $brown-primary;
                font-size: 6rem;
                margin-top: 1rem;
                margin-bottom: 1rem;
            
                @media (max-width: 768px) {
                    font-size: 3rem;
                }
            }

            input {
                border: unset;
                width: 100%;
                height: auto;
                margin-top: 10px;

                @media (max-width: 768px) {
                    width: 80%;
                }
            }
        }
    }

    .image-container {
      position: relative;

      .panino-image {
        max-width: 200%;
        position: absolute;
        right: 0px;
        z-index: 0;

        @media (max-width: 992px) {
          max-width: 200%;
        }

        @media (max-width: 768px) {
          display: none;
        }

        @media (max-width: 576px) {
          display: none;
        }
      }
    }
  }
}

.image-typologies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1000px; /* Larghezza massima del contenitore */
  margin: 0 auto;
  padding: 0 20px 20px 20px;
}

.image {
  width: 100%; /* Larghezza di ogni immagine */
//   margin: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  object-fit:cover;
}

.image-figure {
  width: 30%; /* Larghezza di ogni figura */
  margin: 10px;
  text-align: center;
}

.image {
  width: 100%; /* Larghezza dell'immagine al 100% della figura */
  height: auto; /* Altezza automatica per mantenere l'aspetto originale */
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.restourants {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.custom-card {
  width: 400px;
  height: 200px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.custom-name {
  margin-top: 10px;
  font-weight: normal;
  font-size: 40px;
  font-family: "Roboto", sans-serif;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 5px;
  backdrop-filter: blur(5px);
}

.router-link-active,
.router-link-exact-active {
  text-decoration: none !important;
}
</style>
