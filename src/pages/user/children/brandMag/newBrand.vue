<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>新增品牌</h1>
    </div>
    <div class="newBrand">
      <div class="newBrand_item">
        <p>品牌名称：</p>
        <el-input v-model="brandName" placeholder="请输入内容"></el-input>
      </div>
      <div class="newBrand_item">
        <p>英文名称：</p>
        <el-input v-model="engName" placeholder="请输入内容"></el-input>
      </div>
      <div class="newBrand_item">
        <p>品牌LOGO：</p>
        <brandLogo :onePic="onePic" :theAction="brandAction" @getOnePic="getLogo"></brandLogo>
      </div>
      <div class="newBrand_item">
        <p>品牌简介：</p>
        <el-input resize="none" type="textarea" :rows="3" placeholder="请输入品牌简介" v-model="aboutBrand"></el-input>
      </div>
      <div class="newBrand_btn">
        <el-button @click="submitBrand" type="primary">提交</el-button>
        <el-button type="primary">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import brandLogo from '../../../../components/upload/uploadOnePic.vue'
export default {
  components:{
    brandLogo
  },
  data(){
    return {
      onePic:[],
      brandAction:'/store/upload.ajax',
      activeName: 'brandList',
      aboutBrand:'',
      brandName:'',
      engName:''
    }
  },
  methods:{
//    获取logo的url地址
    getLogo(picUrl){
      this.logoUrl = picUrl;
    },
//    提交品牌信息
    submitBrand(){
      let reqParams = {
        brandName:this.brandName,
        engName:this.engName,
        logo:this.logoUrl,
        information:this.aboutBrand,
      }
      this.$axios.post('/brand/savebrand.ajax',reqParams)
        .then((res) => {
          console.log(res)
          this.$router.go(0)
        }).catch(() => {
        console.log("品牌数据添加失败")
      })
    },
  }
}
</script>

<style>
  .newBrand_item{
    overflow: hidden;
    padding: 5px 0;
  }
  .newBrand_btn{
    overflow: hidden;
    padding: 5px 0;
    width: 160px;
    margin: 0 auto;
  }
  .newBrand_item p{
    float: left;
    width: 120px;
    line-height: 40px;
    text-align: right;
  }
  .newBrand_item .el-input{
    float: left;
    width: 300px;
  }
  .newBrand_item .el-textarea{
    float: left;
    width: 666px;
  }
  .newBrand_item .el-upload__tip{
    height: 15px;
  }
  .newBrand_item .el-upload-list--picture{
    width:300px;
    margin-left:120px;
  }
</style>
