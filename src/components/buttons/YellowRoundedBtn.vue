<script>

export default {
    name: "YellowRoundedBtn",

    data() {
    return{

    }
    },
    methods: {

    }
}
</script>

<template>

    <button  id="btn-1" type="button" class="btn btn-warning border border-dark px-3 mx-2"><strong>Button</strong></button>
    <button id="btn-2" type="button" class="btn btn-warning border border-dark px-3"><strong>Button</strong></button>

</template>

<style lang="scss" scoped>

button{
    background-color: #ffbe23;
    transition: all 0.25s ease;
}

#btn-1:hover {    
    transform: translateY(-3px);
    // background-color: #ffbe23;
    // color: black;
    border: 1px solid #ffbe23;
    // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black
}

#btn-2:hover {    
    // transform: translateY(-3px);
    background-color: rgba(0, 0, 0, 0.904);
    // color: #ffbe23;
    border: 1px solid #ffbe23;

}

</style>