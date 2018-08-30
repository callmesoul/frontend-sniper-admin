<template>
  <div id="app" class="flex flex-v">
    <header>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#000000"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1"><icon icon="home" />首页</el-menu-item>
        <el-menu-item index="2"><icon icon="torah" />项目</el-menu-item>
        <el-menu-item index="3"><icon icon="cog" />配置</el-menu-item>
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
