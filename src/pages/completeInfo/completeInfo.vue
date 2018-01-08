<template>
    <div class="completeInfo_wrapper">
      <!-- 完善企业信息 -->
      <div class="companyInfo">
        <h1>①请您完善企业信息</h1>
        <div class="companyInfo_item">
          <p>企业名称：</p>
          <el-input :value="companyName" v-model="companyName" :disabled="true"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>纳税人识别号：</p>
          <el-input :value="creditCode" v-model="creditCode" :disabled="true"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>法人：</p>
          <el-input placeholder="请输入法人姓名" v-model="legalPerson"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司固定电话：</p>
          <el-input placeholder="请输入公司固定电话" v-model="fixedLine"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司传真：</p>
          <el-input placeholder="请输入公司传真" v-model="fax"></el-input>
        </div>
        <div class="companyInfo_item special">
          <p>所属行业：</p>
          <el-select v-model="industry" placeholder="请选择行业">
            <el-option v-for="item in industries" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="companyInfo_item special">
          <p>公司注册地址：</p>
          <linkage :PRO="nullPro" :CITY="nullCity" :AREA="nullArea" :REC="0" @getAreaId="getRegArea"></linkage>
          <el-input class="regRoad" placeholder="请输入街道地址" v-model="comRegAddrDetail"></el-input>
        </div>
        <div class="companyInfo_item special">
          <p>办公地址：</p>
          <linkage :PRO="nullPro" :CITY="nullCity" :AREA="nullArea" :REC="0" @getAreaId="getWorkArea"></linkage>
          <el-input class="workRoad" placeholder="请输入街道地址" v-model="workAddrDetail"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>公司营业执照：</p>
          <businessLicense :theAction="completeAction" @getOnePic="getLicense"></businessLicense>
        </div>
        <div class="companyInfo_item special">
          <p>供货范围：</p>
          <el-select v-model="supplyScope" placeholder="请选择供货范围">
            <el-option v-for="item in supplyScopes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="companyInfo_item">
          <p>开户行名称：</p>
          <el-input placeholder="请输入开户行名称" v-model="bankName"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>开户行账号：</p>
          <el-input placeholder="请输入开户行账号" v-model="bankAccount"></el-input>
        </div>
        <div class="companyInfo_item">
          <p>开户行信息：</p>
          <el-input placeholder="请输入开户行信息" v-model="bankInfo"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>其他附件：</p>
          <others :theAction="completeAction" @getMorePics="getOthers"></others>
        </div>
      </div>
      <!-- 完善个人信息 -->
      <div class="personalInfo">
        <h1>②请您完善个人信息</h1>
        <div class="personalInfo_item">
          <p>联系人姓名：</p>
          <el-input placeholder="请输入联系人姓名" v-model="linkMan"></el-input>
        </div>
        <div class="personalInfo_item" style="line-height: 42px">
          <p>性别：</p>
          <el-radio v-model="gender" label="1">男</el-radio>
          <el-radio v-model="gender" label="2">女</el-radio>
        </div>
        <div class="personalInfo_item">
          <p>职务：</p>
          <el-input placeholder="请输入职务" v-model="duty"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>手机号：</p>
          <el-input :value="personalTel" v-model="personalTel" disabled></el-input>
        </div>
        <div class="personalInfo_item">
          <p>办公电话：</p>
          <el-input placeholder="请输入办公电话" v-model="tel"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>邮箱：</p>
          <el-input placeholder="请输入邮箱" v-model="email"></el-input>
        </div>
        <div class="personalInfo_item">
          <p>QQ号码：</p>
          <el-input placeholder="请输入QQ号码" v-model="qq"></el-input>
        </div>
        <!--<div class="personalInfo_item">-->
          <!--<p>微信：</p>-->
          <!--<el-input placeholder="请输入微信号码" v-model="wc"></el-input>-->
        <!--</div>-->
      </div>
      <div class="control">
        <div><a href="#" @click="submitInfo">提交</a></div>
        <div><a href="#">取消</a></div>
      </div>
    </div>
</template>

<script>
  import linkage from '../../components/linkage/linkage.vue'
  import businessLicense from '../../components/upload/uploadOnePic.vue'
  import others from '../../components/upload/uploadMorePics.vue'
export default {
    components:{
      linkage,
      businessLicense,
      others
    },
  data(){
    return {
      completeAction:'/entanduser/upload.ajax',
      //省市区父组件向子组件传递的空参数
      nullPro:'',
      nullCity:'',
      nullArea:'',
//      完善信息所需参数
      companyName:'',
      creditCode:'',
      legalPerson:'',
      fixedLine:'',
      fax:'',
      comRegAddrDetail:'',
      workAddrDetail:'',
      bankName:'',
      bankAccount:'',
      bankInfo:'',
      linkMan:'',
      gender:'1',
      duty:'',
      personalTel:'',
      tel:'',
      email:'',
      qq:'',
      wc:'',
      licenseUrlArr:'',
      otherUrlArr:[],
      industries: [
        {value: '', label: ''},
        {value: '', label: ''},
        {value: '', label: ''},
        {value: '', label: ''}
      ],
      supplyScopes: [
        {value: '', label: ''},
        {value: '', label: ''},
        {value: '', label: ''}
      ],
      industry: '',//      所属行业
      supplyScope:'',//      供货范围
      regAreaValue:'',//      注册地址所需信息
      workAreaValue:'',//      办公地址所需信息
    }
  },
  created(){
//    请求所属行业下拉列表数据
    this.$axios.get('/entanduser/gettypei.ajax')
      .then((res) => {
      let INDUSTRY = JSON.parse(res.data.data);
      for (let i = 0;i<INDUSTRY.length;i++){
        this.industries[i].value = INDUSTRY[i].id;
        this.industries[i].label = INDUSTRY[i].valuei;
      }
//        console.log(INDUSTRY);
      }).catch(() => {
        console.log("请求失败")
    });
//    请求供货范围下拉列表数据
    this.$axios.get('/entanduser/getEntityIndustryList.ajax')
      .then((res) => {
        let INDUSTRY = JSON.parse(res.data.data);
        for (let i = 0;i<INDUSTRY.length;i++){
          this.supplyScopes[i].value = INDUSTRY[i].id;
          this.supplyScopes[i].label = INDUSTRY[i].name;
        }
//        console.log(INDUSTRY);
      }).catch(() => {
      console.log("请求失败")
    });
//    请求企业名称 社会统一信用代码 手机号
    this.$axios.get('/entanduser/getEntAndUser.ajax')
      .then((res) => {
      let info = JSON.parse(res.data.data);
      this.companyName = info.afwindEnterpriseAlter.enterpriseName;
      this.creditCode = info.afwindEnterpriseAlter.creditCode;
      this.personalTel = info.mobile;
//        console.log(info)
      }).catch(() => {
        console.log("请求失败")
    })
  },
  methods:{
//    获取公司注册地址省市区的区id
    getRegArea(AreaValue){
      this.regAreaValue = AreaValue;
      console.log(this.regAreaValue);
    },
//    获取公司办公地址省市区的区id
    getWorkArea(AreaValue){
      this.workAreaValue = AreaValue;
      console.log(this.workAreaValue)
    },
//    获取公司营业执照
    getLicense(licenseUrl){
      this.licenseUrl = licenseUrl;
    },
//    获取附件
    getOthers(otherUrlArr){
      this.otherUrlArr = otherUrlArr;
    },
//    提交完善信息按钮
    submitInfo(){
      let reqParams = {
        afwindEnterpriseAlter:{
          owner:this.legalPerson,//法人
          phone:this.fixedLine,//公司固定电话
          fax:this.fax,//传真
          typei:this.industry,//所属行业
          addresseList:[
            {
              regionId:this.regAreaValue,//公司注册地址省市区的区id
              address:this.comRegAddrDetail,//公司详细的注册地址
              typei:'1'
            },
            {
              regionId:this.workAreaValue,//公司办公地址省市区的区id
              address:this.workAddrDetail,//公司详细的办公地址
              typei:'2'
            }
          ],
          enterprisePicsList:[
            {
              urlList:this.licenseUrlArr.reverse().slice(0,1),//公司营业执照
              typei:'1'
            },
            {
              urlList:this.otherUrlArr.reverse().slice(0,5),//公司附件
              typei:'2'
            }
          ],
          entityIndustry:this.supplyScope,//供货范围
          altAccountList:[
            {
              bankName:this.bankName,//银行名称
              account:this.bankAccount,//银行账号
              bankNemark:this.bankInfo//银行信息
            }
          ],
        },
        realname:this.linkMan,//联系人姓名
        sex:this.gender,//性别
        userPost:this.duty,//职务
        telphone:this.tel,//办公电话
        email:this.email,//右键
        qqCode:this.qq//qq号码
      }
      this.$axios.post('/entanduser/updateEntAndUser.ajax',reqParams)
        .then((res) => {
          console.log(res)
        }).catch(() => {
          console.log('完善信息失败');
      })
    }
  }
}
</script>

<style>
  .completeInfo_wrapper{
    width: 100%;
    padding-bottom: 1.5%;
    background: #ededed;
  }
  .companyInfo,.personalInfo{
    margin: 0 auto;
    padding-top: 2%;
    width: 70.5%;
  }
  .companyInfo h1,.personalInfo h1{
    text-align: center;
    font-size: 18px;
    font-weight: bolder;
    margin-bottom: 1%;
  }
  .companyInfo_item,.personalInfo_item{
    overflow: hidden;
    padding: 0.2% 0;
    margin-left: 10%;
  }
  .companyInfo_item p,.personalInfo_item p{
    float: left;
    width: 14.4%;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  .companyInfo_item .el-input,.personalInfo_item .el-input{
    float: left;
    width: 24.7%;
  }
  .special .el-select{
    width: 24.7%;
  }
  .special .el-input{
    width: 100%;
  }
  .companyInfo_item .el-input .el-input__inner,.personalInfo_item .el-input .el-input__inner{
    text-align: center;
    height: 35px;
  }
  .regRoad input,.workRoad input{
    margin-left: 14.4%;
    width: 49.8%;
  }
  .control{
    margin: 0 auto;
    overflow: hidden;
    margin-top: 1%;
    width: 18%;
    height: 40px;
  }
  .control div a{
    float: left;
    display: inline-block;
    margin: 0 10px;
    border-radius: 10px;
    color: white;
    text-align: center;
    line-height: 40px;
    width: 41%;
    height: 40px;
    background: dodgerblue;
  }
  /*.el-upload__tip{*/
    /*height: 1%;*/
  /*}*/
  .el-upload-list__item{
    margin-left: 12.4%;
    width: 24.7%;
  }
  .upload-demo .el-icon-close:before{
    display: none;
  }
</style>



























