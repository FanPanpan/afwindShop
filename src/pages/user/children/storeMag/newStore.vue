<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>新增店铺</h1>
    </div>
    <div class="setStore_wrapper">
      <div v-html="aaa"></div>
      <!--<div class="store_wrapper_item">-->
        <!--<p>店铺名称：</p>-->
        <!--<el-input v-model="storeName" placeholder="请输入店铺名称"></el-input>-->
      <!--</div>-->
      <!--<div class="store_wrapper_item">-->
        <!--<p class="banner">店铺banner：</p>-->
        <!--<storePic :onePic="bannerUrlArr" :theAction="storeAction" @getOnePic="getBannerUrl"></storePic>-->
      <!--</div>-->
      <!--<div class="store_wrapper_item">-->
        <!--<p class="logo">店铺logo：</p>-->
        <!--<storePic :onePic="logoUrlArr" :theAction="storeAction" @getOnePic="getLogoUrl"></storePic>-->
      <!--</div>-->
      <!--<div class="store_wrapper_item">-->
        <!--<p class="storeInfo">店铺简介：</p>-->
        <!--<el-input resize="none" type="textarea" :rows="3" placeholder="请输入店铺简介" v-model="aboutStore"></el-input>-->
      <!--</div>-->
      <!--<div>-->
        <!--<p style="float: left;width: 110px;text-align: right">店铺详情：</p>-->
        <!--<div style="float: left;width: 800px">-->
          <!--<quill-editor @blur="onEditorBlur($event)" v-model="content"></quill-editor>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div style="text-align: center;margin-top: 120px;margin-bottom: 10px">-->
        <!--<div>-->
          <!--<el-button @click="submitStoreInfo" type="primary">提交</el-button>-->
          <!--<el-button type="primary">取消</el-button>-->
        <!--</div>-->
      <!--</div>-->

    </div>
  </div>
</template>

<script>
  import storePic from '../../../../components/upload/uploadOnePic.vue'

  export default {
    components:{
      storePic
    },
    data() {
      return {
        storeAction:'/store/upload.ajax',
        activeName: 'storeSet',
        storeName:'',
        aboutStore:'',
        content:'',
        bannerUrlArr:[],
        logoUrlArr:[],
        aaa:''
      };
    },
    created(){
      this.$axios.get('/store/selectByStoreId?id=4')
        .then((res) => {
//        console.log(JSON.parse(res.data.data).title)
          this.aaa = JSON.parse(res.data.data).title
        }).catch(() => {
          console.log("失败")
      })
    },
    methods: {
      handleClick(tab, event) {
//        console.log(tab, event);
      },
//      填写完店铺详情后失去焦点的钩子函数
      onEditorBlur(editor) {
        console.log(this.content);
      },
      getBannerUrl(theUrl){
        this.bannerUrlArr = theUrl;
      },
      getLogoUrl(theUrl){
        this.logoUrlArr = theUrl;
      },
      submitStoreInfo(){
        let reqParams = {
          storeName:this.storeName,
          title:this.content,
          storeList:[
            {
              urlList:this.bannerUrlArr.reverse().slice(0,1),
              typei:'1'
            },
            {
              urlList:this.logoUrlArr.reverse().slice(0,1),
              typei:'2'
            }
          ],
          instruct:this.aboutStore
        }
        this.$axios.post('/store/insertstore.ajax',reqParams)
          .then((res) => {
            console.log(res);
            console.log('店铺信息提交成功');
          }).catch(() => {
          console.log("店铺信息提交失败");
        })
      }
    }
  }
</script>

<style>
  .store_wrapper_item{
    overflow: hidden;
    padding: 5px 0;
  }
  .store_wrapper_item .el-upload__tip{
    height: 15px;
    margin-left: 110px;
  }
  .store_wrapper_item p{
    float: left;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .store_wrapper_item .banner,
  .store_wrapper_item .logo{
    height: 32px;
    line-height: 32px;
  }
  .store_wrapper_item .storeInfo,
  .store_wrapper_item .storeDetails{
    vertical-align: top;
    line-height: normal;
  }
  .store_wrapper_item .el-input{
    float: left;
    width: 300px;
  }
  .store_wrapper_item .el-textarea{
    float: left;
    width: 666px;
  }
  .store_wrapper_item .el-upload-list--picture{
    width:300px;
    margin-left:110px;
  }
</style>
