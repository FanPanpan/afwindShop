<template>
  <el-carousel :interval="2000" arrow="never">
    <el-carousel-item v-for="item in slides" :key="item.des">
      <img :src="item.src">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    props:{
      slides:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style>
  .el-carousel .el-carousel__container{
    position: relative;
    width: 100%;
    height: 500px;
  }
  .el-carousel .el-carousel__item img{
    width: 100%;
    height: 100%;
  }
</style>
