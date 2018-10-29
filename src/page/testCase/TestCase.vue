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
            <span>{{ getMehodTypeByValue(scope.row.methodType).name }}</span>
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
            <el-button @click="runCase(scope.row)">调试</el-button>
            <el-button @click="()=>{showLog=true;caseId=scope.row.id}">日志</el-button>
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
      <el-dialog :visible.sync="showLog" v-if="showLog" @befor-close="()=>{showLog = false}" width="80%">
        <test-case-log :case-id="caseId"></test-case-log>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import TestCaseForm from "./TestCaseForm";
  import $http from '../../util/http'
  import {mapGetters} from 'vuex'
  import TestCaseLog from "../TestCaseLog/TestCaseLog";

  export default {
    components: {
      TestCaseLog,
      TestCaseForm},
    name: "TestCase",
    data() {
      return {
        testCaseList: [],
        page: 1,
        pageSize: 10,
        total: 0,
        showFormDialog: false,
        showLog:false,
        caseId:null,
      }
    },
    computed: {
      ...mapGetters({
        getMehodTypeByValue: 'testcase/getMethodTypeByValue',
        getParamTypeByValue: 'testcase/getParamsTypeByValue',
        getStatusByValue: 'testcase/getStatusByValue',
      })
    },
    mounted() {
      this.getTestCaseList();
    },
    methods: {
      getTestCaseList() {
        $http({
          url: './api/testcase/' + this.page + '/' + this.pageSize,
          data: {projectId: this.$route.params.projectid},
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
      },
      runCase(row) {
        $http({
          url: './api/testcase/run/' + row.id,
          method: 'POST'
        }).then(response => {
          this.$message({
            type: 'success',
            message: '运行用例成功'
          })
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '运行用例失败',
            message: err
          })
        })
      },
      getCaseLog(row) {
        $http({
          url: './api/caselog/1/10',
          method: 'POST',
          data: {caseId: row.id}
        }).then(response => {
          console.log(response)
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '获取日志失败',
            message:err
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
