<template>
  <div>
    <el-form v-model="form">
      <el-form-item label="项目名称">
        <el-input v-model="projectName"></el-input>
      </el-form-item>
      <el-form-item label="项目描述">
        <el-input v-model="form.description" type="textarea" :rows="4"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
  import $http from '@/util/http'

  export default {
    name: "project-form",
    data() {
      return {
        form: {}
      }
    },
    computed: {
      projectName: {
        set(v) {
          this.form.projectName = v.trim()
        },
        get() {
          return this.form.projectName
        }
      }
    },
    methods: {
      save() {
        $http({
          url: './api/project',
          data: this.form,
          method: 'POST'
        }).then(response => {
          this.$emit('callback', {success: true, cancel: null})
          this.$emit('update:visible',false)
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '添加项目失败',
            message: err.msg
          })
        })
      },
      cancel() {
        this.$emit('update:visible',false)
      }
    }
  }
</script>

<style scoped>

</style>
