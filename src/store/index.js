import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import params from './modules/params'
import project from './modules/project'
import database from './modules/database'
import testcase from './modules/testcase'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    common,
    params,
    project,
    database,
    testcase
  }
})
