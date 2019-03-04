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
          <span class="flex1">{{sames.length}}次</span>
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
      :data="sames"
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


export default {
  data () {
    return {
      error: {},
      sames:[]
    }
  },
  methods:{
    async getError(){
      let res= await this.$api.error.show(this.$route.params.id);
      if(res){
        this.error=res.error;
        this.sames=res.sames;
      }

    },

  },
  async created(){
    this.getError();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="./Index.scss"></style>
