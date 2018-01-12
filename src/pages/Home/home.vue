<template>
  <div class="home">
    <!-- 精确查询 -->
    <preciseQuery></preciseQuery>
    <!-- 商品logo -->
    <div class="logo">
      <h1>
        <router-link to="/" title="爱风商城官网">
          <img src="../../assets/logo/logo.png">
        </router-link>
      </h1>
    </div>
    <div class="navCom_wrapper">
      <div class="navCom_all">
        <i class="el-icon-menu"></i>
        <span>全部商品分类</span>
      </div>
      <div class="navCom_nav">
        <span><router-link tag="li" to="/">首页</router-link></span>
        <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'1'}}">现货中心</router-link></span>
        <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'2'}}">非现货中心</router-link></span>
        <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'品牌'}}">品牌中心</router-link></span>
        <!--<span>5</span>-->
        <!--<span>6</span>-->
      </div>
    </div>

    <div class="menu_container">
      <div class="cateMenu">
        <cateMenu></cateMenu>
      </div>
      <div class="carousel">
        <slideShow :slides="slides"></slideShow>
      </div>
    </div>


    <div class="allPro_wrapper">
      <div class="allPro_products">
        <h1 class="allPro_title">官方精选</h1>
      </div>
      <div class="allPro_selection">
        <div class="allPro_selection_leftImg">
          <!--<router-link>-->
            <!---->
          <!--</router-link>-->
          <a href="javascript:;">
            <el-carousel  height="520px" arrow="never" indicator-position="none">
              <el-carousel-item v-for="item in img" :key="item.index">
                <img :src="item.url">
              </el-carousel-item>
            </el-carousel>
          </a>
        </div>
        <ul>
          <li v-for="item in officialRecommend">
            <router-link :to="{path:'goodDetails',query:{proId:item.id}}">
              <img :src="'http://47.92.122.228:8021' + item.afwindProductPic.url">
              <p>{{item.commerceName}}</p>
              <p class="price">￥{{item.price}}</p>
              <div class="officialControl">
                <el-button class="cart">加入购物车</el-button>
              </div>
            </router-link>
            <!--<a href="javascript:;">-->
              <!---->
            <!--</a>-->
          </li>
        </ul>
      </div>
    </div>
  <!-- 6大商品分类列表 -->
    <div v-for="(item,index) in allProGather" class="allPro_wrapper">
      <div class="allPro_products" >
        <h1 class="allPro_title">{{item.name}}</h1>
      </div>
      <div  class="allPro_hotsale">
        <div class="allPro_hotsale_leftImg">
          <a href="javascript:;">
            <el-carousel height="520px" arrow="never" indicator-position="none">
              <el-carousel-item v-for="item in imgUrl" :key="item.index">
                <img :src="item.url">
              </el-carousel-item>
            </el-carousel>
          </a>
        </div>
        <ul>
          <li v-for="proDetails in allProGather[index].afwindProductsCommerceList">
            <router-link :to="{path:'goodDetails',query:{proId:proDetails.id}}">
              <img :src="'http://47.92.122.228:8021' + proDetails.afwindProducts.afwindProductPic.url">
              <div>
                <p>{{proDetails.commerceName}}</p >
                <p class="price">￥{{proDetails.price}}</p >
                <el-button class="cart">加入购物车</el-button>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 合作伙伴 -->
    <div class="partner">
      <h1>合作伙伴</h1>
      <div v-for="item in partner">
        <img :src="'http://47.92.122.228:8021' + item.logo">
      </div>
    </div>
  </div>
</template>

<script>
  import preciseQuery from '../../common/preciseQuery.vue'
  import cateMenu from '../../components/cateMenu/cateMenu.vue'
  import slideShow from '../../components/slideCom/slideCom.vue'
  export default {
    components:{
      preciseQuery,
      cateMenu,
      slideShow
    },
    data () {
      return {
        slides:[
          {
            src:'http://47.92.122.228:8021/index/banner1.png',
            des:'banner1'
          },
          {
            src:'http://47.92.122.228:8021/index/banner2.png',
            des:'banner2'
          },
          {
            src:'http://47.92.122.228:8021/index/banner3.png',
            des:'banner3'
          }
        ],
        img:[
          {index:1,url:'http://47.92.122.228:8021/index/lb1.jpg'},
          {index:2,url:'http://47.92.122.228:8021/index/lb2.jpg'},
          {index:3,url:'http://47.92.122.228:8021/index/lb3.jpg'},
        ],
        imgUrl:[
          {index:1,url:'http://47.92.122.228:8021/index/lb4.jpg'},
          {index:2,url:'http://47.92.122.228:8021/index/lb5.jpg'},
          {index:3,url:'http://47.92.122.228:8021/index/lb6.jpg'},
        ],
        officialRecommend:[],
        allProGather:[],
        partner:[]
      }
    },

    created(){
      //      官方精选商品
      this.$axios.get('/AfwindProductcommerce/recommend?recommend=0')
        .then((res) => {
//          console.log(JSON.parse(res.data.data))
          this.officialRecommend = JSON.parse(res.data.data);
//           console.log(JSON.parse(res.data.data));
        }).catch(() => {
        console.log("官方精选商品请求失败")
      })
//      所有商品分类
      this.$axios.get('/AfwindProductcommerce/getProductsCommerceAndPicAndBrandByCategoryId')
        .then((res) => {
          this.allProGather = JSON.parse(res.data.data);
//           console.log(JSON.parse(res.data.data));
        }).catch(() => {
        console.log("所有商品请求失败")
      })
//      所有合作伙伴
      this.$axios.get('/AfwindProductcommerce/getBrandOrderById')
        .then((res) => {
//           console.log(JSON.parse(res.data.data));
           let myData = JSON.parse(res.data.data);
           this.partner = myData
        }).catch(() => {
        console.log("合作伙伴请求失败")
      });
    }
  }
</script>

<style scoped>
  .el-container.is-vertical .el-main{
    padding: 0;
  }
  .home{
    position: relative;
    padding-top: 50px;
    padding-bottom: 100px;
    width: 100%;
  }
  /* 商品logo */
  .logo{
    position: absolute;
    left: 15%;
    top: 1%;
  }
  .navCom_wrapper{
    width: 90%;
    height: 40px;
    margin: 0 auto;
    overflow: hidden;
  }
  .navCom_all{
    float: left;
    width: 23.55%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    background: rgb(177, 30, 34);
    font-size: 20px;
    font-weight:bold;
    border-radius: 5px 5px 0 0;
  }
  .navCom_all i,
  .navCom_all span{
    font-size: 72%;
    font-family:"microsoft yahei";
    color:#fff;
  }
  .navCom_nav{
    float: left;
    width: 74.5%;
    margin-left: 1%;
  }
  .navCom_nav span{
    display: inline-block;
    height: 30px;
    line-height:40px;
    text-align: center;
    cursor: pointer;
    width: 14.4%;
    font-family:"microsoft yahei";
  }
  .navCom_nav span:hover{
    border-bottom:2px solid #C11A22;
    color:#C11A22;
  }
  .menu_container{
    width: 100%;
    margin: 0 auto;
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
  }
  .cateMenu{
    position: absolute;
    top: 0;
    left: 0;
    width: 18.58%;
    height: 100%;
    margin-left: 5%;
    z-index: 10;
  }
  .carousel{
    width: 100%;
    height: 100%;
  }
  .allPro_wrapper{
    margin: 0 auto;
    margin-bottom: 2%;
    width: 90%;
    /* border: 1px solid lightgray; */
    border-radius: 8px;
  }
  .allPro_products{
    overflow: hidden;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 3%;
    border-bottom: 1px solid #d4d4d4;
    /* border-radius:8px 8px 0 0; */
    /* background:linear-gradient(#fbfbfb, #ececec); */
  }
  .allPro_title{
    margin-left: 3%;
    position: relative;
  }
  .allPro_products h1::before{
    content: '';
    position: absolute;
    display: block;
    top: 0;
    left: -3%;
    width: 1.3%;
    height: 100%;
    /* background: #C11A21; */
    background: #ccc;
  }

  /* 官方精选 */
  .allPro_selection {
    overflow: hidden;
    width: 100%;
    height: 520px;
    color: #606266;
  }
  .allPro_selection .allPro_selection_leftImg{
    float: left;
    width: 25%;
    height: 520px;
  }
  .allPro_selection ul {
    display: block;
    float: left;
    width: 75%;
    height: 520px;
  }
  .allPro_selection ul li{
    float: left;
    width: 31%;
    height: 240px;
    margin-left: 2%;
    margin-bottom: 2%;
    margin-top: 0.5%;
    /* box-sizing: border-box; */
    /* border: 1px solid #ccc; */
    /* border-radius: 5px; */
    text-align: center;
  }
  .allPro_selection ul li:nth-child(3n){
    margin-right: 0;
  }
  .allPro_selection li p{
    text-align: center;
  }
  .allPro_selection .cart{
    text-align: center;
    z-index: 10;
  }
  .allPro_selection .allPro_selection_leftImg a,
  .allPro_hotsale .allPro_hotsale_leftImg a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .allPro_selection li .price,
  .allPro_hotsale li .price{
    margin: 3% 0;
    color: #C11A22;
  }
  .allPro_selection  img{
    display: block;
    width: 100%;
    height: 100%;
  }
  .allPro_selection .officialControl{
    margin: 0 auto;
    margin-bottom: 1%;
    height: 40px;
    width: 36%;
  }
  .allPro_selection .officialControl .el-button{
    width: 100%;
    padding: 10px 4px;
  }
  .allPro_selection li img{
    display: block;
    margin-top: 1%;
    width: 100%;
    height: 60%;
  }
  .allPro_hotsale li img {
    display: block;
    width: 100%;
    height: 50%;
    margin-top: 15%;
  }
  .allPro_hotsale{
    overflow: hidden;
    width: 100%;
    height: 520px;
    color: #606266;
  }
  .allPro_hotsale .allPro_hotsale_leftImg{
    float: left;
    width: 25%;
    height: 520px;
  }
  .allPro_hotsale ul {
    display: block;
    float: left;
    width: 75%;
    height: 520px;
  }
  .allPro_hotsale ul li:nth-child(3n){
    margin-right: 0;
  }
  .allPro_hotsale ul li{
    position: relative;
    float: left;
    width: 47%;
    height: 240px;
    margin-left: 2%;
    margin-bottom: 2%;
    margin-top: 0.5%;
    /* box-sizing: border-box; */
    /* border: 1px solid #ccc; */
    /* border-radius: 5px; */
  }
  .allPro_hotsale li a{
    display: block;
    width: 100%;
    height: 250px;
  }
  .allPro_hotsale li a img{
    width: 50%;
    float: left;
  }
  .allPro_hotsale li div{
    float: right;
    margin-top: 10%;
    width: 50%;
  }
  .allPro_hotsale li div p{
    margin-bottom: 20%;
  }
  .allPro_hotsale .cart{
    position: absolute;
    bottom: 5%;
    text-align: center;
    z-index: 10;
  }
  .allPro_wrapper li:hover{
    transform: translateY(-3px);
    transition: 0.5s;
    box-shadow: 1px 1px 20px #999;
  }
  .partner{
    margin: 0 auto;
    margin-top: 3%;
    margin-bottom: 3%;
    position: relative;
    width: 90%;
    height: 100px;
    border-top: 1px solid #d4d4d4;
  }
  .partner h1{
    position: absolute;
    left: 0;
    top: -25%;
  }
  .partner div{
    float: left;
    margin-top: 1%;
    margin-left: 0.59%;
    padding-right: 0.6%;
    width: 15%;
    height: 100px;
    border-right: 1px solid #ccc;
  }
  .partner div img{
    width: 100%;
    height: 100%;
  }
  .partner .firstPar{
    margin-left: 0.9%;
  }
  .partner div:last-child{
    border-right: none;
  }
</style>




















