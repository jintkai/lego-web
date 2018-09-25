<template>
  <div>
    <div>
      <el-button @click="()=>{showFormDialog=true}">添加参数</el-button>
    </div>
    <div>
      <el-table :data="dataList" style="width:100%;">
        <el-table-column
          prop="id"
          width="100px"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="paramsName"
          label="参数名"
        >
        </el-table-column>
        <el-table-column prop="projectName" label="所属项目">
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
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
        <params-form :visible.sync="showFormDialog" @callback="formCallBack"></params-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import ParamsForm from "./ParamsForm";
  import $http from '../../util/http'

  export default {
    components: {ParamsForm},
    name: "database",
    data() {
      return {
        dataList: [],
        page: 1,
        pageSize: 10,
        total: 0,

        showFormDialog: false
      }
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList() {
        $http({
          url: './api/params/' + this.page + '/' + this.pageSize,
          data: {},
          method: 'POST'
        }).then(response => {
          this.dataList = response.data.list
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
          this.getList()
        }
      },
      handleSizeChange(vSize) {
        this.pageSize = vSize
        this.getList()
      },
      handleCurrentChange(vPage) {
        this.page = vPage
        this.getList()
      }
    }
  }
</script>

<style scoped>

</style>
