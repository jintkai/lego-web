const state = {
  methodType: [
    {name: 'Get', value: 1, key: 'get'},
    {name: 'Post', value: 2, key: 'post'},
    {name: 'Delete', value: 3, key: 'delete'},
    {name: 'Put', value: 4, key: 'put'},
  ],
  paramsType:[
    {name: 'form-data', value: 1, key: 'form'},
    {name:'form-urlencoded',value:2,key:'urlencoded'},
    {name: 'json', value: 3, key: 'json'}
  ],
  status:[
    {name:'可用',value:1,key:'available'},
    {name:'禁用',value:2,key:'disable'}
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

  getMethodTypeByValue: state => tValue => {
    for (let i = 0; i < state.methodType.length; i++) {
      let item = state.methodType[i]
      if (item.value == tValue) {
        return item
      }
    }
    return []
  },

  getParamsTypeByValue: state => tValue => {
    for (let i = 0; i < state.paramsType.length; i++) {
      let item = state.paramsType[i]
      if (item.value == tValue) {
        return item
      }
    }
    return []
  },
  getStatusByValue:state=>tValue=>{
    for(let i=0;i<state.status.length;i++){
      let item = state.status[i]
      if(item.value == tValue){
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
