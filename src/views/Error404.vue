<template>
<div class="center home">
  <div class="img">
     <img src="../assets/img/error/tinta.png">
  </div>
  <div class="error-text">
    <h1 class="error">Error 404</h1>
    <h1>Lo sentimos, pero la página que estás buscando no existe.</h1>
    <h2>Puedes revisar la dirección introducida o volver a empezar.</h2>
    <router-link to="/"><h3>Quiero volver al inicio</h3></router-link>
  </div>
</div>
</template>

<script>


export default {
  name: 'Home',
  components: {

  },
  setup(){


    return{

    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  text-align: center;
  .img{
    img{
      height: 175px;
      width: 200px;
     
    }
  }
}
.error{
  font-size: 80px;
  margin-bottom: 120px;
  margin-top: 0px;

  
}
  h3:hover{
     color: grey;
  }
 
@media (max-width: 990px){
  .error{
    font-size:$size5;
    margin-bottom: 40px;
  }
  h1{ 
    font-size:$size3;
  }
   h2{ 
    font-size:$size2;
  }
}
@media (max-width: 575px){
  .error{
    font-size:$size5;
    margin-bottom: 50px;
  }
  h1{
     font-size:$size3;
  }
  h2{ 
    font-size:$size2;
  }
}







</style>
