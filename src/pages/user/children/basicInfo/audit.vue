<template>
  <div class="user_nav">
    <div class="nav_title">
      <h1>审核中的信息</h1>
    </div>
    <!--企业信息-->
    <div class="account_detail">
      <ul class="account_list">
        <li v-for="item in auditComInfo">
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
    </div>
    <!--个人信息-->
    <div class="account_detail">
      <ul class="personal_list">
        <li v-for="item in auditPerInfo">
          <div class="per_account_title">{{item.title}}</div>
          <div>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      //企业信息数据
      auditComInfo:[
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
      //个人信息数据
      auditPerInfo:[
        {"title":"联系人姓名:","content":""},
        {"title":"性别:","content":""},
        {"title":"职务:","content":""},
        {"title":"手机号:","content":""},
        {"title":"办公电话:","content":""},
        {"title":"邮箱:","content":""},
        {"title":"QQ号码:","content":""}
      ],

    }
  },
  created(){
    this.$axios.get('/entanduser/getEntAndUser.ajax?typei=all')
      .then((res) => {
        let myData = JSON.parse(res.data.data);
        this.auditComInfo[0].content = myData.afwindEnterpriseAlter.enterpriseName;//企业名称
        this.auditComInfo[1].content = myData.afwindEnterpriseAlter.creditCode;//纳税人识别号
        this.auditComInfo[2].content = myData.afwindEnterpriseAlter.owner;//法人
        this.auditComInfo[3].content = myData.afwindEnterpriseAlter.phone;//公司固定电话
        this.auditComInfo[4].content =myData.afwindEnterpriseAlter.fax;//公司传真
        this.auditComInfo[5].content = myData.afwindEnterpriseAlter.config.valuei;//所属行业
        for (let i = 0;i<myData.afwindEnterpriseAlter.addresseList.length;i++){
          if (myData.afwindEnterpriseAlter.addresseList[i].typei === '1'){//公司注册地址
            this.auditComInfo[6].content = myData.afwindEnterpriseAlter.addresseList[i].afwindRegion.fullName + myData.afwindEnterpriseAlter.addresseList[i].address;
          }else if(myData.afwindEnterpriseAlter.addresseList[i].typei === '2'){//公司办公地址
            this.auditComInfo[7].content = myData.afwindEnterpriseAlter.addresseList[i].afwindRegion.fullName + myData.afwindEnterpriseAlter.addresseList[i].address;
          }
        }
        for (let i =0;i<myData.afwindEnterpriseAlter.enterprisePicsList.length;i++){
          if (myData.afwindEnterpriseAlter.enterprisePicsList[i].typei === '1'){
            this.auditComInfo[12].photo = myData.afwindEnterpriseAlter.enterprisePicsList[i].url;
          }else if(myData.afwindEnterpriseAlter.enterprisePicsList[i].typei === '2'){
            this.auditComInfo[13].picture.push(myData.afwindEnterpriseAlter.enterprisePicsList[i].url);
          }
        }
        this.auditComInfo[11].content = myData.afwindEnterpriseAlter.categorie.name;//供货范围
        this.auditComInfo[10].content = myData.afwindEnterpriseAlter.altAccountList[0].bankName;
        this.auditComInfo[8].content = myData.afwindEnterpriseAlter.altAccountList[0].account;
        this.auditComInfo[9].content = myData.afwindEnterpriseAlter.altAccountList[0].bankRemark;


        this.auditPerInfo[0].content = myData.realname;//联系人姓名
        if (myData.sex === '1'){//性别
          this.auditPerInfo[1].content = '男';
        }else if(myData.sex === '2'){
          this.auditPerInfo[1].content = '女';
        }
        this.auditPerInfo[2].content = myData.userPost;//职务
        this.auditPerInfo[3].content = myData.mobile;//手机号
        this.auditPerInfo[4].content = myData.telphone;//办公电话
        this.auditPerInfo[5].content = myData.email;//邮箱
        this.auditPerInfo[6].content = myData.qqCode;//qq号码
      }).catch(() => {
        console.log("请求审核数据失败")
    })
  }
}
</script>

<style>

</style>
