<template>
  <div class="app-list full-page flex flex-v" >
    <div class="header">
      <el-input v-model="keywords" placeholder="请输入名称" @keyup.enter.native="searchApp"></el-input>
      <el-button class="pull-right" type="primary" @click="createApp">添加项目</el-button>
    </div>
    <template v-if="apps.length>0">
      <div class="app-list-warp" >
        <el-card shadow="never" class="app-item" v-for="(item,index) in apps" :key="item.id">
          <div class="top ">
            <router-link :to="{name:'app',params:{id:item.id}}" class="name"><icon icon="torah" />{{item.name}}</router-link>
            <span class="pull-right email">
              <icon class="notice" disabled="disabled" :icon="item.emailNotice?'bell':'bell-slash'" />
              <icon class="edit" @click.event="editItem(item,index)" icon="pen-square" />
              <icon class="edit" @click.event="deleteItem(item,index)" icon="trash-alt" />
            </span>
          </div>
          <div class="bottom">
            <div class="text-left"><b>AppId:</b> {{item.appId}}</div>
            <div class="flex">
              <span class="flex1"><b>AppScrect:</b> {{item.appScrect}}</span>
              <span class=" text-right">{{item.updatedAt | time}}</span>
            </div>

          </div>
        </el-card>
      </div>
    </template>
    <template v-else>
      <div class="null">
        暂没有内容
      </div>

    </template>


    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      >
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
      },
      keywords:''
    }
  },
  apollo: {

  },
  async created(){
    this.getapps();
  },
  methods:{
    createApp(){
      this.dialogTitle='创建项目';
      this.app={
        name:'',
        emailNotice:false
      }
      this.dialogVisible=true;
    },
    editItem(item,index){
      this.dialogTitle='编辑项目';
      this.app=JSON.parse(JSON.stringify(item));
      this.app.index=index;
      this.dialogVisible=true;
    },
    deleteItem(item,index){
      this.$confirm(`你确定要删除 ${this.apps[index].name} 项目？ 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res= await this.$api.app.destroy(item.id);
        if(res){
          this.apps.splice(index,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      })
    },
    submitForm(form){
      this.$refs[form].validate(async (val)=>{
        if(val){
          if(this.app.id){
            let res=await this.$api.app.update(this.app);
            if(res){
              this.$message.success('更新成功');
              this.dialogVisible=false;
              this.apps[this.app.index]=this.app;
            }
          }else {
            let res=await this.$api.app.create(this.app);
            if(res){
              this.$message.success('创建成功');
              this.dialogVisible=false;
              this.apps.unshift(res.app);
            }
          }
        }
      })
    },
    searchApp(value){
      const variables={}
      if(this.keywords!==''){
        variables.name=this.keywords;
      }else{
        variables.name=null
      }
      this.$apollo.queries.apps.refetch(variables);


    },
    async getapps(){
      let res=await this.$api.app.index({getSelf:true});
      if(res){
        this.apps=res.apps;
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./List.scss"></style>
