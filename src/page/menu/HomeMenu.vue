<template>
  <div class="home-menu">
    <div :class='{menu:true,"active-menu":getActiveModule == "Database"}'
         @click="$router.push({name:'Database',params:{projectid:$route.params.projectid}})">
      数据库
    </div>
    <div :class='{menu:true,"active-menu":getActiveModule == "Params"}'
         @click="$router.push({name:'Params',params:{projectid:$route.params.projectid}})">
      参数化
    </div>
    <div :class='{menu:true,"active-menu":getActiveModule == "TestCase"}'
         @click="$router.push({name:'TestCase',params:{projectid:$route.params.projectid}})">
      接口用例
    </div>
    <div :class='{menu:true,"active-menu":getActiveModule == "Job"}'>
      定时任务
    </div>
    <div :class='{menu:true,"active-menu":getActiveModule == "Report"}'>
      报告
    </div>
  </div>
</template>

<script>
  export default {
    name: "home-menu",
    computed: {
      getActiveModule() {
        return this.$store.state.common.activeModule
      }
    }
  }
</script>

<style scoped lang="scss">
  .home-menu {
    box-shadow: -1px 2px 2px #DDDDDD inset;

    background-color: #F5F5F5;
    display: flex;
    height: 50px;
    align-items: center;
    .menu {
      font-size: 20px;
      padding: 0 10px;
    }
    .active-menu {
      border-bottom: 2px solid red;
    }
  }
</style>
