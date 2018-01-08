<template>
  <div class="header_wrapper">
    <!-- <div class="left_wrapper">
      <h1>
        <router-link to="/" title="爱风商城官网">
          <img src="../assets/logo/logo.png">
        </router-link>
      </h1>
    </div> -->
    <div class="right_wrapper">
      <div class="login">
        <router-link :to="sessData ? '/user/order':'/login'">
          <el-popover ref="login_info" placement="bottom" width="200" trigger="hover" :disabled="showUserInfo">
            <ul class="userInfoList">
              <li><a href="#">用户名字</a></li>
              <li><router-link to="/user/passed">基本信息</router-link></li>
              <li><router-link to="/user/allProducts">商品管理</router-link></li>
              <li><router-link to="/user/accountMag">账户管理</router-link></li>
              <li><router-link to="/user/orderMag">订单管理</router-link></li>
              <li><router-link to="/user/settleMag">结算管理</router-link></li>
              <li><router-link to="/user/brandList">品牌管理</router-link></li>
              <li><router-link :to="routerPath">店铺管理</router-link></li>
              <li><router-link to="/user/operationMag">运营管理</router-link></li>
              <li><router-link to="/user/chainMag">供应链管理</router-link></li>
              <li><a href="#">退出</a></li>
            </ul>
          </el-popover>
          <el-button v-popover:login_info>
            <img src="../assets/logo/login_logo.png">
          </el-button>
        </router-link>
      </div>
      <div class="shop_cart">
        <div class="shop_cart_logo">
          <a href="#">
            <el-popover ref="products_list" placement="bottom" width="300" trigger="hover">
              <!-- 需要商品单子 -->
              <div class="shop_cart_list" :class="totalNum > 4 ? 'showScroll':''">
                <a href="#" style="" @click="asd">
                  <div class="goodImg"><img src="../assets/products/product.jpg"></div>
                  <div class="goodName"><a href="#" style="color: #5079d9">这个商品叫啥</a></div>
                  <div class="goodPrice"><span style="color: red">￥ 128</span><span style="color: lightgray"> × {{goodNum}}</span></div>
                  <div class="delBtn" @click.stop="del"><img src="../assets/others/del.png"></div>
                </a>
                <a href="#" style="" @click="asd">
                  <div class="goodImg"><img src="../assets/products/product.jpg"></div>
                  <div class="goodName"><a href="#" style="color: #5079d9">这个商品叫啥</a></div>
                  <div class="goodPrice"><span style="color: red">￥ 128</span><span style="color: lightgray"> × {{goodNum}}</span></div>
                  <div class="delBtn" @click.stop="del"><img src="../assets/others/del.png"></div>
                </a>
                <a href="#" style="" @click="asd">
                  <div class="goodImg"><img src="../assets/products/product.jpg"></div>
                  <div class="goodName"><a href="#" style="color: #5079d9">这个商品叫啥</a></div>
                  <div class="goodPrice"><span style="color: red">￥ 128</span><span style="color: lightgray"> × {{goodNum}}</span></div>
                  <div class="delBtn" @click.stop="del"><img src="../assets/others/del.png"></div>
                </a>
                <div class="cart_total">
                  <p style="color: lightgray;margin: 10px 0">共<strong>{{ totalNum }}</strong> 件商品</p>
                  <h5>合计：<span style="color: red">￥</span><span style="color: red">999</span></h5>
                  <h6><router-link style="width: 100px;height: 40px;color: white" to="/cart">去购物车</router-link></h6>
                </div>
              </div>
            </el-popover>
            <el-button v-popover:products_list>
              <img src="../assets/logo/shop_cart_logo.png">
            </el-button>
          </a>
        </div>
        <div class="shop_cart_num">
          <div :class="totalNum === 0 ? 'putItAsh':'putItRed'">{{totalNum}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        numBgc:"",
        showUserInfo:false,
        goodNum:1,
        sessData:'',
        routerPath:'/user/storeMag',
      }
    },
//    created() {
//      this.$axios.get('/storeAdmin/selectStoreInfoById.ajax')
//        .then((res)=> {
//          let myData = JSON.parse(res.data.data);
//          if(myData){
//            this.routerPath = '/user/myStore'
//          }else{
//            this.routerPath = '/user/storeMag'
//          }
//        }).catch((err) => {
//        console.log("店铺数据请求失败")
//      })
//    },
    computed:{
      totalNum(){
        let num = 0;
        return num
      }
    },
    mounted(){
      if (sessionStorage.getItem('loginStatus')){
        this.showUserInfo = false;
        this.sessData = sessionStorage.getItem('loginStatus');
      }
    },
    methods:{
      asd(){
        alert(1)
      },
      del(){
        alert(2)
      }
    }
  }
</script>

<style>
  .header_wrapper{
    background: #1a1a1a;
    width: 100%;
    height: 60px;
    overflow: hidden;
    position: fixed;
    z-index: 2000;
  }
  .el-container.is-vertical .el-header{
    padding: 0;
  }
  /* .left_wrapper{
    float: left;
    width: 200px;
    height: 80px;
    margin-left: 20%;
  }
  .left_wrapper img{
    width: 100%;
  }
   */
  /* .right_wrapper{
    float: left;
    margin-left: 36%;
    margin-top: 1%;
    width: 150px;
  } */
  /* 改动后的右面部分 */
  .right_wrapper{
    float: right;
    margin-right: 20%;
    margin-top: 12px;
    width: 150px;
  }
  .login{
    float: left;
    width: 36px;
    height: 36px;
    margin-right: 20%;
  }
  .shop_cart{
    float: left;
    overflow: hidden;
  }
  .login .el-button,.shop_cart .el-button{
    background: #1a1a1a;
    padding: 0;
    border: none;
  }
  .el-popover .userInfoList li{
    text-align: center;
    padding: 10px 0;
    border-bottom: 1px solid gainsboro;
  }
  .el-popover .userInfoList li a{
    display: inline-block;
    width: 200px;
    height: 20px;
  }
  .login span img{
    width: 100%;
    height: 100%;
  }
  .shop_cart_logo{
    float: left;
    width: 36px;
    height: 36px;
  }
  .shop_cart_logo a img{
    width: 100%;
    height: 100%;
  }
  .shop_cart_list{
    width: 300px;
    height: 156px;
    overflow-x: hidden;
    table-layout: fixed;
    position: relative;
  }
  .shop_cart_list a{
    width: 300px;
    height: 88px;
    display: inline-block;
    border-bottom: 1px solid gainsboro;
    position: relative;
  }
  .cart_total{
    position: relative;
    bottom: 0;
    left: 0;
  }
  .cart_total h6{
    position: absolute;
    top: 10px;
    right: 0;
    background: #5c81e3;
    color: white;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
  }
  .showScroll{
    overflow-y: scroll;
  }
  .goodImg{
    position: absolute;
    width: 80px;
    height: 80px;
  }
  .goodImg img{
    width: 100%;
  }
  .goodName{
    position: absolute;
    top: 0;
    left: 100px;
    width: 180px;
  }
  .goodPrice{
    position: absolute;
    left: 100px;
    bottom: 0;
  }
  .delBtn{
    width: 20px;
    height: 20px;
    position: absolute;
    top: 30px;
    right: 20px;
  }
  .delBtn img{
    width: 100%;
    height: 100%;
  }
  .shop_cart_num{
    float: left;
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin-top: 6px;
  }
  .shop_cart_num div{
    color: white;
    font-size: 14px;
  }
  .putItAsh{
    background: #ccc;
    border-radius: 25px;
  }
  .putItRed{
    background: red;
    border-radius: 25px;
  }
</style>





























