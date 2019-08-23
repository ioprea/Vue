export default {
  namespaced: true,
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Test 1', done: true },
      { id: 2, text: 'Test 2', done: false }
    ]
  },
  mutations: {
    increment (state) {
      state.count++
    },
    incrementBy (state, payload) {
      state.count += payload.amount
    }
  },
  actions: {
    incrementAsync ({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    },
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('someMutation')
          resolve()
        }, 1000)
      })
    }
  }
}
