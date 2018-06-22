import Vue from 'vue'
import Vuex from 'vuex'
import bus from './bus'

Vue.use(Vuex)
const store = () => {
  return new Vuex.Store({
    state: {
    },
    mutations: {
    },
    modules: {
      bus
    }
  })
}

export default store
