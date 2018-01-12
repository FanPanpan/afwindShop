<template> 
<!-- background: #ededed -->
    <div style="overflow: hidden;">
      <myHeader></myHeader>
      <div class="cart_wrapper">
        <div class="cart">
          <img src="../../assets/logo/logo.png">
          <span class="cart_title">购物车</span>
        </div>
        <div class="cart_prompt">
          <div class="cart_prompt_title">
           	温馨提示
          </div>
          <div class="cart_prompt_content">
            <p>1. 建议您先登录，再把产品加入购物车，以便爱风为您提供更精准的产品范围及价格；</p>
            <p>2. 购物车内产品显示“失效”的原因可能为：①您的公司限定了产品采购分类范围，具体请咨询您公司管理员；② 您的公司限定了产品单价限额；③ 该产品已下架，或价格变动；</p>  
            <p>3. 订单满XXX元免邮费。</p>       
          </div>
        </div>
        <div class="cart_table_title">
    	  <label class="product_select">
    	  <!--v-model="selectArr.length==this.cartList.length"-->
    	  	<input type="checkbox" name="all" v-on:click="chooseAll"/>
	        <span>全选</span>
          </label>
          <!--<span class="product_select">全选</span>-->
          <span class="product_info">商品信息</span>
          <span class="operation">操作</span>
          <span class="totalPrice">小计</span>
          <span class="product_num">数量</span>
          <span class="product_price">单价</span>
          <span class="product_cycle">供应周期</span>
        </div>
        <div class="cart_shop">爱风商城自营商店<b class="el-icon-tickets"></b></div>
        <div class="cart_table" v-for="(item,index) in cartList">
          <!-- 勾选 -->
          <!--<div  class="cartCheckbox">
            <span :class="[proId[index] === index?'selected':'select']" @click="yes(index)"></span>
          </div>-->
          <div class="cartCheckbox"> 
           <input  type="checkbox"  :value="index"  v-model="selectArr" />
          </div>
          <!-- 图片 -->
          <div class="productInfo">
            <div class="productInfo_img">
              <a href="javascript:;">
              <img :src="item.productImg">
              </a>
            </div>
            <div class="productInfo_name">
              <a href="javascript:;">
                <p>{{ item.productName }}</p>
              </a>
            </div>
          </div>
          <!-- 删除按钮 -->
          <div class="delProduct">
            <!-- <img src="../../assets/others/del.png"> -->
            <span @click="handleRemove(index)">删除</span>
            <span>加入收藏</span>
          </div>
          <!-- 计算单间商品的总价 -->
          <div class="subTotal">￥{{ item.productPrice * item.num }}</div> 
           <!-- 数量选择 -->
          <div class="productNum">
            <el-input-number size="small" v-model="item.num"  @change="handleChange":min="1"></el-input-number>
            <p>库存</p> 
            <p>最小订货量</p> 
          </div>
          <!-- 商品单价 -->
          <div class="productPrice">￥{{ item.productPrice*item.num }}</div>
          <!-- 供应周期 -->
          <div class="productCycle">50工作日</div>
        </div>
      	<div :class="searchBarFixed == true ? 'cart_table_footer_fixed' :'cart_table_footer'" id="cart_table_footer">
      		<span>
	      		<label>
	      			<!--v-model="selectArr.length==cartList.length"--> 
		    	  	<input type="checkbox" name="all" v-on:click="chooseAll" />全选
	            </label>
            </span>
      		<span>删除选中商品</span>
      		<span>收藏选中商品</span>
      		<span>清除失效商品</span>
      		<span>已选 {{proNum===this.cartList.length?0:proNum}}件商品</span>
      		<span>应付总价:{{proNum===this.cartList.length?0:totalPrice}}</span>
      		<el-button class="list">生成预订单</el-button>
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
      searchBarFixed:false,
      fixedoffsetTop:0,
        cartList:[
          {
            productId:1,
            productName:"风向仪1",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:2799,
            productNum:1,
//          checked:1,
            num:0,
            show:true
          },
          {
            productId:2,
            productName:"风向仪2",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:1288,
            productNum:1,
//          checked:1,
            num:0,
            show:true
          },
          {
            productId:3,
            productName:"风向仪3",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:1288,
            productNum:1,
//          checked:1,
            num:0,
            show:true
          },
          {
            productId:4,
            productName:"风向仪4",
            productImg:require('../../assets/products/product.jpg'),
            productPrice:1288,
            productNum:1,
//          checked:1,
            num:0,
            show:true
          }
        ],
        selectArr:[],
        proId:[],
		checked:false
      }
    },
    created(){
    },
    computed:{
    	//总价
		totalPrice(){
			var totalPrice = 0;
			for(var i=0; i<this.cartList.length;i++){
				var item = this.cartList[i];
				totalPrice +=  item.productPrice*item.num ;
			}
			return totalPrice.toString().replace(/\B(?=(\d{3})+$)/g,',');
		},
		//已选商品
		proNum(){
			var proNum =0;
			for(var i=0; i<this.cartList.length;i++){
				var item = this.cartList[i];
				proNum+= item.num ;
			}
			return proNum;
		
		},
    },
    methods:{
	  //计数器部分
	  handleChange(value) {
      },
      //操作删除部分
      handleRemove(index){
      	this.cartList.splice(index,1);
      },
      //全选框
      chooseAll(event) {
            var oThis = this;
            oThis.selectArr = [];
            if ( event.currentTarget.checked ) {
                oThis.cartList.forEach(function(item , index) {
                    oThis.selectArr.push(index);
                });
            }
            console.log(oThis.selectArr);
      },
      handleScroll () {
		  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		  console.info((scrollTop+840) +"|" +this.fixedoffsetTop)
		  if ((scrollTop+840) < this.fixedoffsetTop) {
		    this.searchBarFixed = true
		  } else {
		    this.searchBarFixed = false
		  }
		  console.info(this.searchBarFixed)
		}
    },
    
    //底部固定定位部分
	mounted () {
		this.fixedoffsetTop = document.querySelector('#cart_table_footer').offsetTop
	 	window.addEventListener('scroll', this.handleScroll)
	},
	destroyed () {
	  window.removeEventListener('scroll', this.handleScroll)
	},
	  
	 
	
 


  }
</script>

<style scoped>
  .main{
    background-color: #fff;
  }
  .cart_wrapper{
    overflow: hidden;
    padding-bottom: 78px;
    margin: 120px auto 30px;
    width: 90%;
  }
  .cart{
    margin-bottom: 20px;
    width: 90%;
    height: 90px;
    overflow: hidden;
  }
  .cart_title{
    display: inline-block;
    height: 80px;
    line-height: 80px;
    color: #666;
    font-size: 26px;
  
  }
  .cart_prompt{
    height: 80px;
    padding: 10px;
    color: #666;
    background-color: #f3f3f3;
  }
  .cart_prompt_title{
    float: left;
    width: 15%;
    height: 100px;
    text-align: center;
  }
 
  .cart_prompt_content{
    float: left;
    width: 85%;
    height: 100px;
    font-size: 14px;
  }
  .cart_prompt_content p{
    line-height: 20px;
  } 

  .cart_table_title{
    position: relative;
    z-index: 1;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    background-color: #F3F3F3;
    padding: 0px 0px 0px 40px;
    margin-top: 20px;
  }
  .cart_table_title span{
    font-size: 14px;
  }
  .product_info,.product_select{
    float: left;
    width: 12%;
    text-align: left;
    color: #838383;
  }
  .product_price,.product_num,.totalPrice,.operation,.supplier,.product_cycle{
    width: 14.2%;
    float: right;
    text-align: center;
    color: #838383;
  }
  .cart_shop{
  	width: 15%;
  	height: 60px;
  	line-height: 50px;
  	color: #666;
  	padding: 0px 0px 0px 40px;
  }
  .cart_table{
    overflow: hidden;
    width: 100%;
    height: 140px;
    border-top: 2px solid #ccc;
  }
  .cartCheckbox{
    float: left;
    position: relative;
    width: 100px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .productInfo{
    float: left;
    margin-top: 30px;
    width: 300px;
    height: 80px;
    overflow: hidden;
  }
  .productInfo_img {
    float: left;
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
  .productInfo_img a img{
    width: 100%;
    height: 100%;
  }
  .productInfo_name{
    float: right;
    width: 210px;
    height: 80px;
  }
  .productInfo_name a{
    line-height: 30px;
    color: #666;
  }
  
  .productPrice,.subTotal,.productCycle{
    overflow: hidden;
    float: right;
    width: 14%;
    text-align: center;
    color: #666;
    line-height: 140px;
  }
  .productNum{
    float: right;
    width: 14%;
    height: 140px;
    line-height: 60px;
    text-align: center;
  } 
  .productNum p{
    color: #666;
    font-size: 14px;
    line-height: 20px;
  }
  .delProduct{
    overflow: hidden;
    float: right;
      width: 14%;
    height: 140px;
    color: #666;
    text-align: center;
    line-height: 120px;
    cursor: pointer;
  }
  .delProduct span:hover{
    color: #c91623;
  }
  .delProduct span{
    display: block;
    height: 30px;
    font-size: 14px;
  }
  .cart_table_footer{
  	overflow: hidden;
  	color:#666;
  	height: 60px;
  	width: 95%;
  	line-height: 60px;
  	background-color: #fff;
  	padding: 0px 0px 0px 40px;
  }
  .cart_table_footer_fixed{
    overflow: hidden;
    position:fixed;
    bottom:0;
  	z-index: 999;
  	color:#666;
  	height: 60px;
  	width: 90%;
  	line-height: 60px;
  	background-color: #fff;
  	border-top: 1px solid #ccc;
  }
  
  
  #cart_table_footer span{
  	float: left;
  	width: 12%
  }
  #cart_table_footer .list{
  	float: right;
  	margin: 10px;
  	color: #fff;
  	background: #1E90FF;
  }
  
</style>

























