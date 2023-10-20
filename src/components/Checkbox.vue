<script>
import { store } from '../store';

    export default {
    props: {
        type : Object
    },

    data() {
    return{
        imgIsChecked: false,
        store
    }
    },
    methods: {
        imgChecked(){
            this.imgIsChecked = !this.imgIsChecked
        }
    }
}
</script>
<template>
        <div class="img-container d-block h-100 position-relative w-100">
            <input @click="imgChecked()" class="checkbox-overlay position-absolute" type="checkbox">
            <div class="" :class="{ 'img_active': imgIsChecked }">
                <img :src="store.imgPath + type.thumb" :alt="type.name" class="image">
                <figcaption class="image-caption mt-2">{{ type.name }}</figcaption>
            </div>
        </div>
</template>