<template>
  <div id="email" class="full-page flex flex-v">
    <div class="screen">
      <el-select :clearable="true" v-model="pageParams.appId" placeholder="请选择" @change="appChange">
        <el-option
          key="0"
          label="全部项目"
          :value.number="0">
        </el-option>
        <el-option
          v-for="(item,index) in apps"
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
          :data="emails"
          style="width: 100%">
          <el-table-column
            label="项目"
            width="180">
            <template slot-scope="scope">
              {{scope.row.app.name}}
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
                   :page-count="pageParams.totalPage"
                   :page-size="pageParams.limit"
                   :current-page="pageParams.page"
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
              v-for="item in apps"
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

  import store from "../../vuex/store";
  import Vue2Filters from 'vue2-filters'

  export default {
    data() {
      return {
        apps: [

        ],
        emails:[],
        pageParams: {
          page: 1,
          limit: 12,
          appId: 0,
          getSelf:true
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
    mixins: [Vue2Filters.mixin],
    apollo: {

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
        let pageParams=JSON.parse(JSON.stringify(this.pageParams));
        if(pageParams.appId==0){
          delete  pageParams.appId;
        }
        let res= await this.$api.email.index(pageParams);
        if(res){
          this.emails = res.rows;
          this.pageParams.totalPage = Math.ceil(res.count/this.pageParams.limit);
        }
      },
      async getUserApps() {
        let res = await this.$api.app.index({getSelf:true});
        if(res){
          this.apps=res.apps
        }
      },
      appChange(val) {
        if (val === '0') {
          delete this.pageParams.appId;
        } else {
          this.pageParams.appId = val;
        }
        this.getEmailList();
      },
      handleDelete(index, item) {
        this.$confirm('你确认要删除么？', '提示').then(async () => {
          let res = await this.$api.email.destroy(item.id);
          if (res) {
            this.$message.success(res.msg);
            this.emails.splice(index, 1);
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
            let res;
            if (this.ruleForm.id) {
              res = await this.$api.email.update(this.ruleForm);
            } else {
              res = await this.$api.email.create(this.ruleForm);
            }
            if (res) {
              this.$message.success(res.msg);
              this.getEmailList();
              this.dialogVisible = false;
            }
          }
        })
      },
      openDialog() {
        this.ruleForm = {
          email: '',
          appId: ''
        };
        this.dialogTitle = '新增邮件通知';
        this.dialogVisible = true;
      },
      pageChange(page) {
        this.pageParams.page=page;
        this.getEmailList();
      }
    },
    async created() {
      this.getEmailList();
      this.getUserApps();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
