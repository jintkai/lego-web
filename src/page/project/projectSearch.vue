<template>
  <div >
    <el-select
      style="width:100%;"
      v-model="project"
      filterable
      remote
      reserve-keyword
      placeholder="请输入项目ID、项目名称"
      :remote-method="remoteMethod"
      @input="change"
      :loading="loading">
      <el-option
        v-for="item in projectList"
        :key="item.id"
        :label="item.projectName"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import $http from '../../util/http'

  export default {
    name: "project-search",
    data() {
      return {
        loading: false,
        projectList: [],
        project:null
      }
    },
    mounted(){
      this.remoteMethod('')
    },
    methods: {
      remoteMethod(query) {
          let _this = this;
          this.loading = true;
          $http({
            method:'post',
            url: './api/project/vague?key='+query.trim(),
          }).then(res => {
            this.projectList = res.data
            this.loading = false
          }).catch(err => {
            _this.$notify({
              type: 'error',
              title: '查询项目失败',
              message: err.msg
            })
          })

      },
      change(){
        this.$emit('input',this.project)
      }
    }
  }
</script>

<style scoped>

</style>
