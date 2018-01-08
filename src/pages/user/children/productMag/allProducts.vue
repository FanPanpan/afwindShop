<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>全部商品</h1> 
    </div>
    <div class="allProducts_filter">
      <div class="allProducts_item">
        <p>商品名称：</p>
        <el-input v-model="proName" placeholder="请输入商品名称"></el-input>
      </div>
      <div class="allProducts_item">
        <p>商品编码：</p>
        <el-input  v-model="proCode" placeholder="请输入商品编码"></el-input>
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
        <el-select v-model="mode"  @change="getModeId()"  placeholder="请选择">
          <el-option v-for="item in saleMode" :key="item.value" :label="item.label" :value="item.id"></el-option>
        </el-select>
      </div>
      <div class="allProducts_item">
        <p>创建时间：</p>
        <el-date-picker value-format="yyyy-MM-dd" v-model="createTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </div>
      <div class="allProducts_item">
        <p>商品状态：</p>
        <el-select v-model="state"  @change="getStateId()" placeholder="请选择">
          <el-option v-for="item in proState" :key="item.value" :label="item.label" :value="item.status"></el-option>
        </el-select>
      </div>
      <div class="allProducts_item">
        <el-button round>导入商品</el-button>
        <el-button round>导出列表商品</el-button>
        <el-button round>清空条件</el-button>
        <el-button @click="searchProBySoMuch" type="primary" round>搜索</el-button>
      </div>
    </div>
    <div class="allProducts_wrapper">
      <div class="secondLevelFilter">
        <el-select v-model="nums" @change="getNumsId()" placeholder="每页显示">
          <el-option v-for="item in showNums" :key="item.value" :label="item.label" :value="item.id"></el-option>
        </el-select>
        <el-button round>全部上架</el-button>
        <el-button round>全部下架</el-button>
        <el-button round>全部提交审核</el-button>
      </div>
      <div class="allProducts_list"> 
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="code" label="商品编号(SKU)" width="150"></el-table-column>
          <el-table-column label="商品图片" width="120">
            <template slot-scope="scope">
              <img :src="'http://47.92.122.228:8021' + scope.row.afwindProducts.productsPicList[0].url" width="40px" height="30px">
            </template>
          </el-table-column>
          <el-table-column prop="commerceName" label="商品名称" width="120"></el-table-column>
          <el-table-column prop="afwindProducts.specifications" label="型号" width="120"></el-table-column>
          <el-table-column prop="afwindBrand.brandName" label="品牌" width="120"></el-table-column>
          <el-table-column prop="saleConfig.valuei" label="销售方式" width="120"></el-table-column>
          <el-table-column prop="price" label="售价(现货/非现货)" width="120"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="config.valuei" label="商品状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.status === '16'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="stop(scope.$index, scope.row)" type="text" size="mini">下架</el-button>
              </div>
              
              <div v-if="scope.row.status === '36'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="cancel(scope.$index, scope.row)" type="text" size="mini">取消</el-button>
              </div>
              <div v-if="scope.row.status === '38'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="submit(scope.$index, scope.row)" type="text" size="mini">提交审核</el-button>
              </div>
              <div v-if="scope.row.status === '18'">
                <el-button @click="examine(scope.$index, scope.row)" type="text" size="mini">查看</el-button>
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="mini">编辑</el-button>
                <el-button @click="submit(scope.$index, scope.row)" type="text" size="mini">提交审核</el-button>
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


  <examine :proId="proDetailsId" :examine="showExamineDialog" @examineStatus="getExamineStatus"></examine>

 <edit :proId="proDetailsId" :edit="showEditDialog"  @editStatus="getEditStatus"></edit>

    <div class="allProducts_pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
    </div>
  </div>
</template>

<script>
import examine from '../../../../components/examine/examine.vue'
import edit from '../../../../components/edit/edit'

export default {
  components:{
     examine,
     edit
    
    },
  data(){
    return {
      proName:'',
      proCode:'',
      proModel:'',
      proImg:'',
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
      proState:[
        {
          status: 16,
          label: '上架中'
        },
        {
          status: 17,
          label: '未上架'
        },
        {
          status: 36,
          label: '审核中'
        },
        {
          status: 38,
          label: '审核未通过'
        },
        {
          status: 18,
          label: '已违规'
        }
      ],
      state:'',
      showNums: [
        {
          id: '10',
          label: '10'
        }, {
          id: '20',
          label: '20'
        },
        {
          id: '50',
          label: '50'
        }, {
          id: '100',
          label: '100'
        }],
      nums: '',
      tableData:[],
      currentPage:1,//当前页
      pageSize:'',//每页条数
      total:'',//共有多少条数据
      showEditDialog:false,
      showExamineDialog:false,
      proDetailsId:[],
      proDetailsStatus:[]
    }
  },
  created(){
    this.filter('',10);
    if (!this.total){ 
      this.total = 0;
    }
  },
  methods:{
    getExamineStatus(value){
      this.showExamineDialog = value;
    },
    getEditStatus(value){
      this.showEditDialog = value;
    },
    examine(index,row){
      // console.log(row.id);
      this.showExamineDialog = true;
      this.proDetailsId.splice(0,this.proDetailsId.length);
      this.proDetailsId.push(row.id);

      // console.log(row.id)
    },
    edit(index,row){
      // console.log(row.id);
      this.showEditDialog = true;
      this.proDetailsId.splice(0,this.proDetailsId.length);
      this.proDetailsId.push(row.id);


      // console.log(row.id)
    },
    // 点击下架 
    stop(index,row){
      this.$axios.get('/AfwindProductcommerce/updateStatus?typei=UNDERTHESHELF'+'&id='+row.id)
      .then((res) => {
         this.$router.go(0);
      }).catch((res) => {
        console.log('下架失败')
    })
    },
  //点击上架
    submit(index,row){
         this.$axios.get('/AfwindProductcommerce/updateStatus?typei=SHELVES'+'&id='+row.id)
      .then((res) => {
         this.$router.go(0);
      }).catch((res) => {
        console.log('上架失败')
    })
    },


     //通过销售方式向后台发送id
    getModeId(){
     
    },
     //通过商品状态向后台发送status
    getStateId(){
      
    },
    //通过每页显示向后台发送id
    getNumsId(){
      
    },
    //查询按钮
    searchProBySoMuch(){

     let startTime,endTime;
     if (typeof(this.createTime[0]) === undefined && typeof(this.createTime[1]) === undefined){
       startTime = '';
       endTime = '';
     }else{
      //  startTime = this.createTime[0].getFullYear()+'-'+(this.createTime[0].getMonth()+1)+'-'+this.createTime[0].getDate();
      //  endTime = this.createTime[1].getFullYear()+'-'+(this.createTime[1].getMonth()+1)+'-'+this.createTime[1].getDate();
      startTime = this.createTime[0];
      endTime = this.createTime[1];

     }

    //  console.log(startTime);
    //  console.log(endTime);
    //  console.log(this.createTime);
    // console.log(this.mode)
    // console.log(this.state);
    // console.log(this.nums);
  
      this.searchPros(this.nums,this.proName,this.proCode,this.proModel,this.proBrand,this.minPrice,this.maxPrice,startTime,endTime,this.mode,this.state);
    },

    //    根据条件查询商品钩子函数
    searchPros(nums,proName,proCode,proModel,proBrand,minPrice,maxPrice,startTime,endTime,mode,state){
      let reqParams = {
        pageSize:nums,
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
        status:state
      }
      console.log(reqParams)
      this.$axios.post('/AfwindProductcommerce/selectByExampleList',reqParams)
      .then((res) => {
        let myData = JSON.parse(res.data.data);
        //  console.log(startTime);
        //  console.log(endTime);
          //  console.log(this.nums);
          console.log(JSON.parse(res.data.data));
       
       console.log(myData.afwindProducts.status);
      
        for (let i = 0;i<myData.rows.length;i++){
          myData.rows[i].createTime = new Date(myData.rows[i].createTime).getFullYear()+'-'+(new Date(myData.rows[i].createTime).getMonth()+1)+'-'+new Date(myData.rows[i].createTime).getDate()
        }
        this.tableData = myData.rows;
      }).catch(() => {
      console.log("查询请求失败")
    })
    },

//    点击前往某页
    handleSizeChange(val) {
      this.filter(val,10);
    },
//    直接前往某页
    handleCurrentChange(val) {
      this.filter(val,10);
    },
    filter(current_page,current_pageSize){
       let reqParams = {

        commerceName:"",
        pageSize: current_pageSize
      }
      this.$axios.post('/AfwindProductcommerce/selectByExampleList',reqParams)
        .then((res) => {
          let myData = JSON.parse(res.data.data);
          for (let i = 0;i<myData.rows.length;i++){
            myData.rows[i].createTime = new Date(myData.rows[i].createTime).getFullYear()+'-'+(new Date(myData.rows[i].createTime).getMonth()+1)+'-'+new Date(myData.rows[i].createTime).getDate()
          }
       
          console.log(myData.rows)
          this.tableData = myData.rows;
          this.total = myData.total;
          this.pageSize = myData.pageSize;
        }).catch(() => {
        console.log("请求商品列表失败");
      })
    }
  }
}
</script>

<style>

</style>
