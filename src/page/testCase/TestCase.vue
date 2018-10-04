<template>
  <div>
    <div>
      <el-button @click="()=>{showFormDialog=true}">创建用例</el-button>
    </div>
    <div>
      <el-table :data="testCaseList" style="width:100%;"
                >
        <el-table-column
          prop="id"
          width="100px"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="caseName"
          label="用例名称"
        >
        </el-table-column>
        <el-table-column prop="caseUrl" label="URL地址"></el-table-column>
        <el-table-column prop="methodType" label="方法类型">
          <template slot-scope="scope">
            <span >{{ getMehodTypeByValue(scope.row.methodType).name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="caseStatus"
          label="状态"
        >
          <template slot-scope="scope">
            <span>{{getStatusByValue(scope.row.caseStatus).name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="option" label="操作">
          <template slot-scope="scope">
            <el-button>调试</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="float:right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>

    <div>
      <el-dialog :visible.sync="showFormDialog" @before-close="()=>{showFormDialog=false}">
        <test-case-form :visible.sync="showFormDialog" @callback="formCallBack"></test-case-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import TestCaseForm from "./TestCaseForm";
  import $http from '../../util/http'
  import {mapGetters} from 'vuex'

  export default {
    components: {TestCaseForm},
    name: "TestCase",
    data() {
      return {
        testCaseList: [],
        page: 1,
        pageSize: 10,
        total: 0,
        showFormDialog: false
      }
    },
    computed:{
      ...mapGetters({
        getMehodTypeByValue:'testcase/getMethodTypeByValue',
        getParamTypeByValue:'testcase/getParamsTypeByValue',
        getStatusByValue:'testcase/getStatusByValue',
      })
    },
    mounted() {
      this.getTestCaseList();
    },
    methods: {
      getTestCaseList() {
        $http({
          url: './api/testcase/' + this.page + '/' + this.pageSize,
          data: {projectId:this.$route.params.projectid},
          method: 'POST'
        }).then(response => {
          this.testCaseList = response.data.list
          this.total = response.data.total
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '获取用例列表失败',
            message: err
          })
        })
      },
      /**
       * form保存后的回调函数，success为true时说明保存成功
       */
      formCallBack(res) {
        if (res.success) {
          this.getTestCaseList()
        }
      },
      handleSizeChange(vSize) {
        this.pageSize = vSize
        this.getTestCaseList()
      },
      handleCurrentChange(vPage) {
        this.page = vPage
        this.getTestCaseList()
      },
      rowClick(row, event, column) {
        this.$router.push({name: 'Project', params: {projectid: row.id}})
      }
    }
  }
</script>

<style scoped>

</style>
