<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>订单详情</h1>
    </div>
 
 
 	<div class="orderDetails_steps"> 
		 <el-steps :active="1" align-center>
		  <el-step title="买家下单"></el-step>
		  <el-step title="买家付款"></el-step>
		  <el-step title="卖家确认"></el-step>
		  <el-step title="待发货"></el-step>
		  <el-step title="待收货"></el-step>
		  <el-step title="待验收"></el-step>
		  <el-step title="交易成功"></el-step>
		</el-steps>
	</div>
	
	<!--卖家确认页面-->
	<div class="corderDetails_content"> 
		<span>下单时间：</span>
		<span>确认时间：</span>
		<div class="listStatus">
			<p>当前订单状态：卖家已确认订单，等待买家已付款</p>
			<p>买家还有2天23小时59分00秒付款，否则系统将自动关闭订单。</p>
			<p>如果您不想成交该订单，您可以取消订单哟~</p>
			<el-button>取消订单</el-button>
		</div>
		<div class="listInfo">
			<h4>买家信息</h4>
			<p>用户名：</p>
			<p>付款方式：</p>
			<p>收货人：</p>
			<p>收货地址：</p>
			<p>联系方式：</p>
			
			<h4>物流信息</h4>
			
			<h4>订单信息</h4>
			<span>订单编号：</span>
			<span>下单时间：</span>
			<ul>
				<li>
				<img src="" alt="" />				
				</li>
				<li>
				<p>商品俗称：</p>
				<p>品牌：</p>
				<p>型号：</p>
				</li>
				<li>
				<p>商品编号：</p>
				</li>
				<li>
				<p>单价：</p>
				</li>
				<li>
				<p>数量：</p>
				</li>
				<li>
				<p>总价：</p>
				</li>
			</ul>	

			
			<h4>发票信息</h4>
			<p>发票类型：</p>
			<p>发票抬头：</p>
			<p>发票内容：</p>
			<p>纳税人识别号：</p>
		</div>
	<div>
			
		
		
		</div>
	
	</div>
	
  </div>
  
  	
</template>

<script>
  export default{
	 
  }
</script>

<style>
.orderDetails_steps{
	width: 100%;
	height: 80px;
}

.orderDetails_steps .el-step__head.is-finish{
	color: #000;
	border-color: #000;
	font-size: 18px;
	/*#303133*/
}

.orderDetails_steps .el-step__title.is-finish{
	color: #000;
}

.corderDetails_content{
	width: 93%;
	margin: 0 auto;
}
.corderDetails_content .listStatus{
	border: 1px solid #ccc;
	padding: 10px;
	margin-bottom: 10px;
}
.corderDetails_content .listInfo{
	border: 1px solid #ccc;
	padding: 10px;
}
.corderDetails_content h4{
	border-bottom: 1px solid #ccc;
	padding-bottom: 10px;
}
.corderDetails_content ul{
	height: 150px;
	border: 1px solid #ccc;
	padding: 0;
}
.corderDetails_content ul li{
	float: left;
	width: 16.5%;
	height: 150px;
	/*text-align: center;*/
	list-style: none;
}
.corderDetails_content ul li:first-child{
	border-right: 1px solid #ccc;
}
.corderDetails_content ul img{
	display: block;
	width: 100px;
	height: 100px;
	background-color: pink;
}
</style>