<template>
    <div class="brandCenter_wrapper">
      <myHeader></myHeader>
      <search class="brandCenter_search"></search>
      <myNav></myNav>
      <div class="brandCenter_list_wrapper">
        <div class="brandIntro" v-for="item in brandInfo">
          <div class="brandIntro_img">
            <img :src="'http://47.92.122.228:8021'+ item.logo">
          </div>
          <div class="brandIntro_details">
            <p>
              {{item.information }}
            </p>
          </div>
        </div>
        <div class="brandIntro_classify">
          <div class="classify">
            <span>分类</span>
          </div>
          <div class="classify_details" v-for="(item,index) in brandInfo">
            <a href="#" v-for="cla in item.afwindProductsList">
              {{cla.afwindCategory.name}}
            </a>
            <!--<i @click="showBrandList" class="el-icon-arrow-right" :class="brandListControl?'i_right':'i_down'"></i>-->
          </div>
        </div>
        <div class="brandIntro_classify_sort">
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
            <li>
              <el-checkbox v-model="checked">有库存</el-checkbox>
            </li>
          </ul>
        </div>
        <goodCards :brandChoose="checked" :sortASC="sortASC" :priceASC="priceASC" :timeASC="timeASC"></goodCards>
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
export default {
  components:{
    myHeader,
    myFooter,
    search,
    myNav,
    goodCards
  },
  data(){
    return {
      brandListControl:true,
      turnRightOrDown:'',
      sortASC:true,
      timeASC:true,
      priceASC:true,
      checked: false,
      brandInfo:''
    }
  },
  created(){
//      获取品牌logo和介绍信息
      this.$axios.get('/brandCategory/getCategoryByBrandId?brandId=' + this.$route.query.brandId)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          this.brandInfo = myData;
          console.log(myData)
        }).catch(() => {
        console.log("请求品牌logo和info失败")
      })
  },
  methods:{
    showBrandList(){
      this.brandListControl = !this.brandListControl
    },
    sortOrderBy(){
      this.sortASC = !this.sortASC;
    },
    timeOrderBy(){
      this.timeASC = !this.timeASC;
    },
    priceOrderBy(){
      this.priceASC = !this.priceASC;
    },
  }
}
</script>

<style>
  .brandCenter_wrapper{
    position: relative;
    overflow: hidden;
    width: 100%;
  }
  .brandCenter_wrapper .brandCenter_search{
    margin-top: 6%;
  }
  .brandCenter_list_wrapper{
    margin: 0 auto;
    width: 90%;
  }
  .brandIntro{
    overflow: hidden;
    width: 100%;
    height: 190px;
  }
  .brandIntro_img{
    float: left;
    overflow: hidden;
    width: 23.6%;
    height: 190px;
  }
  .brandIntro_img img{
    display: block;
    margin: 0 auto;
    margin-top: 35px;
    width: 39%;
    height: 64%;
  }
  .brandIntro_details{
    float: left;
    overflow: hidden;
    width: 76.4%;
    height: 190px;
  }
  .brandIntro_details p{
    display: -webkit-box;
    float: left;
    width: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2%;
    margin-left: 8%;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .brandIntro_classify{
    overflow: hidden;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    border:1px solid gainsboro;
  }
  .classify{
    float: left;
    width: 6%;
    height: 40px;
    line-height: 40px;
    background: gainsboro;
  }
  .classify span{
    margin-left: 20%;
  }
  .classify_details{
    overflow: hidden;
    float: left;
    width: 94%;
    height: 40px;
    line-height: 40px;
  }
  .classify_details a{
    float: left;
    margin-left: 1%;
    color: black;
  }
  .classify_details a:hover{
    color: red;
  }
  .classify_details i{
    float: right;
    cursor: pointer;
    line-height: 40px;
  }
  .i_right{
    float: right;
    cursor: pointer;
    line-height: 40px;
    transition: all .5s;
    transform: rotateZ(0deg);
  }
  .i_down{
    float: right;
    cursor: pointer;
    line-height: 40px;
    transition: all .5s;
    transform: rotateZ(90deg);
  }
  .brandIntro_classify_sort ul{
    overflow: hidden;
    width: 100%;
    line-height: 40px;
    border-top: 1px solid #878D99;
    margin-top: 20px;
  }
  .brandIntro_classify_sort li{
    float: left;
    padding: 0 10px;
    cursor: pointer;
  }
  .brandIntro_classify_sort .el-checkbox__label{
    color: #000;
    font-size: 16px;
  }
  .brandIntro_classify_sort li:last-child{
    border: 0
  }
  .brandIntro_classify_sort .sort{
    width: 90px;
    position: relative;
  }
  .brandIntro_classify_sort .time,
  .brandIntro_classify_sort .price{
    width: 60px;
    position: relative;
  }
  .brandIntro_classify_sort  i{
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    right: 10px;
    top:8px;
  }
  .brandIntro_classify_sort  .el-icon-caret-bottom{
    top: 15px;
  }
  .goods_list_card{
    margin-top: 20px;
  }
  .goods_list_card .el-card__body{
    width: 100%;
    height: 360px;
  }
  .goods_list_card .el-col{
    width: 18.8%;
    margin: 0 1.5% 2% 0;
  }
  .goods_list_card .image {
    display: block;
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }
  .goods_list_card .el-col:nth-child(5n){
    margin:0;
  }
  .goods_list_card  span{
    display:block;
    font-size: 16px;

    text-align: center;
  }
  .goods_list_card  .price{
    color: #C11A21;
  }
  .goods_list_card p{
    font-size: 12px;
    padding-left: 15px;
  }
  .goods_list_card .name{
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .goods_list_card  .bottom {
    margin-top: 10px;
  }
  .goods_list_card .cart {
    display: block;
    margin: 10px auto;
  }
  .goods_list_card .cart:hover{
    color: #fff;
    background-color: #E35B5A;
  }
</style>





































