<template>
  <div class="view-top stories">
     <StoryBox v-for="(story, i) in stories" :key="i"
        :title="story.title"
        :author="story.author"
        :review="story.review"
        :image="story.image"
      />  
  </div>
</template>

<script>
import StoryBox from '@/components/StoryBox'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: "Stories",
  components: {
    StoryBox
  },

  setup() {
    let stories=reactive([])

    /* onMounted(()=> {
            list()
        }) */
    const list=()=>{
            fetch('http://localhost:8081/stories/list',{
               method:'POST',
               /* body: JSON.stringify({}), */
               headers: {'Content-Type':'application/json'}
            })
              .then(resp=>resp.json())
              .then(data=>{
                    stories.value=data
                    /* data.forEach(story => {
                        stories.value.push(story)
                    }) */
              })            
    }
    list()

    return {
      stories,
    }
  },
}
</script>

<style lang="scss" scoped>
.stories{
  border: 1px solid red;
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

</style>