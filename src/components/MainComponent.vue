<script>

export default {
    name: "MainComponent",
    data() {
    return{
        adress: '',
    }
    },
    methods: {
        send() {
    this.$router.push({ name: 'restaurants' });
  },
    },
}

</script>

<template>
    <main>
       <div class="row h-100"> 
            <div id="left-side" class="col-12 col-md-6 col-lg-6">
                <div class="box py-5 h-100">
                    <h1 class="slogan">Il gusto, <br> a casa tua!</h1>
                <input type="text"  class="form-control" placeholder="Inserisci indirizzo di spedizione" @keyup.enter="send">
            </div>
        </div>
            <div class="col-12 col-md-6 col-lg-6 image-container d-flex align-items-center justify-content-start">
                <img src="/panino.png" alt="Delicious sandwich" class="panino-image">
            </div>
        </div> 
    </main>

</template>


<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

* {
    font-family: 'Alfa Slab One', serif;
}

 main {
    
    height: calc(100vh - 100px);
    background-image: url('/bg-3.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 0 8%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center; 

    .row {
        width: 100%;
        text-align: center;

        @media (max-width: 992px) {
            flex-direction: column;
            justify-content: center; // Centra verticalmente
            align-items: center; // Centra orizzontalmente
        }


        #left-side {
            z-index: 1;
            .box {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .slogan {
                    color: $brown-primary;
                    font-size: 6rem;
                    margin-top: 1rem;
                    margin-bottom: 1rem;

                    @media (max-width: 768px) {
                        font-size: 3rem;
                    }
                }

                input {
                    border: unset;
                    width: 100%;
                    height: auto;
                    margin-top: 10px;

                    @media (max-width: 768px) {
                        width: 80%;
                    }
                }
            }
        }

        .image-container {
            position:relative;

            .panino-image {
                max-width: 200%; 
                position:absolute;
                right:0px;
                z-index: 0;
                
                

                @media (max-width: 992px) {
                    max-width: 200%;
                }

                @media (max-width: 768px) {
                    display: none;
                }

                @media (max-width: 576px) {
                    display: none;
                }
            }
        }
    }
}



</style>