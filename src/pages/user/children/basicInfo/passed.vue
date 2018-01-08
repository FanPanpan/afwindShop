<template>
    <div class="user_nav">
      <div class="nav_title">
        <h1>我的信息</h1>
      </div>
      <div class="account_detail">
        <ul class="account_list">
          <li v-for="item in comInfo">
            <div class="com_account_title">{{item.title}}</div>
            <div>
              <p v-if="item.content">{{item.content}}</p>
              <img v-if="item.photo" :src="item.photo" style="width: 200px;height: 200px">
              <div v-for="(photoDetails,index) in item.picture">
                <img v-if="photoDetails" :src="photoDetails" style="width:100px;height:100px;">
              </div>
            </div>
          </li>
        </ul>
        <div style="width: 126px;height: 40px;margin-left:160px">
          <el-button @click="editComInfo=true" type="primary">修改企业信息</el-button>
        </div>
        <!-- 修改企业信息弹框 -->
        <el-dialog class="companyDialog" :visible.sync="editComInfo" size="full" :before-close="handleClose">
          <div class="editComInfoList">
            <div class="editComInfoList_item">
              <p>企业名称：</p>
              <el-input disabled :value="companyName" v-model="companyName"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>纳税人识别号：</p>
              <el-input disabled :value="creditCode" v-model="creditCode"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>法人：</p>
              <el-input :value="legalPerson" v-model="legalPerson"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>公司固定电话：</p>
              <el-input :value="fixedLine" v-model="fixedLine"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>公司传真：</p>
              <el-input :value="fax" v-model="fax"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>所属行业：</p>
              <el-select v-model="industry">
                <el-option v-for="item in industries" :key="item.id" :label="item.valuei" :value="item.valuei"></el-option>
              </el-select>
            </div>
            <div class="editComInfoList_item">
              <p>公司注册地址：</p>
              <linkage :PRO="regpro" :CITY="regcity" :AREA="regarea" :REC="1" @getAreaId="getRegAddr"></linkage>
              <el-input class="roadAddr" :value="comRegAddrDetail" v-model="comRegAddrDetail"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>公司办公地址：</p>
              <linkage :PRO="workpro" :CITY="workcity" :AREA="workarea" :REC="2" @getAreaId="getWorkAddr"></linkage>
              <el-input class="roadAddr" :value="workAddrDetail" v-model="workAddrDetail"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>公司营业执照：</p>
              <businessLicense :onePic="onePic" @getOnePic="getLicense"></businessLicense>
            </div>
            <div class="editComInfoList_item">
              <p>供货范围：</p>
              <el-select v-model="supplyScope">
                <el-option v-for="item in supplyScopes" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </div>
            <div class="editComInfoList_item">
              <p>开户行名称：</p>
              <el-input :value="bankName" v-model="bankName"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>开户行账号：</p>
              <el-input :value="bankAccount" v-model="bankAccount"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>开户行信息：</p>
              <el-input :value="bankInfo" v-model="bankInfo"></el-input>
            </div>
            <div class="editComInfoList_item">
              <p>其他附件：</p>
              <others :morePics="morePics" @getMorePics="getOthers"></others>
            </div>
            <div class="editComInfoList_item">
              <div class="editComInfoList_item_control">
                <el-button @click="cancelEditcominfo" class="cancel" type="primary">取消</el-button>
                <el-tooltip placement="top">
                  <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                  <el-button type="primary" @click="editcominfo" class="ensure">提交</el-button>
                </el-tooltip>
              </div>
            </div>
          </div>

        </el-dialog>
      </div>
      <div class="account_detail">
        <ul class="personal_list">
          <li v-for="item in perInfo">
            <div class="per_account_title">{{item.title}}</div>
            <div>
              <p>{{item.content}}</p>
            </div>
          </li>
        </ul>
        <div style="width: 126px;height: 40px;margin-left: 160px;margin-bottom: 20px">
          <el-button @click="editPerInfoBtn=true" type="primary">修改个人信息</el-button>
        </div>
        <!-- 修改个人信息弹框 -->
        <el-dialog class="personalDialog" :visible.sync="editPerInfoBtn" size="tiny" :before-close="handleClose">
          <div class="editPerInfoList">
            <div class="editPerInfoList_item">
              <p>联系人姓名：</p>
              <el-input :value="linkMan" v-model="linkMan"></el-input>
            </div>
            <div style="line-height: 35px" class="editPerInfoList_item">
              <p>性别：</p>
              <el-radio v-model="gender" label="1">男</el-radio>
              <el-radio v-model="gender" label="2">女</el-radio>
            </div>
            <div class="editPerInfoList_item">
              <p>职务：</p>
              <el-input :value="duty" v-model="duty"></el-input>
            </div>
            <div class="editPerInfoList_item">
              <p>手机号：</p>
              <el-input disabled :value="personalTel" v-model="personalTel"></el-input>
            </div>
            <div class="editPerInfoList_item">
              <p>办公电话：</p>
              <el-input :value="tel" v-model="tel"></el-input>
            </div>
            <div class="editPerInfoList_item">
              <p>邮箱：</p>
              <el-input :value="email" v-model="email"></el-input>
            </div>
            <div class="editPerInfoList_item">
              <p>QQ号码：</p>
              <el-input :value="qq" v-model="qq"></el-input>
            </div>
            <div class="editPerInfoList_item">
              <div class="editPerInfoList_item_control">
                <el-button @click="editPerInfoBtn = false" class="cancel" type="primary">取消</el-button>
                <el-tooltip placement="top">
                  <div slot="content" style="font-size:16px;">您所修改的信息<br/>需要审核三天</div>
                  <el-button type="primary" @click="editperinfo" class="ensure">提交</el-button>
                </el-tooltip>
              </div>
            </div>
          </div>

        </el-dialog>
      </div>
    </div>
</template>

<script>
  import linkage from '../../../../components/linkage/linkage.vue'
  import businessLicense from '../../../../components/upload/uploadOnePic.vue'
  import others from '../../../../components/upload/uploadMorePics.vue'
export default {
  components:{
    linkage,
    businessLicense,
    others
  },
  data(){
    return {
      onePic: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      morePics: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      //企业信息数据集合
      comInfo:[
        {"title":'企业名称:',"content":''},
        {"title":"纳税人识别号:","content":""},
        {"title":"法人:","content":""},
        {"title":"公司固定电话:","content":""},
        {"title":"公司传真:","content":""},
        {"title":"所属行业:","content":""},
        {"title":"公司注册地址:","content":""},
        {"title":"办公地址:","content":""},
        {"title":"开户行账号:","content":""},
         {"title":"开户行信息:","content":""},
         {"title":"开户行名称:","content":""},
        {"title":"供货范围:","content":""},
         {"title":"公司营业执照:","photo":''},
        {"title":"其他附件:","picture":[]},
      ],
      //个人信息数据集合
      perInfo:[
        {"title":"联系人姓名:","content":""},
        {"title":"性别:","content":""},
        {"title":"职务:","content":""},
        {"title":"手机号:","content":""},
        {"title":"办公电话:","content":""},
        {"title":"邮箱:","content":""},
        {"title":"QQ号码:","content":""}
      ],
      //控制修改  企业/个人  信息参数
      editComInfo:false,
      editPerInfoBtn:false,
      //修改企业信息参数
      companyName:'',
      creditCode:'',
      legalPerson:'',
      fixedLine:'',
      fax:'',
      industries: [],
      industry: '',
      supplyScopes: [],
      supplyScope: '',
      comRegAddrDetail:'',
      workAddrDetail:'',
      license:'',
      bankName:'',
      bankAccount:'',
      bankInfo:'',
      regAreaValue:'',
      workAreaValue:'',
      others:[],
      licenseUrlArr:[],
      otherUrlArr:[],
      //修改个人信息参数
      linkMan:'',
      gender:'',
      duty:'',
      personalTel:'',
      tel:'',
      email:'',
      qq:'',
//    省市区父组件传子组件默认参数
      regpro:'',
      regcity:'',
      regarea:'',
      workpro:'',
      workcity:'',
      workarea:'',
    }
  },
  created() {
    this.$axios.get('/entanduser/getEntAndUser.ajax?typei=all')
      .then((res) => {
        let myData = JSON.parse(res.data.data);
        console.log(myData)
//        展示企业信息
        this.comInfo[0].content = myData.afwindEnterprise.enterpriseName;
        this.comInfo[1].content = myData.afwindEnterprise.creditCode;
        this.comInfo[2].content = myData.afwindEnterprise.owner;
        this.comInfo[3].content = myData.afwindEnterprise.phone;
        this.comInfo[4].content = myData.afwindEnterprise.fax;
        this.comInfo[5].content = myData.afwindEnterprise.config.valuei;
        for (let i = 0;i<myData.afwindEnterprise.addresseList.length;i++){
          if (myData.afwindEnterprise.addresseList[i].typei === '1'){
            this.comInfo[6].content = myData.afwindEnterprise.addresseList[i].afwindRegion.fullName + myData.afwindEnterpriseAlter.addresseList[i].address;
            this.comRegAddrDetail = myData.afwindEnterprise.addresseList[i].address;
          }else if(myData.afwindEnterprise.addresseList[i].typei === '2'){
            this.comInfo[7].content = myData.afwindEnterprise.addresseList[i].afwindRegion.fullName + myData.afwindEnterpriseAlter.addresseList[i].address;
            this.workAddrDetail = myData.afwindEnterprise.addresseList[i].address;
          }
        }
        for (let i =0;i<myData.afwindEnterprise.enterprisePicsList.length;i++){
          if (myData.afwindEnterprise.enterprisePicsList[i].typei === '1'){
            this.comInfo[12].photo = myData.afwindEnterprise.enterprisePicsList[i].url;
            this.license = myData.afwindEnterprise.enterprisePicsList[i].url;
          }else if(myData.afwindEnterprise.enterprisePicsList[i].typei === '2'){
            this.comInfo[13].picture.push(myData.afwindEnterprise.enterprisePicsList[i].url);
            this.others.push(myData.afwindEnterprise.enterprisePicsList[i].url);
          }
        }
        this.comInfo[11].content = myData.afwindEnterprise.categorie.name;
        this.comInfo[10].content = myData.afwindEnterprise.accountList[0].bankName;
        this.comInfo[8].content = myData.afwindEnterprise.accountList[0].account;
        this.comInfo[9].content = myData.afwindEnterprise.accountList[0].bankRemark;
//        展示个人信息
        this.perInfo[0].content = myData.realname;
        if (myData.sex === '1'){//性别
          this.perInfo[1].content = '男';
          this.gender = '1';
        }else if(myData.sex === '2'){
          this.perInfo[1].content = '女';
          this.gender = '2';
        }
        this.perInfo[2].content = myData.userPost;
        this.perInfo[3].content = myData.mobile;
        this.perInfo[4].content = myData.telphone;
        this.perInfo[5].content = myData.email;
        this.perInfo[6].content = myData.qqCode;
//        修改企业信息回显内容  其中企业注册，工作地址，联系人性别，营业执照，其他附件在上述循环当中
        this.companyName = myData.afwindEnterprise.enterpriseName;
        this.creditCode = myData.afwindEnterprise.creditCode;
        this.legalPerson = myData.afwindEnterprise.owner;
        this.fixedLine = myData.afwindEnterprise.phone;
        this.fax = myData.afwindEnterprise.fax;
        this.industry = myData.afwindEnterprise.config.valuei;
        this.supplyScope = myData.afwindEnterprise.categorie.name;
        this.bankName = myData.afwindEnterprise.accountList[0].bankName;
        this.bankAccount =  myData.afwindEnterprise.accountList[0].account;
        this.bankInfo = myData.afwindEnterprise.accountList[0].bankRemark;
//        修改个人信息回显内容
        this.linkMan = myData.realname;
        this.duty = myData.userPost;
        this.personalTel = myData.mobile;
        this.tel = myData.telphone;
        this.email = myData.email;
        this.qq = myData.qqCode;
      }).catch(() => {
        console.log("请求我的资料失败")
    }),
    //    请求所属行业下拉列表数据
    this.$axios.get('/entanduser/gettypei.ajax')
      .then((res) => {
        let INDUSTRY = JSON.parse(res.data.data);
        this.industries = INDUSTRY;
      }).catch(() => {
      console.log("请求行业下拉列表失败")
    });
    //    请求供货范围下拉列表数据
    this.$axios.get('/entanduser/getEntityIndustryList.ajax')
      .then((res) => {
        let INDUSTRY = JSON.parse(res.data.data);
        this.supplyScopes = INDUSTRY;
      }).catch(() => {
      console.log("请求供货范围失败")
    });
  },
  methods:{
//    关闭弹框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
//      获取公司注册地址
    getRegAddr(regarea){
      this.regAreaValue = regarea;
    },
//      获取公司工作地址
    getWorkAddr(workarea){
      this.workAreaValue = workarea;
    },
//    获取公司营业执照
    getLicense(licenseUrlArr){
      this.licenseUrlArr = licenseUrlArr;
    },
//    获取附件
    getOthers(otherUrlArr){
      this.otherUrlArr = otherUrlArr;
    },
//      修改企业信息
    editcominfo(){
      this.editComInfo = false;
      let reqParams = {
        afwindEnterprise:{
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
          accountList:[
            {
              bankName:this.bankName,//银行名称
              account:this.bankAccount,//银行账号
              bankNemark:this.bankInfo//银行信息
            }
          ],
        }
      }
      this.$axios.post('/entanduser/updateEnt.ajax',reqParams)
        .then((res) => {
          console.log(res)
//            this.$router.go(0);
        }).catch(() => {
        console.log("更改企业信息失败")
      })
    },
//  取消修改企业信息
    cancelEditcominfo(){
      this.editComInfo = false;
    },
//      修改个人信息
    editperinfo(){
      this.editPerInfoBtn = false;
      let reqParams = {
        realname:this.linkMan,//联系人姓名
        sex:this.gender,//性别
        userPost:this.duty,//职务
        telphone:this.tel,//办公电话
        email:this.email,//右键
        qqCode:this.qq//qq号码
      }
      this.$axios.post('/entanduser/updateUser.ajax',reqParams)
        .then((res) => {
          console.log(res)
        }).catch(() => {
        console.log("修改个人信息失败")
      })
    },
//      取消修改个人信息
    cancelEditperinfo(){
      this.editPerInfoBtn = false;
    },
  }
}
</script>

<style>


</style>
