<template>
  <div>
    <el-select @change="choosePro(ProValue)" v-model="ProValue" placeholder="省">
      <el-option v-for="item in ProvinceOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
    <el-select @change="chooseCity(CityValue)" v-model="CityValue" placeholder="市">
      <el-option v-for="item in CityOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
    <el-select @change="chooseArea(AreaValue)" v-model="AreaValue" placeholder="区">
      <el-option v-for="item in AreaOptions" :key="item.id" :label="item.regionName" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        ProValue:'',
        CityValue:'',
        AreaValue:'',
        ProvinceOptions:{},
        CityOptions:{},
        AreaOptions:{}
      }
    },
    props:{
      PRO:{
        type:String,
        default:''
      },
      CITY:{
        type:String,
        default:''
      },
      AREA:{
        type:String,
        default:''
      },
      REC:{
        type:Number,
        default:0
      }
    },
    methods:{
      choosePro(){
        this.$axios.get('/region/region.ajax?typei=CITY&provinceId='+this.ProValue)
          .then((res) => {
            this.CityOptions = JSON.parse(res.data.data);
            this.CityValue = '';
            this.AreaValue = '';
          }).catch(() => {
          console.log("请求失败");
        })
      },
      chooseCity(){
        this.$axios.get('/region/region.ajax?typei=AREA&provinceId='+this.CityValue)
          .then((res) => {
            this.AreaOptions = JSON.parse(res.data.data);
          }).catch(() => {
          console.log("请求失败");
        })
      },
      chooseArea(){
        this.$emit("getAreaId",this.AreaValue);
      }
    },
    created(){
      this.$axios.get('/region/region.ajax?provinceId=0&typei=PROVINCE')
        .then((res) => {
          this.ProvinceOptions = JSON.parse(res.data.data);
        }).catch(() => {
        console.log("请求失败");
      });
      this.$axios.get('/entanduser/getEntAndUser.ajax')
        .then((res) => {
//          console.log(this.REC);
          if(this.REC === 1){
            this.ProValue = this.PRO;
            this.CityValue = this.CITY;
            this.AreaValue = this.AREA;
            let myData = (JSON.parse(res.data.data).afwindEnterprise.addresseList[1].afwindRegion.fullName.split(','));
            this.AreaValue = myData[2];
            this.CityValue = myData[1];
            this.ProValue = myData[0];
          }else if(this.REC === 2){
            this.ProValue = this.PRO;
            this.CityValue = this.CITY;
            this.AreaValue = this.AREA;
            let myData = (JSON.parse(res.data.data).afwindEnterprise.addresseList[0].afwindRegion.fullName.split(','));
            this.AreaValue = myData[2];
            this.CityValue = myData[1];
            this.ProValue = myData[0];
          }else{
            this.ProValue = '';
            this.CityValue = '';
            this.AreaValue = '';
          }
        }).catch(() => {
        console.log("省市区请求数据失败");
      });
    }
  }
</script>

<style>

</style>
