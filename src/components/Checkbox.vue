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

    .img_active{
        border: 2px solid yellow;
    }

</style>