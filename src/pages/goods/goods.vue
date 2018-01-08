<template>
  <div class="goods_wrapper">
    <myHeader></myHeader>
    <search class="goods_search"></search>
    <myNav></myNav>
    <div class="goods_list_wrapper">
      <div class="goods_filter_wrapper"></div>
      <div class="goods_list_menu"></div>
      <div class="goods_gridtable">
        <span class="brand">品牌</span>
        <el-collapse accordion>
          <el-collapse-item>
            <template slot="title">
              <a href="#" v-show="showOrHiddenBrandList" @click.stop="getBrandTypeId(item.id,index)" v-for="(item,index) in brandTypeList">{{item.name}}</a>
              <a href="#" v-show="!showOrHiddenBrandList" :style="{color:changeRed === index?'red':''}" @click.stop="getBrandTypeId(item.id,index)" v-for="(item,index) in brandSort">{{item.afwindBrand.brandName}}</a>
            </template>
            <div>暂无更多分类</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="goods_list_sort" v-show="showFilterList">
        <ul>
          <li class="sort"  @click='sortOrderBy()'>
            综合排名
            <i :style="sortASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-top"></i>
            <i :style="!sortASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-bottom"></i>
          </li>
          <li class="time"  @click='timeOrderBy()'>
            货期
            <i :style="timeASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-top"></i>
            <i :style="!timeASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-bottom"></i>
          </li>
          <li class="price"  @click='priceOrderBy()'>
            价格
            <i :style="priceASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-top"></i>
            <i :style="!priceASC?'color:#878D99':'color:#ccc'" class="el-icon-caret-bottom"></i>
          </li>
          <li v-show="showChecked">
            <el-checkbox v-model="checked">有库存</el-checkbox>
          </li>
        </ul>
      </div>
      <goodCards v-show="showListCom" :brandTypeId="brandTypeId" :brandChoose="checked" :sortASC="sortASC" :priceASC="priceASC" :timeASC="timeASC"></goodCards>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '../../common/header.vue'
  import myFooter from '../../common/footer.vue'
  import search from '../../common/preciseQuery.vue'
  import myNav from '../../components/nav/nav.vue'
  import goodCards from '../../components/goodCards/goodCards.vue'
  import goodsListFromAside from '../../components/goodCards/goodsFromAside.vue'

  export default {
    components:{
      myHeader,
      myFooter,
      search,
      myNav,
      goodCards,
      goodsListFromAside
    },
    data(){
      return {
        arr1:[],
        activeName: '1',
        checkList: [],
        checked: false,
        goodsList:'',
        brandSort:[],
        sortASC:true,
        timeASC:true,
        priceASC:true,
        showListCom:true,
        showChecked:true,
        showFilterList:true,
        brandTypeList:[],
        brandTypeId:null,
        activeClass:'',
        changeRed:-1,
        showOrHiddenBrandList:null
      }
    },
    watch:{
      '$route':'tabParams',
    },
    created(){
      if (!this.total){
        this.total = 0;
      };
//      现货非现货
      if(this.$route.query.saleType === "现货"){
        this.showChecked = false;
        this.editBrandInfo(this.$route.query.saleType);
      }else if(this.$route.query.saleType === "非现货"){
        this.showChecked = false;
        this.editBrandInfo(this.$route.query.saleType);
      }else if(this.$route.query.saleType === "品牌"){
        this.showFilterList = false;
      }else if(this.$route.query.proId && this.$route.query.proLevel){
        this.getAllBrandFromNav(this.$route.query.proId,this.$route.query.proLevel);
      }else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
        this.getAllBrandFromNav(this.$route.query.proIdFromNav,this.$route.query.proLevelFromNav);
      }
    },
    mounted() {
      let theHeader = document.getElementsByClassName("el-collapse-item__header");
      for(let i = 0;i<theHeader.length;i++){
        this.arr1.push(theHeader[i].getAttribute("id"))
      }
      for (let i = 0;i<this.arr1.length;i++) {
        let para = document.createElement("span");
        let node = document.createTextNode("更多商品");
        para.appendChild(node);
        let ele = document.querySelector("#" + this.arr1[i]).insertAdjacentElement("afterBegin",para);
      }
    },
    methods: {
//      nav导航请求所有品牌列表
      getAllBrandFromNav(theCategory,theCategoryType){
        this.$axios.get('/AfwindProductcommerce/getProductBrandByCategoryFirstId?category=' + theCategory + '&categoryType=' + theCategoryType)
          .then((res) => {
            let myData = JSON.parse(res.data.data);
            this.brandTypeList.splice(0,this.brandTypeList.length);
            for (let i = 0;i<myData.length;i++){
              this.brandTypeList.push({
                id:'',
                name:''
              });
              this.showOrHiddenBrandList = true;
              this.brandTypeList[i].id = myData[i].afwindProductsCommerceList[0].afwindProducts.afwindBrand.id;
              this.brandTypeList[i].name = myData[i].afwindProductsCommerceList[0].afwindProducts.afwindBrand.brandName;
            }
          }).catch(() => {
          console.log("品牌列表请求失败");
        })
      },
//      根据现货 非现货更改品牌信息
      editBrandInfo(theSaleType){
        this.$axios.get('/AfwindProductcommerce/selectBrandBysaleType?saleType=' + theSaleType)
          .then((res) => {
            this.showOrHiddenBrandList = false;
            this.brandSort.splice(0,this.brandSort.length);
            this.brandSort= JSON.parse(res.data.data);
          }).catch(() => {
          console.log('现货商品分类品牌接口请求失败');
        });
      },
//      现货 非现货 品牌等导航栏切换
      tabParams(){
        if(this.$route.query.saleType === "现货"){
          this.showListCom = true;
          this.editBrandInfo(this.$route.query.saleType);
        }else if(this.$route.query.saleType === "非现货"){
          this.showListCom = true;
          this.editBrandInfo(this.$route.query.saleType);
        }else if(this.$route.query.saleType === "品牌"){
          this.showListCom = true;
        }else if(this.$route.query.brandId){
          this.showListCom = true;
        }else if(this.$route.query.proId && this.$route.query.proLevel){
          console.log(this.$route.query.proId);
          console.log(this.$route.query.proLevel);
          this.getAllBrandFromNav(this.$route.query.proId,this.$route.query.proLevel);
        }else if(this.$route.query.proIdFromNav && this.$route.query.proLevelFromNav){
          this.showChecked = true;
          this.getAllBrandFromNav(this.$route.query.proIdFromNav,this.$route.query.proLevelFromNav);
        } else{
          this.showListCom = false;
        }
      },
//      分类列表点击切换字体颜色钩子函数
      getBrandTypeId(id,index) {
        this.brandTypeId = id;
        this.changeRed = index;
      },
      sortOrderBy() {
        this.sortASC = !this.sortASC;
      },
      timeOrderBy() {
        this.timeASC = !this.timeASC;
      },
      priceOrderBy() {
        this.priceASC = !this.priceASC;
      },
      collectStatus() {
        this.collect = true;
        // console.log(this.collect);
      },
      cartStatus() {
        this.cart = true;
        // console.log(this.cart);
      }
    }
  }
</script>

<style>
  .goods_wrapper{
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .goods_wrapper .goods_search{
    margin-top: 6%;
  }
  .goods_list_wrapper{
    margin: 0 auto;
    width: 90%;
  }
  .goods_gridtable  {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .goods_gridtable .el-collapse-item__header{
    cursor: default;
  }
  .goods_gridtable .brand{
    display: block;
    float: left;
    width: 10%;
    line-height:50px;
    text-align: center;
    font-size: 18px;
    font-family: "microsoft yahei";
  }
  .goods_gridtable .el-collapse{
    float: left;
    width: 90%;
    margin-bottom: 20px;
  }
  .goods_gridtable  .el-collapse-item__header{
    position: relative;
  }
  .goods_gridtable  .el-collapse-item__header a{
    margin-right: 20px;
    color: #000;
  }
  .goods_gridtable  .el-collapse-item__header a:hover{
    color: red;
  }
  .goods_gridtable  .el-collapse-item__header .el-collapse-item__arrow{
    float: right;
    margin-right: 0;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
  }
  .goods_gridtable  .el-collapse-item__header span{
    float: right;
    margin-right: 15px;
    cursor: pointer;
  }

  .goods_list_sort ul{
    overflow: hidden;
    width: 100%;
    line-height: 40px;
    border-top: 1px solid #878D99;
    margin-top: 20px;
  }
  .goods_list_sort li{
    float: left;
    padding: 0 10px;
    cursor: pointer;
  }
  .goods_list_sort .el-checkbox__label{
    color: #000;
    font-size: 16px;
  }
  .goods_list_sort li:last-child{
    border: 0
  }
  .goods_list_sort .sort{
    width: 90px;
    position: relative;
  }
  .goods_list_sort .time,
  .goods_list_sort .price{
    width: 60px;
    position: relative;
  }
  .goods_list_sort  i{
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    right: 10px;
    top:8px;
  }
  .goods_list_sort  .el-icon-caret-bottom{
    top: 15px;
  }
  .activeClass{
    color: red;
  }
  .pagination{
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
</style>

