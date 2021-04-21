<template>
  <div class="stories">
     <StoryBox v-for="(story,ind) in stories" :key="ind"
        :id="story._id"
        :title="story.title"
        :author="story.author"
        :review="story.review"
        :image="story.image"
      /> 
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import StoryBox from '@/components/StoryBox'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: "Stories",
  components: {
    StoryBox
  },

  setup(props) {
   const store = useStore()
   const stories = reactive([])


   onMounted(()=> {
        list()
        }) 

    function list(){
      fetch('http://localhost:8081/stories/list',{
        method:'POST',
        body: JSON.stringify({}),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp=>resp.json())
        .then(data=>{
          stories.splice(0)
          if(!store.state.user.nickname || store.state.user.admin==false){
            data.filter(story => story.active==true).forEach(story => stories.push(story))
          } else{
            data.forEach(story => stories.push(story))
          }  
        })            
    }
    
    return {
      stories,
    }
  },
}
</script>

<style lang="scss" scoped>

.stories{
  margin: 200px auto 0 auto;
  /* border: 1px solid red; */
  margin-right: auto;
  margin-left: auto ;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  justify-content: space-evenly;
}

h1:hover{
  color:$primaryColor;
}

@media (max-width: 1024px){
  .stories{
   margin-top: 150px;
   flex-direction: column;
   align-items: stretch;
  }
}


</style>