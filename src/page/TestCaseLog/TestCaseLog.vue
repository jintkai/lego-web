<template>
  <div>
    <el-table :data="logList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <test-case-log-info :responseId="props.row.responseId"></test-case-log-info>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="jodId" label="JobID"></el-table-column>
      <el-table-column prop="assertResult" label="断言结果"></el-table-column>
      <el-table-column prop="creattime" label="更新时间"></el-table-column>
      <el-table-column prop="responseId" label="更新时间"></el-table-column>

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
</template>

<script>
  import $http from '../../util/http'
  import TestCaseLogInfo from "./TestCaseLogInfo";
  export default {
    components: {TestCaseLogInfo},
    name: "test-case-log",
    props:{
      caseId:{
        type:Number
      }
    },
    data() {
      return {
        logList: [],
        page:1,
        pageSize:10,
        total:0
      }
    },
    created(){
      this.getLogList({caseId:this.caseId},this.page,this.pageSize)
    },
    methods:{
      handleSizeChange(size){
        this.pageSize = size;
        this.getLogList({caseId:this.caseId},this.page,this.pageSize)
      },
      handleCurrentChange(page){
        this.page = page
        this.getLogList({caseId:this.caseId},this.page,this.pageSize)
      },
      getLogList(data,page,pageSize){
        $http({
          url: './api/caselog/'+page+'/'+pageSize,
          method: 'POST',
          data: data
        }).then(response => {
          if(response.code != 200){
            this.$notify({
              type:'error',
              title:'获取日志失败',
              message:response.msg
            })
          }else{
            this.logList = response.data.list
            this.total = response.data.total
          }
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
