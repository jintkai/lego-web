const state = {
  modules:[

  ],
  activeModule: 1
}

const mutations = {
  setActiveModule(state, activeModule) {
    state.activeModule = activeModule
  }
}

const actions = {
  setActiveModule({commit, state}, activeModule) {
    commit('setActiveModule', activeModule)
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
