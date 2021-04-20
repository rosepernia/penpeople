<template>
   <div class="color">
    <div class="imagen">
      <div class="efecto">
        <p class="text">{{review}}</p>
        <!-- <h3 class="text">iniciado por: {{author}}</h3>  -->
      </div>
      <router-link :to="`/lectura/${id}`"><img v-bind:src="image" alt="Portada libro" class="cover desvanecer"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stories",
  components: {},
  props:{
      id:String,
      title:String,
      author:String,
      review:String,
      image:String,
  },

  setup() {

    return {
      
    }
  },
}
</script>

<style lang="scss" scoped>
.text{
  margin: 20% auto 20% auto;
}

.imagen{
  display:inline-block;
  position:relative;
}
.efecto{
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  padding:10px;
  margin:0;
  width: 250px;
  height: 270px;
  background-color: #63d4df;
}
.desvanecer:hover {
  opacity: 0.06;
  -webkit-transition: opacity 500ms;
  -moz-transition: opacity 500ms;
  -o-transition: opacity 500ms;
  -ms-transition: opacity 500ms;
  transition: opacity 500ms;
}
.cover{
  margin-right: 15px;
  width: 250px;
  height: 270px;
  object-fit: cover;
  object-position: center;
/*   border-radius: 100%; */
  box-shadow: 1px 1px 3px #cfcdcd;
}
@media (max-width: 1024px){
   .cover{
   width: 360px;
   height: 370px;
  }
  .efecto{
   width: 360px;
   height: 370px;
  }
}


 @media (max-width: 575px){
  .cover{
   width: 120px;
   height: 120px;
  }
  .efecto{
   width: 120px;
   height: 120px;
  }
}

</style>