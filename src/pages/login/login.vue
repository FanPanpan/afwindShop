<template>
    <div class="wrapper">
      <!-- 登录 -->
      <div class="login_main" v-show="!loginOrReg">
        <div class="login_top">
          <div class="login_logo">
            <img src="../../assets/logo/logo.png">
          </div>
          <h1>欢迎登录爱风商城</h1>
        </div>
        <div class="login_bottom">
          <div class="login_info">
            <div class="login_info_item">
              <div style="margin: 0 auto;width: 300px">
                <p style="height: 16px;color: red;"><span v-show="loginUsernameTip"><i class="el-icon-warning"></i><span>{{ loginUsernameTip }}</span></span></p>
                <el-input @input="loginUsernameCheck" v-model="loginUsername" placeholder="请输入用户名"></el-input>
              </div>
              <div style="margin: 0 auto;width: 300px">
                <p style="height: 16px;color: red;"><span v-show="loginPwdTip"><i class="el-icon-warning"></i><span>{{ loginPwdTip }}</span></span></p>
                <el-input @input="loginPwdCheck" type="password" v-model="loginPassword" placeholder="请输入密码"></el-input>
              </div>
              <div class="vertifyInfo">
                <p style="height: 16px;"><span></span></p>
                <el-input v-model="vertify" placeholder="请输入验证码"></el-input>
                <div class="vertifyImg">
                  <img @click="toggleVerify" :src="vertifySrc">
                </div>
              </div>
              <div class="register_enter"><span @click="showReg" style="color: #169BD5;font-size: 14px;cursor: pointer">注册爱风商城</span></div>
              <div class="loginBtn" @click="login"><el-button :disabled="loginUsernameStatus===false&&loginPwdStatus===false?false:true" type="primary">登录</el-button></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 注册 -->
      <div class="reg_main" v-show="loginOrReg">
        <div class="reg_top">
          <h1>欢迎注册爱风商城</h1>
        </div>
        <div class="reg_bottom">
          <div class="regInfo">
            <div class="regInfoItem">
              <div style="text-align: center;margin: 15px 0 5px 0">
                <el-radio v-model="role" label="1">采购商</el-radio>
                <el-radio v-model="role" label="2">供应商</el-radio>
              </div>
              <div>
                <p style="color: red;height: 16px"><span v-show="companyTip"><i class="el-icon-warning"></i><span>{{ companyTip }}</span></span></p>
                <el-input @input="comNameCheck" v-model="companyName" placeholder="请输入公司名称"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="creditCodeTip"><i class="el-icon-warning"></i><span>{{ creditCodeTip }}</span></span></p>
                <el-input @input="creditCodeCheck" v-model="creditCode" placeholder="纳税人识别号"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="usernameTip"><i class="el-icon-warning"></i><span>{{ usernameTip }}</span></span></p>
                <el-input @input="usernameCheck" v-model="regUsername" placeholder="请输入用户名"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="pwdTip"><i class="el-icon-warning"></i><span>{{ pwdTip }}</span></span></p>
                <el-input @input="pwdCheck" type="password" v-model="regPassword" placeholder="请输入密码"></el-input>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="confirmPwdTip"><i class="el-icon-warning"></i><span>{{ confirmPwdTip }}</span></span></p>
                <el-input @input="confirmPwdCheck" type="password" v-model="confirmPassword" placeholder="确认密码"></el-input>
              </div>
              <div class="vertify_wrapper">
                <p style="color:red;height: 16px"><span v-show="telTip"><i class="el-icon-warning"></i><span>{{ telTip }}</span></span></p>
                <el-input @input="telCheck" v-model="tel" placeholder="请输入手机号码"></el-input>
                <el-button @click="getTelCode" :disabled="getTelCodeActive">
                  <span v-show="isShowVertify">{{ second }}秒后可重新获取</span><span v-show="!isShowVertify">获取验证码</span>
                </el-button>
              </div>
              <div>
                <p style="color:red;height: 16px"><span v-show="telVertifyTip"><i class="el-icon-warning"></i><span>{{ telVertifyTip }}</span></span></p>
                <el-input @input="telvertifyCheck" v-model="telVertify" placeholder="请输入手机验证码"></el-input>
              </div>
              <div style="text-align: center;margin: 5px 0">
                <protocol style="z-index: 100" @regstatus="editstatus"></protocol>
              </div>
              <div class="regBtn">
                <el-button :plain="true" type="primary" @click="register" :disabled="companyStatus===false&&creditCodeStatus===false&&usernameStatus===false&&pwdStatus===false&&confirmPwdStatus===false&&telStatus===false&&telVertifyStatus===false&&regdisable===false?false:true">注册</el-button>
                <el-button :plain="true" type="primary" @click="cancelReg">取消</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import protocol from '../../components/protocol/protocol.vue'
export default {
    components:{
      protocol
    },
  data(){
    return {
//      登录所需参数
      loginUsername:'',
      loginPassword:'',
      vertify:'',
      vertifySrc:'',
//      注册所需参数
      role:'1',
      companyName:'',
      creditCode:'',
      regUsername:'',
      regPassword:'',
      confirmPassword:'',
      tel:'',
      telVertify:'',
//      其他参数
      loginOrReg:true,
      second:10,
      isShowVertify:false,
      regdisable:false,
      getTelCodeActive:true,
//      登录验证提示
      loginUsernameTip:'',
      loginUsernameStatus:true,
      loginPwdTip:'',
      loginPwdStatus:true,
//      注册验证提示
      companyTip:'',
      companyStatus:true,
      creditCodeTip:'',
      creditCodeStatus:true,
      usernameTip:'',
      usernameStatus:true,
      pwdTip:'',
      pwdStatus:true,
      confirmPwdTip:'',
      confirmPwdStatus:true,
      telTip:'',
      telStatus:true,
      telVertifyTip:'',
      telVertifyStatus:true
    }
  },
  created(){
    this.getLoginCode();
  },
  methods:{
//    点击更换登录页面图片验证码
    toggleVerify() {
      let timestamp = (+new Date());
      this.vertifySrc = '/xuan/verifyCode.ajax?typei=LOGIN&useful='+timestamp;
    },
//    验证用户名是否为空或格式不正确
    loginUsernameCheck(){
      let status;
      if (this.loginUsername.length < 6){
        status = false;
        this.loginUsernameTip = '';
        this.loginUsernameStatus = true;
      }
      if (this.loginUsername.length >= 6){
        if (!/^[a-zA-z][a-zA-Z0-9_]{5,11}$/.test(this.loginUsername)){
          status = false;
          this.loginUsernameTip = '您输入的用户名格式不正确';
          this.loginUsernameStatus = true;
        }else {
          status = true;
          this.loginUsernameTip = '';
          this.loginUsernameStatus = false;
        }
      }
    },
//    验证密码是否小于6位
    loginPwdCheck(){
      let status;
      if (this.loginPassword.length < 6){
        status = false;
        this.loginPwdTip = '请至少输入6位密码';
        this.loginPwdStatus = true;
      }else{
        status = true;
        this.loginPwdTip = '';
        this.loginPwdStatus = false;
      }
    },
//    登录
    login(){
      let reqParams = {
        userName:this.loginUsername,
        userPassword:this.loginPassword,
        validateCode:this.vertify
      }
      this.$axios.post("/login.ajax",reqParams)
        .then((res) => {
          console.log(res)
          this.$router.go(-1)
          sessionStorage.setItem('loginStatus',1);
        }).catch((res) => {
        console.log(res)
      })
    },
    showReg(){
      this.loginOrReg = true;
    },
    editstatus(){
      this.regdisable = !this.regdisable;
    },
//    点击按钮获取手机验证码   并且判断手机号是否被注册或为空
    getTelCode(){
      this.isShowVertify = true;
      this.inv = setInterval(() => {
        this.second --;
        if (this.second === 0){
          clearInterval(this.inv);
          this.isShowVertify = false;
          this.second = 10;
        }
      },1000);
      this.$axios.get('/regist/tostortmessage.ajax',{
        params:{
          mobile:this.tel
        }
      }).then((res) => {
        let errCode = res.data.data.error_code;
        console.log(res)
      }).catch((err) => {
        console.log("请求失败")
      })
    },
//    取消注册
    cancelReg(){
      this.$message({
        message: '对不起，暂时没有相关操作',
        type: 'warning',
        center:true
      });
    },
//    注册
    register(){
      let reqParams = {
        typei:this.role,
        afwindEnterprise:{
          enterpriseName:this.companyName,
          creditCode:this.creditCode
        },
        userName:this.regUsername,
        userPassword:this.regPassword,
        mobile:this.tel,
        validateCode:this.telVertify,
      };
      this.$axios.post('/regist/saveregist.ajax',reqParams)
        .then( (res) => {
          console.log(res.data.code);
          if (res.data.code === 1){
            console.log("注册成功");
            this.$message({
              message: '恭喜您，注册成功',
              type: 'success',
              center:true
            });
            setTimeout(() => {
              this.$router.go(0);
            },3000)

          }
        }).catch(() => {
          console.log('请求失败')
      })


    },
//    验证公司名称是否被注册或是否为空
    comNameCheck(){
      let status;
      if (this.companyName === ''){
        status = false;
        this.companyTip = "公司名称不能为空";
        this.companyStatus = true;
      }
      if (this.companyName !== ''){
        this.$axios.get('/regist/countenterprisename.ajax',{
          params:{
            enterpriseName:this.companyName
          }
        }).then((res) => {
          if (!res.data.data){
            status = false;
            this.companyTip = "公司名称已被注册";
            this.companyStatus = true;
          }else{
            status = true;
            this.companyTip = "";
            this.companyStatus = false;
          }
        }).catch(() => {
          console.log("请求失败");
        })
      }
    },
//    验证纳税人识别号是否被注册或是否为空
    creditCodeCheck(){
      let status;
      if (this.creditCode.length < 18){
        status = false;
        this.creditCodeTip = "纳税人识别号不足18位";
        this.creditCodeStatus = true;
      }

      if (this.creditCode.length === 18){
//        console.log(this.creditCode.length)
        this.$axios.get('/regist/countcreditcode.ajax',{
          params:{
            creditCode:this.creditCode
          }
        }).then((res) => {
          if (!res.data.data){
            status = false;
            this.creditCodeTip = "此纳税人识别号已被注册";
            this.creditCodeStatus = true;
          }else if(/^\d{18}$/.test(this.creditCode)){
            status = true;
            this.creditCodeTip = "";
            this.creditCodeStatus = false;
          }
        }).catch(() => {
          console.log("请求失败");
        })
      }
      if (this.creditCode.length > 18){
        status = false;
        this.creditCodeTip = "您输入的纳税人识别号位数不正确";
        this.creditCodeStatus = true;
      }
    },
//    验证用户名是否被注册或是否为空
    usernameCheck(){
      let status;
      if (this.regUsername === ''){
        status = false;
        this.usernameTip = "用户名不能为空";
        this.usernameStatus = true;
      }
      if (this.regUsername !== ''){
        this.$axios.get('/regist/countusename.ajax',{
          params:{
            userName:this.regUsername
          }
        }).then((res) => {
          if (!res.data.data){
            status = false;
            this.usernameTip = "此用户名已被注册";
            this.usernameStatus = true;
          }
          if (!/^[a-zA-z][a-zA-Z0-9_]{5,11}$/.test(this.regUsername)){
            status = false;
            this.usernameTip = "您输入的用户名格式不正确";
            this.usernameStatus = true;
          }
          if (res.data.data&&/^[a-zA-z][a-zA-Z0-9_]{5,11}$/.test(this.regUsername)){
            status = true;
            this.usernameTip = '';
            this.usernameStatus = false;
          }else{
            this.usernameStatus = true;
          }
        })
      }

    },
//    验证用户密码是否符合规则
    pwdCheck(){
      let status;
      if (!/^\w{6,20}$/g.test(this.regPassword)){
        status = false;
        this.pwdTip = '请输入6-20位密码';
        this.pwdStatus = true;
      }
      if (/^\w{6,20}$/g.test(this.regPassword)){
        status = true;
        this.pwdTip = '';
        this.pwdStatus = false;
      }else{
        this.pwdStatus = true;
      }
    },
//    用户确认密码
    confirmPwdCheck(){
      let status;
      if (this.regPassword !== this.confirmPassword){
        status = false;
        this.confirmPwdTip = '密码与上述密码不符';
        this.confirmPwdStatus = true;
      }else if(!this.confirmPassword){
        status = false;
        this.confirmPwdTip = '密码不能为空';
        this.confirmPwdStatus = true;
      }else{
        status = true;
        this.confirmPwdTip = '';
        this.confirmPwdStatus = false;
      }
    },
//    验证用户输入的手机号是否被注册或是否为空  手机验证码修改完毕
    telCheck(){
      let status;
      if (this.tel.length < 11){
        status = false;
        this.telTip = "";
        this.telStatus = true;
        this.getTelCodeActive = true;
      }
      if (this.tel.length === 11){
        this.$axios.get('/regist/countmobile.ajax',{
          params:{
            mobile:this.tel
          }
        }).then((res) => {
          if(!res.data.data){
            status = false;
            this.telTip = "此手机号码已被注册";
            this.telStatus = true;
          }
          if (res.data.data&&/^1[34578]\d{9}$/.test(this.tel)){
            status = true;
            this.telTip = "";
            this.telStatus = false;
            this.getTelCodeActive = false;
          }
        }).catch(() => {
          console.log("请求失败")
        })
      }
      if (this.tel.length > 11){
        status = false;
        this.telTip = "您输入的手机号码位数不正确";
        this.telStatus = true;
        this.getTelCodeActive = true;
      }
    },
//    验证用户输入的验证码是否符合规则
    telvertifyCheck(){
      let status;
      if (!/^[A-Za-z0-9]{4}$/.test(this.telVertify)){
        status = false;
        this.telVertifyTip = "您输入的验证码格式不正确";
        this.telVertifyStatus = true;
      }
      if (!this.telVertify){
        status = false;
        this.telVertifyTip = "验证码不能为空";
        this.telVertifyStatus = true;
      }
      if (/^[A-Za-z0-9]{4}$/.test(this.telVertify)){
        status = true;
        this.telVertifyTip = "";
        this.telVertifyStatus = false;
      }else{
        this.telVertifyStatus = true;
      }
    },
//    获取登录页面的验证码方法
    getLoginCode(){
      let timestamp = (+new Date());
      this.vertifySrc = '/xuan/verifyCode.ajax?typei=LOGIN&useful='+timestamp;
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getLoginCode'
  },
}
</script>

<style scoped>
  html, body {
    width: 100%;
    height: 100%;
  }
  body {
    overflow: hidden;
    position: relative;
  }
  .wrapper{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
    width:100%;
    height:100%;
    background:url("../../assets/others/login_bg.png") repeat center center fixed;
  }
  .login_main,.reg_main{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    margin-top: -245px;
    padding: 80px 10px;
    display:block;
    width: 450px;
    border: 1px solid #DADADA;
    border-radius:10px;
    box-sizing:border-box;
    box-shadow:0px 3px 0px 3px #DADADA;
    box-shadow:0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    background:linear-gradient(to bottom ,#FFFFFF,#F0F0EF);
  }
  .reg_main{
    margin-left: -225px;
    margin-top: -300px;
    padding: 20px 10px;
  }
  .login_top h1,.reg_top h1{
    margin-top: 20px;
    text-align: center;
    color:#333;
    font-size:20px;
    font-weight:400;
    font-family:'Microsoft Yahei';
  }
  .login_logo{
    margin: 0 auto;
    width: 200px;
    height: 75px;
  }
  .login_logo img{
    width: 100%;
    height: 100%;
  }
  .vertifyInfo{
    overflow: hidden;
    margin: 0 auto;
    width: 300px;
  }
  .vertifyInfo .el-input{
    float: left;
    width: 226px;
  }
  .vertifyImg{
    float: left;
    width: 73px;
    height: 38px;
  }
  .vertifyImg img{
    width: 100%;
    height: 100%;
  }
  .register_enter{
    margin: 5px 0;
    width: 365px;
    text-align: right;
  }
  .loginBtn{
    margin: 0 auto;
    width: 300px;
  }
  .el-button{
    width: 300px;
  }
  .vertify_wrapper{
    overflow: hidden;
  }
  .vertify_wrapper .el-input{
    float: left;
    width: 245px;
  }
  .vertify_wrapper .el-button{
    float: left;
    width: 183px;
  }
  .regBtn{
    overflow: hidden;
    width: 220px;
    margin: 0 auto;
  }
  .regBtn .el-button{
    width: 100px;
    height: 40px;
  }
</style>





































