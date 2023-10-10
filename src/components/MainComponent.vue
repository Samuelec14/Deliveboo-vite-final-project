<script>
export default {
    name: "MainComponent",
    data() {
    return{

    }
    },
    methods: {

    }
}
</script>

<template>

    <main>
        <div class="row h-100">
            <div id="left-side" class="col h-100">
                <div class="box mt-5 py-5 h-100">
                    <h1 class="">Gusto servito, <br> a casa tua!</h1>
                    <input class="rounded w-75 p-4" type="text" placeholder="Inserisci indirizzo di spedizione...">
                </div>
            </div>
            <div class="col">
                <div class="box">
                    a
                </div>
            </div>
        </div>
    </main>

</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;


main{
    height: calc( 100vh - 100px);
    background-image: url(../../public/bg-2.png);
    background-size: cover;
    padding: 0 8%;
    overflow: hidden;

    .row{

        #left-side{


            .box{
                margin-left: 5rem;


                h1{
                    color: $brown-primary;
                    font-size: 6rem;
                    margin-top: 7rem;
                }

                input{
                    border: unset;
                    height: 9%;
                }
            }
        }
    }

}

</style>