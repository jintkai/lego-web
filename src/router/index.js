import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Project from '../page/project/index'
import ProjectDashboard from '../page/projectDashboard/ProjectDashboard'
import Database from '../page/database/index'
import Params from '../page/params/index'
import TestCase from '../page/testCase/TestCase'
Vue.use(Router)

export default new Router({
  routes: [
    //项目列表
    {
      path: '/projects',
      name: 'Projects',
      component: Project
    },
    //项目详情
    {
      path:'/project/:projectid',
      name:'Project',
      component:ProjectDashboard

    },
    {
      path: '/project/:projectid/database',
      name: 'Database',
      component: Database
    },
    {
      path: '/project/:projectid/params',
      name: 'Params',
      component: Params
    },
    {
      path:'/project/:projectid/testcase',
      name:'TestCase',
      component:TestCase
    },
    {
      path: '/',
      redirect:'/projects'
    },
  ]
})
