<template>
  <div id="apps" class="flex flex-v" >
    <div class="header-title">
      <icon icon="torah"></icon>我爱阅读
    </div>
    <el-tabs v-model="tabActive" class="flex1 flex flex-v" type="card" @tab-click="handleClick">
      <el-tab-pane label="错误" name="error" value="error" class="flex1 flex flex-v">
        <el-table
          :data="errors"
          border
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="100">
          </el-table-column>
          <el-table-column
            prop="category"
            label="分类"
            width="100">
          </el-table-column>
          <el-table-column
            prop="level"
            label="类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="msg"
            label="报告信息">
          </el-table-column>
          <el-table-column
            label="时间"
            width="100">
            <template slot-scope="scope">
              {{ scope.row.updatedAt | time }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="统计" name="static" value="static">统计</el-tab-pane>
    </el-tabs>
    <el-pagination v-if="tabActive=='error'"
      background
      layout="prev, pager, next"
      :page-count="this.pageParams.totalPage"
      :page-size="this.pageParams.limit"
      :current-page="this.pageParams.page"
      @current-change="this.pageChange">
    </el-pagination>
  </div>
</template>

<script>
  import appErrors from '@/graphql/appErrors.graphql';
export default {
  data () {
    return {
      tabActive: 'error',
      errors:[],
      pageParams:{
        page:1,
        limit:12
      }
    }
  },
  methods:{
    async getAppErrors(){
      let res=await this.$apollo.query({query:appErrors,variables:this.pageParams});
      this.errors=res.data.appErrors.rows;
      this.pageParams=res.data.appErrors.pageParams;
    },
    pageChange(page){
      this.pageParams.page=page;
      this.getAppErrors();
    }
  },
  async created(){
    this.pageParams.id=this.$route.params.id;
    this.getAppErrors();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
