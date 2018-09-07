<template>
  <div class="app-list full-page flex flex-v" >
    <div class="header">
      <el-input v-model="input" placeholder="请输入名称或id"></el-input>
      <el-button class="pull-right" type="primary" @click="createApp">添加项目</el-button>
    </div>
    <tempalte v-if="apps.length>0">
      <div class="app-list-warp" >
        <el-card shadow="never" class="app-item" v-for="item in apps" :key="item.id">
          <div class="top ">
            <router-link :to="{name:'app',params:{id:item.id}}" class="name"><icon icon="torah" />{{item.name}}</router-link>
            <span class="pull-right email">
            <icon @click.event="editItem(item)" icon="cog" />
            <el-switch
              disabled
              v-model="item.emailNotice"
              active-text="邮件通知">
            </el-switch>
          </span>
          </div>
          <div class="bottom">
            <div class="text-left">AppId:{{item.appId}}</div>
            <div class="flex">
              <span class="flex1">AppScrect:{{item.appScrect}}</span>
              <span class=" text-right">{{item.updatedAt | time}}</span>
            </div>

          </div>
        </el-card>
      </div>
    </tempalte>
    <template v-else>
      <div class="null">
        暂没有内容
      </div>

    </template>


    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form :model="app" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="app.name"></el-input>
        </el-form-item>
        <el-form-item label="邮件提醒" prop="emailNotice">
          <el-switch v-model="app.emailNotice"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import userApps from '@/graphql/userApps.graphql';
  import createApp from '@/graphql/createApp.graphql';
  import updateApp from '@/graphql/updateApp.graphql';
export default {
  data () {
    return {
      apps:[],
      dialogVisible:false,
      dialogTitle:'创建项目',
      app:{
        name:'',
        emailNotice:false,
      },
      rules:{
        name:[
          { required: true, message: '请填写项目名称', trigger: 'blur' }
        ],
        emailNotice:[
          { required: true, message: '请选择是否发送邮件通知', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    async getUserApps(){
      let res=await this.$apollo.query({query:userApps});
      this.apps=res.data.userApps;
    },
    createApp(){
      this.dialogTitle='创建项目';
      this.app={
        name:'',
        emailNotice:false
      }
      this.dialogVisible=true;
    },
    editItem(item){
      this.dialogTitle='编辑项目';
      this.app=JSON.parse(JSON.stringify(item));
      this.dialogVisible=true;
    },
    submitForm(form){
      this.$refs[form].validate(async (val)=>{
        if(val){
          if(this.app.id){
            let res=await this.$apollo.mutate({mutation:updateApp,variables:this.app});
            if(res.data.updateApp){
              this.getUserApps();
              this.$message.success('更新成功')
              this.dialogVisible=false;
            }
          }else {
            let res=await this.$apollo.mutate({mutation:createApp,variables:this.app});
            if(res.data.createApp){
              this.getUserApps();
              this.$message.success('创建成功')
              this.dialogVisible=false;
            }
          }
        }
      })
    }
  },
  async created(){
    this.getUserApps();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./List.scss"></style>
