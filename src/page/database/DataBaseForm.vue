<template>
  <div>
    <el-form v-model="form" label-width="100px" >
      <el-form-item label="数据库名称">
        <el-input v-model="dbName"></el-input>
      </el-form-item>
      <el-form-item label="所属项目">
        <project-search v-model="form.projectId"></project-search>
      </el-form-item>
      <el-form-item label="数据库类型">
        <el-select v-model="form.dbType" placeholder="请选择">
          <el-option
            key="Mysql"
            label="Mysql"
            value="Mysql">
          </el-option>
          <el-option
            key="Oracle"
            label="Oracle"
            value="Oracle">
          </el-option>
          <el-option
            key="SqlServer"
            label="SqlServer"
            value="SqlServer">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据库url">
        <el-input v-model="form.dbUrl"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.dbUser"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.dbPassword"></el-input>
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
  import ProjectSearch from "../project/projectSearch";

  export default {
    components: {ProjectSearch},
    name: "data-base-form",
    data() {
      return {
        form: {}
      }
    },
    computed: {
      dbName: {
        set(v) {
          this.form.dbName = v.trim()
        },
        get() {
          return this.form.dbName
        }
      }
    },
    methods: {
      save() {
        $http({
          url: './api/database',
          data: this.form,
          method: 'POST'
        }).then(response => {
          this.$emit('callback', {success: true, cancel: null})
          this.$emit('update:visible', false)
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '添加数据库失败',
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
