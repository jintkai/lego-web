<template>
  <div>
    这个是log信息{{this.responseId}}
  </div>
</template>

<script>
  export default {
    name: "test-case-log-info",
    props: {
      responseId: {
        type: String
      }
    },
    methods:{
      getResponseLog(){

      }
    }
  }
</script>

<style scoped>

</style>
