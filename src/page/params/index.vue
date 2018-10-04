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
        <el-table-column prop="type" label="类型">
          <template slot-scope="scope">
            <span >{{ getTypeByValue_Params(scope.row.type).name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="databaseName" label="所属数据库"></el-table-column>
        <el-table-column prop="paramsExpression" label="详细配置"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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

    <div v-if="showFormDialog">
      <el-dialog :visible.sync="showFormDialog" @before-close="()=>{showFormDialog=false}">
        <params-form :visible.sync="showFormDialog"
                     :init-form="{projectId:this.$route.params.projectid}" @callback="formCallBack"></params-form>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import ParamsForm from "./ParamsForm";
  import {mapGetters} from "vuex";
  import $http from '../../util/http'

  export default {
    components: {ParamsForm},
    name: "params",
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
      console.log(this.$store.state.params)

    },
    computed: {
      ...mapGetters(
          {getTypeByValue_Params: 'params/getTypeByValue'}
      )
    },
    methods: {
      //getTypeByValue:this.$store.getters['params/getTypeByValue'],
      getList() {
        $http({
          url: './api/params/' + this.page + '/' + this.pageSize,
          data: {projectId:this.$route.params.projectid},
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
