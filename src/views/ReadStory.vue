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
        <i @click="like" class="bi bi-heart likes-heart"></i>
      </div>
      <div class="closures">
        <p v-if="closures.length==0" class="end">THE END</p>
        <p v-for="(option, index) in closures" :key="index" :class="{'closures-choose':true, 'clickable':true, 'closures-on':option.active==true, 'closures-off':option.active==false}" @click="findBlock(option.blockid+index, option.active)">{{option.title}}</p>
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
            })
        }) 
    }

   const findBlock = (blockid, active) => {
     if(active==true){
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
        })  
      } else if (store.state.user.admin==false){
        router.push(`/nuevo-fragmento/${story.value._id}/${block.value.title}/${blockid}`)
      }
   }

    const like = () => {
    console.log(block.value.author.nickname)
    fetch('http://localhost:8081/users/like', {
        method:'POST',
        body: JSON.stringify({nickname: block.value.author.nickname}),
        headers: {'Content-Type':'application/json'}
       }) 
       .then(resp=>resp.json())
       .then(data=>(console.log(data)))
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
  position: relative;
}
i.likes-heart::before{
  right: 30px;
  top:-20px;
  position: absolute;
  font-size: $size3;
  color: $primaryColor;
  cursor: pointer;
}
i.likes-fill-heart::before{
  right: 30px;
  top:-20px;
  position: absolute;
  font-size: $size1;
  color: $primaryColor;
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

@media (max-width: 575px){
  .text{
    font-size: 1.4rem;
  }
}
</style>