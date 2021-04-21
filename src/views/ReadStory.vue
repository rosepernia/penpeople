<template> 
  <div class="view-top block" v-if="story.value"> 
    <div class="head">
      <h2 class="head-title">The other's gold</h2> 
      <i class="bi bi-diagram-3-fill head-tree"></i>
    </div>
    <div class="box">
      <div><p class="box-title">{{block.value.closure[0]}}</p></div> 
      <div class="box-data">
        <img src="@/assets/img/users/default1.jpg" alt="Foto autor" class="box-avatar">
        <p class="box-author">{{block.value.author}}</p>
      </div> 
      <p class="text">{{block.value.body}}</p>
      <div class="likes">
        <i class="bi bi-heart likes-heart"></i>
      </div>
      <div class="closures">
        <p v-if="closures.length==0">THE END</p>
        <p v-for="(option, index) in closures" :key="index" class="closures-choose" @click="closureType">
          <span>{{option}}</span>
        </p>
      </div>
    </div>
    
  </div>
</template>

<script>
import { useRoute } from "vue-router"
import { reactive, onMounted } from "vue"

export default {
  name: "ReadStory",
  components: {},

  setup() {
   const route = useRoute ()
   const story = reactive({})
   const block = reactive({})
   const blocks = reactive([])
   const closures = reactive([])
   

   onMounted(() => {
      findStory()
    })

   const findStory = () => {
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
          data.closure.forEach(closure => closures.push(closure))
          console.log(closures)
        })
      fetch('http://localhost:8081/blocks/listpublish', {
        method:'POST',
        body: JSON.stringify({story: route.params.id}),
        headers: {'Content-Type':'application/json'}
      }) 
        .then(resp=>resp.json())
        .then(data=>{
          blocks.splice(0)
          data.forEach(blockinfo => blocks.push(blockinfo))
        })  
    }


   const closureType = (event) => {
    console.log(event)
    fetch('http://localhost:8081/blocks/findbyblockid', {
        method:'POST',
        body: JSON.stringify({story: route.params.id}, {blockid: block.value.blockid}),
        headers: {'Content-Type':'application/json'}
      }) 
        .then(resp=>resp.json())
        .then(data=>{
          console.log(data)
        })  
   }

    return {
      story,
      findStory,
      block,
      blocks,
      closures,
      closureType
    }
  },
}
</script>

<style lang="scss" scoped>

.block{
  width: 90%;
  max-width: 900px;
  min-height: 400px;
}

.head{
  position: relative;
}

.head-title{
   font-family: $font3;
    margin-bottom: 10px ;
    color: #52b1b9;
    padding: 3px;
    font-weight: bold;
    font-size: $size2;
    border-bottom:1px solid   #52b1b9;
}

i.head-tree::before{
  top:0;
  right:20px;
  position: absolute;
  font-size: $size4;
  color: #52b1b9;
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
.closure:focus  	{ outline:none; }
.closure:hover {
  color: #52b1b9;
  border-bottom:#52b1b9;
}

@media (max-width: 575px){
  p{
    overflow: scroll;
  }
}

</style>