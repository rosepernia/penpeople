import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    stories:[],
  },
  getters: {
    getUser(state){
      return state.user
    }
  },
  mutations: {
    setStory(state,value){
      state.stories=value
    },  
    setUser(state,valor){
      state.user = valor
    },
  },
 /*  actions: {
    getStory(mutations){
      fetch('http://localhost:8081/stories/list')
        .then(resp=>resp.json())
        .then(datos=>{
          mutations.commit('setStory',datos)
        })
        console.log(datos)
    }
  }, */
  modules: {
  }
})
