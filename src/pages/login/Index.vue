<template>
  <div id="login" class="flex flex-align-center full-page">
    <el-card class="box-card login-warp">
      <div slot="header" class="clearfix">
        <span>登陆</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="ToRegister">注册</el-button>
      </div>
      <el-form :model="login" :rules="rules" ref="login" label-width="100px" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('login')">登陆</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import api from '../../api'
export default {
  data () {
    return {
      login:{
        username:'',
        password:''
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res=await api.login(this.login);
          this.$store.commit('setToken',{token:res.token});
          this.$router.push('/index')
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    ToRegister(){
      this.$router.push({name:'register'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
