<template> 
  <div class="view-top read">

    <!-- <h1>{{story.title}}</h1> -->
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "ReadStory",
  components: {},

  setup() {
    const store = useStore();
    let story = computed (()=> store.state.story)
    
    

  /*  onMounted(()=> {
        store.dispatch("getStory")

    }) */

    return {
      story,
      ...store.state, 
    }
  },
}
</script>

<style lang="scss" scoped>
 .read{
 /*  margin-left: auto;
  margin-right: auto; */
  width: 80%;
  max-width: 800px;
  min-height: 400px;
  border: 1px solid $textColor;
}

</style>