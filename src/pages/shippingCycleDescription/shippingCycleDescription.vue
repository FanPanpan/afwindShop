<template>
  <div class="goodDetails_wrapper">
    <myHeader></myHeader>
    <search></search>
    <div style="left: 14.76%;">
      <myNav></myNav>
    </div>
    <div class="goodDetails_info">
      <div class="goodDetails_banner"></div>
      <div class="goodDetails_delivery">
        <div class="goodDetails_catainner">
          <div class="goodDetails_box">
            <h1>出货时效说明</h1>
          </div>
          <div class="goodDetails_list">
            <div class="goodDetails_left">
              <div class="goodDetails_top">
                <div class="goodDetails_fit" style="margin-left:40%">当日出货</div>
                <div style="border-bottom:1px dashed #F0F0EF;height:20px">有"当日出货"标志的产品;</div>
              </div>
              <div class="goodDetails_font">
                <div>工作日16:00之前提交的订单,爱风当日出货;</div>
                <div>16:00之后提交的订单,爱风次日出货。</div>
                <div>爱风库存不够时按"缺货出货日"  出货</div>
              </div>
            </div>
            <div class="goodDetails_cente">
              <div class="goodDetails_top">
                <div class="goodDetails_fit" style="margin-left:40%">次日出货</div>
                <div style="border-bottom:1px dashed #F0F0EF;height:20px">有"次日出货"  标志的产品:</div>
              </div>
              <div class="goodDetails_font">
                <div>工作日16:00之前提交的订单,爱风次日出货;</div>
                <div>16:00之后提交的订单,爱风第三日出货。</div>
                <div>爱风库存不够时按"缺货出货日"  出货</div>
              </div>
            </div>
            <div class="goodDetails_righ">
              <div class="goodDetails_top">
                <div class="goodDetails_fit" style="margin-left:40%">次日出货</div>
                <div style="border-bottom:1px dashed #F0F0EF;height:20px">没有"当日出货"  /  "次日出货"  标志的产品:</div>
              </div>
              <div class="goodDetails_font">
                <div>工作日16:00之前提交的订单,爱风按预计出货日出货;</div>
                <div>16:00之后提交的订单,爱风按"预计出货日+1"出货。</div>
                <div>预计出货日按工作日计算</div>
              </div>
            </div>
          </div>
        </div>
        <div class="goodDetails_bottom">
          <div class="goodDetails_box" style="width:1170px;margin:0 auto">
            <div class="bottom_title">
              <h1>送达时效(按出货日起算)说明</h1>
            </div>
            <div class="line"></div>
            <div class="bottom_font">
              <div>小件商品：单个商品重量小于25公斤,或者体积小于0.3方,或者长度小于1.8M,</div>
              <div>大件商品：单个商品重量大于25公斤,或者体积大于0.3方-0.5方,或者长度大于1.8M。</div>
              <div>小件商品、大件商品的送达时效不同；不同地区的送达时效不同。具体请见下方表格：</div>
            </div>
            <div class="table_box">
              <div class="table_left">
                <el-table :data="tableData" style="width: 100%" size="small" >
                  <el-table-column prop="reginor" label="收货区域"  align="center" show-header="true"></el-table-column>
                  <el-table-column prop="small" label="小件商品送达时效"  align="center" show-header="true"></el-table-column>
                  <el-table-column prop="big" label="大件商品送达时效" align="center" width="180" show-header="true"></el-table-column>
                </el-table>
              </div>
              <div class="table_right">
                <el-table :data="Data" style="width: 100%" size="small">
                  <el-table-column prop="reginor" label="收货区域" align="center" ></el-table-column>
                  <el-table-column prop="small" label="小件商品送达时效" align="center"></el-table-column>
                  <el-table-column prop="big" label="大件商品送达时效" align="center" width="180"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '../../common/header.vue'
  import myFooter from '../../common/footer.vue'
  import search from '../../common/preciseQuery.vue'
  import myNav from '../../components/nav/nav.vue'
  export default {
    components:{
      search,
      myNav,
      myHeader,
      myFooter
    },
    data(){
      return{
        tableData: [{
          reginor: '上海',
          small: '4天',
          big: '4天'
        },{
          reginor: '北京/天津',
          small: '6天',
          big: '7天'
        },{
          reginor: '重庆',
          small: '6天',
          big: '8天'
        },{
          reginor: '浙江省/江苏省',
          small: '5天',
          big: '4-7天'
        },{
          reginor: '安徽省',
          small: '5天',
          big: '6-7天'
        },{
          reginor: '江西省',
          small: '6天',
          big: '7-9天'
        },{
          reginor: '山西省',
          small: '7天',
          big: '9天'
        },{
          reginor: '福建省',
          small: '6天',
          big: '7-8天'
        },{
          reginor: '内蒙古自治区',
          small: '7天',
          big: '10-12天'
        },{
          reginor: '河南省',
          small: '7天',
          big: '9天'
        },{
          reginor: '河北省',
          small: '7天',
          big: '8天'
        },{
          reginor: '吉林省/辽宁省',
          small: '7天',
          big: '9-10天'
        },{
          reginor: '黑龙江省',
          small: '7天',
          big: '9-11天'
        },{
          reginor: '甘肃省',
          small: '7天',
          big: '9-11天'
        }],
        Data:[{
          reginor: '云南省',
          small: '7天',
          big: '9-13天',
        },{
          reginor: '海南省',
          small: '7天',
          big: '10-11天',
        },{
          reginor: '广东省',
          small: '6天',
          big: '7-9天',
        },{
          reginor: '湖南省',
          small: '7天',
          big: '8-9天',
        },{
          reginor: '湖北省',
          small: '6天',
          big: '7-9天',
        },{
          reginor: '陕西省',
          small: '7天',
          big: '9天',
        },{
          reginor: '四川省',
          small: '7天',
          big: '9-10天',
        },{
          reginor: '山东省',
          small: '6天',
          big: '6-9天',
        },{
          reginor: '贵州省',
          small: '7天',
          big: '9-10天',
        },{
          reginor: '青海省',
          small: '7天',
          big: '11-14天',
        },{
          reginor: '宁夏自治区',
          small: '7天',
          big: '9-10天',
        },{
          reginor: '西藏自治区',
          small: '7天',
          big: '14天',
        },{
          reginor: '新疆自治区',
          small: '7天',
          big: '12-14天',
        },{
          reginor: '广西自治区',
          small: '7天',
          big: '9天',
        }]
      }
    }
  }
</script>

<style scoped>
  .goodDetails_wrapper{
    overflow: hidden;
    position: relative;
    padding: 0;
  }
  .goodDetails_wrapper .inquire{
    margin-top: 110px;
  }
  .goodDetails_info{
    /*height: 1000px;
    width: 70.5%;*/
    /*background: pink;*/
    margin: 0 auto;
    /*修改*/
    width:1349px;
    height:1090px;
    background: #F3F3F3;
  }
  .goodDetails_banner{
    width:100%;
    min-width:1200px;
    background:url('../../assets/banner1.png')  center no-repeat;
    height:550px;
  }
  .goodDetails_delivery{
    position: relative;
    /*width:70.5%*/
    margin: -500px auto 0;
    /*padding: 5px;*/
    /*修改*/
    width: 1190px;
  }
  .goodDetails_catainner{
    /*width:960px;
      height:241px;*/
    background:#FFFFFF;
    border-radius: 4px;
    margin-bottom: 10px;
    /*修改*/
    width:1190px;
    height:241px;
  }
  .goodDetails_bottom{
    /*width:960px;
      height:669px;*/
    background:#FFFFFF;
    border-radius: 4px;
    margin-bottom: 10px;
    /*修改*/
    width:1190px;
    height:740px;
  }
  .goodDetails_box h1,.bottom_title h1{
    font-size:18px;
    font-family:"microsoft yahei";
    padding:15px 15px;
  }
  .goodDetails_list{
    overflow:hidden;
  }
  .goodDetails_left,.goodDetails_cente,.goodDetails_righ{
    /*width:310px;*/
    height:180px;
    border:1px solid #E3E3E3;
    border-radius:5px;
    float:left;
    /*margin:0px 3px;*/
    /*修改*/
    padding:0px 5px;
    width:371px;
    margin-left:10px;
  }
  .goodDetails_top {
    width:310px;
    height:40px;
    margin-top:20px;
  }
  .goodDetails_top div{
    margin:15px 15px;
    font-size:12px;
    font-family:"microsoft yahei";
  }
  .goodDetails_fit{
    width:56px;
    height:20px;
    background:#E56300;
    color:white;
    line-height: 20px;
    text-align:center;
  }
  .goodDetails_font{
    width:310px;
    height:80px;
    margin-top:25px;
  }
  .goodDetails_font div{
    margin:10px 15px;
    font-size:12px;
    font-family:"microsoft yahei";
  }
  .line{
    width:96%;
    border:1px solid #F0F0EF;
    margin-left:18px;
    margin-top:-5px;
  }
  .bottom_font{
    margin:5px 0px;
  }
  .bottom_font div{
    padding:6px 18px;
    font-size:12px;
    font-family:"microsoft yahei";
  }
  .table_box{
    overflow:hidden;
    margin-left:3px;
  }
  .table_left,.table_right{
    float:left;
    width:48.5%;
    padding:0px 8px;
  }
  .has-gutter tr:nth-of-type(1){
    background:#F5F5F5;
  }
  .el-table th>.cell{
    color:#666666;
    font-family:"microsoft yahei";
    font-weight:bold;
  }
</style>
