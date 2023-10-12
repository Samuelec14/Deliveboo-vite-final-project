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
    <nav class="navbar navbar-expand-lg d-flex align-items-center">
        <div class="navbar-brand">
            <a href="#"><img src="deli ve boo copia.png" alt="Logo"></a>
        </div>
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <button class="transparent-button nav-link">Home</button>
                </li>
                <li class="nav-item">
                    <button class="transparent-button nav-link">Product</button>
                </li>
                <li class="nav-item">
                    <button class="transparent-button nav-link">Pricing</button>
                </li>
                <li class="nav-item">
                    <button class="transparent-button nav-link">Contact</button>
                </li>
            </ul>
        </div>
    </nav>
</template>
    

<style lang="scss" scoped>
@use "../assets/scss/partials/variables.scss" as *;

*{
     font-family: 'Montserrat', sans-serif; 
}

nav{
    // position: fixed;
    background-color: $bg-color;
    width: 100%;
    height:100%;
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 0 8%;
    align-items: center;
    background-color: $bg-color;
    padding: 0 8%;

    div{
        img{
            width:80px;
            height:80px;
        }
    }
    .link{
        ul{
            
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

.navbar-brand img {
    width: 80px;

    @media (max-width: 768px) {
        
    }
  }

  .navbar-nav li {
    margin: 0 10px;
    .nav-link, .transparent-button {
        background-color: transparent;
        border: none;
        text-decoration: none;
        color: #000;
        font-size: 25px;
        cursor: pointer;
        outline: none;
        padding: 10px 20px;
        transition: color 0.3s ease;
        &:hover {
            color: #FF5733;
        }
    }
}  

.transparent-button { 
  background: transparent;
  border: none;
  color: #000; 
  font-size: 25px;
  cursor: pointer;
  outline: none;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.transparent-button:hover {
  color: #FF5733; 
}
.navbar-collapse {
    flex-direction: row !important;  // Overriding Bootstrap's default behavior of 'column' on collapse

    @media (max-width: 992px) {
        justify-content: center;  // Center the buttons on smaller screens
    }

    .navbar-nav {
        flex-direction: row;  // Display the nav items in a row
        justify-content: center;  // Center the items

        li {
            display: inline-block;  // Displaying the list items in line
        }
    }
}



</style>