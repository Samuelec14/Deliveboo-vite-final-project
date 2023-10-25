<script>
import { store } from '../store';

export default {
    data() {
        return {
            store,
            activeSlide: false
        }
    },
    props: {
        type: Object
    },
    methods: {
        active() {
            this.activeSlide = !this.activeSlide;
        }
    }
}
</script>

<template>
    <div @click="active" class="img-container d-block h-100 position-relative w-100" >
        <input class="d-none" type="checkbox" name="search[]" v-model="activeSlide" :value="type.name" >
        <div :class="{img_active: activeSlide}">
            <img :src="store.imgPath + type.thumb" :alt="type.name" class="image">
            <figcaption class="image-caption mt-2">{{ type.name }}</figcaption>
        </div>
    </div>
</template>

<style>

    
    .image-caption {
        position: relative;
        cursor: pointer;
        display: inline-block;
        transition: all 0.3s ease;
    }

    .image-caption::before {
        content: "\2713"; /* Codice Unicode per il simbolo checkmark */
        position: absolute;
        left: -15px; /* La posizione iniziale del simbolo checkmark (fuori dalla vista) */
        opacity: 0;
        transition: all 0.3s ease; /* Transizione per l'animazione del simbolo checkmark */
    }



.img_active{
        .image-caption{
        padding-left: 25px; /* Sposta la scritta verso destra per fare spazio al checkmark */
        color: green; /* Cambia il colore del testo quando viene cliccato */
        }

        .image-caption::before {
            font-weight: bold;
            left: 5px; /* Sposta il simbolo checkmark nella vista */
            opacity: 1; /* Rendi il simbolo checkmark visibile */
            color: green; /* Cambia il colore del simbolo checkmark quando viene cliccato */
        }
    }

</style>