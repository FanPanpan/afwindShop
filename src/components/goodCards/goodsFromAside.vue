<template>
  <div>
    <!-- 侧边栏跳转至商品列表 -->
    <div class="goods_list_card">
      <div class="card_item" v-for="(item,index) in goodsList" :key="index">
        <router-link :to="{path:'goodDetails',query:{proId:item.id}}">
          <img :src="'http://47.92.122.228:8021'+ item.afwindProducts.afwindProductPic.url">
          <div style="padding: 20px;height: 60px">
            <span class="price">￥{{ item.price }}</span>
            <div class="bottom">
              <span class="name">{{ item.commerceName }}</span>
            </div>
          </div>
          <p>库存：{{ item.stock }}</p>
          <el-button  class="cart" @click="cartStatus()">加入购物车</el-button>
        </router-link>
      </div>
    </div>
    <div class="pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      goodsList:[],
      currentPage:1,//当前页
      pageSize:'',//每页条数
      total:'',//共有多少条数据,
      proListObj:[
        {
          category:"",
          categoryType:"",
          stock:"",
          type:"",
          status:'',
          pageNum:''
        }
      ]
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
    chooseIt:{
      type:Boolean,
      default:false
    }
  },
  created(){
    //      通过主页侧边栏请求商品列表
    if (this.$route.query.proLevel !== undefined){
      this.proListObj.category = this.$route.query.proId;
      this.proListObj.categoryType = this.$route.query.proLevel;
      this.proListObj.stock = '';
      this.proListObj.type = '';
      this.proListObj.status = '';
      this.proListObj.pageNum = '';
      this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
    }
  },
  methods:{
//      通过首页侧边栏获取商品列表
    getProListFromAside(theCategory,theCategoryType,theStock,theType,theStatus,thePageNum){
      this.$axios.get('/AfwindProductcommerce/getThirdProductsRelatesByThirdCategoryBySaleVAndStockUpAndDown?' +
        'category='+ theCategory +
        '&categoryType='+ theCategoryType +
        '&stock=' + theStock +
        '&type=' + theType +
        '&status=' + theStatus +
        '&pageNum=' + thePageNum)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.total = myData.total;
          this.pageSize = myData.pageSize;
          this.goodsList.splice(0,this.goodsList.length);
          for (let i = 0;i<myData.rows.length;i++){
            for (let j = 0;j<myData.rows[i].afwindProductsCommerceList.length;j++){
              this.goodsList.push(myData.rows[i].afwindProductsCommerceList[j])
            }
          }
//          console.log(this.goodsList)
//          console.log(myData)
        }).catch(() => {
        console.log("侧边栏请求列表数据失败")
      })
    },
    handleCurrentChange(val){
      this.proListObj.pageNum = val;
      if (this.sortASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }else if(!this.sortASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }else if(this.timeASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }else if(!this.timeASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }else if(this.priceASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }else if(!this.priceASC){
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum);
      }
    }
  },
  watch:{
    sortASC(){
      if (this.sortASC){
        this.proListObj.type = 'numType';
        this.proListObj.status = 2;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }else{
        this.proListObj.type = 'numType';
        this.proListObj.status = 1;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }
    },
    timeASC(){
      if (this.timeASC){
        this.proListObj.type = 'cycleType';
        this.proListObj.status = 2;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }else{
        this.proListObj.type = 'cycleType';
        this.proListObj.status = 1;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }
    },
    priceASC(){
      if (this.priceASC){
        this.proListObj.type = 'priceType';
        this.proListObj.status = 2;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }else{
        this.proListObj.type = 'priceType';
        this.proListObj.status = 1;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }
    },
    chooseIt(){
      if (this.chooseIt){
        this.proListObj.stock = 1;
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
        console.log(this.proListObj)
      }else{
        this.proListObj.stock = '';
        this.getProListFromAside(this.proListObj.category,this.proListObj.categoryType,this.proListObj.stock,this.proListObj.type,this.proListObj.status,this.proListObj.pageNum)
      }
    }
  }
}
</script>

<style>
  .item img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .pagination{
    margin-top: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  .goods_list_card .el-card:hover{
    transform: translateY(-3px);
    transition: 0.5s;
    box-shadow: 1px 1px 20px #999;
  }
  .goods_list_card{
    overflow: hidden;
    margin-top: 20px;
  }
  .card_item{
    float: left;
    width: 18.8%;
    height: 360px;
    margin: 2% 0.1% 2% 0.5%;
    transform: translateY(-0.1px);
    box-shadow: 1px 1px 5px #999;
  }
  .card_item a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .card_item a img{
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }
  .card_item a span{
    display: block;
    font-size: 16px;
    text-align: center;
  }
  .card_item a .price{
    color: #c11a21;
  }
  .card_item a p{
    font-size: 12px;
    padding-left: 15px;
  }
  .card_item a .name{
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .card_item a .bottom{
    margin-top: 10px;
  }
  .card_item a .cart{
    display: block;
    margin: 10px auto;
  }
  .card_item a .cart:hover{
    color: #fff;
    background: #E35B5A;
  }
  .card_item:hover{
    transform: translateY(-3px);
    transition: 0.5s;
    box-shadow: 1px 1px 20px #999;
  }
</style>
