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
},
}
</script>

<template>
<HeaderComponent></HeaderComponent>

<div class="about-section">

    <h2>Chi siamo</h2>
    <p>In un mondo in continua evoluzione digitale, abbiamo riconosciuto la necessità di un servizio di consegna rapido, efficiente e di qualità. Spinti dalla volontà di offrire ai nostri clienti la migliore esperienza culinaria direttamente a casa loro, abbiamo creato Deliveboo. La nostra missione è semplice: portare i vostri piatti preferiti direttamente alla vostra porta, mantenendo la freschezza e la qualità che desiderate e meritate.</p>
</div>

<div class="container d-flex">
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons tak (1).jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Luca Tacchino</h1>
            <p>Full Stack Web Developer</p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons ale.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Alessio Vinci</h1>
<<<<<<< HEAD
            <p>Full Stack Web Developer
=======
            <p>mi sono divertito
>>>>>>> bd42387ee385e092f8830ce7f282e2d20fbc4474
            </p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons ema.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Emanuele Verità</h1>
<<<<<<< HEAD
            <p>Full Stack Web Developer</p>
=======
            <p>mi sono divertito</p>
>>>>>>> bd42387ee385e092f8830ce7f282e2d20fbc4474
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons memb.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Luca Membrini</h1>
            <p>Full Stack Web Developer</p>
        </div>
    </div>
    <div class="my-card">
        <div class="img-container">
            <img src="../../public/img/simpson/simpsons samu.jpg" alt="">
        </div>
        <div class="text-container">
            <h1>Samuele Conficconi</h1>
            <p>Full Stack Web Developer</p>
        </div>
    </div>
</div>
<FooterComponent></FooterComponent>
</template>

<style scoped lang="scss">

p {
    font-family: 'Montserrat', sans-serif !important;
}

.about-section {
    text-align: center;
    padding: 40px 20px; 
    background-color: #f8f9fa; 
    
    h2 {
        font-size: 2.5em; 
        color: #343a40; 
        margin-bottom: 20px; 
        border-bottom: 3px solid #F8B932; 
        display: inline-block; 
        padding-bottom: 10px; 
    }
     
    p {
        font-size: 1.1em;
        color: #6c757d;
        line-height: 1.6;
        max-width: 800px;
        margin: 0 auto;   
    }
}

.container{
    padding-top: 100px;
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;

    .my-card{
        flex: 1 1 calc(20% - 20px); 
        max-width: calc(20% - 20px); 
        margin: 0 10px;

        .img-container{
            position: relative;
            width: 100%;
            padding-bottom: 100%; // Mantiene un rapporto di aspetto 1:1
            overflow: hidden; 

            img{
                position: absolute; // Posiziona l'immagine rispetto al suo contenitore
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                border-radius: 50%; // Rende l'immagine circolare
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



</style>