<template>
    <el-dialog :visible.sync="dialogArr.status" width="70%" :before-close="handleClose" center>
        <div class="addNewPro">
            <div class="addNewPro_item">
                <p>厂家编码：{{manufactorCode}}</p>
            </div>
           <div class="addNewPro_item"> 
                <p>商品名称：{{propretiesName}}</p>
            </div>
            <div class="addNewPro_item">
                <p>图号：{{figureNo}}</p> 
            </div>
            <div class="addNewPro_item">
                <p>商品品牌：{{brandName}}</p>
            </div>
            <div class="addNewPro_item">
                <p>商品型号：{{specifications}}</p>
            </div>
            <div class="addNewPro_item">
                <p>商品类型：{{typei}}</p>
            </div>
            <div class="addNewPro_item">
                <p>商品分类：{{category}}</p>
            </div>
            <div class="addNewPro_item">
                <p>生产厂家：{{manufacturer}}</p>
            </div>
            <div class="addNewPro_item">
                <p>商品图片：</p>
                <div style="width:100px;height:100px;">
                  <img :src="'http://47.92.122.228:8021'+productsPicList.url" width="100%" height="100%;">
                </div>
            </div>
            <div class="addNewPro_item">
              <p>商品性质：{{natureConfig}}</p>
            </div>
            <div class="addNewPro_item">
              <p>商品俗称：{{commerceName}}</p>
            </div>
        
           <div class="addNewPro_item">
              <p>商品用途:</p>
              <ul style="overflow:hidden">
                <li v-for="(item,index) in commercePurpose" style="float:left;">
                    {{item.purposeList.useName}},
                </li>
              </ul>
            </div>
            <div class="addNewPro_item">
              <p>供应商编码：{{sellertCode}}</p>
            </div>
            <div class="addNewPro_item">
              <p>SEO关键字：{{seoKeyword}}</p>
            </div>
            <div class="addNewPro_item">
              <p>SEO描述：{{seoDescribe}}</p>
            </div>
            <div class="text_wrapper">
              <p class="text_title">商品详情：</p>
              <div style="width:600px; height:800px">
                <img :src="'http://' + details" width="100%" height="100%">
              </div>
              
            </div>
            <div class="text_wrapper">
              <p class="text_title">安装指导：</p>
              <div class="text_content">
                {{installGuidance}}
              </div>
            </div>
       
            <div class="addNewPro_item">
              <p>库存数量：{{stock}}</p>
            </div>
            <div class="addNewPro_item">
              <p>现存售价(元)：{{price}}</p>
            </div>
            <div class="addNewPro_item">
              <p>现货出货周期(工作日)：{{cycle}}</p>
            </div>
            <div class="addNewPro_item">
              <p>非现货售价(元)：{{waitPrice}}</p>
            </div>
            <div class="addNewPro_item">
              <p>非现货供货周期(工作日)：{{waitCycle}}</p>
            </div>
            <div class="addNewPro_item">
              <p>计件单位：{{meteringUnit}}</p>
            </div>
            <div class="addNewPro_item">
              <p>最小订货量(最小单位量)：{{smallGoods}}</p>
            </div>
            <div class="addNewPro_item">
              <p>单位包装数(个)：{{unitNum}}</p>
            </div>
            <div class="addNewPro_item">
              <p>商品折扣率：{{discount}}</p>
            </div>
            <div class="addNewPro_item">
              <p>商品相关服务：{{relatedServe}}</p>
            </div>
            <div class="addNewPro_item">
              <p >质保类型：{{warrantyType}}</p>
            </div>
            <div class="addNewPro_item">
              <p >质保期限(年)：{{warrantyTime}}</p>
            </div>
            <div class="addNewPro_item">
              <p >运费承担方：{{freightBear}}</p>
            </div>
            <div class="addNewPro_item">
              <p>商品重量(kg)：{{weight}}</p>
            </div>
            <div class="addNewPro_item">
              <p >包装体积(mm*mm*mm)：{{volume}}</p>
            </div>
            <div class="addNewPro_item">
              <p>运输要求：{{transportRequire}}</p>
            </div>
            <div class="addNewPro_item">
              <p>存储要求：{{storageRequire}}</p>
            </div>
            <div class="addNewPro_item" style="overflow:hidden">
              <p>技术参数：</p>
                <table class="gridtable" v-for="(item,index) in attributeTitle">
                  <tr>
                    <th colspan="2">{{item.name}}</th>
                  </tr>
                  <tr v-for="innerItem in attributeTitle[index].afwindAttribute">
                    <td>{{innerItem.remark}}</td><td>{{innerItem.defaultValue}}</td>
                  </tr>
                </table>
            </div>   
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span> 
    </el-dialog>


</template> 
<script>
export default {
  data() {
      return {
          dialogArr:{
              status:false
          },
          //参数
          manufactorCode:'',
          propretiesName:'',
          figureNo:'',
          brandName:'',
          specifications:'',
          typei:'',
          category:'',
          manufacturer:'',
          productsPicList:[],
          natureConfig:'',
          commerceName:'',
          commercePurpose:[],
          sellertCode:'',
          seoKeyword:'',
          seoDescribe:'',
          details:'',
          installGuidance:'',
          stock:'',
          price:'',
          cycle:'',
          waitPrice:'',
          waitCycle:'',
          meteringUnit:'',
          smallGoods:'',
          unitNum:'',
          discount:'',
          relatedServe:[],
          warrantyType:'',
          warrantyTime:'',
          freightBear:'',
          weight:'',
          volume:'',
          transportRequire:'',
          storageRequire:'',
          attributeTitle:[],
      };
    },
    props:{
        examine:{
            type:Boolean  
        },
        proId:{
          type:Array
        }
    }, 
    watch:{
        examine(){
            this.dialogArr.status = this.examine;
            
        },
        proId(){
          // console.log(this.proId)
          this.$axios.get('/AfwindProductcommerce/selectCommerceProductInfo?id='+this.proId[0])
              .then((res) => {
                let myData = JSON.parse(res.data.data);
                // console.log(JSON.parse(res.data.data))
                
                this.manufactorCode = myData.afwindProducts.manufactorCode;
                this.propretiesName = myData.afwindProducts.propretiesName;
                this.figureNo = myData.afwindProducts.figureNo;
                this.brandName = myData.afwindProducts.afwindBrand.brandName;
                this.specifications = myData.afwindProducts.specifications;
                this.typei = myData.afwindProducts.typei;
                // this.category = myData.afwindProducts.afwindCategory.name;  //商品分类
                this.manufacturer=myData.afwindProducts.manufacturer;
                this.productsPicList=myData.afwindProducts.afwindProductPic;
                this.natureConfig = myData.natureConfig.valuei;
                this.commerceName = myData.commerceName;
                this.commercePurpose = myData.afwindProductsCommercePurpose;
                this.sellertCode = myData.sellertCode;
                this.seoKeyword = myData.seoKeyword;
                this.seoDescribe = myData.seoDescribe;
                this.details = myData.details;
                this.installGuidance = myData.installGuidance;
                this.stock = myData.stock;
                this.price = myData.price;
                this.cycle = myData.cycle;
                this.waitPrice = myData.waitPrice;
                this.waitCycle = myData.waitCycle;
                this.meteringUnit = myData.meteringUnit;
                this.smallGoods = myData.smallGoods;
                this.unitNum = myData.unitNum;
                this.discount = myData.discount;
                this.relatedServe = myData.relatedServe;
                this.warrantyType = myData.warrantyType;
                this.warrantyTime = myData.warrantyTime;
                this.freightBear = myData.freightConfig.valuei;
                this.weight = myData.weight;
                this.volume = myData.volume;
                this.transportRequire = myData.transportConfig.valuei;
                this.storageRequire = myData.storageConfig.valuei;
                this.attributeTitle = myData.afwindProductAttribute;
              }).catch(() => {
                console.log("弹框数据请求失败");
              })
        }
    },
    created(){
      
    },
    methods: {
        cancel(){
          this.dialogArr.status = false;
          this.$emit("examineStatus",this.dialogArr.status)
        },
        sure(){
            this.dialogArr.status = false;
          this.$emit("examineStatus",this.dialogArr.status)
        },
      //关闭弹窗  
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit("examineStatus",!this.dialogArr.status)
            done();
          })
          .catch(_ => {});
      }
    }
} 
</script>

<style>
.gridtable {
  /* float: left; */
  margin-right: 5px;
  width: 200px;
  color: #6f6f6f;
  border: 1px solid #ddd;
  }
.gridtable th,
.gridtable td {
  padding: 5px;
  border: 1px solid #ddd;
}

</style>


