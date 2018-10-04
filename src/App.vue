<template>
  <div id="app">
    <home-header style="height:100%;"></home-header>
    <home-menu ></home-menu>
    <div style="">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HomeMenu from "./page/menu/HomeMenu";
  import HomeHeader from "./page/header/HomeHeader";

  export default {
    components: {
      HomeHeader,
      HomeMenu},
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
