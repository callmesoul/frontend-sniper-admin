<template>
  <div id="email" >
    <div class="screen">
      <el-select v-model="pageParams.appId" placeholder="请选择" @change="appChange">
        <el-option
          v-for="item in apps"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>

      <el-button class="pull-right" type="primary">新增邮件通知</el-button>
    </div>
    <div class="email-warp">
      <template>
        <el-table
          border
          :data="emails"
          style="width: 100%">
          <el-table-column
            label="项目"
            width="180">
            <template slot-scope="scope">
              {{scope.row.emailApp.name}}
            </template>
          </el-table-column>
          <el-table-column
            label="邮箱地址"
            >
            <template slot-scope="scope">
              {{scope.row.email}}
            </template>
          </el-table-column>
          <el-table-column
            label="日期"
            width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.updatedAt | moment('YYYY-MM-DD') }}</span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
  import emailList from '@/graphql/emailList.graphql';
  import userApps from '@/graphql/userApps.graphql';
export default {
  data () {
    return {
      apps: [],
      pageParams:{
        page:1,
        limit:12,
        appId:'0'
      },
      emails:[]
    }
  },
  methods:{
    async getEmailList(){
      let pageParams=JSON.parse(JSON.stringify(this.pageParams));
      if(pageParams.appId){
        pageParams.appId=parseInt(pageParams.appId);
        if(pageParams.appId===0){
          delete pageParams.appId;
        }
      }
      let res=await this.$apollo.query({query:emailList,variables:pageParams});
      this.emails=res.data.emailList.rows;
      this.pageParams.totalPage=res.data.emailList.pageParams.totalPage;
    },
    async getUserApps(){
      let res=await this.$apollo.query({query:userApps});
      let apps=[{name:'全部项目',id:'0'}]
      this.apps=apps.concat(res.data.userApps);
    },
    appChange(val){
      if(val==='0'){
        delete this.pageParams.appId;
      }else{
        this.pageParams.appId=val;
      }
      this.pageParams.page=1;
      this.getEmailList();
    }
  },
  async created(){
    this.getEmailList();
    this.getUserApps();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
