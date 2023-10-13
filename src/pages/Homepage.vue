<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import MainComponent from '../components/MainComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import RestaurantPage from './RestaurantsPage.vue';


export default {
    components: {
        HeaderComponent,
        MainComponent,
        FooterComponent,
        RestaurantPage

    },
    data() {
    return{
        
    }
    },
    methods: {

    }
}
</script>

<template>

        <HeaderComponent />
        
        <MainComponent />
        
        <FooterComponent />
</template>



<style scoped lang="scss">

</style>