<script>
export default {
    name: "FooterComponent",
    data() {
    return{

    }
    },
    methods: {
      navigateToUs() {
      this.$router.push({ name: 'us' });
    },
    }
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-list mt-3">
            <h3 class="light-text">DeliveBoo</h3>
            <ul>
              <li><a href="#">Chi siamo</a></li>
              <li><a href="#">Ristoranti</a></li>
              <li><a href="#">Lavora con noi</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-list mt-3">
            <h3 class="light-text">Note legali</h3>
            <ul>
              <li><a href="#">Temini & condizioni</a></li>
              <li><a href="#">Informativa sulla privacy</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="footer-list mt-3">
            <h3 class="light-text">Aiuto</h3>
            <ul>
              <li><a @click="navigateToUs">Contatti</a></li>
              <li><a href="#">Faq</a></li>
              <li><a href="#">Tipi di cucina</a></li>        
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-3">
          <div class="image-card">
            <a href="#"><img class="footer-image m-2" src="/img/apple.png" alt="app-store-badge"></a>
            <a href="#"><img class="footer-image m-2" src="/img/play-store.png" alt="play-store-badge"></a>
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="col">
          <div class="footer-newsletter">
            <h3 class="footer-list light-text">Newsletter</h3>
            <input type="text" placeholder="Email">
            <textarea placeholder="Enter your text"></textarea>
            <button id="btn-2" type="button" class="btn btn-warning border border-dark px-3">
              <strong>SEND MESSAGE</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <p class="copyright">
      <span>&#169; 2023 All Rights Reserved. Developed By DeliveBoo</span>
    </p>
  </footer>
</template>



<style lang="scss" scoped>

*{
  font-family: 'Montserrat', sans-serif; 
}


.footer {
    background-color: #333;

}

.footer-list {
    color: white;
   
}

.footer-list ul {
    list-style: none;
    padding: 15px;
    margin: 0;
    background-color: #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
}

.footer-list ul li {
    margin-bottom: 10px;
}

.light-text {
  font-size: 15pt;
}

.footer-list ul li a {
    font-size: smaller;
    text-decoration:none;
    color: black;
}

.footer-list ul li a:hover {
    color: #EF6C00;
    text-decoration: underline;
}

.image-card{
  margin-top:40px;
}

.footer-image {
  border-radius:4px;
}

.footer-newsletter input,
.footer-newsletter textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid lightgrey;
    border-radius: 4px;
    background-color: white;
    color: white;
}

.footer-newsletter textarea {
    height: 70px;
    
}

.copyright {
  color:white;
  text-align:center;
  margin: 10px;
}

.footer-image {
    transition: transform 0.3s ease-in-out; 
}

.footer-image:hover {
    transform: scale(1.1); 
}

#btn-2 {
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out; 
}

#btn-2:hover {
    background-color: #ff9800; 
    color: #fff; 
}

@media (max-width: 340px) {
  
  .image-card{
    background-color:#CCCCCC;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    margin-bottom:45px;
    border-radius: 4px;
    
  }

  .footer-image {
    border-radius:4px;
  }
}
</style>
