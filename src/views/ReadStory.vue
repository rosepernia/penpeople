<template>
  <div class="view-top block" v-if="story.value">
    <div class="head">
      <h2 class="head-title">{{story.value.title}}<i class="bi bi-diagram-3-fill head-tree"></i></h2> 
    </div>
    <div class="box">
      <div><p class="box-title" v-if="block.value.author.avatar">{{choose}}</p></div> 
      <div class="box-data">
        <p class="box-author">{{block.value.author.nickname}}</p>
        <img :src="require(`../assets/img/users/${block.value.author.avatar}`)" v-if="block.value.author.avatar" alt="Foto autor" class="box-avatar">
      </div> 
      <p class="text">{{block.value.body}}</p>
      <div class="likes">
        <i class="bi bi-heart likes-heart"></i>
      </div>
      <div class="closures">
        <p v-if="closures.length==0">THE END</p>
        <p v-for="(option, index) in closures" :key="index" :class="{'closures-choose':true, 'closures-on':option.active==true, 'closures-off':option.active==false}" @click="findBlock(option.blockid+index, option.active, option.title)">
          <span>{{option.title}}</span>
        </p>
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

   const findBlock = (blockid, active, title) => {
     if(active==true){
       choose.value=title
       fetch('http://localhost:8081/blocks/findbyblockid', {
        method:'POST',
        body: JSON.stringify({story: route.params.id, blockid: blockid}),
        headers: {'Content-Type':'application/json'}
       }) 
        .then(resp=>resp.json())
        .then(data=>{
          block.value=data
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
        router.push(`/nuevo-fragmento/${story.value._id}/${title}/${blockid}`)
      }
    
   }

    return {
      story,
      findStory,
      block,
      blocks,
      closures,
      findBlock,
      choose
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-top: 200px;
}
.block{
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
}

.head-title{
  position: relative;
  width: 95%;
  max-width: 1000px;
  margin-right: auto;
  margin-left: auto;
  font-family: $font3;
  margin-bottom: 10px ;
  color: #52b1b9;
  padding: 3px;
  font-weight: bold;
  font-size: $size2;
  border-bottom:1px solid #52b1b9;
}

i.head-tree::before{
  top:0;
  right:24px;
  position: absolute;
  font-size: $size4;
  color: #52b1b9;
}
.box{
  margin-bottom: 40px;
}
.box-title{
  margin-bottom: 20px;
  padding: 0 0 0 30px;
  background-color: #63d4df;
  font-size: $size1;
  display:flex;
  align-items: center;
  width: 300px;
  border-radius: 15px;
} 

.box-data{
  position: relative;
}

.box-author{
  top: -15px; 
  left: 50px;
  position: absolute;
}

.box-avatar{
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: center;
  box-shadow: 1px 1px 3px #cfcdcd;
  border-radius: 100%;
}

p{
  padding: 20px 20px 20px 20px;
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

.closures{
  margin: 0 auto 0 auto;
  display:flex;
  justify-content: space-evenly;
  background-color: white;
  width: 90%;
}

.closures-choose{
  display:flex;
  justify-content: center;
  font-size: $size1;
  /* padding:10px 10px 10px 5px;  */
  width:250px;
  border:none;
  border-bottom:1px solid black;
  background-color: transparent;
  cursor: pointer;
}  
.closures-choose:focus  	{ outline:none; }
.closures-on:hover {
  color: #52b1b9;
  border-bottom:#52b1b9;
}
.closures-off:hover {
  color: $primaryColor;
  border-bottom: $primaryColor;
}
/* 
@media (max-width: 575px){
  .box{
    overflow: scroll;
    height: 520px;
  }
} */

</style>