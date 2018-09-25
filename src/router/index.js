import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Project from '../page/project/index'
import Database from '../page/database/index'
import Params from '../page/params/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/database',
      name: 'Database',
      component: Database
    },
    {
      path: '/params',
      name: 'Params',
      component: Params
    }
  ]
})
