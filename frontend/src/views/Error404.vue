<template>
<div class="center home">
  <img src="../assets/img/tinta.png">
  <p class="error-message">Error 404</p>
  <p class="error-message2">Lo sentimos, pero la página que estás buscando no existe.</p>
  <p class="error-message3">Puedes revisar la dirección introducida o volver a empezar.</p>
  <router-link to="/"><p class="clickable">Quiero volver al inicio</p></router-link>
</div>
</template>

<script>
export default {
  name: '404',
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
  width: 80%;
  text-align: center;
  img{
    width: 400px;
  }
}
p{
  margin: 0;
}
.clickable{
  margin-top: 24px;
}
.error-message{
  color: $primaryColor;
  font-size: 6rem;
  font-weight: bold;
}
.error-message2{
  font-size:$size4;
}
.error-message3{
  font-size:$size3;
}

@media (max-width: 990px){
  .error-message{
    font-size:5rem;
  }
  .error-message2{
    font-size:$size3;
  }
  .error-message3{
    font-size:$size2;
  }
}
@media (max-width: 575px){
  .home{
    img{
      width: 300px;
    }
  }
  .error-message{
    font-size:$size4;
  }
  .error-message2{
    font-size:$size2;
  }
  .error-message3{
    font-size:$size1;
  }
}

</style>
