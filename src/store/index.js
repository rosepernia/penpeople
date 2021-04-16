import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    stories:[],
  },
  mutations: {
<<<<<<< HEAD
    setStory(state,value){
      state.stories=value
    },  
=======
    setUser(state,valor){
      state.user = valor
    },
>>>>>>> eb6d2a8f7d7b0cf409fda691331f2a70ce0cbd27
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
