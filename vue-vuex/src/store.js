import Vue from 'vue'
import Vuex from 'vuex'
import aboutState from './components/About/state'
import formState from './components/Form/state'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    about: aboutState,
    form: formState
  }
})

console.log(store.state)
