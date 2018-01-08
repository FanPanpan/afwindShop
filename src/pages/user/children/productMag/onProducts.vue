<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>已上架商品</h1>
    </div>
    <div class="allProducts_filter"> 
      <div class="allProducts_item">
        <p>商品名称：</p>
        <el-input v-model="proName" placeholder="请输入商品名称"></el-input>
      </div>
      <div class="allProducts_item">
        <p>商品编码：</p>
        <el-input v-model="proCode" placeholder="请输入商品编码"></el-input>
      </div>
      <div class="allProducts_item">
        <p>商品型号：</p>
        <el-input v-model="proModel" placeholder="请输入商品型号"></el-input>
      </div>
      <div class="allProducts_item">
        <p>品牌：</p>
        <el-input v-model="proBrand" placeholder="请输入品牌"></el-input>
      </div>
      <div class="allProducts_item salePrice">
        <p>销售价格：</p>
        <el-input v-model="minPrice"></el-input>
        <span style="float: left;display: inline-block;width: 30px;height: 40px;line-height: 40px;text-align: center">到</span>
        <el-input v-model="maxPrice"></el-input>
      </div>
      <div class="allProducts_item">
        <p>销售方式：</p>
        <el-select v-model="mode" @change="getModeId()" placeholder="请选择">
          <el-option v-for="item in saleMode" :key="item.value" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="allProducts_item">
        <p>创建时间：</p>
        <el-date-picker value-format="yyyy-MM-dd" v-model="createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="allProducts_item"></div>
      <div class="allProducts_item">
        <el-button round>导入商品</el-button>
        <el-button round>导出列表商品</el-button>
        <el-button round>清空条件</el-button>
        <el-button @click="searchProBySoMuch" type="primary" round>搜索</el-button>
      </div>
    </div>
    <div class="allProducts_wrapper">
      <div class="secondLevelFilter">
        <el-select v-model="nums" placeholder="每页显示">
          <el-option v-for="item in showNums" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <el-button round>下架</el-button>
      </div>
      <div class="allProducts_list">
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column fixed prop="code" label="商品编号(SKU)" width="150"></el-table-column>
          <el-table-column prop="commerceName" label="商品名称" width="120"></el-table-column>
          <el-table-column prop="afwindProducts.specifications" label="型号" width="120"></el-table-column>
          <el-table-column prop="afwindBrand.brandName" label="品牌" width="120"></el-table-column>
          <el-table-column prop="saleConfig.valuei" label="销售方式" width="120"></el-table-column>
          <el-table-column prop="price" label="售价(现货/非现货)" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="config.valuei" label="商品状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.status === '16'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="text" size="mini">下架</el-button>
              </div> 
              <div v-if="scope.row.status === '36'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="cancel(scope.$index, scope.row)" type="text" size="mini">取消</el-button>
              </div>
              <div v-if="scope.row.status === '38'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="submit(scope.$index, scope.row)" type="text" size="mini">提交审核</el-button>
              </div>
              <div v-if="scope.row.status === '22'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
              </div>
              <div v-if="scope.row.status === '17'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="submit(scope.$index, scope.row)" type="text" size="mini">上架</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="allProducts_pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        proName:'',
        proCode:'',
        proModel:'',
        proBrand:'',
        minPrice:'',
        maxPrice:'',
        saleMode: [{
          id:14,
          label: '现货'
        }, {
          id:15,
          label: '非现货'
        }],
        mode: '',
        createTime:'',
        showNums: [
          {
            value: '10',
            label: '10'
          }, {
            value: '20',
            label: '20'
          },
          {
            value: '50',
            label: '50'
          }, {
            value: '100',
            label: '100'
          }],
        nums: '',
        tableData:[],
        currentPage:1,//当前页
        pageSize:'',//每页条数
        total:'',//共有多少条数据
      }
    },
    created(){
      //
      this.filter('',10);
      if (!this.total){
        this.total = 0;
      }
    },
    methods:{
      //通过销售方式向后台发送id
      getModeId(){
        // this.mode = id;
       
      },
      handleClick(row) {
        console.log(row);
      },

      //查询按钮
    searchProBySoMuch(){
  
     let startTime,endTime;
     if (typeof(this.createTime[0]) === undefined && typeof(this.createTime[1]) === undefined){
       startTime = '';
       endTime = '';
     }else{
      startTime = this.createTime[0];
      endTime = this.createTime[1];

     }
     console.log(startTime);
     console.log(endTime);
     console.log(this.createTime); 
      this.searchPros(this.proName,this.proCode,this.proModel,this.proBrand,this.minPrice,this.maxPrice,startTime,endTime,this.mode);
    },

//    根据条件查询商品钩子函数
    searchPros(proName,proCode,proModel,proBrand,minPrice,maxPrice,startTime,endTime,mode){
      let reqParams = {
        pageSize:10,
        commerceName:proName,
        code:proCode,
        afwindProducts:{
          specifications:proModel
        },
        afwindBrand:{
          brandName:proBrand
        },
        lowPrice:minPrice,
        highPrice:maxPrice,
        startTime:startTime,
        endTime:endTime,
        saleType:mode,
      }
      this.$axios.post('/AfwindProductcommerce/selectByExampleList',reqParams)
      .then((res) => {
        let myData = JSON.parse(res.data.data);
        //  console.log(startTime);
        //  console.log(endTime);
        console.log(JSON.parse(res.data.data));
      
        for (let i = 0;i<myData.rows.length;i++){
          myData.rows[i].createTime = new Date(myData.rows[i].createTime).getFullYear()+'-'+(new Date(myData.rows[i].createTime).getMonth()+1)+'-'+new Date(myData.rows[i].createTime).getDate()
        }
        this.tableData = myData.rows;
      }).catch(() => {
      console.log("查询请求失败")
    })
    },

//    品牌列表CheckBox全选   传索引值
      handleSelectionChange(val) {
        console.log(val)
      },
      //点击前往某页
      handleSizeChange(val){
        // console.log(val)
         this.filter(val,10);
      },
      //点击直接跳转某页
      handleCurrentChange(val){
        // console.log(val)
          this.filter(val,10);
      },
      filter(current_page,current_pageSize){
       let reqParams = {
        status:16,
        commerceName:"",
        pageSize: current_pageSize
      }
      this.$axios.post('/AfwindProductcommerce/selectByExampleList',reqParams)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          for (let i = 0;i<myData.rows.length;i++){
            myData.rows[i].createTime = new Date(myData.rows[i].createTime).getFullYear()+'-'+(new Date(myData.rows[i].createTime).getMonth()+1)+'-'+new Date(myData.rows[i].createTime).getDate()
          }
          this.tableData = myData.rows;
          this.total = myData.total;
          this.pageSize = myData.pageSize;

          console.log(JSON.parse(res.data.data))
        }).catch(() => {
        console.log("请求商品列表失败");
      })
    }
  }
  }
</script>
