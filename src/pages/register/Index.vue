<template>
  <div id="login" class="flex flex-align-center full-page">
    <el-card class="box-card login-warp">
      <div slot="header" class="clearfix">
        <span>注册</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="toLogin">登录</el-button>
      </div>
      <el-form :model="register" :rules="rules" ref="register" label-width="100px" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="register.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="register.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="register.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('register')">注册</el-button>
          <el-button @click="resetForm('register')">重置</el-button>
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
      register:{
        username:'',
        password:'',
        email:''
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin(){
      this.$router.push({name:'login'});
    },
    submitForm(form){
      this.$refs[form].validate(async (val)=>{
        if(val){
          let res=await api.register(this.register);
          if(res.token){
            this.$store.commit('setToken',{token:res.token});
            this.$router.push('/index')
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
