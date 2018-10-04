<template>
  <div>
    <el-form :model="form" label-width="100px" ref="ruleForm" :rules="rules">
      <el-form-item label="用例名称" prop="caseName">
        <el-input v-model.trim="form.caseName"></el-input>
      </el-form-item>
      <el-form-item label="URL地址" prop="caseUrl">
        <el-input v-model.trim="form.caseUrl"></el-input>
      </el-form-item>
      <el-form-item label="请求方法" prop="methodType">
        <el-select v-model="form.methodType" placeholder="请选择">
          <el-option v-for="item in methodType"
                     :key="item.key" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="参数格式">
        <el-radio-group v-model="form.paramsType">
          <el-radio v-for="item in paramsType"
                    :key="item.key" :label="item.value">{{item.name}}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="请求参数">
        <el-input v-model="form.caseParams" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.caseDescription" type="textarea" :rows="2"></el-input>
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
  import {mapGetters, mapState} from 'vuex'

  export default {
    name: "case-form",
    data() {
      return {
        form: {projectId: this.$route.params.projectid, paramsType: 1, methodType: 1},
        rules:{
          caseName:[{ required: true, message: '请填写用例名称', trigger: 'blur' }],
          caseUrl:[{ required: true, message: '请填写用例url地址', trigger: 'blur' }]

        }
      }
    },
    computed: {
      ...mapState(
        'testcase', {'methodType': 'methodType', 'paramsType': 'paramsType'},
      ),
      caseName: {
        set(v) {
          this.form.caseName = v.trim()
        },
        get() {
          return this.form.caseName
        }
      }
    },
    methods: {
      save() {
        let validate = true

        this.$refs['ruleForm'].validate((valid) => {
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
          url: './api/testcase',
          data: this.form,
          method: 'POST'
        }).then(response => {
          this.$emit('callback', {success: true, cancel: null})
          this.$emit('update:visible', false)
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '添加用例失败',
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
