<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>购物清单</h1>
    </div>
    <div class="order_details">
	    <el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="近三个月订单" name="first">
		    	
						<div class="order_filter">
						      <div class=" first_item">
						        <p>商品名称：</p>
						        <!--v-model="proName"-->
						        <el-input  placeholder="商品名称"></el-input>
						      </div>
						      <div class="second_item">
						        <p>创建时间：</p>
						        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
						      </div>
						 			<div class="order_item">
						        <p>买家用户名：</p>
						        <el-input  placeholder="买家用户名"></el-input>
						      </div>
						      <div class="order_item">
						        <p>订单编号：</p>
						        <el-input  placeholder="订单编号"></el-input>
						      </div>
		    				<!--<div class="order_item">
					        <p>订单状态：</p>
					        <el-select  v-model="order" @change="getStatusId()"  placeholder="全部">
					          <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.id"></el-option>
					        </el-select>
					      </div>-->
					      <div class="order_item">
					       <!--@click="searchProBySoMuch"-->
					      		<el-button  round>搜索</el-button>
					      </div>
					  </div>

					  <router-link to="./orderDetails"> 订单详情</router-link>
					  <router-link :to="{path:'./orderDetails',query:{status:'1'}}">订单详情1</router-link>
					  <router-link :to="{path:'./orderDetails',query:{status:'2'}}">订单详情2</router-link>
					  <router-link :to="{path:'./orderDetails',query:{status:'3'}}">订单详情3</router-link>
				  <!--<table class="gridtable">
	          <tr>
	            <th colspan="2">订单信息</th>
	            <th>订单装状态</th>
	            <th>实收款</th>
	          </tr>
	          <tr>
	            <td colspan="4">订单编号：2240978627685350     下单时间：2016-8-23 00:00:11    买家：老汉十八（周生，18270246040,深圳市南山区万维大楼203</td>
	          </tr>
	          <tr>
	            <td>数量:X1总价：¥2000.0</td>
	            <td>商品俗称（最多三行，多余部分显示“...”） 单价：¥1000.00</td>
	            <td rowspan="2"></td>
	            <td rowspan="2">订单总金额：¥5005.00（含配送费：¥5.00）取消交易</td>
	          </tr>
	          <tr>
	            <td>数量:X1总价：¥2000.0</td>
	            <td>商品俗称（最多三行，多余部分显示“...”） 单价：¥1000.00</td>
	          </tr>
          </table>-->
					    
					 <!--<div class="order_info">
						 	<p>订单信息订单装状态实收款</p>
						 	<p>订单编号：2240978627685350     下单时间：2016-8-23 00:00:11    买家：老汉十八（周生，18270246040,深圳市南山区万维大楼203</p>
						 	<div class="order_gridtable">
							 <table class="gridtable">
							 		<tr>
							 		<td>图片</td>
							 		<td>信息</td>
							 		</tr>
							 	<tr>
							 		<td>图片</td>
							 		<td>信息</td>
							 		</tr>
							 </table>
							 <div class="order_info_list">等待买家付款 订单详情</div>
							 <div class="order_info_price">  订单总金额：¥5005.00（含配送费：¥5.00）取消交易</div>
						 </div>
					 </div>   -->
					    
		    </el-tab-pane>
		    <el-tab-pane label="等待买家付款" name="second">
					<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>

		    </el-tab-pane>
		    <el-tab-pane label="等待卖家确认" name="third">
		  		<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="代发货" name="fourth">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="等待买家收货" name="five">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="待验收" name="six">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="交易成功" name="eight">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="关闭中" name="nine">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		    <el-tab-pane label="交易关闭" name="ten">
		    	<div class="order_filter">
			      <div class=" first_item">
			        <p>商品名称：</p>
			        <el-input  placeholder="商品名称"></el-input>
			      </div>
			      <div class="second_item">
			        <p>创建时间：</p>
			        <el-date-picker  v-model="createTime" value-format="yyyy-MM-dd"  type="daterange" range-separator="至" start-placeholder="请选择时间范围起始" end-placeholder="请选择时间范围结束"></el-date-picker>
			      </div>
			 			<div class="order_item">
			        <p>买家用户名：</p>
			        <el-input  placeholder="买家用户名"></el-input>
			      </div>
			      <div class="order_item">
			        <p>订单编号：</p>
			        <el-input  placeholder="订单编号"></el-input>
			      </div>
		      	<div class="order_item">
		      		<el-button  round>搜索</el-button>
		      	</div>
				  </div>
		    </el-tab-pane>
		  </el-tabs>
    </div>
	 
  </div>
  
  
  
</template>


<script>
  export default {
    data() {
      return {
        activeName: 'first',
        createTime:'',
        /*
        order:'',
        orderStatus: [{
	        id:1,
	        label: '待付款'
	      },{
	        id:2,
	        label: '代发货'
	      },{
	        id:3,
	        label: '待确认'
	      },{
	        id:4,
	        label: '待收货'
	      },{
	        id:5,
	        label: '待验收'
	      },{
	        id:6,
	        label: '交易成功'
	      },{
	        id:7,
	        label: '取消中'
	      },{
	        id:8,
	        label: '取消成功'
	      }  
      ],
      */
      };
    },
    methods: {
      handleClick(tab, event) {
//      console.log(tab, event);
      },
      
      
    }
  };
</script>


<style>
  /*.order_title_details{
    padding-left: 30px;
    overflow: hidden;
    width: 954px;
    height: 36px;
    border-bottom: 1px solid #d4d4d4;
    border-radius:8px 8px 0 0;
    line-height: 36px;
    background:linear-gradient(#fbfbfb, #ececec);
  }
  .basicInfo{
    float: left;
    width: 576px;
    height: 36px;
  }
  .otherInfo{
    float: right;
    width: 230px;
    height: 36px;
  }
  .basicInfo span,.otherInfo span{
    display: inline-block;
    font-size: 12px;
    text-align: center;
  }*/
 	
 	
 		/*公共输入框部分*/
 	.order_filter{
 	overflow: hidden;
 	}
  .order_filter .first_item{
		float: left;
		overflow: hidden;
		width: 30%;	
		padding: 10px 0;
  }
  .order_filter .second_item{
		float: left;
		overflow: hidden;
		width: 60%;	
		padding: 10px 0;
  }
  .order_filter .order_item{
  	float: left;
  	overflow: hidden;
  	width: 30%;	
  	padding: 10px 0;
  }
  .order_filter .first_item p{
  	width: 35%;	
  	float: left;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .order_filter .first_item .el-input{
    float: left;
    width: 50%;
  }
   .order_filter .second_item p{
  	width: 18%;	
  	float: left;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .order_filter .order_item p{
  	width: 36%;	
  	float: left;
  	height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .order_filter .order_item .el-input{
    float: left;
    width: 50%;
  }
  .order_filter  .order_item .el-input__inner{
  	width: 100%;
  }
  
 	/*近三个月订单页面css*/
  /*.order_filter .order_item .el-select{
    float: left;
    width: 60%;
  }
  .order_filter .order_item  .el-input--suffix{
   width:100%;
   }*/
  
  /*订单信息部分--待修改*/
  .order_info{
  	width: 100%;
  	/*overflow: hidden;*/
  	/*background-color: pink;*/
  	/*border: 1px solid #ddd;*/
  }
  .order_info .order_info_list{
  	float: left;
  	width: 10%;
  	/*border: 1px solid #ddd;*/
  }
  .order_info .order_info_price{
  	float: left;
  	width: 15%;
 
  }
  .order_gridtable{
   	/*border: 1px solid #ddd;*/
  }
  .gridtable {
    float: left;
    width: 70%;
    color: #6f6f6f;
    border: 1px solid #ddd;
    border-collapse: collapse;
  }
  .gridtable th,
  .gridtable td {
  /*height: 100px;*/
    padding: 15px;
    border: 1px solid #ddd;
  }


/*等待买家付款页面css*/



</style>
