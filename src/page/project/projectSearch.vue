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
        :label="item.projectName+item.id"
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
    methods: {
      remoteMethod(query) {
        if (query.trim() !== '') {
          this.loading = true;
          $http({
            url: './api/project/vague/' + query.trim()
          }).then(res => {
            this.projectList = res.data
            this.loading = false
          }).catch(err => {
            this.$nofity({
              type: 'error',
              title: '查询项目失败',
              message: err.msg
            })
          })

        } else {
          this.projectList = [];
        }
      },
      change(){
        console.log(1)
        this.$emit('input',this.project)
      }
    }
  }
</script>

<style scoped>

</style>
