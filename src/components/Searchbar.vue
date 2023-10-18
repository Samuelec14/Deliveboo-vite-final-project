<script>


export default {

    data() {
        return {
            search: '',
            
        };
    },
    methods: {
        emitValue(value) {
            this.$emit('value', value);
        }
    }

};

</script>

<template>

    <input type="text" v-model="search" @keyup.enter="emitValue(search)">

</template>