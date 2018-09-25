<template>
  <div id="app">
    <el-menu :default-active="activeIndex" mode="horizontal"
             @select="handleSelect" :router="true">
      <el-menu-item index="dashboard">我的工作台</el-menu-item>
      <el-menu-item index="project">项目管理</el-menu-item>
      <el-submenu index="2">
        <template slot="title">接口测试</template>
        <el-menu-item index="database">数据库维护</el-menu-item>
        <el-menu-item index="params">参数配置</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
    </el-menu>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        activeIndex:1
      }
    },
    methods:{
      handleSelect(c){
        console.log(c)
      }
    }
  }
</script>

<style>
  #app {
  }
</style>
