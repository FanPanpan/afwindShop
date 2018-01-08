<template>
  <div>
    <myHeader></myHeader>
    <div class="user_wrapper">
      <div class="user_asideMenu">
        <div class="menu_wrapper">
          <div class="personalCenter">个人中心</div>
          <el-row class="tac">
            <el-col :span="12">
              <el-menu class="el-menu-vertical-demo" :unique-opened=true :router="true" :default-openeds="defaultOpen" :default-active="defaultActive" @open="handleOpen" @close="handleClose" background-color="#C11A21" text-color="#FFF" active-text-color="#FFD6A4">
                <div v-for="outer in nav">
                  <el-submenu :index="outer.main">
                    <template slot="title">
                      <span>{{ outer.name }}</span>
                    </template>
                    <el-menu-item-group>
                      <div v-for="inner in outer.innerMenu">
                        <el-menu-item :index="inner.path">{{ inner.name }}</el-menu-item>
                      </div>
                    </el-menu-item-group>
                  </el-submenu>
                </div>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="user_right">
        <router-view></router-view>
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
      myHeader,
      myFooter
    },
    created(){
      let path = this.$route.path.split('/')[2];
      this.defaultOpen.push(path);
      this.defaultActive = path;
    },
    data(){
      return {
        defaultOpen:[],
        defaultActive:'',
        nav:[
          {name:'首页',main:'0',
          innerMenu:[
            {index:1,name:'用户中心',path:'main'}
          ]},
          {name:'基本信息',main:'1',
            innerMenu:[
              {index:1,name:'我的信息', path:'passed'},
              {index:2,name:'审核中的信息', path:'audit'},
            ]
          },
          {name:'商品管理',main:'2',
            innerMenu:[
              {index:1, name:'全部商品', path:'allProducts'},
              {index:2, name:'已上架商品', path:'onProducts'},
              {index:3, name:'未上架商品', path:'downProducts'},
              {index:4, name:'新增商品', path:'newProducts'},
              {index:5, name:'库存价格管理', path:'balanceProducts'},
              {index:6, name:'违规商品', path:'banProducts'},
            ]
          },
          {name:'账户管理', main:'3',
            innerMenu:[
              {index:1,name:'我的账户', path:'accountMag'}
            ]
          },
          {name:'订单管理', main:'4',
            innerMenu:[
              {index:1,name:'我的订单', path:'orderMag'}
            ]
          },
          {name:'结算管理', main:'5',
            innerMenu:[
              {index:1,name:'结算管理', path:'settleMag'}
            ]
          },
          {name:'品牌管理', main:'6',
            innerMenu:[
              {index:1, name:'品牌列表', path:'brandList'},
              {index:2, name:'新增品牌', path:'newBrand'},
            ]
          },
          {name:'店铺管理', main:'7',
            innerMenu:[
              {index:1,name:'新增店铺', path:'storeMag'},
            ]
          },
          {name:'运营管理', main:'8',
            innerMenu:[
              {index:1,name:'运营管理', path:'operationMag'}
            ]
          },
          {name:'供应链管理', main:'9',
            innerMenu:[
              {index:1,name:'供应链管理', path:'chainMag'}
            ]
          },
          ]
      }
    },
    methods: {
      handleOpen(key, keyPath) {
//        console.log(key);
//        console.log(keyPath);
      },
      handleClose(key, keyPath) {
//        console.log(key);
//        console.log(keyPath);
      }
    }
  }
</script>

<style>
  .user_wrapper{
    padding-top: 120px;
    padding-bottom: 92px;
    overflow: hidden;
    margin: 0 auto;
    width: 1220px;
  }
  .user_asideMenu{
    float: left;
    width: 206px;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
  }
  .user_right{
    float: left;
    margin-left: 10px;
  }
  .user_asideMenu .menu_wrapper .el-col{
    width: 208px;
  }
  .user_asideMenu .personalCenter{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .user_asideMenu .menu_wrapper .el-submenu__title{
    overflow: hidden;
    padding: 0 !important;
  }
  .user_asideMenu .menu_wrapper .el-submenu__title span{
    display: inline-block;
    width: 207px;
    height: 56px;
    text-align: center;
    font-size: 16px;
  }
  .user_asideMenu .menu_wrapper .el-menu-item{
    padding: 0 !important;
    text-align: center;
    font-size: 12px;
  }
  .user_asideMenu .menu_wrapper .el-menu-item a{
    display: inline-block;
    width: 207px;
    height: 50px;
  }
  .user_nav{
    overflow: hidden;
    width: 954px;
    background: white;
    /* border: 1px solid #dcdcdc; */
    /* border-radius: 8px; */
  }
  .nav_title{
    position: relative;
    padding-left: 20px;
    width: 874px;
    height: 60px;
    border-bottom: 1px solid #d4d4d4;
    /* border-radius:8px 8px 0 0; */
    line-height: 60px;
    /* background:linear-gradient(#fbfbfb, #ececec); */
  }
  .nav_title h1::before{
    content: '';
    display: block;
    position: absolute;
    top:0;
    left: 0;
    width: 10px;
    height: 95%;
    background:#ccc;
    border-radius: 2px;
  }
  /* basicInfo中的公共css */
  .account_detail .account_list,
  .account_detail .personal_list{
    margin:20px 0;
  }
  .account_detail .account_list>li,
  .account_detail .personal_list>li{
    width:80%;
    padding:6px 0;
    overflow:hidden;
  }
  .account_detail .account_list li div,
  .account_detail .personal_list li div{
    float:left;
    font-family: "Microsoft YaHei UI";
    padding:0 5px;
  }
  .account_detail .com_account_title,
  .account_detail .per_account_title{
    width:150px;
    text-align-last:right;
    display:inline-block;
    font-family: "Microsoft YaHei UI";
  }
  /* productMag中的公共css */
  .allProducts_filter{
    overflow: hidden;
  }
  .allProducts_filter .allProducts_item{
    float: left;
    overflow: hidden;
    width: 315px;
    padding: 10px 0;
  }
  .allProducts_filter .allProducts_item p{
    float: left;
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .allProducts_filter .allProducts_item .el-input{
    float: left;
    width: 220px;
  }
  .allProducts_filter .allProducts_item .el-input__inner{
    width: 220px;
  }
  .allProducts_filter .allProducts_item .el-date-editor{
    width: 220px;
  }
  .allProducts_filter .allProducts_item .el-range-separator{
    font-size: 12px;
  }
  .allProducts_filter .salePrice .el-input{
    width: 75px;
  }
  .allProducts_filter .salePrice .el-input__inner{
    width: 75px;
  }
  .allProducts_filter .allProducts_item .el-button{
    height: 20px;
    line-height: 0px;
    margin: 5px 0;
  }
  .allProducts_wrapper  .secondLevelFilter{
    margin-bottom: 10px;
  }
  allProducts_wrapper .allProducts_list .cell{
    text-align: center;
  }
  allProducts_wrapper .allProducts_list .has-gutter tr th{
    text-align: center;
  }
  allProducts_wrapper .allProducts_list .el-table--border td, .el-table--border th{
    border-right: none;
  }
  .el-table td, .el-table th.is-leaf{
    text-align: center;
  }
  .allProducts_pagination{
    margin-top: 10px;
    text-align: center;
  }
  .allProducts_pagination .el-input__inner{
    width: 46px;
  }
  .allProducts_filter .allProducts_item .el-date-editor .el-range-input{
    width: 38%;
  }
  /* basice页面 */
  .companyDialog .el-dialog{
    width: 60%;
  }
  .editComInfoList{
    overflow: hidden;
    width: 80%;
    margin: 0 auto;
  }
  .editComInfoList_item p,
  .editPerInfoList_item p{
    float: left;
    width: 130px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .editComInfoList_item{
    float: left;
    overflow: hidden;
    margin-bottom: 1%;
    width: 100%;
  }
  .editComInfoList_item p{
    float: left;
    width: 17%;
    height: 35px;
    line-height: 35px;
  }
  .editComInfoList_item .el-input{
    float: left;
    width: 27.23%;
    height: 35px;
  }
  .editComInfoList_item .el-input .el-input__inner{
    width: 100%;
    height: 35px;
  }
  .roadAddr{
    margin-left: 17%;
  }
  .editComInfoList_item .el-select{
    float: left;
    width: 27.23%;
    height: 35px;
  }
  .editComInfoList_item .el-select .el-input{
    width: 100%;
    height: 35px;
  }
  .editComInfoList_item .el-select .el-input .el-input__inner{
    width: 100%;
    height: 35px;
  }
  .editComInfoList_item .el-upload__tip{
    margin-left: 17%;
  }
  .editComInfoList_item .el-upload-list{
    margin-left: 17%;
    width: 40%;
  }
  .editComInfoList_item_control{
    margin-left: 37%;
    margin-top: 3%;
  }
  .personalDialog .el-dialog{
    width: 30%;
  }
  .editPerInfoList{
    overflow: hidden;
    width: 83%;
    margin: 0 auto;
    margin-left: 7%;
  }
  .editPerInfoList_item{
    float: left;
    overflow: hidden;
    width: 100%;
  }
  .editPerInfoList_item p{
    width: 30%;
    height: 35px;
    line-height: 35px;
    text-align: right;
  }
  .editPerInfoList_item .el-input{
    float: left;
    width: 53%;
    height: 35px;
  }
  .editPerInfoList_item .el-input .el-input__inner{
    height: 35px;
  }
  .editPerInfoList_item_control{
    margin-left: 30%;
    margin-top: 3%;
  }
  /*  */
  .editComInfoList_item .el-input,
  .editPerInfoList_item .el-input{
    float: left;
    width: 300px;
  }
  .editComInfoList_item .el-select{
    float: left;
  }
  .account_detail .personalDialog .el-dialog{
    width: 30%;
  }
  .account_detail .el-dialog__footer{
    text-align: center;
  }
  .account_detail .account_list{
    height: 500px;
    overflow: hidden;
  }
  .account_detail .personal_list{
    height: 110px;
  }
  .account_detail .account_list>li, .account_detail .personal_list>li{
    float: left;
    width: 40%;
  }
  .account_detail .account_list li:last-child{
    width: 100%;
  }
  .account_detail .account_list li div{
    padding: 0 5px 0 0;
  }
  .editPerInfoList_item p{
    width: 85px;
  }
  .editPerInfoList_item .el-input,
  .editPerInfoList_item .el-input__inner{
    width: 220px;
  }
</style>











































