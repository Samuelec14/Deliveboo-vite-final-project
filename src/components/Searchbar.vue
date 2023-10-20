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

            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked);
            const values = [];
            checked.forEach(element => {
                values.push(element.value);
            });            

            axios.get(`http://127.0.0.1:8000/api/restaurant/results`, {
                params: {
                    search: values
                }
            })
            .then(response => {
                this.store.restaurants = response.data.restaurants; 
                this.loading = false;               
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
}
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
            <form @submit.prevent="submitForm">
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

                                <Checkbox :type="type" />

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
                <input type="submit" value="Cerca" />
            </form>
        </div>
    </div>
    
</template>

<style lang="scss">

@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: "Alfa Slab One", serif;
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
