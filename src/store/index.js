import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    stories:[],
    profile: false
  },
  mutations: {
    setStory(state,value){
      state.stories=value
    },  
    setUser(state,value){
      state.user = value
    },
    setProfile(state){
      state.profile = !state.profile
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
