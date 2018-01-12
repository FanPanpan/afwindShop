<template>
  <div>
    <div class="nav_wrapper">
      <div class="proItem">
        <span class="allClassify" @mouseover="openMenu" @mouseout="closeMenu"><i class="el-icon-menu"></i>全部商品分类</span>
        <div>
          <span><router-link to="/">首页</router-link></span>
          <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'1'}}">现货中心</router-link></span>
          <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'2'}}">非现货中心</router-link></span>
          <span><router-link tag="li" :to="{path:'/goodsList',query:{saleType:'品牌'}}">品牌中心</router-link></span>
        </div>
      </div>

      <!--<div>-->
      <transition name="fold">
        <div v-show="showMenu" class="firstMenu_wrapper">
          <ul>
            <li @mouseover="open(index)" @mouseout="close(index)" v-for="(item,index) in firstLevel">
              <span @click="getFirstItem(firstClaName.id)" v-for="(firstClaName,firstClaNameIndex) in firstLevel[index].firstMenuName">
                <router-link @click="getFirstLevelInfo(firstClaName.id,firstClaName.level)" :to="{path:'/goodsList',query:{proIdFromNav:firstClaName.id,proLevelFromNav:firstClaName.level}}">{{firstClaName.name}}</router-link>
                <!--<a href="#" >{{firstClaName.name}}</a>-->
              </span>
            </li>
          </ul>
        </div>
      </transition>
      <div class="secondMenu_wrapper" @mouseover="keep(firstIndex)" @mouseout="closeAll()" v-for="(firstItem,firstIndex) in secondLevel" v-show="isShow === (firstIndex+1)">
        <div v-for="(secondItem,secondIndex) in secondLevel[firstIndex].secondMenuItem">
          <div class="wrapper_level2">
            <span @click="getSecondItem(secondItem.id)">
              <router-link @click="getFirstLevelInfo(secondItem.id,secondItem.level)" :to="{path:'/goodsList',query:{proId:secondItem.id,proLevel:secondItem.level}}">{{ secondItem.secondMenuName }}</router-link>
              <i class="el-icon-arrow-right"></i>
            </span>
          </div>
          <div class="wrapper_level3">
	      		  <span @click="getThiredItem(thiredItem.id)" v-for="(thiredItem,thiredIndex) in secondLevel[firstIndex].secondMenuItem[secondIndex].thiredLevel">
                <router-link @click="getFirstLevelInfo(thiredItem.id,thiredItem.level)" :to="{path:'/goodsList',query:{proId:thiredItem.id,proLevel:thiredItem.level}}">{{ thiredItem.thiredMenuName }}</router-link>
		      	  </span>
          </div>
        </div>
      </div>
      <!--</div>-->
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        isShow:0,
        firstLevel: [
          {firstMenuName:[{name:'锅炉辅机',level:1,id:1}]},
          {firstMenuName:[{name:'脱硫',level:1,id:2},{name:'脱销',level:1,id:3}]},
          {firstMenuName:[{name:'电工',level:1,id:4},{name:'电气',level:1,id:5}]},
          {firstMenuName:[{name:'轴承',level:1,id:10}, {name:'工具',level:1,id:11}, {name:'机械传动',level:1,id:12}]},
          {firstMenuName:[{name:'管道配件',level:1,id:7},{name:'阀门',level:1,id:8}]},
          {firstMenuName:[{name:'化工',level:1,id:16}]},
          {firstMenuName:[{name:'泵设备',level:1,id:9},{name:'液压',level:1,id:14},{name:'气动',level:17,id:19}]},
          {firstMenuName:[{name:'照明灯具',level:1,id:17},{name:'仪器仪表',level:1,id:15}]},
          {firstMenuName:[{name:'密封件',level:1,id:6}]},
          {firstMenuName:[{name:'劳保',level:1,id:13},{name:'办公',level:1,id:18}]},
          {firstMenuName:[{name:'服务类',level:1,id:20}]}
        ],
        secondLevel: [
          {
            secondMenuItem:[
              {
                secondMenuName:'锅炉轴流风机配件',id:101,level:2,
                thiredLevel:[
                  {thiredMenuName:'风机液压润滑油站',id:10101,level:3},
                ]
              },
              {
                secondMenuName:'磨煤机',id:102,level:2,
                thiredLevel:[
                  {thiredMenuName:'钢球磨煤机',id:10201,level:3},
                  {thiredMenuName:'中速磨煤机',id:10202,level:3},
                  {thiredMenuName:'风扇式磨煤机',id:10203,level:3},
                ]
              },
            ],
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'脱硫浆液搅拌器',id:201,level:2,
                thiredLevel:[
                  {thiredMenuName:'脱硫浆液搅拌器',id:20101,level:3},
                ]
              },
              {
                secondMenuName:'脱硫浆液搅拌器配件',id:202,level:2,
                thiredLevel:[
                  {thiredMenuName:'搅拌器传动机构',id:20201,level:3},
                  {thiredMenuName:'搅拌器机械密封组件',id:20202,level:3},
                  {thiredMenuName:'搅拌器转子组件',id:20203,level:3},
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'低气电压',id:501,level:2,
                thiredLevel:[
                  {thiredMenuName:'断路器',id:50501,level:3},
                  {thiredMenuName:'继电器',id:50502,level:3},
                  {thiredMenuName:'按钮指示灯',id:50503,level:3},
                  {thiredMenuName:'负荷隔离开关',id:50504,level:3},
                  {thiredMenuName:'接触器',id:50505,level:3},
                  {thiredMenuName:'电机保护',id:50506,level:3},
                  {thiredMenuName:'熔断器',id:50507,level:3},
                  {thiredMenuName:'电源与变压器',id:50508,level:3}
                ]
              },
              {
                secondMenuName:'高压电气',id:502,level:2,
                thiredLevel:[
                  {thiredMenuName:'高压熔断器',id:50201,level:3}
                ]
              },
              {
                secondMenuName:'电机',id:503,level:2,
                thiredLevel:[
                  {thiredMenuName:'交流电机',id:50301,level:3},
                  {thiredMenuName:'伺服电机',id:50302,level:3}
                ]
              },
              {
                secondMenuName:'控制类',id:504,level:2,
                thiredLevel:[
                  {thiredMenuName:'控制模块',id:50401,level:3},
                  {thiredMenuName:'控制附件',id:50402,level:3},
                  {thiredMenuName:'编码器',id:50403,level:3}
                ]
              },
              {
                secondMenuName:'传感器类',id:505,level:2,
                thiredLevel:[
                  {thiredMenuName:'方向',id:50501,level:3},
                  {thiredMenuName:'速度',id:50502,level:3}
                ]
              },
              {
                secondMenuName:'通讯部类',id:506,level:2,
                thiredLevel:[
                  {thiredMenuName:'通讯附件',id:50601,level:3}
                ]
              },
              {
                secondMenuName:'电器配件',id:507,level:2,
                thiredLevel:[
                  {thiredMenuName:'刹车片',id:50701,level:3},
                  {thiredMenuName:'保险座',id:50701,level:3}
                ]
              },
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'球轴承',id:1001,level:2,
                thiredLevel:[
                  {thiredMenuName:'深沟球轴承',id:100101,level:3}
                ]
              },
              {
                secondMenuName:'滚子轴承',id:1002,level:2,
                thiredLevel:[
                  {thiredMenuName:'圆柱滚子轴承',id:100201,level:3}
                ]
              },
              {
                secondMenuName:'轴承工具/附件',id:1003,level:2,
                thiredLevel:[
                  {thiredMenuName:'轴承加热器',id:100301,level:3},
                  {thiredMenuName:'轴承润滑脂',id:100302,level:3},
                  {thiredMenuName:'轴承安装工具套装',id:100303,level:3}
                ]
              },
              {
                secondMenuName:'带座轴承',id:1004,level:2,
                thiredLevel:[
                  {thiredMenuName:'轴承座',id:100401,level:3},
                  {thiredMenuName:'带座轴承芯',id:100402,level:3}
                ]
              },
              {
                secondMenuName:'气动工具',id:1101,level:2,
                thiredLevel:[
                  {thiredMenuName:'气动扳手',id:110101,level:3}
                ]
              },
              {
                secondMenuName:'动力工具附件',id:1102,level:2,
                thiredLevel:[
                  {thiredMenuName:'套装配件',id:110201,level:3}
                ]
              },
              {
                secondMenuName:'液压工具',id:1103,level:2,
                thiredLevel:[
                  {thiredMenuName:'液压扳手',id:110301,level:3}
                ]
              },
              {
                secondMenuName:'扭力工具',id:1104,level:2,
                thiredLevel:[
                  {thiredMenuName:'扭力扳手',id:110401,level:3}
                ]
              },
              {
                secondMenuName:'联轴器及附件',id:1201,level:2,
                thiredLevel:[
                  {thiredMenuName:'无齿隙联轴器',id:120101,level:3}
                ]
              },
              {
                secondMenuName:'设备配件',id:1202,level:2,
                thiredLevel:[
                  {thiredMenuName:'变桨系统配件',id:120201,level:3},
                  {thiredMenuName:'滑环',id:120202,level:3},
                  {thiredMenuName:'磨煤机配件',id:120203,level:3}
                ]
              },
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'法兰',id:701,level:2,
                thiredLevel:[
                  {thiredMenuName:'金属法兰',id:70101,level:3}
                ]
              },
              {
                secondMenuName:'直通管配件',id:702,level:2,
                thiredLevel:[
                  {thiredMenuName:'同心异径管',id:70201,level:3},
                  {thiredMenuName:'偏心异径管',id:70202,level:3},
                  {thiredMenuName:'管接头',id:70203,level:3},
                  {thiredMenuName:'内外螺纹接头',id:70204,level:3},
                ]
              },
              {
                secondMenuName:'弯头',id:703,level:2,
                thiredLevel:[
                  {thiredMenuName:'焊接弯头',id:70301,level:3}
                ]
              },
              {
                secondMenuName:'三通',id:704,level:2,
                thiredLevel:[
                  {thiredMenuName:'焊接三通',id:70401,level:3},
                  {thiredMenuName:'锻制三通',id:70401,level:3}
                ]
              },
              {
                secondMenuName:'普通阀门',id:801,level:2,
                thiredLevel:[
                  {thiredMenuName:'蝶阀',id:80101,level:3}
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'水处理药剂、材料',id:1601,level:2,
                thiredLevel:[
                  {thiredMenuName:'过滤吸附剂',id:160101,level:3},
                  {thiredMenuName:'离子交换树脂',id:160102,level:3}
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'离心泵',id:901,level:2,
                thiredLevel:[
                  {thiredMenuName:'单级清水离心泵',id:90101,level:3},
                  {thiredMenuName:'锅炉给水泵',id:90102,level:3},
                  {thiredMenuName:'单级耐腐蚀离心泵',id:90103,level:3},
                  {thiredMenuName:'污水泵',id:90104,level:3},
                  {thiredMenuName:'渣浆泵',id:90105,level:3}
                ]
              },
              {
                secondMenuName:'离心泵配件',id:902,level:2,
                thiredLevel:[
                  {thiredMenuName:'单级清水离心泵配件',id:90201,level:3},
                  {thiredMenuName:'锅炉给水泵配件',id:90202,level:3},
                  {thiredMenuName:'单级耐腐蚀离心泵配件',id:90203,level:3},
                  {thiredMenuName:'污水泵配件',id:90204,level:3},
                  {thiredMenuName:'渣浆泵配件',id:90205,level:3}
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'户内灯具',id:1701,level:2,
                thiredLevel:[
                  {thiredMenuName:'手电筒',id:170101,level:3},
                  {thiredMenuName:'工作灯',id:170102,level:3},
                  {thiredMenuName:'头灯',id:170103,level:3}
                ]
              },
              {
                secondMenuName:'户外灯具',id:1702,level:2,
                thiredLevel:[
                  {thiredMenuName:'户外灯具',id:170201,level:3},
                  {thiredMenuName:'探照灯',id:170202,level:3},
                  {thiredMenuName:'路灯',id:170203,level:3}
                ]
              },
              {
                secondMenuName:'照明配件',id:1703,level:2,
                thiredLevel:[
                  {thiredMenuName:'电容器',id:170301,level:3}
                ]
              },
              {
                secondMenuName:'压力仪表',id:1501,level:2,
                thiredLevel:[
                  {thiredMenuName:'电动压力变送器',id:150101,level:3},
                  {thiredMenuName:'气动压力变送器',id:150102,level:3},
                  {thiredMenuName:'电动差压变送器',id:150103,level:3},
                  {thiredMenuName:'气动差压变送器',id:150104,level:3}
                ]
              },
              {
                secondMenuName:'机械测量仪表',id:1502,level:2,
                thiredLevel:[
                  {thiredMenuName:'振动测量仪表',id:150201,level:3}
                ]
              },
              {
                secondMenuName:'无损检测仪器及机械性能试验机和配件',id:1503,level:2,
                thiredLevel:[
                  {thiredMenuName:'工程测量仪器',id:150301,level:3}
                ]
              },
              {
                secondMenuName:'显示、记录仪器',id:1504,level:2,
                thiredLevel:[
                  {thiredMenuName:'闪光报警器',id:150401,level:3}
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'机械密封及配件',id:601,level:2,
                thiredLevel:[
                  {thiredMenuName:'旋转式机械密封',id:60101,level:3},
                  {thiredMenuName:'静止式机械密封',id:60102,level:3}
                ]
              }
            ]
          },
          {
            secondMenuItem:[
              {
                secondMenuName:'手部防护',id:1301,level:2,
                thiredLevel:[
                  {thiredMenuName:'通用工作手套',id:130101,level:3}
                ]
              },
              {
                secondMenuName:'身体防护',id:1302,level:2,
                thiredLevel:[
                  {thiredMenuName:'普通工作服',id:130201,level:3}
                ]
              }
            ]
          }
        ],
        showMenu:false
      }
    },
    created(){
//      this.$axios.get('/AfwindProductcommerce/selectByExampleList')
//        .then((res) => {
//          let myData = JSON.parse(res.data.data);
//          console.log(myData)
//        }).catch(() => {
//          console.log("请求侧边栏列表失败")
//      })
    },
    methods:{
      getFirstLevelInfo(id,level){
        this.$emit("getIdAndLevelFromNav",id,level);
      },
      open(index) {//鼠标移入打开右侧菜单
        this.isShow = 0;
        this.isShow = index+1;
        this.showMenu = true
      },
      close(index){//鼠标移出关闭右侧菜单
        this.isShow = 0;
        this.showMenu = false
      },
      keep(index){//鼠标移入保持菜单展开
        this.isShow = index+1;
        this.showMenu = true
      },
      closeAll(){//鼠标移出菜单全部关闭
        this.isShow = 0;
        this.showMenu = false
      },
//      获取1,2,3级的查询值
      getFirstItem(value){
//        console.log(value)
      },
      getSecondItem(value){
//        console.log(value)
      },
      getThiredItem(value){
//        console.log(value)
      },
      openMenu(){
        this.showMenu = true
      },
      closeMenu(){
        this.showMenu = false
      }
    }
  }
</script>

<style scoped>
  .nav_wrapper{
    width: 90%;
    height: 40px;
    margin: 0 auto;
    position: relative;
    z-index: 100;
  }
  .nav_wrapper a{
    color:#000;
  }
  .nav_wrapper a:hover{
    color:#C11A21;
  }
  .proItem{
    overflow: hidden;
    font-size:20px;
  }
  .proItem div{
    margin-left: 23.55%;
    margin-top: -0.2%;
    width: 100%;
    border-bottom: 2px solid #C11A21;
    height: 40px;
  }
  .proItem span{
    float: left;
    display: block;
    width: 7.63%;
    height: 30px;
    line-height: 40px;
    text-align: center;
    font-family:"microsoft yahei";
    color:#FFFFFF;
    margin-right:30px;
    cursor: pointer;
  }
  .proItem div span{
    color:black;
    font-size:16px;
  }
  .proItem a{
    color: #000;
  }
  .proItem div span:hover,
  .proItem div a:hover{
    border-bottom:2px solid #C11A21;
    color:#C11A21;
  }
  .proItem div span:hover{
    border-bottom:2px solid #C11A21;
    color:#C11A21;
  }
  .proItem .allClassify{
    display: inline-block;
    width: 23.55%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background:#C11A21;
    border-bottom: none;
    font-size:72%;
    border-radius: 5px 5px 0 0;
  }
  .firstMenu_wrapper{
    overflow: hidden;
    float: left;
    width: 23.55%;
    height: 500px;
    position: absolute;
    top: 40px;
    left: 0;
    font-size: 30px;
    background: #fafafa;
    font-family:"microsoft yahei";
    transform: translateY(0px)
  }
  .firstMenu_wrapper li{
    height: 40px;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
    font-size: 80%;
    color:#000;
  }
  .firstMenu_wrapper li:hover{
    background:#FFFFFF ;
    color:#C11A21;
  }
  .firstMenu_wrapper ul li span{
    font-size:60%;
    cursor: pointer;
    margin-right:2%;
  }
  .firstMenu_wrapper ul li span:hover{
    text-decoration: underline;
  }
  .firstMenu_wrapper ul li span:last-child{
    margin-right:0 ;
  }
  .secondMenu_wrapper{
    float: left;
    overflow:hidden;
    width: 76.5%;
    height: 1250%;
    position: absolute;
    top: 40px;
    left: 23.55%;
    font-size: 20px;
    background: ghostwhite;
  }
  .secondMenu_wrapper li{
    font-size: 72%;
  }
  .secondMenu_wrapper .wrapper_level2{
    overflow: hidden;
    float: left;
    width: 19.999%;
    height: 50px;
    border-bottom:1px solid gainsboro;
  }
  .secondMenu_wrapper .wrapper_level2 span{
    display: inline-block;
    width: 100%;
    font-size:12px;
    padding:10px 0 10px 20px;
    cursor: pointer;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .wrapper_level2 span:hover{
    color:#CC2127;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .wrapper_level3{
    overflow: hidden;
    float: left;
    width: 79.35%;
    height: 50px;
    border-bottom:1px solid gainsboro ;
  }
  .secondMenu_wrapper .wrapper_level3 span{
    display: inline-block;
    font-size:12px;
    cursor: pointer;
    border-left:1px solid gainsboro;
    padding:0 3px;
    margin:10px 0 0 0;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .wrapper_level3 span:hover{
    color:#CC2127;
    font-family:"microsoft yahei";
  }
  .fold-enter-active,
  .fold-leave-active {
    transition: all 1s;
  }
  .fold-enter,
  .fold-leave-active {
    height: 0;
  }
</style>
