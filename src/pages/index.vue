<template>
  <div>
    <el-container>
      <el-header>
        <myHeader></myHeader>
      </el-header>
      <el-main>
        <router-view class="main"></router-view>
      </el-main>
      <el-footer>
        <myFooter></myFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import myHeader from '../common/header.vue'
  import myFooter from '../common/footer.vue'

  export default {
    components:{
      myHeader,myFooter
    }
  }
</script>

<style>
.el-header,.el-main,.el-footer{
  padding: 0;
}
</style>

