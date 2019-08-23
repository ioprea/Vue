export default {
  namespaced: true,
  state: {
    message: '',
    message2: ''
  },
  mutations: {
    updateMessage (state, message) {
      state.message = message
    },
    updateMessage2 (state, payload) {
      state.message2 = payload.message
      console.log('state', state)
    }
  },
  actions: {
    updateMessageAction ({ commit, state }, payload) {
      commit('updateMessage', payload)
      console.log('state', state)
    }
  }
}
