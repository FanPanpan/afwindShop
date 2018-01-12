<template>
  <div class="goodDetails_wrapper">
    <search></search>
    <div style="width: 100%;">
      <myNav></myNav>
    </div>
    <div class="goodDetails_info">

      <div  class="goodDetails_list">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>一级分类</el-breadcrumb-item>
          <el-breadcrumb-item>二级分类</el-breadcrumb-item>
          <el-breadcrumb-item>三级分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 中部商品图片及信息 -->
      <div class="goodDetails_name">
        <!-- 左面大图部分 -->
        <div class="goodDetails_name_img">
          <div @mouseenter='getBigImg(ImgUrl)'>
            <img :src="ImgUrl">
          </div>
          <div class="little_img" >
            <ul>
              <li v-for="img in imgUrl" @mouseenter='getIndex(img.url)'>
                <img :src="img.url" style="width: 100%;height: 100%">
              </li>
            </ul>
            <el-button class="collect" type="text"><router-link to=""> 收藏</router-link></el-button>
            <el-button class="report" type="text"><router-link to=""> 举报</router-link></el-button>
          </div>

        </div>
        <!-- 右面文字部分 -->
        <div class="goodDetails_name_font">
            <!-- 此处需要用v-if 做一个判断 -->
            <span v-if="true" class="make">在制造</span>
            <span v-if="false"class="new">新品</span>
          <h2>
            <span style="font-size:18px;font-family:'microsoft yahei'">{{commerceName}}</span>
          </h2>
          <div class="price">商品价格:<i>￥</i><span>{{price}}</span>/单位包装数</div>
          <div class="details">
            <p>商品编号：{{code}}</p>
            <p>品牌型号：{{specifications}}</p>
            <p>起订数量：{{smallGoods}}</p>
            <p>出货周期：{{cycle}}
            <el-button class="deliver" type="text">
              <router-link to="/deliveryCycle"> 出货周期说明>></router-link>
            </el-button>
            </p>
          </div>

          <div class="number">
            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" ></el-input-number>
            <el-button class="cart">
              <router-link to=""> 加入购物车</router-link>
            </el-button>
            <el-button class="buy">
              <router-link to=""> 现在购买</router-link>
            </el-button>
          </div>
        </div>
        </div>
      <!-- 底部商品介绍及售后 -->
      <div class="goodDetails_category">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商品介绍" name="first">
            <h2>商品详情</h2>
            <div style="width: 1000px; border-top:1px solid #ccc;"></div>

            <img v-for="item in goodsDetails"  v-if="item?true:false" style="width: 100%;height: 1200px;display: block" :src="'http://' + item">
            <div v-if="!goodsDetails?true:false" style="width:1000px; height:100px;">暂无商品详情</div>

            <h2>安装指导</h2>
            <div style="width: 1000px; border-top:1px solid #ccc;"></div>
            <img v-for="item in installInfo"  v-if="item?true:false" style="width: 100%;height: 1200px;display: block" :src="'http://' + item">
            <div v-if="!installInfo?true:false" style="width:1000px; height:100px;">暂无安装指导</div>

          </el-tab-pane>
          <el-tab-pane label="规格参数" name="second">
            <!-- <h2>规格参数</h2> -->
            <table class="gridtable" v-for="(item,index) in specificationParams" v-if="item?true:false">
              <tr>
                <th  colspan="3" >{{item.name}}</th>
              </tr>
              <tr v-for="innerItem in specificationParams[index].afwindAttribute">
                <td>{{innerItem.remark}}</td>
                <td>{{innerItem.defaultValue}}</td>
              </tr>
            </table>
            <div v-if="!specificationParams?true:false" style="width:1000px; height:100px;">暂无规格参数</div>

          </el-tab-pane>
          <el-tab-pane label="物流信息" name="third">
            <h2>物流信息</h2>
            <table class="gridtable" v-for="(item,index) in logInfo" v-if="item?true:false">
              <tr>
                <th>Info Header 1</th>  <th>Info Header 2</th>
              </tr>
              <tr>
                <td>Text 1A</td><td>Text 1B</td>
              </tr>
              <tr>
                <td>Text 2A</td><td>Text 2B</td>
              </tr>
            </table>
            <div v-if="logInfo.length <= 0?true:false" style="width:1000px; height:100px;">暂无物流信息</div>
          </el-tab-pane>
          <el-tab-pane label="售后保障" name="fourth" >
            <div class="gooodDetails_service">
              <h2>售后保障说明</h2>
              <div class="type">
                质保类型：
                <el-input :disabled="true" size="small" placeholder="整机"></el-input>
              </div>
              <div class="time">
                质保期限：
                <el-input :disabled="true" size="small" placeholder="1"></el-input>
                <span>单位</span>
              </div>
              <div style="width: 1000px"></div>
              <h2>商品相关服务</h2>
              <div style="width: 1000px"></div>
            </div>
            <div v-if="!afterServer?true:false" style="width:1000px; height:100px;">暂无售后保障说明</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import search from '../../common/preciseQuery.vue'
  import myNav from '../../components/nav/nav.vue'
  export default {
    components:{
      search,
      myNav
    },
    data() {
      return {
        num1: 1,
        input: "",
        tableData: [
          {
            title: "参数一",
            data: "XXX"
          },
          {
            title: "参数二",
            data: "XXX"
          },
          {
            title: "参数三",
            data: "XXX"
          }
        ],
        imgUrl: [],
        ImgUrl:'',
        BigImg:'',
        activeName: 'first',
//        商品详情参数
        commerceName:'',
        price:'',
        code:'',
        specifications:'',
        smallGoods:'',
        cycle:'',
        goodsDetails:[],
        specificationParams:[],
        installInfo:[],
        logInfo:[],
        afterServer:[],
      }
    },
    created(){
        this.$axios.get('/productcommerce/selectCommerceProductInfo?id='+ this.$route.query.proId)
          .then((res) => {
            let myData = JSON.parse(res.data.data)
              console.log(myData)
						for(let i = 0;i<myData.afwindProducts.productsPicList.length; i++){
							this.imgUrl.push('http://47.92.122.228:8021' + myData.afwindProducts.productsPicList[i].url)
						}
						this.ImgUrl = this.imgUrl[0];
            this.commerceName = myData.commerceName;
            this.price = myData.price;
            this.code = myData.code;
            this.specifications = myData.afwindProducts.specifications;
            this.smallGoods = myData.smallGoods;
            this.cycle = myData.cycle;
            this.goodsDetails = myData.details.split(',');
            this.specificationParams = myData.afwindProductAttribute
            console.log(this.goodsDetails);
          }).catch(() => {
          console.log("商品详情数据请求失败")
        })
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      getIndex(imgUrl){
        // console.log(imgUrl);
        this.ImgUrl = imgUrl;

      },
      getBigImg(ImgUrl){
        // console.log(ImgUrl)
        this.BigImg = ImgUrl;
      },
      refresh(){
        this.$router.go(0)
      },
    },
    watch:{
      '$route':'refresh'
    }
  }
</script>

<style>
  .goodDetails_wrapper{
    padding-top: 50px;
    position: relative;
    width: 100%;
  }
  .goodDetails_info{
    margin: 0 auto;
    width: 70.5%;
  }
  .goodDetails_list {
    position: absolute;
    left: 14.76%;
    display: inline-block;
    width: 50%;
    height: 20px;
    font-size: 18px;
    margin-top: -4%;
  }
  .goodDetails_name {
    overflow: hidden;
    margin-top: 10%;
    width: 100%;
    height: 530px;
    box-sizing: border-box;
  }
  /* 左边大图展示 */
  .goodDetails_name_img {
    float: left;
    width: 40%;
    height: 600px;
  }
  .goodDetails_name_img div{
    width: 350px;
    height: 350px;
  }
  .goodDetails_name_img div img{
    width: 100%;
    height: 100%;
  }
  .goodDetails_name_img .little_img {
    position: relative;
    margin-top: 2%;
    width: 350px;
    height: 100px;
  }
  .goodDetails_name_img .little_img ul{
    width: 100%;
    height: 100px;
  }
  .goodDetails_name_img .little_img li {
    float: left;
    width: 16.2%;
    height: 50px;
    margin: 1.671%;
  }
  .goodDetails_name_img .little_img li:hover{
    border: 2px solid #C11A21;
  }
  .goodDetails_name_img .collect,
  .report {
    position: absolute;
  }
  .goodDetails_name_img .little_img .collect {
    top: 65px;
    left: 10px;
  }
  .goodDetails_name_img .little_img .report {
    top: 65px;
    right: 10px;
  }
  /*修改部分*/
  .report a{
    color:gainsboro;
    font-family:"microsoft yahei";
  }
  .collect a{
    font-family:"microsoft yahei";
  }
  /* 右面文字部分 */
  .goodDetails_name_font {
    float: left;
    margin-left: 10%;
    width: 50%;
    height: 520px;
  }
  .goodDetails_name_font h2 {
    overflow: hidden;
    height: 75px;
    color: #666;
    font: normal 28px "microsoft yahei";
    font-weight: bold;
    text-align: left;
  }
  .goodDetails_name_font .make,
  .goodDetails_name_font .new{
    width: 48px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font: normal 12px "microsoft yahei";
    color:#999;
  }
  .goodDetails_name_font .price {
    width: 95%;
    color: #999;
    font: normal 18px "microsoft yahei";
    background-color: #f3f3f3;
  }
  .goodDetails_name_font .price i{
    color: #e4393c;
    font: normal 14px "microsoft yahei";
  }
  .goodDetails_name_font .price span{
    color: #e4393c;
    font-size: 32px;
    font-weight: bolder;
    font-family:"microsoft yahei";
  }
  .goodDetails_name_font .details {
    margin-bottom: 3.5%;
    padding-top: 30px;
    width: 90%;
    height: 250px;
  }
  .goodDetails_name_font .details p {
    color: #999;
    font: normal 16px "microsoft yahei";
    line-height: 30px;
  }
  .goodDetails_name_font .deliver {
    height: 45px;
    margin-left: 15px;
  }
  /*新增部分*/
  .deliver a{
    font-family:"microsoft yahei";
  }
  .goodDetails_name_font .number {
    margin: 1%;
    margin-bottom: 3%;
    color: #666;
  }
  .number  .el-input-number{
    width: 140px;
  }
  .number .el-input-number .el-input__inner{
    padding: 0;
  }
  .number .el-button {
    background-color: #dd4b39;
  }
  .number .el-button a {
    color: #f3f3f3;
  }
  .number .buy{
    background-color: #C11A21;
  }
  /*修改部分*/
  .number .buy a,.number .cart a{
    font-family:"microsoft yahei";
  }
  /* 下面商品类别 */
  .goodDetails_category {
    margin-bottom: 20px;
    width: 100%;
  }
  .goodDetails_category  h2{
    width: 100%;
  }
  .goodDetails_category  h2{
    width: 100%;
    height: 100%;
  }
  .goodDetails_category .el-tabs__item{
    color: #999;
  }
  .goodDetails_category h2 {
    position: relative;
    color: #999;
    padding-bottom: 5px;
    font: bold 18px "microsoft yahei";
    /*修改*/
    margin-left: 3%;
    margin-bottom: 10px;
  }
  /*修改部分*/
  .goodDetails_category h2::before{
    content: '';
    display: block;
    position: absolute;
    top:0;
    left: -3%;
    width: 1.1%;
    height: 100%;
    background:#ccc;
  }
  .el-tabs__nav-scroll .el-tabs__active-bar{
    color: #C11A21;
    background-color: #C11A21;
  }
  .el-tabs__nav-scroll .el-tabs__item:hover{
    color: #C11A21;
  }
  .el-tabs__nav-scroll .el-tabs__item .is-active{
    color:  #C11A21;
  }
  .goodDetails_category .el-input__inner {
    width: 80px;
  }
  .gooodDetails_service{
    overflow: hidden;
  }
  .gooodDetails_service .time,
  .gooodDetails_service .type {
    margin-top: 10px;
    display: block;
    width: 300px;
    color: #999;
    position: relative;
  }
  .gooodDetails_service .type .el-input__inner,
  .gooodDetails_service .time .el-input__inner {
    position: absolute;
    top: -35px;
    left: 80px;
  }
  .gooodDetails_service .time span {
    position: absolute;
    display: inline-block;
    width: 50px;
    top: 0px;
    left: 165px;
  }
  .gridtable {
    width: 800px;
    color: #6f6f6f;
    border: 1px solid #ddd;
    border-collapse: collapse;
  }
  .gridtable th,
  .gridtable td {
    padding: 15px;
    border: 1px solid #ddd;
  }
  /*新增部分*/
  .goodDetails_category .el-tabs__item {
    font-family:"microsoft yahei";
    font-size:18px;
  }
  .gooodDetails_service .time,.gooodDetails_service .type{
    font-family:"microsoft yahei";
  }
  .number .el-button:focus,
  .number  .el-button:hover{
    background-color: #C11A21;
  }
</style>

