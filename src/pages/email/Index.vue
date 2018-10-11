<template>
  <div id="email" class="full-page flex flex-v">
    <div class="screen">
      <el-select :clearable="true" v-model="emailList.pageParams.appId" placeholder="请选择" @change="appChange">
        <!--|| screen({id:0})-->
        <el-option
          label="全部"
          value="0">
        </el-option>
        <el-option
          v-for="(item,index) in userApps"
          :key="item.id"
          :label="item.name"
          :value.number="item.id">
        </el-option>
      </el-select>

      <el-button class="pull-right" type="primary" @click="openDialog">新增邮件通知</el-button>
    </div>
    <div class="email-warp flex1">
      <template>
        <el-table
          border
          :data="emailList.rows"
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
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <el-pagination background
                   layout="prev, pager, next"
                   :page-count="emailList.pageParams.totalPage"
                   :page-size="emailList.pageParams.limit"
                   :current-page="emailList.pageParams.page"
                   @current-change="pageChange">
    </el-pagination>


    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="邮件地址" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请选择填写邮件地址"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="appId">
          <el-select v-model="ruleForm.appId" placeholder="请选择项目">
            <el-option
              v-for="item in userApps"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="sumitForm('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import emailList from '@/graphql/emailList.graphql';
  import userApps from '@/graphql/app/userApps.graphql';
  import deleteEmail from '@/graphql/deleteEmail.graphql';
  import createEmail from '@/graphql/createEmail.graphql';
  import updateEmail from '@/graphql/updateEmail.graphql';
  import store from "../../vuex/store";

  export default {
    data() {
      return {
        apps: [],

        emailList: {
          row: [],
          pageParams: {
            page: 1,
            limit: 12,
            appId: '0'
          }
        },
        dialogVisible: false,
        dialogTitle: '新增邮件通知',
        ruleForm: {
          email: '',
          appId: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮件地址', trigger: 'blur'},
            {
              pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
              message: '邮件地址格式不正确',
              trigger: 'blur'
            }
          ],
          appId: [
            {required: true, message: '请选择项目', trigger: 'change'}
          ]
        }
      }
    },
    apollo: {
      emailList() {
        return {
          query: emailList,
          variables: this.emailList.pageParams
        }
      },
      userApps() {
        return {
          query: userApps,
        }
      }
    },
    computed: {
      appsAll: function () {
        let app = [];
        if (this.apps.length > 0) {
          this.apps.map((item) => {
            if (item.id !== 0) {
              app.push(item)
            }
          })
        }
        return app;
      }
    },
    methods: {
      async getEmailList() {
        let pageParams = JSON.parse(JSON.stringify(this.pageParams));
        if (pageParams.appId) {
          pageParams.appId = pageParams.appId;
        }
        let res = await this.$apollo.query({query: emailList, variables: pageParams});
        this.emails = res.data.emailList.rows;
        this.pageParams.totalPage = res.data.emailList.pageParams.totalPage;
      },
      async getUserApps() {
        let res = await this.$apollo.query({query: userApps});
        let apps = [{name: '全部项目', id: 0}]
        this.apps = apps.concat(res.data.userApps);
      },
      appChange(val) {
        debugger;
        let pageParams = JSON.parse(JSON.stringify(this.emailList.pageParams));
        if (val === '0') {
          delete pageParams.appId;
        } else {
          pageParams.appId = val;
        }
        this.$apollo.queries.emailList.setVariables(pageParams);
      },
      handleDelete(index, item) {
        this.$confirm('你确认要删除么？', '提示').then(async () => {
          let res = await this.$apollo.mutate({mutation: deleteEmail, variables: {id: item.id},update:(store,{data:{deleteEmail}})=>{
            this.$apollo.queries.emailList.refetch();
                  /*if(deleteEmail){
                    const data = store.readQuery({query: emailList, variables: this.emailList.pageParams});
                    data.emailList.rows.splice(index,1);
                    store.writeQuery({query: emailList, data});
                  }*/
          }});
          if (res.data.deleteEmail) {
//            this.emails.splice(index, 1);
            this.$message.success('删除成功');
          } else {
            this.$message.error('删除失败，请稍后再试');
          }
        })
      },
      handleEdit(index, item) {
        this.dialogTitle = '编辑邮件通知';
        this.ruleForm = JSON.parse(JSON.stringify(item));
        this.dialogVisible = true;
      },
      sumitForm(form) {
        this.$refs[form].validate(async (val) => {
          if (val) {
            if (this.ruleForm.id) {
              let res = await this.$apollo.mutate({
                mutation: updateEmail,
                variables: {appId: parseInt(this.ruleForm.appId), email: this.ruleForm.email, id: this.ruleForm.id},
                update:(store,{data:{updateEmail}})=>{
                  const data = store.readQuery({query: emailList, variables: this.emailList.pageParams});
                  data.emailList.rows[index]=updateEmail;
                  store.writeQuery({query: emailList, data});
              }
              });
              if (res.data.updateEmail) {
                this.$message.success('新增成功');
                this.getEmailList();
                this.dialogVisible = false;
              }
            } else {
              let res = await this.$apollo.mutate({
                mutation: createEmail,
                variables: {appId: this.ruleForm.appId, email: this.ruleForm.email},
                update: (store, {data: {createEmail}}) => {
                  this.$apollo.queries.emailList.refetch();
                  /*console.log(store);
                  const data = store.readQuery({query: emailList, variables: this.emailList.pageParams});
                  data.emailList.rows.unshift(createEmail);
                  store.writeQuery({query: emailList, data});
                  console.log(data);
                  console.log(store);*/
                }
              });
              if (res.data.createEmail) {
                this.$message.success('新增成功');
                this.dialogVisible = false;
              }
            }
          }
        })
      },
      openDialog() {
        this.ruleForm = {
          emial: '',
          appId: ''
        };
        this.dialogTitle = '新增邮件通知';
        this.dialogVisible = true;
      },
      pageChange(page) {
        this.$apollo.queries.emailList.refetch({page:page});
      }
    },
    async created() {
//    this.getEmailList();
//    this.getUserApps();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
