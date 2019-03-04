<template>
  <div id="app" class="flex flex-v">
    <header v-if="$route.name!=='login' && $route.name!=='register'">
      <el-menu
        default-active="/index"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#000000"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-menu-item index="/index"><icon icon="home" />首页</el-menu-item>
        <el-menu-item index="/app"><icon icon="torah" />项目</el-menu-item>
        <el-menu-item index="/email"><icon icon="envelope" />邮件通知</el-menu-item>
      </el-menu>
    </header>
    <div id="main" class="flex1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/style/style.scss";
  #app{
    height: 100%;
    header{
      .el-menu{
        .el-menu-item{
          svg{
            margin-right: 5px;
          }
        }
      }
    }
    #main{
      padding: 30px;
    }
  }
</style>
