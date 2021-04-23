<template>
  <div class="view-top" v-if="story.value">
    <div class="head">
      <h2 class="head-title">{{story.value.title}}<i class="bi bi-diagram-3-fill"></i></h2> 
    </div>
    <div class="box">
      <div><p class="box-title" v-if="block.value.author.avatar">{{choose}}</p></div> 
      <div class="box-data">
        <router-link :to="`/perfil/${block.value.author.nickname}`"><p class="box-author">{{block.value.author.nickname}}</p>
        <img :src="require(`../assets/img/users/${block.value.author.avatar}`)" v-if="block.value.author.avatar" alt="Foto autor" class="box-avatar"></router-link>
      </div> 
      <p class="text">{{block.value.body}}</p>
      <div class="likes" v-if="block.value.blockid!=''">
        <i @click="back" class="bi bi-arrow-left-circle size2 clickable button-arrow"></i>
        <i @click="like" :class="{ bi:true, 'clickable':!likes, 'bi-heart':!likes, 'bi-heart-fill':likes }"></i>
      </div>
      <div class="closures">
        <p v-if="closures.length==0" class="end">THE END</p>
        <p v-for="(option, index) in closures" :key="index" :class="{'closures-choose':true, 'clickable':true, 'closures-on':option.active==true, 'closures-off':option.active==false}" @click="findBlock(option.blockid+index, option.active)">{{option.title}}</p>
      </div>
      <div class="error">
        <p v-if="error==true">Este camino no ha sido continuado por nadie, <router-link to="/registro">regístrate</router-link> para continuarlo.</p>
        <p v-if="error2==true">No puedes continuar un fragmento escrito por ti.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router"
import { ref, reactive, onMounted } from "vue"
import { useStore } from "vuex"

export default {
  name: "ReadStory",
  components: {},

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const story = reactive({})
    const block = reactive({})
    const blocks = reactive([])
    const closures = reactive([])
    const choose = ref('')
    const likes = ref(false)
    const error = ref(false)
    const error2 = ref(false)

   onMounted(() => {
      findStory()
    })

   const findStory = () => {
      fetch('http://localhost:8081/blocks/listpublish', {
        method:'POST',
        body: JSON.stringify({story: route.params.id}),
        headers: {'Content-Type':'application/json'}
      }) 
        .then(resp=>resp.json())
        .then(data=>{
          blocks.splice(0)
          data.forEach(blockinfo => blocks.push(blockinfo))
          fetch('http://localhost:8081/stories/findbyid',{
            method:'POST',
            body: JSON.stringify({_id: route.params.id}),
            headers: {'Content-Type':'application/json'}
          })
            .then(resp=>resp.json())
            .then(data=>{
              story.value=data
              block.value=data
              closures.splice(0)
              for (let i = 0; i < block.value.closure.length; i++) {
                let decission = {title: block.value.closure[i], blockid: block.value.blockid}
                let blocksId = blocks.map(b=>b.blockid)
                if(blocksId.indexOf(i.toString())!=-1) decission.active = true
                else decission.active = false
                closures.push(decission)
              } 
              window.scrollTo(0,0)
            })
        }) 
    }

    const findBlock = (blockid, active) => {
      error.value=false
      error2.value=false
      if(active==true){
        likes.value=false
        fetch('http://localhost:8081/blocks/findbyblockid', {
          method:'POST',
          body: JSON.stringify({story: route.params.id, blockid: blockid}),
          headers: {'Content-Type':'application/json'}
        }) 
          .then(resp=>resp.json())
          .then(data=>{
            block.value=data
            choose.value=block.value.title
            closures.splice(0)
              for (let i = 0; i < block.value.closure.length; i++) {
                let decission = {title: block.value.closure[i], blockid: block.value.blockid}
                let blocksId = blocks.map(b=>b.blockid)
                if(blocksId.indexOf((block.value.blockid+i).toString())!=-1) decission.active = true
                else decission.active = false
                closures.push(decission)
              }
            window.scrollTo(0,0)
          })  
        } else if (store.state.user.admin==false && store.state.user.nickname!=block.value.author.nickname){
          router.push(`/nuevo-fragmento/${story.value._id}/${block.value.title}/${blockid}`)
        } else if (store.state.user.admin==false && store.state.user.nickname==block.value.author.nickname){
          error2.value=true
        }
        else error.value=true
    }

    const back = () => {
      let previusBlock = block.value.blockid.substring(0, block.value.blockid.length - 1)
      if(previusBlock.length!=0) findBlock(previusBlock, true)
      else findStory()
    }

    const like = () => {
      likes.value=true
      fetch('http://localhost:8081/users/like', {
          method:'POST',
          body: JSON.stringify({ nickname: block.value.author.nickname }),
          headers: {'Content-Type':'application/json'}
        }) 
      fetch('http://localhost:8081/blocks/like', {
          method:'POST',
          body: JSON.stringify({ _id: block.value._id }),
          headers: {'Content-Type':'application/json'}
        }) 
    }
    

    return {
      story,
      findStory,
      block,
      blocks,
      closures,
      findBlock,
      choose,
      like,
      likes,
      error,
      error2,
      back
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
    margin-bottom: 20px;
    padding: 0 0 0 30px;
    background-color: #a6ebf1;
    font-size: $size1;
    display:flex;
    align-items: center;
    width: 300px;
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
.text:first-letter {
  float: left;
  font-weight: bold;
  color: $secondaryColor;
  font-size: 800%;
  line-height: 80%;
  margin: 0 1rem 0.4rem -0.6rem;
}
.likes{
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  i::before{
    font-size: $size3;
  }
  i.bi-heart-fill::before,i.bi-heart::before{
    color: $primaryColor;
  }
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
  &-choose:focus{
    outline:none;
    }
  &-on:hover {
    font-weight: bold;
    color: #73d0d8;
    border-bottom: 1px solid #73d0d8;
  }
  &-off:hover {
    font-weight: bold;
    color: $primaryColor;
    border-bottom: 1px solid $primaryColor;
  }
  .end{
    margin: 0;
    padding: 10px;
  }
}
.error{
  margin-top: 8px;
  color: #888;
  p{
    padding: 0;
    margin: 0 auto;
  }
}

@media (max-width: 990px){
  .closures{
    &-on {
      font-weight: bold;
      color: #73d0d8;
      border-bottom: 1px solid #73d0d8;
    }
    &-off {
      font-weight: bold;
      color: $primaryColor;
      border-bottom: 1px solid $primaryColor;
    }
  }
}
@media (max-width: 575px){
  .text{
    font-size: 1.4rem;
  }
  .error{
    text-align: center;
  }
}
</style>