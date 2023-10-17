<script>


export default {

    data() {
        return {
            search: '',
            
        };
    },
    methods: {
        navigateToRestaurants(search) {
            
            if (this.$route.name != 'restaurantsFilter') {
                this.$router.push({ name: 'restaurantsFilter', params: { search: search } });
            }
            else {
                this.$emit('value', this.search);
            }
        }
    }

};

</script>

<template>

    <input type="text" v-model="search" @keyup.enter="navigateToRestaurants(search)">

</template>