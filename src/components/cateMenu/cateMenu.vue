<template>
  <div style="width: 114%;height: 100%">
    <div class="firstMenu_wrapper">
      <ul>
        <li @mouseover="open(index)" @mouseout="close(index)" v-for="(item,index) in firstLevel">
          <span @click="getFirstItem(firstClaName.id)" v-for="(firstClaName,firstClaNameIndex) in firstLevel[index].firstMenuName">
            <router-link :to="{path:'/goodsList',query:{proId:firstClaName.id,proLevel:firstClaName.level}}">{{firstClaName.name}}</router-link>
          </span>
        </li>
      </ul>
    </div>
    <div class="secondMenu_wrapper" @mouseover="keep(firstIndex)" @mouseout="closeAll()" v-for="(firstItem,firstIndex) in secondLevel" v-show="isShow === (firstIndex+1)">
      <div v-for="(secondItem,secondIndex) in secondLevel[firstIndex].secondMenuItem">
        <div class="secondMenu_wrapper_level2">
          <span @click="getSecondItem(secondItem.id)">
            <router-link :to="{path:'/goodsList',query:{proId:secondItem.id,proLevel:secondItem.level}}">{{ secondItem.secondMenuName }}</router-link>
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <div class="secondMenu_wrapper_level3">
      		<span @click="getThiredItem(thiredItem.id)" v-for="(thiredItem,thiredIndex) in secondLevel[firstIndex].secondMenuItem[secondIndex].thiredLevel">
            <router-link :to="{path:'/goodsList',query:{proId:thiredItem.id,proLevel:thiredItem.level}}">{{ thiredItem.thiredMenuName }}</router-link>
	      	</span>
        </div>
      </div>
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
        ]
      }
    },
//    created(){
//      this.$axios.get('/category/selectByExampleList')
//        .then((res) => {
//          let myData = JSON.parse(res.data.data);
//          console.log(myData)
//        }).catch(() => {
//        console.log("请求侧边栏列表失败")
//      })
//    },
    methods:{
      open(index) {//鼠标移入打开右侧菜单
        this.isShow = 0;
        this.isShow = index+1;
      },
      close(index){//鼠标移出关闭右侧菜单
        this.isShow = 0;
      },
      keep(index){//鼠标移入保持菜单展开
        this.isShow = index+1;
      },
      closeAll(){//鼠标移出菜单全部关闭
        this.isShow = 0;
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
      }
    }
  }
</script>

<style scoped>
  .firstMenu_wrapper{
    width: 100%;
    height: 500px;
    font-size: 30px;
    background: #fff;
    opacity: 0.8;
    border-radius: 0 0 5px 5px;
  }
  .firstMenu_wrapper li{
    overflow: hidden;
    height: 45px;
    line-height: 45px;
    font-size: 80%;
    font-family:"microsoft yahei";
    color:#000;
    text-align: center;
  }
  .cateMenu a{
    color:#000;
  }
  .cateMenu a:hover{
    color:#C11A21;
  }
  .firstMenu_wrapper li:hover{
    background:#FFFFFF ;
    color:#C11A21;
    /*text-decoration: underline;*/
  }
  .firstMenu_wrapper ul li span{
    margin-right: 2%;
    font-size:60%;
    cursor: pointer;
  }
  .firstMenu_wrapper ul li span:last-child{
    margin-right: 0;
  }
  .firstMenu_wrapper ul li span:hover{
    text-decoration: underline;
  }
  .firstMenu_wrapper ul li i{
    padding: 0 5px;
  }
  .secondMenu_wrapper{
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 114%;
    width: 426%;
    height: 100%;
    background: ghostwhite;
    opacity: 0.8;
  }
  .secondMenu_wrapper .secondMenu_wrapper_level2{
    overflow: hidden;
    float: left;
    width: 20%;
    height: 50px;
    border-bottom:1px solid gainsboro ;
  }
  .secondMenu_wrapper .secondMenu_wrapper_level2 span{
    display: inline-block;
    width: 100%;
    font-size:12px;
    padding:10px 0 10px 20px;
    cursor: pointer;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .secondMenu_wrapper_level2 span:hover{
    color:#C11A21;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .secondMenu_wrapper_level3{
    overflow: hidden;
    float: left;
    width: 80%;
    height: 50px;
    border-bottom:1px solid gainsboro ;
  }
  .secondMenu_wrapper .secondMenu_wrapper_level3 span{
    display: inline-block;
    font-size:12px;
    cursor: pointer;
    border-left:1px solid gainsboro;
    padding:0 3px;
    margin:10px 0 0 0;
    font-family:"microsoft yahei";
  }
  .secondMenu_wrapper .secondMenu_wrapper_level3 span:hover{
    color:#C11A21;
    font-family:"microsoft yahei";
  }

</style>
