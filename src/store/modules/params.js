const state = {
  types: [
    {name: 'KEY-VALUE', value: 1, key: 'key-value'},
    {name: 'SQL', value: 2, key: 'sql'},
  ]
}

const mutations = {
  setType(state, types) {
    state.types = []
    state.types = types
  }
}

const actions = {
  setType({commit, state}, types) {
    commit('setType', types)
  }
}

const getters = {

  /**
   * 通过type的Value，返回整个查到的type
   * @param state
   * @param commit
   * @param tValue
   */
  getTypeByValue: state => tValue => {
    console.log(state, tValue)
    for (let i = 0; i < state.types.length; i++) {
      let item = state.types[i]
      if (item.value == tValue) {
        return item
      }
    }
    return []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
