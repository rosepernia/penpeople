<template>
  <div class="stories view-top">
    <StoryCard v-for="(story,ind) in stories" :key="ind" @update="update"
      :id="story._id"
      :title="story.title"
      :author="story.author"
      :review="story.review"
      :image="story.image"
      :active="story.active"
    /> 
  </div>
</template>

<script>
import StoryCard from '@/components/StoryCard'
import { useStore } from "vuex"
import { ref, reactive, watch, onMounted } from 'vue'

export default {
  name: "Stories",
  components: {
    StoryCard
  },
  setup() {
   const store = useStore()
   const stories = reactive([])
   const admin = ref(false)

    const list = () => {
      fetch('http://localhost:8081/stories/list',{
        method:'POST',
        body: JSON.stringify({}),
        headers: {'Content-Type':'application/json'}
      })
        .then(resp=>resp.json())
        .then(data=>{
          stories.splice(0)
          if(admin.value != true){
            data.filter(story => story.active == true).forEach(story => stories.push(story))
          } else data.forEach(story => stories.push(story))
        })            
    }

    const update = () => list()

    watch(store.state, () => {
      admin.value = store.state.user.admin
      list()
      })

    onMounted(()=> {
      admin.value = store.state.user.admin
      list()
      }) 

    return {
      stories,
      update,
      admin
    }
  },
}
</script>

<style lang="scss" scoped>
.view-top{
  margin-top: 200px;
}
.stories{
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  max-width: 1100px;
  justify-content: space-evenly;
}
h1:hover{
  color:$primaryColor;
}
</style>