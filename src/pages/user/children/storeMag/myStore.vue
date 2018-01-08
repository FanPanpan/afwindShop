<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>我的店铺</h1>
    </div>
    <div class="setStore_wrapper">
      <div class="store_wrapper_item">
        <p>店铺名称：</p>
        <span class="store_inner">{{storeName}}</span>
      </div>
      <div class="store_wrapper_item">
        <p class="banner">店铺banner：</p>
        <div class="store_inner" style="width: 200px;height: 200px">
          <img :src="storeBanner" style="width: 100%;height: 100%">
        </div>
      </div>
      <div class="store_wrapper_item">
        <p class="logo">店铺logo： </p>
        <div class="store_inner" style="width: 200px;height: 200px">
          <img :src="storeLogo" style="width: 100%;height: 100%">
        </div>
      </div>
      <div class="store_wrapper_item">
        <p class="storeInfo">店铺简介：</p>
        <span  class="store_inner">{{storeIntro}}</span>
      </div>
      <div class="store_wrapper_item">
        <p class="storeDetails">店铺详情：</p>
        <span class="store_inner">{{storeDet}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components:{

    },
    data() {
      return {
        storeName:'',
        storeBanner:'',
        storeLogo:'',
        storeIntro:'',
        storeDet:''
      }
    },
    created() {
      this.$axios.get('/storeAdmin/selectStoreInfoById.ajax')
        .then((res)=> {
          let myData = JSON.parse(res.data.data);
//          console.log(myData);
          this.storeName = myData.storeName;
          this.storeBanner = myData.storeList[0].url;
          this.storeLogo = myData.storeList[1].url;
          this.storeIntro = myData.title;
          this.storeDet = myData.introduce;
        }).catch((err) => {
        console.log("店铺数据请求失败")
      })
    }
  }

</script>
<style>
  .store_wrapper_item{
    overflow: hidden;
    padding: 5px 0;
  }
  .store_wrapper_item p {
    float: left;
    width: 110px;
    text-align: right;
    vertical-align: top;
  }
  .store_wrapper_item  .store_inner {
    float: left;
    width: 600px;
  }
</style>


