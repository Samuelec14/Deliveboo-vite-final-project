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

    <button id="btn-1" type="button" class="btn btn-warning rounded-pill px-4 mx-3">
        <strong>
            <slot />
        </strong>
    </button>

    <!-- <button id="btn-2" type="button" class="btn btn-warning border border-dark px-3"><strong>Button</strong></button> -->

</template>

<style lang="scss" scoped>
@use "../../assets/scss/partials/variables.scss" as *;


button{
    background-color: $red-primary;
    transition: all 0.25s ease;
    border: 4px solid $red-primary;
    color: $bg-color;
}

#btn-1:hover {    
    transform: translateY(-3px);
    background-color: $bg-color;
    color: black;
    border: 4px solid $red-primary;
    // text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black
}

#btn-2:hover {    
    // transform: translateY(-3px);
    background-color: rgba(0, 0, 0, 0.904);
    // color: #ffbe23;
    border: 1px solid $red-primary;

}

</style>