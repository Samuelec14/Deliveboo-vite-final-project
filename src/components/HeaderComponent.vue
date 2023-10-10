<script>
export default {
    name: "HeaderComponent",
    data() {
    return{

    }
    },
    methods: {

    }
}
</script>

<template>

    <nav>
        <div><img src="https://cdn.discordapp.com/attachments/1152273399687680124/1160956224053977218/Schermata_2023-10-09_alle_17.04.34.png?ex=65368bbd&is=652416bd&hm=3f2695ca5a4128db780fac44f0306cd4ab3b66ec0b812a1de3474d0c4efa3cae&" alt=""></div>
        <div class="link"> 
            <ul>
                <li><a href="">altro</a></li>
                <li><a href="">carrello</a></li>
                <li class="login"><a href="">login</a>/<a href="">register</a></li>
            </ul>
        </div>
    </nav>

</template>

<style lang="scss" scoped>

nav{
    position: fixed;
    background-color: #FFC93C;
    width: 100%;
    height: 60px;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: space-around;
    padding: 0 10%;

    div{
        img{
            max-height: 50px;
            margin: 4px 0;
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