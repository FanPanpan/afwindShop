<template>
    <div style="overflow: hidden;background: #ededed">
      <myHeader></myHeader>
      <div class="cart_wrapper">
        <div class="cart">
          <h1 class="cart_title">购物清单</h1>
        </div>
        <div class="cart_table_title">
          <span class="product_info">商品信息</span>
          <span class="operation">操作</span>
          <span class="totalPrice">小计</span>
          <span class="product_num">数量</span>
          <span class="product_price">单价</span>
        </div>
        <div class="cart_table" v-for="item in cartList">
          <!-- 勾选 -->
          <div class="cartCheckbox">
            <span></span>
          </div>
          <!-- 图片 -->
          <div class="productImg">
            <a href="#">
              <img :src="item.productImg">
            </a>
          </div>
          <!-- 介绍信息 -->
          <div class="productInfo">
            <a href="#">
              <span>{{ item.productName }}</span>
            </a>
          </div>
          <!-- 删除按钮 -->
          <div class="delProduct">
            <img src="../../assets/others/del.png">
          </div>
          <!-- 计算单间商品的总价 -->
          <div class="subTotal">￥{{ item.productPrice * item.productNum }}</div>
          <!-- 数量选择 -->
          <div class="productNum">
            <span class="sub">-</span>
            <span class="num">{{ item.productNum }}</span>
            <span class="add">+</span>
          </div>
          <!-- 商品单价 -->
          <div class="productPrice">￥{{ item.productPrice }}</div>
        </div>
      </div>
      <myFooter></myFooter>
    </div>
</template>

<script>
  import myHeader from '../../common/header.vue'
  import myFooter from '../../common/footer.vue'
  export default {
    components:{
      myHeader,myFooter
    },
    data(){
      return {
        cartList:[
          {
            productId:1,
            productName:"风向仪1",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:2799,
            productNum:1,
            checked:1
          },
          {
            productId:2,
            productName:"风向仪2",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:1288,
            productNum:1,
            checked:1
          },
          {
            productId:3,
            productName:"风向仪3",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:999,
            productNum:1,
            checked:1
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .cart_wrapper{
    overflow: hidden;
    padding-bottom: 78px;
    margin: 120px auto 30px;
    width: 1218px;
    background: white;
    border: 1px solid #dcdcdc;
    border-radius: 8px;
  }
  .cart{
    padding-left: 30px;
    width: 1218px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 60px;
    background:linear-gradient(#fbfbfb, #ececec);
  }
  .cart_table_title{
    position: relative;
    z-index: 1;
    height: 38px;
    line-height: 38px;
    padding: 0 0 0 30px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0,0,0,0.08);
  }
  .product_info{
    float: left;
    text-align: left;
  }
  .product_price,.product_num,.totalPrice,.operation{
    width: 137px;
    float: right;
    text-align: center;
    color: #838383;
  }
  .cart_table{
    overflow: hidden;
    width: 1218px;
    height: 140px;
  }
  .cartCheckbox{
    float: left;
    width: 74px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .cartCheckbox span{
    display: inline-block;
    position: relative;
    width: 16px;
    height: 16px;
    background: url(../../assets/others/checkbox.png) no-repeat -2px -22px;
    cursor: pointer;
    vertical-align: middle;
  }
  .productImg{
    float: left;
    margin-top: 30px;
    width: 80px;
    height: 80px;
  }
  .productImg a{
    display: block;
    width: 80px;
    height: 80px;
  }
  .productImg a img{
    width: 100%;
    height: 100%;
  }
  .productInfo{
    float: left;
    margin-left: 30px;
    width: 380px;
    height: 140px;
    line-height: 140px;
  }
  .productPrice,.subTotal{
    overflow: hidden;
    float: right;
    width: 137px;
    text-align: center;
    color: #666;
    line-height: 140px;
  }
  .productNum{
    float: right;
    display: flex;
    width: 137px;
    height: 140px;
    align-items: center;
    justify-content: center;
  }
  .sub,.add{
    display: inline-block;
    position: relative;
    width: 34px;
    height: 37px;
    cursor: pointer;
    text-align: center;
    line-height: 37px;
  }
  .delProduct{
    overflow: hidden;
    float: right;
    width: 137px;
    height: 140px;
    text-align: center;
    line-height: 140px;
  }
  .delProduct img{
    width: 24px;
    height: 24px;
  }
</style>

























