<template>
  <div>
    <!-- 现货与非现货 -->
    <div v-show="showGoodList" class="spotAndUnspot">
      <div class="good_list">
        <div class="good_list_item" v-for="item in goodList">
          <router-link :to="{path:'/goodDetails',query:{proId:item.id}}">
            <img :src="'http://47.92.122.228:8021' + item.afwindProducts.afwindProductPic.url">
            <div style="padding: 20px;height: 60px">
              <span class="spotGoodPrice">￥{{ item.price }}</span>
              <div class="spotGoodName">
                <span>{{ item.commerceName }}</span>
              </div>
            </div>
            <p>库存：{{ item.stock }}</p>
            <el-button class="addCartBtn">加入购物车</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 特定品牌下的商品列表 -->
    <div v-show="showSpecialGoodList" class="brandGoodList">
      <div class="good_list">
        <div class="good_list_item" v-for="(item,index) in brandGoodsList" :key="index">
           <router-link :to="{path:'/goodDetails',query:{proId:item.id}}">
            <img :src="'http://47.92.122.228:8021'+ item.afwindProductPic.url">
            <div style="padding: 20px;height: 60px">
              <span class="price">￥{{ item.price }}</span>
              <div class="bottom">
                <span class="name">{{ item.commerceName }}</span>
              </div>
            </div>
            <p>库存：{{ item.stock }}</p>
            <el-button class="addCartBtn" @click="cartStatus()">加入购物车</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 品牌列表 -->
    <div v-show="showBrandList" class="brandCenter">
      <el-card class="box-card" v-for="(item,index) in brandList" :key="index">
        <div  v-for="item in brandList[index].brandList" :key="brandList.id" class="text item">
          <router-link :to="{path:'/goodsList',query:{brandId:item.id}}">
            <span>{{item.brandName}}</span>
            <img :src="'http://47.92.122.228:8021'+ item.logo">
          </router-link>
        </div>
      </el-card>
    </div>
    <!-- 根据左侧侧边栏导航获取商品列表 -->
    <div v-show="showGoodsFromAside">
      <div class="good_list">
        <div class="good_list_item" v-for="item in goodsFromAside">
           <router-link :to="{path:'/goodDetails',query:{proId:item.id}}">
            <img :src="'http://47.92.122.228:8021' + item.afwindProducts.afwindProductPic.url">
            <div style="padding: 20px;height: 60px">
              <span class="spotGoodPrice">￥{{ item.price }}</span>
              <div class="spotGoodName">
                <span>{{ item.commerceName }}</span>
              </div>
            </div>
            <p>库存：{{ item.stock }}</p>
            <el-button class="addCartBtn">加入购物车</el-button>
          </router-link >
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div v-show="showPagiantion" class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      goodList:[],
      brandList:[],
      brandGoodsList:[],
      goodsFromAside:[],
      spotObj:[
        {
          saleType:"",
          type:"",
          status:"",
          pageNum:"",
          brandId:''
        }
      ],
      brandObj:[
        {
          brandId:'',
          stock:'',
          type:'',
          status:'',
          pageNum:'',
          categoryId:''
        }
      ],
      proListObj:[
        {
          category:"",
          categoryType:"",
          stock:"",
          type:"",
          status:'',
          pageNum:'',
          brandId:''
        }
      ],
      currentPage:1,//当前页
      pageSize:'',//每页条数
      total:'',//共有多少条数据
      showGoodList:true,//展示现货与非现货列表
      showBrandList:true,//展示所有品牌列表
      showPagiantion:true,//展示分页
      showSpecialGoodList:true,//展示特定品牌下的所有商品列表
      showGoodsFromAside:true,//通过侧边栏展示商品列表
    }
  },
  props:{
    sortASC:{
      type:Boolean
    },
    priceASC:{
      type:Boolean
    },
    timeASC:{
      type:Boolean
    },
    brandChoose:{
      type:Boolean,
      default:false
    },
    brandTypeId:{
      type:Number
    }
  },
  created(){
//    现货与非现货参数
    this.spotObj.type = "";
    this.spotObj.status = "";
    this.spotObj.pageNum = 1;
    this.spotObj.brandId = "";
//    特定品牌下的商品列表参数
    this.brandObj.stock = "";
    this.brandObj.type = "";
    this.brandObj.status = "";
    this.brandObj.pageNum = 1;
    this.brandObj.categoryId = "";
//    通过侧边栏获取商品列表参数
    this.proListObj.stock = '';
    this.proListObj.type = '';
    this.proListObj.status = '';
    this.proListObj.pageNum = 1;
    this.proListObj.brandId = '';

    if (this.$route.query.saleType === "1"){
      this.spotObj.saleType = "1";
      this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
    }else if(this.$route.query.saleType === "2"){
      this.spotObj.saleType = "2";
      this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
    }else if(this.$route.query.saleType === "品牌"){
      this.getTheBrand();
    } else if(this.$route.query.proId && this.$route.query.proLevel){
      this.proListObj.category = this.$route.query.proId;
      this.proListObj.categoryType = this.$route.query.proLevel;
      this.showGoodsFromAside = true;
      this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
    } else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
      this.proListObj.category = this.$route.query.proIdFromNav;
      this.proListObj.categoryType = this.$route.query.proLevelFromNav;
      this.showGoodsFromAside = true;
      this.showGoodList = false;
      this.showBrandList = false;//添加
      this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
    }
  },
  methods:{
//    分页
    handleCurrentChange(val){
      if(this.$route.query.proId && this.$route.query.proLevel){
        this.proListObj.pageNum = val;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }else{
        this.spotObj.pageNum = val;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }
    },
//    商品列表筛选钩子函数
    spotOrUnspotFilter(saleType,type,status,currentPage,theStock,theBrandId){
      this.$axios.get('/AfwindProductcommerce/getProductsAndProductsCommerceAndPicBySaleUpAndDown?' +
        'saleType=' + saleType +
        '&type='+ type +
        '&status=' + status +
        '&pageNum=' + currentPage +
        '&stock=' + theStock +
        '&brandId=' + theBrandId)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.total = myData.total;
          this.pageSize = myData.pageSize;
          this.goodList = JSON.parse(res.data.data).rows;
          this.showGoodList = true;
          this.showPagiantion = true;
          this.showBrandList = false;
          this.showSpecialGoodList = false;
          this.showGoodsFromAside = false;
        }).catch(() => {
        console.log("商品分类失败")
      })
    },
//    通过品牌id获取当前品牌下的所有商品
    brandFilter(brandId,stock,type,status,pageNum,categoryId){
      this.$axios.get('/AfwindProductcommerce/getProductsCommerceListByBrandId?' +
        'brandId=' + brandId +
        '&stock=' + stock +
        '&type=' + type +
        '&status=' + status +
        '&pageNum=' + pageNum +
        '&categoryId' + categoryId)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.total = myData.total;
          this.pageSize = myData.pageSize;
          this.brandGoodsList = myData.rows;
          this.showGoodList = false;
          this.showPagiantion = true;
          this.showBrandList = false;
          this.showSpecialGoodList = true;
          this.showAsideGoodList = false;
        }).catch(() => {
        console.log("品牌商品列表请求失败")
      })
    },
//    通过侧边栏请求商品列表
    getProsFromAside(theCategory,theStock,theCategoryType,theType,theStatus,thePageNum,theBrandId){
      this.$axios.get('AfwindProductcommerce/getThirdProductsRelatesByThirdCategoryBySaleVAndStockUpAndDown?' +
        '&category=' + theCategory +
        '&categoryType=' + theCategoryType +
        '&type=' + theType +
        '&status=' + theStatus +
        '&stock=' + theStock +
        '&pageNum=' + thePageNum +
        '&brandId=' + theBrandId)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.total = myData.total;
          this.pageSize = myData.pageSize;
          this.goodsFromAside.splice(0,this.goodsFromAside.length);
          for (let i = 0;i<myData.rows.length;i++){
            for (let j = 0;j<myData.rows[i].afwindProductsCommerceList.length;j++){
              this.goodsFromAside.push(myData.rows[i].afwindProductsCommerceList[j])
            }
          }
//          console.log(myData);
        }).catch(() => {
          console.log("侧边栏数据请求失败")
      })
    },
//    获取品牌的钩子函数
    getTheBrand(){
      this.$axios.get('/brandrequest/selectBrandByFirstName')
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.brandList = myData;
          this.showGoodList = false;
          this.showPagiantion = false;
          this.showBrandList = true;
          this.showSpecialGoodList = false;
          this.showAsideGoodList = false;
        }).catch(() => {
        console.log("品牌列表请求失败")
      });
    },
//    通过导航栏获取商品列表
    getTheGoodsFromNav(){
      if (this.$route.query.saleType === "1"){
        this.spotObj.saleType = "1";
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
        this.getBrandListsFromTab(this.spotObj.saleType);
      }else if(this.$route.query.saleType === "2"){
        this.spotObj.saleType = "2";
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
        this.getBrandListsFromTab(this.spotObj.saleType);
      }else if(this.$route.query.saleType === "品牌"){
        this.getTheBrand();
      }else if(this.$route.query.brandId){
        this.brandObj.brandId = this.$route.query.brandId;
        this.brandFilter(this.brandObj.brandId,this.brandObj.stock,this.brandObj.type,this.brandObj.status,this.brandObj.pageNum,this.brandObj.categoryId);
      }else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
        this.proListObj.category = this.$route.query.proIdFromNav;
        this.proListObj.categoryType = this.$route.query.proLevelFromNav;
        this.showGoodsFromAside = true;
        this.showGoodList = false;
         this.showBrandList = false;//添加
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }
    },
//    根据综合排名排序的钩子函数
    theSortASC(){
      if (this.sortASC){
        this.spotObj.status = 2;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }else{
        this.spotObj.status = 1;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }
    },
//    根据供货周期排序的钩子函数
    theTimeASC(){
      if (this.timeASC){
        this.spotObj.status = 2;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }else{
        this.spotObj.status = 1;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }
    },
//    根据价格排序的钩子函数
    thePriceASC(){
      if (this.priceASC){
        this.spotObj.status = 2;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }else{
        this.spotObj.status = 1;
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }
    },
//    侧边栏综合排序
    asideSortASC(){
      if (this.sortASC){
        this.proListObj.status = 2;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }else{
        this.proListObj.status = 1;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }
    },
//    侧边栏供货周期排序
    asideTimeASC(){
      if (this.timeASC){
        this.proListObj.status = 2;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }else{
        this.proListObj.status = 1;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }
    },
//    侧边栏价格排序
    asidePriceASC(){
      if (this.priceASC){
        this.proListObj.status = 2;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }else{
        this.proListObj.status = 1;
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }
    },
//    根据商品列表页 现货与非现货的切换获取品牌列表
    getBrandListsFromTab(theSaleType){
      this.$axios.get('/AfwindProductcommerce/selectBrandBysaleType?saleType=' + theSaleType)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.$emit("getBrandLists",myData);
//          console.log(myData);
//          console.log("根据商品列表页现货与非现货的切换获取品牌列表");
        }).catch(() => {
          console.log("根据商品列表页现货与非现货的切换获取品牌列表失败");
      })
    }
  },
  watch:{
//    综合排序
    sortASC(){
      this.spotObj.type = "numType";
      this.proListObj.type = "numType";
      if (this.$route.query.saleType === "1"){
        this.theSortASC();
      }else if(this.$route.query.saleType === "2"){
        this.theSortASC();
      }else if(this.$route.query.proId && this.$route.query.proLevel){
        this.asideSortASC();
      }else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
        this.asideSortASC();
      }
    },
//    供货周期排序
    timeASC(){
      this.spotObj.type = "cycleType";
      this.proListObj.type = "cycleType";
      if(this.$route.query.saleType === "1"){
        this.theTimeASC();
      }else if(this.$route.query.saleType === "2"){
        this.theTimeASC();
      }else if(this.$route.query.proId && this.$route.query.proLevel){
        this.asideTimeASC();
      } else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
        this.asideTimeASC();
      }
    },
//    价格排序
    priceASC(){
      this.spotObj.type = "priceType";
      this.proListObj.type = "priceType";
      if(this.$route.query.saleType === "1"){
        this.thePriceASC();
      }else if(this.$route.query.saleType === "2"){
        this.thePriceASC();
      }else if(this.$route.query.proId && this.$route.query.proLevel){
        this.asidePriceASC();
      }
      else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
        this.asidePriceASC();
      }
    },
//    通过导航栏跳转
    '$route':'getTheGoodsFromNav',
//    是否有库存!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    brandChoose(){
      if (this.brandChoose){
        if(this.$route.query.brandId){
          this.brandObj.stock = 1;
          this.brandFilter(this.brandObj.brandId,this.brandObj.stock,this.brandObj.type,this.brandObj.status,this.brandObj.pageNum,this.brandObj.categoryId);
        }
        if(this.$route.query.proId && this.$route.query.proLevel){
          this.proListObj.stock = 1;
          this.getProsFromAside(this.proListObj.category, this.proListObj.categoryType, this.proListObj.stock, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
        }
        if (this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
          this.proListObj.stock = 1;
          this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
        }
      }else {
        if(this.$route.query.brandId){
          this.brandObj.stock = "";
          this.brandFilter(this.brandObj.brandId,this.brandObj.stock,this.brandObj.type,this.brandObj.status,this.brandObj.pageNum,this.brandObj.categoryId);
        }
        if(this.$route.query.proId && this.$route.query.proLevel){
          this.proListObj.stock = "";
          this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
        }
        if (this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
          this.proListObj.stock = "";
          this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
        }
      }
    },
    brandTypeId(){
      this.proListObj.brandId = this.brandTypeId;
      this.spotObj.brandId = this.brandTypeId;
      if(this.$route.query.proId && this.$route.query.proLevel){
        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
      }
//      else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
//        this.getProsFromAside(this.proListObj.category, this.proListObj.stock, this.proListObj.categoryType, this.proListObj.type, this.proListObj.status, this.proListObj.pageNum, this.proListObj.brandId);
//      }
      else {
        this.spotOrUnspotFilter(this.spotObj.saleType,this.spotObj.type,this.spotObj.status,this.spotObj.pageNum,'',this.spotObj.brandId);
      }
    },
  }
}
</script>

<style>
  .good_list{
    overflow: hidden;
    margin-top: 20px;
  }
  .good_list_item{
    float: left;
    margin: 2% 0.1% 2% 0.5%;
    width: 18.8%;
    height: 360px;
    transform: translateY(-0.1px);
    box-shadow: 1px 1px 5px #999;
  }
  .good_list_item:hover{
    transform: translateY(-3px);
    transition: 0.5s;
    box-shadow: 1px 1px 20px #999;
  }
  .good_list_item a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .good_list_item a img{
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }
  .good_list_item a span{
    display: block;
    font-size: 16px;
    text-align: center;
  }
  .good_list_item a .spotGoodName{
    margin-top: 10px;
  }
  .good_list_item a .spotGoodName span{
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .good_list_item a .addCartBtn{
    display: block;
    margin: 10px auto;
  }
  .good_list_item a .addCartBtn:hover{
    color: #fff;
    background: #E35B5A;
  }
  .box-card {
    width: 100%;
    margin-bottom: 45px;
  }
  .box-card span{
    font-family: "微软雅黑";
    font-size: 18px;
  }
  .text {
    font-size: 14px;
    text-align: center;
  }
  .item {
    overflow: hidden;
    float: left;
    width: 15%;
    height: 100px;
    margin: 10px;
  }
  .item img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .item a {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>








































