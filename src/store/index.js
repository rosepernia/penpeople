import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    stories:[],
  },
  mutations: {
    setStory(state,value){
      state.stories=value
    },  
  },
  actions: {
    /* getStory(mutations){
      fetch('http://localhost:8081/stories/findbyid')
        .then(resp=>resp.json())
        .then(datos=>{
          mutations.commit('setStory',datos)
        })
    } */
  },
  modules: {
  }
})
