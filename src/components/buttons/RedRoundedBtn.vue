<script>

export default {
    name: "RedRoundedBtn",

    data() {
    return{

    }
    },
    methods: {

    }
}
</script>

<template>

    <button  id="btn-1" type="button" class="text-light mx-3 btn btn-warning border border-dark px-3"><strong>Button</strong></button>
    <!-- <button id="btn-2" type="button" class="btn btn-warning border border-dark px-3"><strong>Button</strong></button> -->

</template>

<style lang="scss" scoped>

button{
    background-color: #db320f;
    transition: all 0.25s ease;
}

#btn-1:hover {    
    transform: translateY(-3px);
    background-color: #db320f;
    // color: white;
    border: 1px solid #db320f;

}

// #btn-2:hover {    
//     // transform: translateY(-3px);
//     background-color: rgba(0, 0, 0, 0.904);
//     color: #ffbe23;
//     border: 1px solid #ffbe23;

// }

</style>