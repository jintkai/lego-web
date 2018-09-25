<template>
  <div>
    <el-form v-model="form" label-width="100px" >
      <el-form-item label="参数名称">
        <el-input v-model="paramsName"></el-input>
      </el-form-item>
      <el-form-item label="所属项目">
        <project-search v-model="form.projectId"></project-search>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            key="Mysql"
            label="Mysql"
            :value="1">
          </el-option>
          <el-option
            key="Oracle"
            label="Oracle"
            :value="2">
          </el-option>
          <el-option
            key="SqlServer"
            label="SqlServer"
            :value="3">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="表达式">
        <el-input v-model="form.paramsExpression"></el-input>
      </el-form-item>
      <el-form-item label="描述">
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
    name: "params-form",
    data() {
      return {
        form: {}
      }
    },
    computed: {
      paramsName: {
        set(v) {
          this.form.paramsName = v.trim()
        },
        get() {
          return this.form.paramsName
        }
      }
    },
    methods: {
      save() {
        $http({
          url: './api/params',
          data: this.form,
          method: 'POST'
        }).then(response => {
          this.$emit('callback', {success: true, cancel: null})
          this.$emit('update:visible', false)
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '添加参数失败',
            message: err.msg
          })
        })
      },
      cancel() {
        this.$emit('update:visible', false)
      }
    }
  }
</script>

<style scoped>

</style>
