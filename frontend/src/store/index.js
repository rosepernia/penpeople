import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{},
    profile: false
  },
  mutations: {
    setUser(state,value){
      state.user = value
    },
    setProfile(state){
      state.profile = !state.profile
    },
  },
  actions: {
  },
  modules: {
  }
})
