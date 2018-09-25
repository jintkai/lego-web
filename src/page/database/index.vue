<template>
  <div>
    <div>
      <el-button @click="()=>{showFormDialog=true}">添加数据库</el-button>
    </div>
    <div>
      <el-table :data="databaseList" style="width:100%;">
        <el-table-column
          prop="id"
          width="100px"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="dbName"
          label="数据库名称"
        >
        </el-table-column>
        <el-table-column prop="dbType" label="类型">
        </el-table-column>
        <el-table-column prop="dbUrl" label="url"></el-table-column>
        <el-table-column prop="dbUser" label="用户名"></el-table-column>
        <el-table-column prop="projectName" label="所属项目"></el-table-column>
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
        <data-base-form :visible.sync="showFormDialog" @callback="formCallBack"></data-base-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import DataBaseForm from "./DataBaseForm";
  import $http from '../../util/http'

  export default {
    components: {DataBaseForm},
    name: "database",
    data() {
      return {
        databaseList: [],
        page: 1,
        pageSize: 10,
        total: 0,

        showFormDialog: false
      }
    },
    mounted() {
      this.getDatabaseList();
    },
    methods: {
      getDatabaseList() {
        $http({
          url: './api/database/' + this.page + '/' + this.pageSize,
          data: {},
          method: 'POST'
        }).then(response => {
          this.databaseList = response.data.list
          this.total = response.data.total
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '获取数据库列表失败',
            message: err
          })
        })
      },
      /**
       * form保存后的回调函数，success为true时说明保存成功
       */
      formCallBack(res) {
        if (res.success) {
          this.getDatabaseList()
        }
      },
      handleSizeChange(vSize) {
        this.pageSize = vSize
        this.getDatabaseList()
      },
      handleCurrentChange(vPage) {
        this.page = vPage
        this.getDatabaseList()
      }
    }
  }
</script>

<style scoped>

</style>
