import { createStore } from 'vuex'

export default createStore({
  state: {
    user:{}
  },
  mutations: {
    setUser(state,valor){
      state.user = valor
    },
  },
  actions: {
  },
  modules: {
  }
})
