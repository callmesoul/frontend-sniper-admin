<template>
  <div id="apps" class="flex flex-v" >
    <div class="header-title">
      <icon icon="torah"></icon>{{app.name}}
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

export default {
  data () {
    return {
      tabActive: 'error',
      errors:[],
      pageParams:{
        page:1,
        limit:12
      },
      app:{}
    }
  },
  methods:{
    async getAppErrors(){
      let res= await this.$api.error.index(this.pageParams);
      if(res){
        this.errors=res.rows;
        this.pageParams.totalPage = Math.ceil(res.count/this.pageParams.limit);
      }
    },
    pageChange(page){
      this.pageParams.page=page;
      this.getAppErrors();
    },
    async getApp(){
      let res= await this.$api.app.show(this.$route.params.id);
      if(res){
        this.app=res.app;
      }
    },
  },
  async created(){
    this.pageParams.appId=this.$route.params.id;
    this.getAppErrors();
    this.getApp();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
