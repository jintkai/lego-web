<template>
  <div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="ruleForm" status-icon>
      <el-form-item label="数据库名称" prop="dbName">
        <el-input v-model.trim="form.dbName"></el-input>
      </el-form-item>
      <el-form-item label="所属项目" v-if="!this.initForm.projectId">
        <project-search v-model="form.projectId"></project-search>
      </el-form-item>
      <el-form-item label="数据库类型">
        <el-select v-model="form.dbType" placeholder="请选择">
          <el-option v-for="item in databaseTypes"
                     :key="item.key" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据库url" prop="dbUrl">
        <el-input v-model.trim="form.dbUrl"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="dbUser">
        <el-input v-model.trim="form.dbUser"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="dbPassWord">
        <el-input v-model.trim="form.dbPassword" type="password">
          <i slot="suffix" class="el-icon-view"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model.trim="form.description" type="textarea" :rows="2"></el-input>
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
  import {mapState} from 'vuex'

  export default {
    components: {ProjectSearch},
    props: {
      initForm: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    name: "data-base-form",
    data() {
      var validateDbUser = (rule, value, callback) => {
        let regexp = /^[a-zA-Z]\w*$/
        let v = regexp.test(value)
        if (!v || !value) {
          callback(new Error('用户名只允许包含字母或数字或下划线，且字母开头'));
        } else {
          callback();
        }
      };
      return {
        form: {dbType: 1, ...this.initForm},
        rules: {
          dbName: [{required: true, message: '请输入数据库名称', trigger: 'blur'}],
          dbUrl: [{required: true, message: '请输入数据库url地址', trigger: 'blur'}],
          // dbPassWord: [{required: true, message: '请输入数据库密码', trigger: 'blur'}],
          dbUser: [{validator: validateDbUser, trigger: 'blur'}]
        }
      }
    },
    computed: {
      ...mapState('database', {'databaseTypes': 'types'}),

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
        let validate = true

        this.$refs['ruleForm'].validate((valid) => {
          console.log(valid)
          if (valid) {
          } else {
            validate = false
          }
        });
        if (!validate) {
          this.$message(
            {
              message: '数据校验失败!',
              type: 'warning'
            }
          )
          return
        }
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
