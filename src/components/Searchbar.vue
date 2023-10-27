<script>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import Checkbox from './Checkbox.vue';

import axios from 'axios';
import { store } from '../store';

export default {
        name:'App',
        components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
        Checkbox,
    },
    data() {
        return {
            // storage dinamico
            types: [],
            store,
            loading: false,
            selected: [],
            showError: false,

            // storage statico
            search: "",
            currentIndex: 0,
            imageContainerWidth: 0,
            dragging: false,
            dragStartX: 0,
            sliderPosition: 0
        };
    },

    mounted() {
        // per carosello
        if (this.$refs.imageContainer) {
            this.imageContainerWidth = this.$refs.imageContainer.offsetWidth;
            this.scrollImages();
        }
        this.fetchTypes();
        this.store.restaurants = [];
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

        // Go to the dish page of each restaurant
        navigateToDish(restaurantId) {
            this.$router.push({ name: 'dish', params: { restaurant_id: parseInt(restaurantId) } });
        },

        submitForm() {
        this.loading = true;

        this.store.restaurants = [];

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked);

            const values = [];
            checked.forEach(element => {
                values.push(element.value);
            });


        this.store.checkboxNames = values;

        if (values.length > 0) {
            axios.get(`http://127.0.0.1:8000/api/restaurant/results`, {
                    params: {
                        search: values
                    }
                })
                .then(response => {
                    this.store.restaurants = response.data.restaurants;
                    this.loading = false;
                    

                     // Mostra il messaggio di errore se non ci sono risultati
    this.showError = this.store.restaurants.length === 0;
})
.catch(error => {
    console.error(error);
    this.showError = true; // Mostra il messaggio di errore in caso di errore API
});
        } else {
            this.loading = true;
            axios.get(`http://127.0.0.1:8000/api/restaurant/restaurant`)
                .then(response => {
                    this.store.restaurants = response.data.results;
                    this.loading = false;

                    // Mostra il messaggio di errore se non ci sono risultati
                    if (this.store.restaurants.length === 0) {
                        this.showError = true;
                    } else {
                        this.showError = false;
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.showError = true; // Mostra il messaggio di errore in caso di errore API
                });
        }
    },
        scrollToCarousel() {
            var carouselElement = document.querySelector('.sticky');
            carouselElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
    }
}
</script>



<template>
        <div class="jumbotron position-relative z-4">
            <div class="container-button position-absolute z-3 start-50" @click="scrollToCarousel"> 
                <button class="scroll-down-btn">
                    <h3 class="btn-text">
                        Iniziamo?
                    </h3>
                    <i class="fa-solid fa-circle-arrow-down"></i>
                </button>
            </div>

            <!--video per pc-->
            <video src="../../public/WelcomeDelivebooDesktop.mp4" autoplay muted loop class="video-desktop">
                <source :src="WelcomeDelivebooDesktop" type="video/mp4">
            </video>

            <!--video per smartphone-->
            <video src="../../public/WelcomeDelivebooSmartphone.mp4" autoplay muted loop class="video-smartphone">
                <source :src="WelcomeDelivebooSmartphone" type="video/mp4">
            </video>
        </div> 

        
         

    <h2 id="test1" class="d-flex align-items-center justify-content-center pt-4" >Cosa vuoi mangiare?</h2>

        <div class="background px-5 sticky shadow-sm">
            <div class="mx-4">
            
                    <carousel class="carousel-desktop" :items-to-show="5.5" :items-to-scroll="1" :wrapAround="true" snap-align="center" :touch-drag="true">

                        <!-- <slide v-for="(imageInfo, index) in imagesInfo" :key="index" class="image-figure">
                            <a href="" class="text-decoration-none text-black">
                                <div class="img-container d-block h-100" style="width: 90%;"> 
                                    <img :src="imageInfo.src" :alt="imageInfo.alt" class="image">
                                    <figcaption class="image-caption mt-2">{{ imageInfo.caption }}</figcaption>
                                </div>
                            </a>
                        </slide> -->


                        <template v-if="types.length > 0">
                                <slide v-for="type in types" :key="type.id">
                                    <div @click="submitForm">
                                        <a class="text-dark text-capitalize" href="#test1"><Checkbox  :type="type" /></a>
                                    </div>
                                </slide> 
                        </template>
                        


                        <template #addons>
                            <navigation >
                                <template #prev>
                                    <span > <img class="prev_icon" width="35" height="35" src="https://img.icons8.com/color/48/chevron-left.png" alt="chevron-left"/> </span>
                                </template>
                                <template #next>
                                    <span> <img class="next_icon" width="35" height="35" src="https://img.icons8.com/color/48/chevron-left.png" alt="chevron-left"/> </span>
                                </template>
                            </navigation>

                        </template>
                        
                    </carousel>

            </div>
        </div>

        <div class="background px-3 px-md-5 sticky shadow-sm">
            <div class="mx-4">
            
                    <carousel class=" carousel-mobile" :items-to-show="2" :items-to-scroll="1" :wrapAround="true" snap-align="center" :touch-drag="true">

                        <!-- <slide v-for="(imageInfo, index) in imagesInfo" :key="index" class="image-figure">
                            <a href="" class="text-decoration-none text-black">
                                <div class="img-container d-block h-100" style="width: 90%;"> 
                                    <img :src="imageInfo.src" :alt="imageInfo.alt" class="image">
                                    <figcaption class="image-caption mt-2">{{ imageInfo.caption }}</figcaption>
                                </div>
                            </a>
                        </slide> -->


                        <template v-if="types.length > 0">
                                <slide v-for="type in types" :key="type.id">
                                    <div @click="submitForm">
                                        <a class="text-dark text-capitalize" href="#test1"><Checkbox  :type="type" /></a>
                                    </div>
                                </slide> 
                        </template>
                        


                        <template #addons>
                            <navigation >
                                <template #prev>
                                    <span > <img class="prev_icon" width="35" height="35" src="https://img.icons8.com/color/48/chevron-left.png" alt="chevron-left"/> </span>
                                </template>
                                <template #next>
                                    <span> <img class="next_icon" width="35" height="35" src="https://img.icons8.com/color/48/chevron-left.png" alt="chevron-left"/> </span>
                                </template>
                            </navigation>

                        </template>
                        
                    </carousel>

            </div>
        </div>


    
</template>

<style lang="scss">

@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: "Alfa Slab One", serif;
}

.background {
    background-color: #F6F7E9;
}

 .jumbotron {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 0;

    .scroll-down-btn {
    border: none;
    background-color: transparent;
    color:#F8BE32;
    font-size: 6rem;
    cursor: pointer;
    padding: 10px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .scroll-down-btn:hover {
    background-color: rgba(0, 0, 0, 0.308);
    }


    .container-button {
        margin-bottom:30px;
        background-color: rgba(255, 255, 255, 0.801);
        transform: translate(-50% , 0);
        top: 70%;
    }
    .container-button:hover {
        margin-bottom:30px;

    }

    
    

        @media (max-width: 380px) {
            .scroll-down-btn{
            border: none;
            color:#F8BE32;
            font-size: 2rem;
            padding:0;
            margin: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            
                i{
                    margin-right: 10px;
                }    

            }
        }

    .btn-text {
        color:#7A2113;
        margin: 30px;

        @media (max-width: 360px) {
        margin: 10px;

        }
        
    }

}

video {
  width: 100%;
  height: 100vh; // Per mantenere il rapporto d'aspetto 
  object-fit: cover;
  object-position: center;
} 

/* Stile per il video su desktop */
.video-desktop {
  display: block; 
  width: 100%;    
  max-height: none; 
}

/* Stile per il video su smartphone */
.video-smartphone {
  display: none; 
}

@media (max-width: 768px) {
  /* larghezza dello schermo è inferiore a 768px (dimensioni smartphone) */
  .video-desktop {
    display: none; 
  }

  .video-smartphone {
    display: block; 
    width: 100%;    
    max-height: none; 
  }
}

.checkbox-overlay{
    width: 100%;
    height: 100%;
    border: none;
    opacity: 40%;
    right: 107%;
}


.prev_icon,
.next-icon{
    position: absolute;
    // transform: translate(0 , 10%);
}
.prev_icon{
    bottom: 50%;
    right: 120%;

}
.next_icon{
    transform: rotate(180deg);
    position: absolute;
    bottom: 50%;
    left: 120%;
}

.carousel__item {
    min-height: 200px;
    width: 100%;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.carousel__slide {
    padding: 10px;
    margin: 15px;
}

.carousel-desktop {
    display: none; /* Nascondi il carosello desktop come predefinito */
}

.carousel-mobile {
    display: block; /* Mostra il carosello mobile come predefinito */
}

/* Per dispositivi con una larghezza maggiore di 340px */
@media (min-width: 381px) {
    .carousel-desktop {
        display: block; /* Mostra il carosello desktop */
    }
    .carousel-mobile {
        display: none; /* Nascondi il carosello mobile */
    }
}

/* Stili specifici per la versione mobile */
@media (max-width: 380px) {
    .carousel-mobile .carousel__item {
        min-height: 200px;
        width: 100%;
        background-color: var(--vc-clr-primary);
        color: var(--vc-clr-white);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .carousel-mobile .image {
        width: 80%; /* Solo un esempio, adattalo alle tue esigenze */
        /* Altri stili specifici per la versione mobile qui... */
        margin-top: 10px;
    }

    .image-caption {
        font-size: 10px;
    }

    .carousel__slide {
    padding: 0;
    margin: 0;
}






}

.sticky{
    position: sticky;
    top: 0;
    z-index: 2;
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
            z-index: 10;
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
                
                    @media (max-width: 1200px) {
                        font-size: 5rem;
                    }

                    @media (max-width: 992px) {
                        font-size: 4rem;
                    }

                    @media (max-width: 768px) {
                        font-size: 3rem;
                    }

                    @media (max-width: 576px) {
                        font-size: 2rem;
                    }
                }      
                
                

                input {
                    border: unset;
                    width: 100%;
                    height: auto;
                    margin-top: 10px;

                  
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
  width: 100%;
   /* Larghezza di ogni immagine */
//   margin: 10px;
//   border: 1px solid #ccc;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
