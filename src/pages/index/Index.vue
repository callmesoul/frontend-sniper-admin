<template>
  <div id="index" class="flex">
    <div class="index-list flex1">
      <el-card class="error-list" shadow="never">
        <template v-if="errors.length>0">
          <router-link :to="{name:'error',params:{id:item.id}}" v-for="item in errors" :key="item.id" class="flex flex-align-center error-item">
            <icon icon="exclamation-triangle" :class="{'error':item.level==='error','warning':item.level==='warning','info':item.level==='info'}" />
            <span class="project">{{item.name}}</span>
            <span class="cont flex1">{{item.title}}</span>
            <span class="time">{{item.createdAt | time}}</span>
          </router-link>
        </template>
        <template v-else>
          <div class="null">
            暂没有内容
          </div>
        </template>
      </el-card>
    </div>
    <div class="index-right">
      <el-card class="box-card" shadow="never">
        <div slot="header" class="clearfix">
          <span>我的项目</span>
        </div>
        <div class="app-list">
          <template v-if="apps.length>0">
            <router-link :to="{name:'app',params:{id:item.id}}" class="app-item" v-for="item in apps" :key="item.id">
              <icon icon="torah" /> {{item.name}}
            </router-link>
          </template>
          <template v-else>
            <div class="null">
              暂没有内容
            </div>
          </template>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      errors: [],
      apps:[]
    }
  },
  methods:{
    async getUserErrors(){
      let res=await this.$api.error.index({userErrors:true});
      if(res){
        this.errors=res.errors;
      }
    },
    async getUserApps(){
      let res=await this.$api.app.index({getSelf:true});
      if(res){
        this.apps=res.apps;
      }
    }
  },
  async created(){
    this.getUserErrors();
    this.getUserApps();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
