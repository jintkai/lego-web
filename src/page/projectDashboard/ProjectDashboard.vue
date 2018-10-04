<template>
  <div>
    这个是仪表盘：项目id{{this.$route.params.projectid}}}
  </div>
</template>

<script>
  export default {
    name: "project-dashboard",
    watch: {
      $route(to,from){

      }
    }
  }
</script>

<style scoped>

</style>
