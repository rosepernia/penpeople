<template>
   <div class="view-top box">
    <div>
      <h1>{{title}}</h1>
      <router-link to="/lectura"><img :src="require(`../assets/img/stories/${image}`)" alt="Portada libro" class="cover"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stories",
  components: {},
  props:{
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
.cover{
  margin-right: 15px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
/*   border-radius: 100%; */
  box-shadow: 1px 1px 3px #cfcdcd;
}


</style>