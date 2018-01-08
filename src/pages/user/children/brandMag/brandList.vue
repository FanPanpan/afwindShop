<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>品牌列表</h1>
    </div>
    <div class="brandList">
      <div class="setBrand_wrapper">
        <div class="setBrand_wrapper_item">
          <el-input placeholder="请输入品牌名称" v-model="brandSearch" class="input-with-select">
            <el-select @change="editStatus" v-model="selectStatus" slot="prepend" placeholder="审核状态">
              <el-option label="重置" value="3"></el-option>
              <el-option label="审核未通过" value="0"></el-option>
              <el-option label="已审核" value="1"></el-option>
              <el-option label="审核中" value="2"></el-option>
            </el-select>
            <el-button @click="searchBrandName" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="序号" width="55"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" width="120"></el-table-column>
        <!--<el-table-column label="品牌LOGO" width="120">-->
        <!--<template slot-scope="scope">-->
        <!--<img :src="scope.row.logo" style="width: 120px;height: 50px">-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="审核状态" width="200">
          <template slot-scope="scope">
            <p>
              <span v-if="scope.row.status === 0">审核未通过</span>
              <span v-if="scope.row.status === 1">已审核</span>
              <span v-if="scope.row.status === 2">审核中</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 1">
              <el-button @click="examine(scope.$index, scope.row)" type="primary" size="mini">查看</el-button>
            </div>
            <div v-if="scope.row.status === 2">
              <el-button @click="cancel(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
            </div>
            <div v-if="scope.row.status === 0">
              <el-button @click="reapply(scope.$index, scope.row)" type="warning" size="mini">重新申请</el-button>
              <el-button @click="cancelApply(scope.$index, scope.row)" type="danger" size="mini">取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="delAllBtn">
        <el-button v-show="showCheckBox" @click="deleteAll" type="danger">全部取消</el-button>
      </div>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="parseInt(pageSize)" layout="total, prev, pager, next, jumper" :total="parseInt(total)"></el-pagination>
      </div>


      <el-dialog title="当前品牌信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div class="brand_info">
          <div class="brand_info_item">
            <p>品牌名称：</p>
            <div>{{ dialogBrandName }}</div>
          </div>
          <div class="brand_info_item">
            <p>品牌LOGO：</p>
            <img :src="dialogBrandLogo" style="width: 200px;height: 200px">
          </div>
          <div class="brand_info_item">
            <p>品牌简介：</p>
            <div>{{ dialogBrandAbout }}</div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="重新申请品牌" :visible.sync="reDialogVisible" width="30%" :before-close="handleClose">
        <div class="reBrand_info">
          <div class="reBrand_info_item">
            <p>品牌名称：</p>
            <el-input :value="editBrandName" v-model="editBrandName" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="reBrand_info_item">
            <p>品牌LOGO：</p>
            <img :src="editBrandLogo" style="width: 200px;height: 200px">
          </div>
          <div class="reBrand_info_item">
            <p>品牌简介：</p>
            <el-input resize="none" type="textarea" :rows="3" placeholder="请输入品牌简介" v-model="editBrandAbout"></el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitEditBrandInfo">提 交</el-button>
        </span>
      </el-dialog>



    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      tableData: [],
      multipleSelection: [],
      logoUrl:'',
      brandSearch:'',
      selectStatus:'',
      currentPage:1,//当前页
      pageSize:'',//每页条数
      total:'',//共有多少条数据
      brandID:[],
      showCheckBox:false,
      dialogVisible: false,
      dialogBrandName:'',
      dialogBrandLogo:'',
      dialogBrandAbout:'',
      reDialogVisible:false,
      editBrandName:'',
      editBrandLogo:'',
      editBrandAbout:'',
      submitID:''
    }
  },
  created(){
    this.filter('','','');
    if (!this.total){
      this.total = 0;
    }
  },
  methods:{
//    全删除
    deleteAll(){
      this.deleteMore(this.brandID);
    },
//    品牌列表CheckBox全选   传索引值
    handleSelectionChange(val) {
//      console.log(val)
      val.forEach((currentValue) => {
        this.brandID.push(currentValue.id)
      })
    },
//    查看操作
    examine(index, row){
      this.searchBrandDet(row.id);
      this.dialogVisible = true
    },
//    取消审核操作
    cancel(index,row){
      this.cancelBrand(row.id);
    },
//    重新审核点击查看操作
    reapply(index,row){
      this.searchBrandDet(row.id);
      this.submitID = row.id;
      this.reDialogVisible = true;
    },
//    重新审核提交操作
    submitEditBrandInfo(){
      this.reSubmit();
      this.reDialogVisible = false;
    },
//    取消重新申请
    cancelApply(index,row){
      this.cancelBrand(row.id);
    },
    //    根据品牌名称进行筛选
    searchBrandName(){
      if (this.brandSearch === ''){
        this.filter('','','');
      }else{
        this.filter('','',this.brandSearch);
      }

    },
//    切换审核状态
    editStatus(){
      if (this.selectStatus === '3'){
        this.showCheckBox = false;
        this.filter('','','');
      }else if(this.selectStatus === '1'){
        this.showCheckBox = false;
        this.filter('',this.selectStatus,'');
      }else{
        this.showCheckBox = true;
        this.filter('',this.selectStatus,'');
      }
    },
//    点击或直接前往某页
    handleCurrentChange(val) {
      this.filter(val,this.selectStatus,'');
      console.log(`当前页: ${val}`);
    },
//    筛选函数  第一个参数当前页  当二个参数审核状态  第三个参数  品牌名称
    filter(current_page,the_status,the_brandName){
      this.$axios.get('/brandrequest/selectByExample?pageNum=' + current_page + '&status=' + the_status + '&brandName=' + the_brandName)
        .then((res) => {
          let brandData = JSON.parse(res.data.data);
          this.tableData = brandData.rows;
          this.total = brandData.total;
          this.pageSize = brandData.pageSize;
        }).catch(() => {
        console.log("请求品牌列表失败");
      })
    },
//    查看品牌详情函数
    searchBrandDet(brandID){
      this.$axios.get('/brandrequest/selectByPrimaryKeyadmin.ajax?id=' + brandID)
        .then((res) => {
//          console.log(res)
          let myData = JSON.parse(res.data.data);
//          console.log(myData)
          this.dialogBrandName = myData.brandName;
          this.dialogBrandLogo = myData.logo;
          this.dialogBrandAbout = myData.information;
          this.editBrandName = myData.brandName;
          this.editBrandLogo = myData.logo;
          this.editBrandAbout = myData.information;
        }).catch(() => {
        console.log("查看操作失败");
      })
    },
//    重新审核品牌函数
    reAudit(brandID){
      this.$axios.get('/brandrequest/updateStatus?type=ALREADYAUDIT&id=' + brandID)
        .then((res) => {
//          console.log(res)
          this.$router.go(0);
        }).catch(() => {
        console.log("重新申请操作失败");
      })
    },
//    取消审核品牌函数
    cancelBrand(brandID){
      this.$axios.get('/brand/deletebrand?id=' + brandID)
        .then((res) => {
//          console.log(res)
          this.$router.go(0)
        }).catch(() => {
        console.log("取消审核操作失败");
      })
    },
//    多选删除
    deleteMore(brandID){
      this.$axios.get('/brandrequest/deleteByExample?ids=' + brandID)
        .then((res) => {
          this.$router.go(0);
        }).catch(() => {
        console.log("取消审核操作失败");
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    reSubmit(){
      let reqParams = {
        id:this.submitID,
        brandName:this.editBrandName,
        logo:this.editBrandLogo,
        information:this.editBrandAbout
      }
      this.$axios.post('/brand/updatebrand.ajax',reqParams)
        .then((res) => {
          this.reAudit(this.submitID);
        }).catch(() => {
        console.log("修改失败")
      })
    }
  }
}
</script>

<style>
  .brandList{
    margin-top: 10px;
  }
  .brandList .el-table{
    text-align: center;
  }
  .brandList .has-gutter tr th{
    text-align: center;
  }
  .setBrand_wrapper_item{
    text-align: center;
  }
  .setBrand_wrapper_item .el-input-group__prepend{
    width: 80px;
  }
  .setBrand_wrapper_item .input-with-select{
    width: 500px;
  }
  .delAllBtn{
    text-align: right;
    margin: 10px 210px 0 0;
  }
  .pagination{
    margin-top: 10px;
    text-align: center;
  }
  .brand_info_item,
  .reBrand_info_item{
    overflow: hidden;
    margin: 10px 0;
  }
  .reBrand_info_item{
    margin-left: 50px;
  }
  .brand_info_item p,
  .reBrand_info_item p{
    float: left;
    width: 85px;
    text-align: right;
  }
  .reBrand_info_item p{
    line-height: 40px;
  }
  .reBrand_info_item .el-input{
    float: left;
    width: 300px;
  }
  .reBrand_info_item .el-textarea{
    float: left;
    width: 300px;
  }
  .el-pagination__editor.el-input .el-input__inner {
    height: 28px;
    width: 46px;
}
.input-with-select .el-select>.el-input{
  width: 120px;
}
.input-with-select .el-input__inner{
  width: 322px;
}
</style>
