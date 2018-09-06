<template>
  <div id="error" >
    <div class="top"><el-tag>我爱阅读</el-tag><code>{{error.title}}</code></div>

    <div class="error-msg">
      <div class="typerror-msg-title">错误详情</div>
      <div class="error-msg-list">
        <div class="error-msg-item flex flex-align-center">
          <label>时间</label>
          <span class="cont">{{error.updatedAt | moment('YYYY年MM月DD日 HH:mm')}}</span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>错误类型</label>
          <span class="flex1">
            <el-tag type="danger" v-if="error.level==='error'">{{error.level}}</el-tag>
            <el-tag type="warning" v-else-if="error.level==='warning'">{{error.level}}</el-tag>
            <el-tag type="info" v-else-if="error.level==='info'">{{error.level}}</el-tag>
          </span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>分类</label>
          <span class="flex1">{{error.category}}</span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>错误次数</label>
          <span class="flex1">{{error.sameErrorList.length}}次</span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>错误所在行数</label>
          <span class="flex1">{{error.row}}</span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>错误所在列数</label>
          <span class="flex1">{{error.line}}</span>
        </div>
        <div class="error-msg-item flex flex-align-center">
          <label>错误堆栈</label>
          <pre class="flex1">{{error.msg}}</pre>
        </div>
      </div>
    </div>

    <el-table
      :data="error.sameErrorList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        label="时间"
        >
        <template slot-scope="scope">
          {{ scope.row.createdAt | moment('YYYY年MM月DD日 HH:mm') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import error from '@/graphql/error.graphql';
export default {
  data () {
    return {
      error: {}
    }
  },
  methods:{
    async getErrot(){
      let res=await this.$apollo.query({query:error,variables:{id:this.$route.params.id}});
      this.error=res.data.error;
    },

  },
  async created(){
    this.getErrot();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
