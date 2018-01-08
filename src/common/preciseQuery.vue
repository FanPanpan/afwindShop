<template>
  <div class="inquire">
    <el-input placeholder="请输入查询内容" v-model="queryInfo" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        queryInfo:''
      }
    },
    methods:{
      search(){
        console.log(this.queryInfo)
      }
    }
  }
</script>

<style scope>
  .inquire{
    width: 38%;
    margin: 0 auto;
    margin-bottom: 3%;
  }
  .inquire  .input-with-select .el-input__inner {
    width: 100%;
  }


</style>
