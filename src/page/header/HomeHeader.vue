<template>
  <div class="home-header">

    <div>
      <project-search v-model="project"></project-search>
    </div>

    <div>
      <span>我的</span>
      <span>通知</span>
    </div>

  </div>
</template>

<script>
  import ProjectSearch from "../project/projectSearch";

  export default {
    components: {ProjectSearch},
    name: "HomeHeader",
    data() {
      return {
        project: null
      }
    },
    watch: {
      project(nv, ov) {
        this.$router.push({name: 'Project', params: {projectid: nv}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .home-header {
    height: 8px;
    display: flex;
    align-items: center;

  }
</style>
