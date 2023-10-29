<script>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import { store } from '../store'



export default {
  props: {
    dish: Object,
  },
  components: {
    HeaderComponent,
    FooterComponent,
    FooterComponent
},
}
</script>

<template>
<HeaderComponent></HeaderComponent>
<div class="container d-flex">
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons tak (1).jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Luca Tacchino</h1>
            <p>mi sono divertito</p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons ale.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Alessio</h1>
            <p>mi sono divertito
            </p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons ema.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Emanuele</h1>
            <p>mi sono divertito</p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons memb.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Luca Membrini</h1>
            <p>mi sono divertito</p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons samu.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Samuele Conficconi</h1>
            <p>mi sono divertito</p>
        </div>
    </div>
</div>
<FooterComponent></FooterComponent>
</template>

<style scoped lang="scss">
.container{
padding-top: 100px;
display: flex;
flex-wrap: wrap;
justify-content: center;
    .my-card{
        width: calc(100% / 3);
        .img-container{
          
            img{
                width: 400px;
                height: 460px;
                object-fit: cover;
                object-position: center;
                
            }
        }
        .text-container{
            text-align: center;
            width: 100%;
            p{
                word-break: break-all;
            }
        }
    }
}
</style>