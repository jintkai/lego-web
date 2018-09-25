<template>
  <div>
    <div>
      <el-button @click="()=>{showFormDialog=true}">创建项目</el-button>
    </div>
    <div>
      <el-table :data="projectList" style="width:100%;">
        <el-table-column
          prop="id"
          width="100px"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
        >
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
        <project-form :visible.sync="showFormDialog" @callback="formCallBack"></project-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import ProjectForm from "./ProjectForm";
  import $http from '../../util/http'

  export default {
    components: {ProjectForm},
    name: "index",
    data() {
      return {
        projectList: [],
        page: 1,
        pageSize: 10,
        total: 0,

        showFormDialog: false
      }
    },
    mounted() {
      this.getProjectList();
    },
    methods: {
      getProjectList() {
        $http({
          url: './api/project/' + this.page + '/' + this.pageSize,
          data: {},
          method: 'POST'
        }).then(response => {
          this.projectList = response.data.list
          this.total = response.data.total
        }).catch(err => {
          this.$notify({
            type: 'error',
            title: '获取项目列表失败',
            message: err
          })
        })
      },
      /**
       * form保存后的回调函数，success为true时说明保存成功
       */
      formCallBack(res) {
        if (res.success) {
          this.getProjectList()
        }
      },
      handleSizeChange(vSize) {
        this.pageSize = vSize
        this.getProjectList()
      },
      handleCurrentChange(vPage) {
        this.page = vPage
        this.getProjectList()
      }
    }
  }
</script>

<style scoped>

</style>
