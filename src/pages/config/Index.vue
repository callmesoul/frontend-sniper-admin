<template>
  <div id="config" >
    <ul>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="邮箱登录用户" prop="emailUser">
          <el-input v-model="ruleForm.emailUser"></el-input>
        </el-form-item>
        <el-form-item label="邮箱登录密码" prop="emailPass">
          <el-input type="password" v-model="ruleForm.emailPass"></el-input>
        </el-form-item>
        <el-form-item label="邮件服务商" prop="emailServer">
          <el-select v-model="ruleForm.emailServer" placeholder="请选择邮件服务商">
            <el-option label="QQ邮箱" value="QQ"></el-option>
            <el-option label="126邮箱" value="126"></el-option>
            <el-option label="163邮箱" value="163"></el-option>
            <el-option label="Gmail" value="Gmail"></el-option>
            <el-option label="阿里企业邮箱" value="qiye.aliyun"></el-option>
            <el-option label="Hotmail" value="Hotmail"></el-option>
            <el-option label="GandiMail" value="GandiMail"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </ul>
  </div>
</template>

<script>
  import emailConfig from '@/graphql/emailConfig.graphql';
  import updateEmailConfig from '@/graphql/updateEmailConfig.graphql';
export default {
  data () {
    return {
      ruleForm: {
        emailUser:'',
        emailPass:'',
        emailServer:''
      },
      rules: {
        emailUser: [
          { required: true, message: '请填写邮箱账户', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '邮箱账户必须为邮件地址格式', trigger: 'blur' },
        ],
        emailPass: [
          { required: true,  message: '请填写邮箱密码', trigger: 'blur' }
        ],
        emailServer:[
          { required: true, message: '请选择邮箱服务商', trigger: 'change' }
        ]
      }
    }
  },
  methods:{
    async getEmailConfig(){
      let res=await this.$apollo.query({query:emailConfig});
      let email=res.data.emailConfig;
      if(email){
        this.ruleForm.emailUser=email.user;
        this.ruleForm.emailPass=email.pass;
        this.ruleForm.emailServer=email.server;
      }
    },
    submitForm(form){
      this.$refs[form].validate(async (val)=>{
        if(val){
          let res=await this.$apollo.mutate({mutation:updateEmailConfig,variables:{user:this.ruleForm.emailUser,pass:this.ruleForm.emailPass,server:this.ruleForm.emailServer}});
          let email=res.data.updateEmailConfig;
          if(email){
            this.ruleForm.emailUser=email.user;
            this.ruleForm.emailPass=email.pass;
            this.ruleForm.emailServer=email.server;
            this.$message.success('保存成功')
          }
        }
      })
    }
  },
  async created(){
    this.getEmailConfig();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
