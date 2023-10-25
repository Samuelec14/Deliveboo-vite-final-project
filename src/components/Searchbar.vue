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
    
        

        <div class="container-button"> 
                        <button class="scroll-down-btn" @click="scrollToCarousel">
                            <h3 class="btn-text">
                                Iniziamo?
                            </h3>
                            <i class="fa-solid fa-circle-arrow-down"></i>
                        </button>
                        
                    </div>
        
        <div class="jumbotron">
            <!--video per pc-->
            <video src="../../public/DelivebooVideoHomepage.mp4" autoplay muted loop class="video-desktop">
                <source :src="DelivebooVideoHomepage" type="video/mp4">
            </video>

            <!--video per smartphone-->
            <video src="../../public/DelivebooVideoHomepageSmartPhone.mp4" autoplay muted loop class="video-smartphone">
                <source :src="DelivebooVideoHomepageSmartPhone" type="video/mp4">
            </video>
        </div> 

        
         

    <h2 id="test1" class="d-flex align-items-center justify-content-center pt-4" >Cosa vuoi mangiare?</h2>

        <div class="px-5 sticky bg-white shadow-sm">
            <div class="mx-4">
            
                    <carousel :items-to-show="5.5" :items-to-scroll="1" :wrapAround="true" snap-align="center" :touch-drag="true">

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
                                        <a class="text-dark" href="#test1"><Checkbox  :type="type" /></a>
                                    </div>
                                </slide> 
                        </template>
                        


                        <template #addons>
                            <navigation>
                                <template #prev>
                                    <span> <img class="prev_icon" width="35" height="35" src="https://img.icons8.com/color/48/chevron-left.png" alt="chevron-left"/> </span>
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

 .jumbotron {
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  padding: 0;
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

.sticky{
    position: sticky;
    top: 0;
    z-index: 2;
}

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
  background-color: rgba(0, 0, 0, 0.1);
}


.container-button {
    margin-bottom:30px;
}

.container-button,
.btn-text {
    @media (max-width: 1200px) {
        font-size: 6rem;
    }

    @media (max-width: 992px) {
        font-size: 2rem;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 576px) {
        font-size: 1rem;
    }
}

.scroll-down-btn {
    @media (max-width: 1200px) {
        font-size: 6rem;
    }

    @media (max-width: 992px) {
        font-size: 3rem;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 576px) {
        font-size: 2rem;
    }
}

.btn-text {
    color:#7A2113;
    margin: 30px;
    
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
          max-width:200%;
        
        }
       

        @media (max-width: 576px) {
            display:none;
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
/* Stili per tablet */
@media (max-width: 992px) {
  .carousel {
    /* Riduci la dimensione del carosello */
    height: 300px;
  }

  .slide {
    /* Riduci la dimensione del testo o degli elementi nelle slide */
    font-size: 14px;
  }
}

/* Stili per dispositivi mobili */
@media (max-width: 768px) {
  .carousel {
    
    /* Riduci ulteriormente la dimensione del carosello */
    height: 200px;
  }

  .panino-image{
    display:none;
  }

  .slide {
    /* Riduci ulteriormente la dimensione del testo o degli elementi nelle slide */
    font-size: 12px;
    }
    .carousel_slide {
    margin: 0; 
    }
    
}

/* Stili per dispositivi con larghezza dello schermo fino a 576px */
@media (max-width: 576px) {
  .carousel {
    /* Puoi modificare la dimensione del carosello se necessario */
    height: 150px;
  }

  .image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin:0 40px;
  }

  .image-caption {
    font-size: 12px; /* Riduci la dimensione del font come desideri */
    margin-top: 5px;
    text-align:center;
  }
}

.carousel-image {
  margin: 10px; /* Aggiunge un margine intorno a ciascuna immagine */
}

.carousel-caption {
  margin-top: 5px; /* Aggiunge un margine sopra la didascalia */
}

.carousel_slide {
  margin: 15px; 
}




</style>
