<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>首页</h1>
    </div>
    <div class="main_wrapper">
      <div class="main_wrapper_title">
        <div class="indexStoreLogo">
          <img src="../../../../assets/logo/logo.png">
        </div>
        <div class="indexStore_item">
          <p>用户名称：<span>XXXXXX</span></p>
        </div>
        <div class="indexStore_item">
          <p>用户等级：<span>1级</span></p>
        </div>
        <div class="indexStore_item">
          <p>营业额：<span>200,000.00元</span></p>
        </div>
        <div class="indexStore_item">
          <p>店铺名称：<span>XXXXXX</span></p>
        </div>
        <div class="indexStore_item">
          <p>子用户数：<span>3个</span></p>
        </div>
        <div class="indexStore_item">
          <p>已结算金额：<span>200,00元</span></p>
        </div>
      </div>
      <div class="main_wrapper_content">
        <div class="content_left">
          <div class="orderCenter">
            <h1>订单中心</h1>
            <div class="orderCenter_wrapper">
              <div class="about_order" v-for="item in orderInfo">
                <img :src="item.src">
                <span>{{item.name}} <span style="color: red">{{item.num}}个</span></span>
              </div>
            </div>
          </div>
          <div class="operationCenter">
            <h1>运营中心</h1>
            <div class="operationCenter_wrapper">
              <div class="about_operation">
                <el-button v-for="item in operationInfo" :key="item.num" round>{{item.name}} {{item.num}}个</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="content_right">
          <div class="proCenter">
            <h1>商品中心</h1>
            <div class="proCenter_wrapper">
              <div class="about_pro">
                <p v-for="item in proInfo">{{item.name}}：<span>{{item.num}}</span></p>
              </div>
            </div>
          </div>
          <div class="statCenter">
            <h1>统计中心</h1>
            	<div id="myChart" style="width: 350px;height: 250px;"></div>
            	<div id="myChart1" style="width: 350px;height: 250px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');


export default {
  data(){
    return {
      orderInfo:[
        {
          name:'待确认订单',
          num:'1',
          src:require('../../../../assets/main/comfirmed.png')
        },
        {
          name:'履约中订单',
          num:'2',
          src:require('../../../../assets/main/exercise.png')
        },
        {
          name:'已确认订单',
          num:'3',
          src:require('../../../../assets/main/affirm.png')
        },
        {
          name:'已完成订单',
          num:'4',
          src:require('../../../../assets/main/complete.png')
        },
        {
          name:'待发货订单',
          num:'5',
          src:require('../../../../assets/main/wait.png')
        },
        {
          name:'已结算订单',
          num:'6',
          src:require('../../../../assets/main/clear.png')
        },
        {
          name:'异常订单',
          num:'7',
          src:require('../../../../assets/main/unusual.png')
        },
        {
          name:'订单总数',
          num:'8',
          src:require('../../../../assets/main/total.png')
        },
      ],
      operationInfo:[
        {
          name:'待咨询数',
          num:'2'
        },
        {
          name:'已解决咨询数',
          num:'5'
        },
        {
          name:'访客量',
          num:'1000'
        },
        {
          name:'已出售商品总数',
          num:'100'
        },
        {
          name:'已下单用户数',
          num:'30'
        },
        {
          name:'营业额',
          num:'200,000.00'
        },
        {
          name:'已支付用户数',
          num:'20'
        },
        {
          name:'已结算金额',
          num:'200.00'
        }
      ],
      proInfo:[
        {
          name:'全部商品',
          num:'21'
        },
        {
          name:'已置顶商品',
          num:'0'
        },
        {
          name:'已上架商品',
          num:'21'
        },
        {
          name:'商品库存预警',
          num:'2'
        },
        {
          name:'未上架商品',
          num:'0'
        },
        {
          name:'已违规商品',
          num:'0'
        },
        {
          name:'审核中商品',
          num:'0'
        },
      ]
    }
  },
  mounted() {
    this.drawLine();
  },
  methods:{
  	drawLine() {
  		let myChart = echarts.init(document.getElementById('myChart'));
  		let myChart1 = echarts.init(document.getElementById('myChart1'));
  		let option = null;
  		let option1 = null;
  		myChart.setOption({
				title: {
					text: '订单完成数统计',
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['成交']
				},
				toolbox: {
					show: true,
					feature: {
						magicType: {
							show: true,
							type: ['stack', 'tiled']
						},
						saveAsImage: {
							show: true
						}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLabel:{
						interval:0
					},
					data: ['10-24', '10-27', '10-30', '11-02', '11-05', '11-08', '11-11', '11-14', '11-17', '11-20']
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						name: '成交',
						type: 'line',
						smooth: true,
						lineStyle:{
							normal:{
								color:'#1588BB'
							}
						},
						itemStyle:{
							normal:{
								color:'deepskyblue'
							}
						},
						data: [10, 20, 30, 60, 88, 100,24, 54, 46, 18]
					},
				]

  		})
      	myChart1.setOption({
				title: {
					text: '订单完成数统计',
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['成交']
				},
				toolbox: {
					show: true,
					feature: {
						magicType: {
							show: true,
							type: ['stack', 'tiled']
						},
						saveAsImage: {
							show: true
						}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					axisLabel:{
						interval:0
					},
					data: ['10-24', '10-27', '10-30', '11-02', '11-05', '11-08', '11-11', '11-14', '11-17', '11-20']
				},
				yAxis: {
					type: 'value',
				},
				series: [
					{
						name: '成交',
						type: 'line',
						smooth: true,
						lineStyle:{
							normal:{
								color:'#1588BB'
							}
						},
						itemStyle:{
							normal:{
								color:'deepskyblue'
							}
						},
						data: [10, 20, 30, 60, 88, 100,24, 54, 46, 18]
					},
				]

  		})
  		if(option && typeof option === "object") {
				myChart.setOption(option, true);
			}
    }
}
}
</script>

<style>
  .main_wrapper_title{
    overflow: hidden;
    width: 954px;
    height: 100px;
  }
  .indexStoreLogo{
    float: left;
    margin: 10px 0 0 10px;
    width: 200px;
    height: 80px;
  }
  .indexStoreLogo img{
    width: 100%;
    height: 100%;
  }
  .indexStore_item{
    float: left;
    width: 248px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .main_wrapper_content{
    overflow: hidden;
  }
  .content_left,.content_right{
    float: left;
    width: 450px;
    height: 930px;
  }
  .content_left{
    margin-left: 10px;
  }
  .content_right{
    margin-left: 30px;
  }
  .orderCenter{
    overflow: hidden;
    width: 450px;
    height: 450px;
    border: 1px solid gainsboro;
    border-radius:8px 8px 0 0;
    margin-bottom: 30px;
  }
  .operationCenter{
    overflow: hidden;
    width: 450px;
    height: 450px;
    border: 1px solid gainsboro;
    border-radius:8px 8px 0 0;
  }
  .proCenter{
    overflow: hidden;
    margin-bottom: 30px;
    width: 450px;
    height: 350px;
    border: 1px solid gainsboro;
    border-radius:8px 8px 0 0;
  }
  .statCenter{
    overflow: hidden;
    width: 450px;
    height: 650px;
    margin-bottom: 30px;
    border:  1px solid gainsboro;
  }
  .statCenter #myChart,
  .statCenter #myChart1{
    margin: 0px auto;
  }
  .main_wrapper_content h1{
    padding-left: 10px;
    width: 450px;
    height: 40px;
    line-height: 40px;
    /* border-radius:8px 8px 0 0; */
    /* background:linear-gradient(#fbfbfb, #ececec); */
  }
  .orderCenter_wrapper,
  .operationCenter_wrapper{
    overflow: hidden;
    float: left;
  }
  .about_order{
    overflow: hidden;
    float: left;
    margin: 30px 0 20px 35px;
    width: 180px;
    height: 40px;
  }
  .about_order img{
    float: left;
    width: 40px;
    height: 40px;
  }
  .about_order span{
    margin-left: 10px;
    display: inline-block;
    height: 40px;
    line-height: 40px;
  }
  .about_operation{
    margin-left: 10px;
  }
  .about_operation .el-button{
    margin: 20px 0 20px 10px;
    width: 200px;
  }
  .about_pro{
    margin-left: 10px;
    margin-top: 20px;
  }
  .about_pro p{
    float: left;
    margin-left: 10px;
    width: 200px;
    height: 40px;
    line-height: 40px;
  }
</style>

