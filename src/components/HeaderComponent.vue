<script>
import RedRoundedBtn from './buttons/RedRoundedBtn.vue';
import YellowRoundedBtn from './buttons/YellowRoundedBtn.vue';
import RedPillBtn from './buttons/RedPillBtn.vue';

export default {
    name: "HeaderComponent",
    components:{
        YellowRoundedBtn,
        RedRoundedBtn,
        RedPillBtn
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

        <nav class="d-flex align-items-center">
            <div class="h-100 w-100">
                <img class="h-100 pb-2 pt-1" src="https://cdn.discordapp.com/attachments/1152273399687680124/1160956224053977218/Schermata_2023-10-09_alle_17.04.34.png?ex=65368bbd&is=652416bd&hm=3f2695ca5a4128db780fac44f0306cd4ab3b66ec0b812a1de3474d0c4efa3cae&" alt="">
            </div>
            <div class="link"> 
                <ul>

                    <!-- <YellowRoundedBtn> Test </YellowRoundedBtn> -->
                    <!-- <RedPillBtn> Test </RedPillBtn> -->

                    <li><a href="">Lavora con noi</a></li>
                    <li><a href="">contatti</a></li>
                    <li class="login"><a href="">login</a>/<a href="">chi siamo</a></li>
                </ul>
            </div>
        </nav>


</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;


nav{
    // position: fixed;
    background-color: $bg-color;
    width: 100%;
    height: 100px;
    border-bottom: 6px solid black;
    display: flex;
    justify-content: space-around;
    padding: 0 8%;

    div{
        img{
            // height: 20%;
        }
    }
    .link{
        ul{
            margin: 10px 0;
            list-style: none;
            display: flex;
            li{
                margin: 0 10px;
                background-color: orange;
                    padding: 5px;
                    border-radius: 10px;
                    border: 1px solid black;
                a{
                    text-decoration: none;
                    color: black;
                } 
                a:hover{
                    color: blue;
                }
            }

                li:hover{
                    background-color: red;
                    padding: 5px;
                    border-radius: 10px;
                    border: 1px solid black;
                }
        }
    }
}

</style>