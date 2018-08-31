<template>
  <div id="index" class="flex">
    <div class="index-list flex1">
      <el-card class="box-card">

        <div v-for="item in errors" :key="item.id" class="text item">

        </div>
      </el-card>
    </div>
    <div class="index-right">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的项目</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import userErrors from '@/graphql/userErrors.graphql';
export default {
  data () {
    return {
      errors: []
    }
  },
  async created(){
    let res=await this.$apollo.query({query:userErrors});
    this.errors=res.data.userErrors;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
