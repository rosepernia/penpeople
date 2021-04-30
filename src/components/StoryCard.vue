<template>
  <div class="card">
    <div class="imagen">
      <div class="efecto" v-if="active==true">
        <p class="text">{{review}}</p>
      </div>
      <router-link :to="`/lectura/${id}`"><img :src="require(`../assets/img/stories/${image}`)" alt="Portada libro" :class="{cover:true, desvanecer:active==true, inactive:active==false}"></router-link>
    </div>
    <div class="author">
      <p class="text">Iniciado por: {{author}}</p><i class="bi bi-eye-fill clickable" v-if="admin==true && active==true" @click="hideStory"></i><i class="bi bi-eye-slash-fill clickable" v-if="admin==true && active==false" @click="hideStory"></i>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { ref, watch, onMounted } from 'vue'

export default {
  name: "StoryCard",
  components: {},
  props:{
      id:String,
      title:String,
      author:String,
      review:String,
      image:String,
      active:Boolean
  },

  setup(props, context) {
    const store = useStore()
    const admin = ref(false)

    const hideStory = () => {
      fetch("http://localhost:8081/stories/state",{
        method: "POST",
        body:JSON.stringify({ _id: props.id }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp => resp.json())
        .then(() => context.emit('update'))
    }

    watch(store.state, () => admin.value = store.state.user.admin)

    onMounted(() => admin.value = store.state.user.admin)

    return {
      admin,
      hideStory
    }
  },
}
</script>

<style lang="scss" scoped>
.card{
  margin: 10px;
  height: 320px;
  p{
    margin: 0;
  }
}
.imagen{
  position:relative;
}
.efecto{
  display: flex;
  align-items: center;
  position:absolute;
  top:0;
  left:0;
  z-index:-1;
  padding:32px;
  margin:0;
  width: 250px;
  height: 290px;
  background-color: #a6ebf1;
  p{
    text-align: left;
  }
}
.cover{
  width: 250px;
  height: 290px;
  object-fit: cover;
  object-position: center;
  box-shadow: 1px 1px 3px #cfcdcd;
}
.inactive{
  opacity: 30%;
}
.author{
  margin: 0 auto;
  display: flex;
  justify-content: center;
  i{
    margin-left: 10px;
  }
}
.desvanecer:hover {
  opacity: 0.06;
  -webkit-transition: opacity 500ms;
  -moz-transition: opacity 500ms;
  -o-transition: opacity 500ms;
  -ms-transition: opacity 500ms;
  transition: opacity 500ms;
}
</style>