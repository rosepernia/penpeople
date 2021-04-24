<template> 
  <div class="view-top" v-if="block.value">
    <div class="head">
      <h2 class="head-title">{{block.value.story.title}}<i class="bi bi-diagram-3-fill head-tree"></i></h2> 
    </div>
    <div class="box">
      <div><p class="box-title">{{block.value.title}}</p></div> 
      <div class="box-data">
        <router-link :to="`/perfil/${block.value.author.nickname}`"><p class="box-author">{{block.value.author.nickname}}</p>
        <img :src="require(`../assets/img/users/${block.value.author.avatar}`)" v-if="block.value.author.avatar" alt="Foto autor" class="box-avatar"></router-link>
      </div> 
      <div class="text" v-html="block.value.body"></div>
      <div class="closures">
        <p v-if="block.value.closure.length==0" class="end">THE END</p>
        <p v-for="(option, i) in block.value.closure" :key="i" class="closures-choose">{{option}}</p>
      </div>
    </div>
    <div class="decision">
      <router-link :to="`/perfil/${user}`"><button class="button button-ok" @click="publish">Aceptar</button></router-link>
      <router-link :to="`/perfil/${user}`"><button class="button button-warning" @click="noPublish">Rechazar</button></router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { reactive, onMounted } from "vue";

export default {
  name: "ChooseBlock",
  components: {},
  setup() {
    const route = useRoute()
    const block = reactive({})
    const user = route.params.user

    const findBlock = () => {
      fetch("http://localhost:8081/blocks/findbyid",{
        method: "POST",
        body: JSON.stringify({ _id: route.params.id }),
        headers: {"Content-type":"application/json"}
      })
        .then(resp => resp.json())
        .then(data => {
          block.value=data
          })
    }

    const publish = () => {
       fetch("http://localhost:8081/blocks/publish",{
        method: "POST",
        body: JSON.stringify({ _id: route.params.id, story: block.value.story._id, blockid: block.value.blockid }),
        headers: {"Content-type":"application/json"}
      }) 
    }

    const noPublish = () => {
      fetch("http://localhost:8081/blocks/deleteone",{
        method: "POST",
        body: JSON.stringify({ _id: route.params.id }),
        headers: {"Content-type":"application/json"}
      }) 
    }

    onMounted(() => findBlock())

    return {
      block,
      user,
      publish,
      noPublish
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-top: 200px;
  width: 90%;
  max-width: 900px;
  min-height: 400px;
}
.head{
  position: fixed;
  top: 120px;
  left: 0;
  width: 100%;
  background-color: #f4f1f1d7;
  z-index: 10;
  &-title{
    position: relative;
    width: 95%;
    max-width: 1000px;
    margin-right: auto;
    margin-left: auto;
    font-family: $font3;
    color: #52b1b9;
    padding: 3px;
    font-weight: bold;
    font-size: $size2;
    border-bottom:1px solid #52b1b9;
  }
  i::before{
    top:0;
    right:24px;
    position: absolute;
    font-size: $size4;
    color: #52b1b9;
  }
}
.box{
  margin-bottom: 40px;
  &-title{
    margin-bottom: 16px;
    padding: 0 0 0 30px;
    background-color: #a6ebf1;
    font-size: $size1;
    max-width: 300px;
    width: 100%;
    border-radius: 15px;
  }
  &-data{
    position: relative;
  }
  &-author{
    top: -15px; 
    left: 50px;
    position: absolute;
  }
  &-avatar{
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    box-shadow: 1px 1px 3px #cfcdcd;
    border-radius: 100%;
  }
}
p{
  padding: 20px;
}
.text{
  padding: 24px 32px;
}
.closures{
  margin: 0 auto;
  display:flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;
  &-choose{
    text-align: center;
    font-size: $size1;
    margin: 10px;
    padding: 5px;
    width: 210px;
    border-bottom: 1px solid #888;
  }
  .end{
    margin: 0;
    padding: 10px;
  }
}
.decision{
  margin-bottom: 48px;
  display: flex;
  justify-content: center;
  button{
    margin: 0 40px;
  }
}

@media (max-width: 990px){
  .button{
      font-size: $size1;
      padding: 8px 16px;
  }
}

@media (max-width: 575px){
  .text{
    font-size: 1.4rem;
  }
}
</style>