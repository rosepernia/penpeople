<template>
  <div class="card">
    <router-link :to="route"><img :src="require(`../assets/img/stories/${image}`)" alt="Imagen historia" class="image clickable"></router-link>
    <p class="story-title">{{story}}</p>
    <p class="block-title">{{title}}</p>
    <p v-if="published"><i class="bi bi-heart-fill"></i> {{likes}}</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name:'BlockCard',
  props:{
    user:String,
    image:String,
    story:String,
    id:String,
    title:String,
    likes:{String,default:null}
  },
  setup(props){
    const published = ref(true)
    const route = ref('/')

    if(props.likes==null) {
      published.value = false
      route.value = `/moderar/${props.user}/${props.id}`
      }

    return{
      published,
      route
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
  padding: 2px;
  padding-bottom: 12px;
  width: 190px;
  text-align: center;
  p{
    margin: 0;
  }
  .block-title{
    font-size: 1.2rem;
  }
  i::before{
        color: $primaryColor;
      }
}
.image{
  width: 110px;
  height: 110px;
  object-fit: cover;
  object-position: center;
  box-shadow: 1px 1px 3px #cfcdcd;
}

@media (max-width: 990px){
  .card{
    width: 145px;
    .story-title{
      font-size: 1.3rem;
    }
    .block-title{
      font-size: 1.1rem;
    }
  }
  .image{
    width: 95px;
    height: 95px;
  }
}

@media (max-width: 575px){
  .card{
    width: 134px;
    .story-title{
      font-size: 1.1rem;
    }
    .block-title{
      font-size: 1rem;
    }
  }
  .image{
    width: 80px;
    height: 80px;
  }
}
</style>