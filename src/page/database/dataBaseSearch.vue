<template>
  <div>
    <el-select
      style="width:100%;"
      v-model="databaseId"
      filterable
      remote
      reserve-keyword
      placeholder="请输入数据库名称"
      :remote-method="remoteMethod"
      @input="change"
      :loading="loading">
      <el-option
        v-for="item in databaseList"
        :key="item.id"
        :label="item.dbName+'--'+item.dbUser"
        :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import $http from '../../util/http'

  export default {
    name: "database-search",
    props: {
      initSearch: {}
    },
    data() {
      return {
        loading: false,
        databaseList: [],
        database: {...this.initSearch},
        databaseId: null
      }
    },
    watch: {
      initSearch(n) {
        this.database = {...n}
      }
    },
    created() {
      this.remoteMethod('')
    },
    methods: {
      remoteMethod(query) {
        console.log(query)
        let searchForm = Object.assign({}, this.initSearch)
        if(!query){
          searchForm.dbName = undefined
        }else{
          searchForm.dbName = query
        }

        this.loading = true;
        $http({
          method: 'post',
          url: './api/database/1/100',
          data: searchForm
        }).then(res => {
          console.log(res)
          this.databaseList = res.data.list
          this.loading = false
        }).catch(err => {
          this.$nofity({
            type: 'error',
            title: '查询数据库列表失败',
            message: err.msg
          })
        })

      },
      change() {
        console.log(1)
        this.$emit('input', this.databaseId)
      }
    }
  }
</script>

<style scoped>

</style>
