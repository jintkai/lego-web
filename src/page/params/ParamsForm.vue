<template>
  <div>
    <el-form :model='form' label-width="100px" ref="ruleForm" :rules="rules">
      <el-form-item label="参数名" prop="paramsName">
        <el-input v-model.trim="form.paramsName"></el-input>
      </el-form-item>
      <el-form-item label="所属项目" prop="projectId" v-if="!initForm.projectId">
        <project-search v-model="form.projectId"></project-search>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model.number="form.type">
          <el-radio v-for="item in paramsTypes"
                    :key="item.key" :label="item.value">{{item.name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属数据库" v-if="form.type == 2" prop="databaseId">
        <database-search :init-search="{projectId:form.projectId}" v-model="form.databaseId"></database-search>
      </el-form-item>
      <el-form-item :label="form.type == 1?'参数值':form.type == 2?'SQL语句':'参数值'"
                    :rules="[
                     {required: true, message: '请输入'+(form.type == 1?'参数值':'SQL语句'), trigger: 'blur'}
                    ]"
                    prop="paramsValue">
        <el-input v-model="form.paramsValue"></el-input>
      </el-form-item>
      <el-form-item label="取用字段" v-if="form.type == 2" prop="sqlKey">
        <el-input v-model.trim="form.sqlKey"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model.trim="form.description" type="textarea" :rows="4"></el-input>
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
  import projectSearch from '../project/projectSearch'
  import DatabaseSearch from "../database/dataBaseSearch";
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "params-form",
    components: {
      DatabaseSearch,
      projectSearch
    },
    props: {
      initForm: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    data() {
      var validateName = (rule, value, callback) => {
        // let regexp = /^[a-zA-Z]\w*$/
        // let v = regexp.test(value)
        if (!value) {
          callback(new Error('用参数名只允许包含字母或数字或下划线，且字母开头'));
        } else {
          callback();
        }
      };

      return {
        form: Object.assign(this.initForm, {type: 1}),
        rules: {
          paramsName: [{validator: validateName, trigger: 'blur'}],
          projectId: [
            {required: true, message: '请选择项目', trigger: 'blur'}
          ],
          databaseId: [
            {required: true, message: '请选择数据库', trigger: 'blur'}
          ],
          // paramsValue: [
          //   {required: true, message: '请输入参数值', trigger: 'blur'}
          // ],
          sqlKey: [
            {required: true, message: '请选择数据库列字段', trigger: 'blur'}
          ]
        }
      }
    },
    watch: {
      "form.type"(n) {
        this.$refs['ruleForm'].resetFields()
      }
    },
    computed: {
      ...mapState(
        'params', {'paramsTypes': 'types'}
      ),

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
        let validate = false
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            validate = true
          } else {
            console.log(valid)
            validate = false
            return false
          }
        })
        if (!validate) {
          return
        }
        let params = {value: this.form.paramsValue}
        delete this.form.paramsValue
        /**
         * sql类型的参数需要设置取用字段
         */
        if (this.form.type == 2) {
          params['sqlKey'] = this.form.sqlKey
          delete this.form.sqlKey
        }
        this.form.paramsExpression = JSON.stringify(params)
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
