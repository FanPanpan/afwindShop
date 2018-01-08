<template>
    <el-dialog :visible.sync="editArr.status" width="70%" :before-close="handleClose" center>
     
        <!-- status===37商品基本信息不能修改，其他都能修改 -->
        <div class="new_nav" v-if="proStatus === '37'?true:false">
        
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="商品基本信息" name="basicInfo">
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
                            <p>商品品牌：{{productBrandValue}}</p>
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
                            <div style="width:100px;height:100px;float:left;">
                            <img :src="'http://47.92.122.228:8021'+productsPicList.url" width="100%" height="100%;">
                            </div>
                        </div>
                    </div>
                    <div class="addNewPro_btn">
                    <el-button @click="proBasicBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品详细信息" name="details">
                <div class="addNewPro">
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品性质：</p>
                    <el-select  @change="getProNatureId(nature)" v-model="nature" :selected="nature">
                        <el-option v-for="item in productNature" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品俗称：</p>
                    <el-input v-model="productVulgo" placeholder="请输入商品俗称">{{productVulgo}}</el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品用途：</p>
                    <ul style="overflow:hidden">
                        <li v-for="(item,index) in commercePurpose" style="float:left;">
                            {{item.purposeList.useName}}
                        </li>
                    </ul>
                    <el-button type="primary" @click="showPurpose">点击获取</el-button>
                    <transition name="fold">
                        <div class="checkbox_group" v-show="!hidePurpose">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox v-for="item in proPurpose" :label="item.id" :key="item.id">{{item.useName}}</el-checkbox>
                        </el-checkbox-group>
                        </div>
                    </transition>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>供应商编码：</p>
                    <el-input v-model="vendorCode" placeholder="请输入供应商编码">{{vendorCode}}</el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>SEO关键字：</p>
                    <!-- <el-input v-model="seoKeywords" placeholder="请输入商品俗称">{{seoKeywords}}</el-input> -->
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>SEO描述：</p>
                    <el-input v-model="seoDetails" placeholder="请输入商品俗称">{{seoDetails}}</el-input>
                    </div>
                    <div class="text_wrapper">
                    <p class="text_title">商品详情：</p>
                    <div class="text_content">
                          <div style="width:600px; height:800px"  v-model="proDetails">
                            <img :src="'http://' + proDetails" width="100%" height="100%">
                        </div>
                    </div>
                    </div>
                    <div class="text_wrapper">
                    <p class="text_title">安装指导：</p>
                    <div class="text_content">
                        <quill-editor v-model="installDetails">{{installDetails}}</quill-editor>
                    </div>
                    </div>
                    <div class="addNewPro_btn">
                    <el-button @click="proDetailsBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </div>
                </el-tab-pane>
                <el-tab-pane label="商务信息" name="busInfo">
                <div class="addNewPro">
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">库存数量：</p>
                    <el-tooltip class="item" effect="dark" content="0代表非现货，大于0代表现货" placement="top">
                        <el-input v-model="stockNum" placeholder="请输入库存数量"></el-input>
                    </el-tooltip>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">现存售价(元)：</p>
                    <el-input v-model="existPrice" placeholder="请输入现存售价"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">现货出货周期(工作日)：</p>
                    <el-input v-model="deliveryCycle" placeholder="请输入出货周期"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">非现货售价(元)：</p>
                    <el-input v-model="nonProPrice" placeholder="请输入非现货售价"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">非现货供货周期(工作日)：</p>
                    <el-input v-model="nonDeliveryCycle" placeholder="请输入非现货供货周期"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">计件单位：</p>
                    <el-select v-model="unit" :selected="unit">
                        <el-option v-for="item in proUnit" :key="item.metricunitId" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">最小订货量(最小单位量)：</p>
                    <el-input v-model="leastCargo" placeholder="请输入最小订货量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">单位包装数(个)：</p>
                    <el-input v-model="packNum" placeholder="请输入单位包装数量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品折扣率：</p>
                    <el-input v-model="proDiscount" placeholder="请输入商品折扣率"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品相关服务：</p>
                    <el-input resize="none" type="textarea" :rows="2" placeholder="请输入商品相关服务" v-model="proService"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">质保类型：</p>
                    <el-select  @change="getProGenreId(genre)"  v-model="genre" :selected="genre">
                        <el-option v-for="quality in qualityGenre" :key="quality.value" :label="quality.label" :value="quality.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">质保期限(年)：</p>
                    <el-input v-model="qualityTime" placeholder="请输入质保期限"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">运费承担方：</p>
                    <el-select  @change="getProFreightId(freight)" v-model="freight" :selected="freight">
                        <el-option v-for="freight in freightRole" :key="freight.value" :label="freight.label" :value="freight.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品重量(kg)：</p>
                    <el-input v-model="proWeight" placeholder="请输入商品重量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">包装体积(mm*mm*mm)：</p>
                    <el-input v-model="packVolume" placeholder="请输入包装体积"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">运输要求：</p>
                    <el-select  @change="getProTransportId(transport)" v-model="transport" :selected="transport">
                        <el-option v-for="transport in transportInfo" :key="transport.value" :label="transport.label" :value="transport.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">存储要求：</p>
                    <el-select   @change="getProStorageId(storage)" v-model="storage" :selected="storage">
                        <el-option v-for="storage in storageInfo" :key="storage.value" :label="storage.label" :value="storage.value"></el-option>
                    </el-select>
                    </div>
                    <!-- <div class="text_wrapper">
                    <p class="text_title" style="width: 196px">技术参数：</p>
                    <div class="text_content" style="width: 666px"> -->
                        <!-- <quill-editor v-model="saleGuarantee"></quill-editor> -->
                    <!-- </div> -->
                    <!-- </div> -->
                    <div class="addNewPro_btn">
                    <el-button @click="busInfoBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </div>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="productParams">
                   
                     <div class="addNewPro_item" v-for="(item,index) in attributeTitle">
                        <div>
                            <div class="arr" style="margin-top:10px">参数组:</div>
                            <el-input  v-model="item.name" placeholder="请输入参数标题"></el-input>
                            <div class="controlBtn">
                            <span @click="delAllRow(outerIndex)">[删除]</span>
                            <span @click="addParamsItem(outerIndex)">[添加]</span>
                            </div>
                        </div>
                        <div class="addNew_item" v-for="innerItem in attributeTitle[index].afwindAttribute">
                            <div class="arr"><el-input  v-model="innerItem.remark" style="width:110px;"></el-input></div>
                            <el-input  v-model="innerItem.defaultValue" placeholder="请输入参数名称"></el-input>
                            <div class="controlBtn">
                            <span @click="delTheRow(innerIndex,outerIndex)">[删除]</span>
                            </div>
                        </div>
                      </div>


                    <div class="addNewPro">
                        <div class="addNewPro_btn">
                        <el-button @click="addParams" plain icon="el-icon-plus">添加参数</el-button>
                        <el-button @click="resetParams" plain icon="el-icon-refresh">重置参数</el-button>
                        </div>
                        <div class="addNewPro_item" v-for="(firstTier,outerIndex) in firstProParams">
                        <div>
                            <div class="arr" style="margin-top:10px">参数组:</div>
                            <el-input v-model="firstTier.name" placeholder="请输入参数标题"></el-input>
                            <div class="controlBtn">
                            <span @click="delAllRow(outerIndex)">[删除]</span>
                            <span @click="addParamsItem(outerIndex)">[添加]</span>
                            </div>
                        </div>
                        <div class="addNew_item" v-for="(secondTire,innerIndex) in firstProParams[outerIndex].afwindAttribute">
                            <div class="arr"><el-input  v-model="secondTire.remark" style="width:110px;"></el-input></div>
                            <el-input v-model="secondTire.defaultValue" placeholder="请输入参数名称"></el-input>
                            <div class="controlBtn">
                            <span @click="delTheRow(innerIndex,outerIndex)">[删除]</span>
                            </div>
                        </div>
                        </div>
                        <!-- v-show="proParamsBtn" -->
                        <div class="addNewPro_btn">
                        <el-button @click="submitNewPro" type="primary">提交</el-button>
                        <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
      <!-- status===38 商品全部信息都能修改 -->
        <div class="new_nav" v-if="proStatus !== '37'?true:false">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="商品基本信息" name="basicInfo">
                    <div class="addNewPro">
                        <div class="addNewPro_item">
                            <p>厂家编码：</p>
                            <el-input v-model="manufactorCode" placeholder="请输入厂家编码"></el-input>
                        </div>
                        <div class="addNewPro_item"> 
                            <p>商品名称：</p>
                            <el-input v-model="propretiesName" placeholder="请输入商品名称"></el-input>
                        </div>
                        <div class="addNewPro_item">
                            <p>商品品牌：</p>
                            <el-input v-model="productBrandValue" placeholder="请输入商品品牌"></el-input> 
                            <!-- <el-select @change="getProBrandId(productBrandValue)" v-model="productBrandValue" placeholder="请输入商品品牌">
                              <el-option v-for="item in productBrand" :key="item.id" :label="item.brandName" :value="item.id"></el-option>
                            </el-select> -->
                        </div>
                        <div class="addNewPro_item">
                            <p>商品型号：</p>
                            <el-input v-model="specifications" placeholder="请输入商品型号"></el-input> 
                        </div>
                        <div class="addNewPro_item">
                            <p>商品类型：</p>
                            <el-input v-model="typei" placeholder="请输入商品类型"></el-input>
                        </div>
                        <div class="addNewPro_item">
                            <p>图号：</p>
                            <el-input v-model="figureNo" placeholder="请输入图号"></el-input> 
                        </div>
                        <div class="addNewPro_item">
                           <p>商品分类：</p>
                           <el-cascader  @change="changeKey" placeholder="请选择" :options="options" @active-item-change="getCascaderData"></el-cascader>
                        </div>
                        <div class="addNewPro_item">
                            <p>生产厂家：</p>
                            <el-input v-model="manufacturer" placeholder="请输入生产厂家"></el-input>
                        </div>
                        <div class="addNewPro_item">
                            <p>商品图片：</p>
                            <div style="width:100px;height:100px;float:left;">
                            <img :src="'http://47.92.122.228:8021'+productsPicList.url" width="100%" height="100%;">
                            </div>
                        </div>
                    </div>
                    <div class="addNewPro_btn">
                    <el-button @click="proBasicBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="商品详细信息" name="details">
                <div class="addNewPro">
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品性质：</p>
                    <el-select @change="getProNatureId(nature)" v-model="nature" :selected="nature">
                        <el-option v-for="item in productNature" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品俗称：</p>
                    <el-input v-model="productVulgo" placeholder="请输入商品俗称"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>商品用途：</p>
                     <ul style="overflow:hidden">
                        <li v-for="(item,index) in commercePurpose" style="float:left;">
                            {{item.purposeList.useName}}
                        </li>
                    </ul>
                    <el-button type="primary" @click="showPurpose">点击获取</el-button>
                    <transition name="fold">
                        <div class="checkbox_group" v-show="!hidePurpose">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox v-for="item in proPurpose" :label="item.id" :key="item.id">{{item.useName}}</el-checkbox>
                        </el-checkbox-group>
                        </div>
                    </transition>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>供应商编码：</p>
                    <el-input v-model="vendorCode" placeholder="请输入供应商编码"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>SEO关键字：</p>
                    <el-input v-model="seoKeywords" placeholder="请输入商品俗称"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p>SEO描述：</p>
                    <el-input v-model="seoDetails" placeholder="请输入商品俗称"></el-input>
                    </div>
                    <div class="text_wrapper">
                    <p class="text_title">商品详情：</p>
                    <div class="text_content">
                            <div style="width:600px; height:800px"  v-model="proDetails">
                            <img :src="'http://' + proDetails" width="100%" height="100%">
                        </div>
                    </div>
                    </div>
                    <div class="text_wrapper">
                    <p class="text_title">安装指导：</p>
                    <div class="text_content">
                        <!-- <quill-editor v-model="installDetails">{{installDetails}}</quill-editor> -->
                    </div>
                    </div>
                    <div class="addNewPro_btn">
                    <el-button @click="proDetailsBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </div>
                </el-tab-pane>
                <el-tab-pane label="商务信息" name="busInfo">
                <div class="addNewPro">
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">库存数量：</p>
                    <el-tooltip class="item" effect="dark" content="0代表非现货，大于0代表现货" placement="top">
                        <el-input v-model="stockNum" placeholder="请输入库存数量"></el-input>
                    </el-tooltip>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">现存售价(元)：</p>
                    <el-input v-model="existPrice" placeholder="请输入现存售价"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">现货出货周期(工作日)：</p>
                    <el-input v-model="deliveryCycle" placeholder="请输入出货周期"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">非现货售价(元)：</p>
                    <el-input v-model="nonProPrice" placeholder="请输入非现货售价"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">非现货供货周期(工作日)：</p>
                    <el-input v-model="nonDeliveryCycle" placeholder="请输入非现货供货周期"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">计件单位：</p>
                    <el-select v-model="unit" :selected="unit">
                        <el-option v-for="item in proUnit" :key="item.metricunitId" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">最小订货量(最小单位量)：</p>
                    <el-input v-model="leastCargo" placeholder="请输入最小订货量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">单位包装数(个)：</p>
                    <el-input v-model="packNum" placeholder="请输入单位包装数量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品折扣率：</p>
                    <el-input v-model="proDiscount" placeholder="请输入商品折扣率"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品相关服务：</p>
                    <el-input resize="none" type="textarea" :rows="2" placeholder="请输入商品相关服务" v-model="proService"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">质保类型：</p>
                    <el-select   @change="getProGenreId(genre)" v-model="genre" :selected="genre">
                        <el-option v-for="quality in qualityGenre" :key="quality.value" :label="quality.label" :value="quality.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">质保期限(年)：</p>
                    <el-input v-model="qualityTime" placeholder="请输入质保期限"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">运费承担方：</p>
                    <el-select  @change="getProFreightId(freight)" v-model="freight" :selected="freight">
                        <el-option v-for="freight in freightRole" :key="freight.value" :label="freight.label" :value="freight.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">商品重量(kg)：</p>
                    <el-input v-model="proWeight" placeholder="请输入商品重量"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">包装体积(mm*mm*mm)：</p>
                    <el-input v-model="packVolume" placeholder="请输入包装体积"></el-input>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">运输要求：</p>
                    <el-select  @change="getProTransportId(transport)" v-model="transport" :selected="transport">
                        <el-option v-for="transport in transportInfo" :key="transport.value" :label="transport.label" :value="transport.value"></el-option>
                    </el-select>
                    </div>
                    <div class="addNewPro_item proDetailsInfo">
                    <p style="width: 196px">存储要求：</p>
                    <el-select   @change="getProStorageId(storage)"  v-model="storage" :selected="storage">
                        <el-option v-for="storage in storageInfo" :key="storage.value" :label="storage.label" :value="storage.value"></el-option>
                    </el-select>
                    </div>
                    <!-- <div class="text_wrapper">
                    <p class="text_title" style="width: 196px">技术参数：</p>
                    <div class="text_content" style="width: 666px"> -->
                        <!-- <quill-editor v-model="saleGuarantee"></quill-editor> -->
                    <!-- </div>
                    </div> -->
                    <div class="addNewPro_btn">
                    <el-button @click="busInfoBtn" type="primary">下一步</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </div>
                </el-tab-pane>
                <el-tab-pane label="商品参数" name="productParams">
                <div class="addNewPro">
                    <div class="addNewPro_item" v-for="(item,index) in attributeTitle">
                      <div>
                          <div class="arr" style="margin-top:10px">参数组:</div>
                          <el-input  v-model="item.name" placeholder="请输入参数标题"></el-input>
                          <div class="controlBtn">
                          <span @click="delAllRow(outerIndex)">[删除]</span>
                          <span @click="addParamsItem(outerIndex)">[添加]</span>
                          </div>
                      </div>
                      <div class="addNew_item" v-for="innerItem in attributeTitle[index].afwindAttribute">
                          <div class="arr"><el-input  v-model="innerItem.remark" style="width:110px;"></el-input></div>
                          <el-input  v-model="innerItem.defaultValue" placeholder="请输入参数名称"></el-input>
                          <div class="controlBtn">
                          <span @click="delTheRow(innerIndex,outerIndex)">[删除]</span>
                          </div>
                      </div>
                    </div>


                    <div class="addNewPro_item" v-for="(item,index) in attributeTitle">
                      <div>
                          <div class="arr" style="margin-top:10px">参数组:</div>
                          <el-input  v-model="item.name" placeholder="请输入参数标题"></el-input>
                          <div class="controlBtn">
                          <span @click="delAllRow(outerIndex)">[删除]</span>
                          <span @click="addParamsItem(outerIndex)">[添加]</span>
                          </div>
                      </div>
                      <div class="addNew_item" v-for="innerItem in attributeTitle[index].afwindAttribute">
                          <div class="arr"><el-input  v-model="innerItem.remark" style="width:110px;"></el-input></div>
                          <el-input  v-model="innerItem.defaultValue" placeholder="请输入参数名称"></el-input>
                          <div class="controlBtn">
                          <span @click="delTheRow(innerIndex,outerIndex)">[删除]</span>
                          </div>
                      </div>
                    </div>

                    <div class="addNewPro_btn">
                    <el-button @click="addParams" plain icon="el-icon-plus">添加参数</el-button>
                    <el-button @click="resetParams" plain icon="el-icon-refresh">重置参数</el-button>
                    </div>
                    <div class="addNewPro_item" v-for="(firstTier,outerIndex) in firstProParams">
                    <div>
                        <div class="arr" style="margin-top:10px">参数组:</div>
                        <el-input v-model="firstTier.name" placeholder="请输入参数标题"></el-input>
                        <div class="controlBtn">
                        <span @click="delAllRow(outerIndex)">[删除]</span>
                        <span @click="addParamsItem(outerIndex)">[添加]</span>
                        </div>
                    </div>
                    <div class="addNew_item" v-for="(secondTire,innerIndex) in firstProParams[outerIndex].afwindAttribute">
                        <div class="arr"><el-input  v-model="secondTire.remark" style="width:110px;"></el-input></div>
                        <el-input v-model="secondTire.defaultValue" placeholder="请输入参数名称"></el-input>
                        <div class="controlBtn">
                        <span @click="delTheRow(innerIndex,outerIndex)">[删除]</span>
                        </div>
                    </div>
                    </div>
                        <!-- v-show="proParamsBtn" -->
                    <div class="addNewPro_btn">
                    <el-button @click="submitAddPro" type="primary">提交</el-button>
                    <el-button @click="cancelAddNewPro" type="primary">取消</el-button>
                    </div>
                </div>
                </el-tab-pane>
            </el-tabs>
        </div>

    </el-dialog>         
</template>
<script>
export default {
  data(){
      return{
        editArr:{
            status:false
        },
        morePics:[],
        //选项卡在第一项
        activeName: 'basicInfo',
        //商品基本信息
        manufactorCode:'',
        propretiesName:'',
        figureNo:'',
        productBrandValue:'',
        productBrand:[],
        specifications:'',
        typei: '',
        category:'',
        manufacturer:'',
        productsPicList:[],
 
        //商品详细信息
        productVulgo:'',
        nature:'',
        natureArr:[],
        productNatureId:'',
        checkList:[],//商品用途
        proPurpose:'',
        commercePurpose:[],
        vendorCode:'',
        seoKeywords:'',
        seoDetails:'',
        proDetails:'',
        installDetails:'',
        productNature: [],
        options:[],

        //商务信息
        stockNum:'',
        existPrice:'',
        deliveryCycle:'',
        nonProPrice:'',
        nonDeliveryCycle:'',
        proUnit: [],
        unit:'',
        leastCargo:'',
        packNum:'',
        proDiscount:'',
        proService:'',
        genre:'',
        genreArr:[],
        productGenerId:'',
        qualityGenre: [],
        qualityTime:'',
        freightRole: [],
        freight:'',
        freightArr:[],
        productFreightId:'',
        proWeight:'',
        packVolume:'',
        transportInfo:[],
        transport:'',
        transportArr:[],
        productTransportId:'',
        storageInfo:[],
        storage:'',
        storageArr:[],
        productStorageId:'',
        // saleGuarantee:'',
          
        //商品参数
        attributeTitle:[],
        selectionArr:[],
        finalValue:'',
        addNewProAction:'',
        newProArr:[],
        clickOrNot:false,
       
        hidePurpose:true,
        productFeature:'',
        techParams:'',
        productSize:'',
        usableRange:'',
        firstProParams:[],
        proParamsBtn:false,
        basicInfoControl:'',
        basicInfoControlArrs:[],
        proStatus:''
      }
    },
    props:{
        edit:{
            type:Boolean  
        },
        proId:{
            type:Array
        },
    }, 
    watch:{
        edit(){
            this.editArr.status = this.edit;
        },
        proId(){

            this.$axios.get('/AfwindProductcommerce/selectCommerceProductInfo?id='+this.proId[0])
              .then((res) => {
                this.proStatus = JSON.parse(res.data.data).afwindProducts.status;
                this.productsId = JSON.parse(res.data.data).productsId;
                this.brandId = JSON.parse(res.data.data).afwindProducts.brandId;
                this.AfwindProductId = JSON.parse(res.data.data).afwindProducts.id;

                // console.log(JSON.parse(res.data.data).productsId)
                // console.log(JSON.parse(res.data.data).afwindProducts.brandId)
                // console.log(JSON.parse(res.data.data).afwindProducts.id)
                // console.log(Object.prototype.toString.call(this.proStatus))
                // console.log(this.proStatus)  
            
                // console.log(this.proId[0])
                let myData = JSON.parse(res.data.data);
                console.log(JSON.parse(res.data.data))
                
                this.manufactorCode = myData.afwindProducts.manufactorCode;
                this.propretiesName = myData.afwindProducts.propretiesName;
                this.figureNo = myData.afwindProducts.figureNo;
                this.productBrandValue = myData.afwindProducts.afwindBrand.brandName;
                this.specifications = myData.afwindProducts.specifications;
                this.typei = myData.afwindProducts.typei;
                // this.category = myData.afwindProducts.afwindCategory.name;  //商品分类
                this.manufacturer=myData.afwindProducts.manufacturer;
                this.productsPicList=myData.afwindProducts.afwindProductPic;
                this.nature = myData.natureConfig.id;//商品性质
                this.productVulgo = myData.commerceName;
                this.commercePurpose = myData.afwindProductsCommercePurpose; //商品用途
                this.vendorCode = myData.sellertCode;
                this.seoKeywords = myData.seoKeyword;
                this.seoDetails = myData.seoDescribe;
                this.proDetails = myData.details;
                this.installDetails = myData.installGuidance;
                this.stockNum = myData.stock;
                this.existPrice = myData.price;
                this.deliveryCycle = myData.cycle;
                this.nonProPrice = myData.waitPrice;
                this.nonDeliveryCycle = myData.waitCycle;
                this.unit = myData.meteringUnit;     //计件单位
                this.leastCargo = myData.smallGoods;
                this.packNum = myData.unitNum;
                // this.proDiscount = myData.discount;
                this.proService = myData.relatedServe;
                this.genre = myData.warrantyConfig.id;//   质保类型
                this.qualityTime = myData.warrantyTime;
                this.freight = myData.freightConfig.id; // 运费承担方
                this.proWeight = myData.weight;
                this.packVolume = myData.volume
                this.transport = myData.transportConfig.id;// 运输要求
                this.storage= myData.storageConfig.id;  // 存储要求
                // this.saleGuarantee = myData.afwindProductAttribute;
                this.attributeTitle = myData.afwindProductAttribute;//商品参数

              
              }).catch(() => {
                console.log("弹框数据请求失败");
              })

              //获取商品分类三级下拉菜单
              this.$axios.get('/category/selectCategoryByExample?category=one')
              .then((res) => {
                  let myData = JSON.parse(res.data.data);
                  for(let i = 0; i < myData.length; i++) {
                      this.options.push({
                          label: '',
                          value: '',
                          children: []
                      });
                      this.options[i].label = myData[i].name;
                      this.options[i].value = myData[i].id;
                  }
              }).catch(() => {
                  console.log("下拉菜单数据请求失败");
              })
              //获取商品品牌下拉列表
              this.$axios.get('/brandrequest/selectByExample?pageSize=100')
                  .then((res) =>  {
                  // console.log(JSON.parse(res.data.data));
                  let myData = JSON.parse(res.data.data);
                  this.productBrand = myData.rows;
                  }).catch(() =>  {
                  console.log('商品品牌接口请求失败');
              })
              //获取商品用途多选框
              this.$axios.get('/AfwindProductcommerce/getPurposeList')
              .then((res) => {
                let myData = JSON.parse(res.data.data);
               //   console.log(myData)
                this.proPurpose = myData;
              }).catch(() => {
                console.log("商品用途多选框请求失败")
            })

          //      获取计件单位  获取失败505
            // this.$axios.get('/AfwindProductcommerce/getMeteringList')
            //   .then((res) => {
            //     let myData = JSON.parse(res.data.data);
            //          console.log(JSON.parse(res.data.data));
            //     for (let i = 0;i<myData.length;i++){
            //       this.proUnit.push({
            //         label:'',
            //         value:'',
            //         metricunitDesc:''
            //       });
            //       this.proUnit[i].label = myData[i].metricunitName;
            //       this.proUnit[i].value = myData[i].id;
            //       this.proUnit[i].metricunitDesc = myData[i].metricunitDesc;
            //     }
            //   }).catch(() => {
            //     console.log("计件单位接口请求失败")
            // });

            //      获取商品性质
           this.$axios.get('/AfwindProductcommerce/selectConfig')
            .then((res) => {
              let myData = JSON.parse(res.data.data);
              // console.log(myData)
              //        根据typei判断 创建数组并读取数据
              for (let i = 0;i<myData.length;i++){
                if (myData[i].typei === "4"){
                  this.natureArr.push(myData[i])
                }
                else if(myData[i].typei === "9"){
                  this.genreArr.push(myData[i])
                }
                else if(myData[i].typei === "7"){
                  this.freightArr.push(myData[i])
                }
                else if(myData[i].typei === "10"){
                  this.transportArr.push(myData[i])
                }
                else if(myData[i].typei === "11"){
                  this.storageArr.push(myData[i])
                }
              }
            //   console.log(this.natureArr)
            //   console.log(this.genreArr)
            //   console.log(this.freightArr)
            //   console.log(this.transportArr)
            //   console.log(this.storageArr)
            //          商品性质
              for (let i = 0;i<this.natureArr.length;i++){
                this.productNature.push({
                  label:'',
                  value:'',
                  des:''
                });
                this.productNature[i].label = this.natureArr[i].valuei;
                this.productNature[i].value = this.natureArr[i].id;
                this.productNature[i].des = this.natureArr[i].name;
              }
                    //  质保类型
              for (let i = 0;i<this.genreArr.length;i++){
                this.qualityGenre.push({
                  label:'',
                  value:'',
                  genreDes:''
                });
                this.qualityGenre[i].label = this.genreArr[i].valuei;
                this.qualityGenre[i].value = this.genreArr[i].id;
                this.qualityGenre[i].des = this.genreArr[i].name;
              }
              //          运费承担方
              for (let i = 0;i<this.freightArr.length;i++){
                this.freightRole.push({
                  label:'',
                  value:'',
                  genreDes:''
                });
                this.freightRole[i].label = this.freightArr[i].valuei;
                this.freightRole[i].value = this.freightArr[i].id;
                this.freightRole[i].des = this.freightArr[i].name;
              }
              //          运输要求
              for (let i = 0;i<this.transportArr.length;i++){
                this.transportInfo.push({
                  label:'',
                  value:'',
                  transportDes:''
                });
                this.transportInfo[i].label = this.transportArr[i].valuei;
                this.transportInfo[i].value = this.transportArr[i].id;
                this.transportInfo[i].des = this.transportArr[i].name;
              }
              //          存储要求
              for (let i = 0;i<this.storageArr.length;i++){
                this.storageInfo.push({
                  label:'',
                  value:'',
                  transportDes:''
                });
                this.storageInfo[i].label = this.storageArr[i].valuei;
                this.storageInfo[i].value = this.storageArr[i].id;
                this.storageInfo[i].des = this.storageArr[i].name;
              }
            }).catch(() => {
              console.log("商品性质接口请求失败")
          })
        },
        proStatus(){
        },
    },
    created(){
   
    },
    methods: {
      cancel(){
          this.editArr.status = false;
          this.$emit("editStatus",this.editArr.status)
      },
      sure(){
          this.editArr.status = false;
          this.$emit("editStatus",this.editArr.status)
      },
      //关闭弹窗  
      handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          this.$emit("editStatus",!this.editArr.status)
          done();
        })
        .catch(_ => {});
      },

      handleClick(tab, event) {
        //      console.log(tab, event);
      },
          //      取消新增商品
      cancelAddNewPro(){
        this.$router.go(0);
      },
      //点击下一步跳转
      proBasicBtn(){
        this.activeName = "details";
      },
      proDetailsBtn(){
        this.activeName = "busInfo"
      },
      busInfoBtn(){
        this.activeName = "productParams"
      },
      // 
      showPurpose(){//显示商品用途
        this.hidePurpose = false;
      },
      // 选中商品性质向后台发送id
      getProNatureId(value){
        // console.log(value)
      },

      //选中质保类型向后台发送id
      getProGenreId(value){
        // console.log(value)
      },
      // //选中运费承担方向后台发送id
      getProFreightId(value){
        // console.log(value)
      },
      // //选中运输要求向后台发送id
      getProTransportId(value){
        // console.log(value)
      },
      // //选中存储要求向后台发送id
      getProStorageId(value){
        // console.log(value)
      },

      //审核通过 提交新增商品信息 
      submitNewPro(){
        let reqParams = {
          id:this.proId[0],
          productsId:this.productsId,
          nature:this.nature,//id
          commerceName:this.productVulgo,
        //   商品用途
          ids:this.checkList, //
          afwindProductsCommercePurpose: this.commercePurpose,
          sellertCode:this.vendorCode,
          seoKeyword:this.seoKeywords,
          seoDescribe:this.seoDetails,
          details:this.proDetails,
          installGuidance:this.installDetails,

        //   商务信息
          stock:this.stockNum,
          price:this.existPrice,
          cycle:this.deliveryCycle,
          waitPrice:this.nonProPrice,
          waitCycle:this.nonDeliveryCycle,
          meteringUnit:this.unit,
          smallGoods:this.leastCargo,
          unitNum:this.packNum,
          discount:this.proDiscount,
          relatedServe:this.proService,
          warrantyType:this.genre,//id
          warrantyTime:this.qualityTime,
          freightBear:this.freight,//id
          weight:this.proWeight,
          volume:this.packVolume,
          transportRequire:this.transport,//id
          storageRequire:this.storage,//id
          afwindProductAttribute:this.attributeTitle,
          // afwindProductAttribute:this.firstProParams
        }
        this.$axios.post('/AfwindProductcommerce/updateCommerceProducts',reqParams)
        .then((res) => {
          // console.log(JSON.parse(res.data.data));
        }).catch(() => {
          console.log("审核通过提交失败")
        })
      },

      //审核未通过 提交新增商品信息 
      submitAddPro(){
         let reqParams = {
          id:this.proId[0],
          prodctsId:this.productsId,
          nature:this.nature,//id
          commerceName:this.productVulgo,
          // 商品基本信息
          afwindProducts:{
            id:this.AfwindProductId,
            manufactorCode:this.manufactorCode,
            propretiesName:this.propretiesName,
            brandId: this.brandId,
            specifications:this.specifications,
            typei:this.typei,
            figureNo:this.figureNo,
            category:this.finalValue,
            manufacturer:this.manufacturer,
            afwindProductPic:this.productsPicList,
          },
    
          //   商品用途
          ids:this.checkList, //id
          afwindProductsCommercePurpose: this.commercePurpose,
          sellertCode:this.vendorCode,
          seoKeyword:this.seoKeywords,
          seoDescribe:this.seoDetails,
          details:this.proDetails,
          installGuidance:this.installDetails,

          //   商务信息
          stock:this.stockNum,
          price:this.existPrice,
          cycle:this.deliveryCycle,
          waitPrice:this.nonProPrice,
          waitCycle:this.nonDeliveryCycle,
          meteringUnit:this.unit,
          smallGoods:this.leastCargo,
          unitNum:this.packNum,
          discount:this.proDiscount,
          relatedServe:this.proService,
          warrantyType:this.genre,//id
          warrantyTime:this.qualityTime,
          freightBear:this.freight,//id
          weight:this.proWeight,
          volume:this.packVolume,
          transportRequire:this.transport,//id
          storageRequire:this.storage,//id
          afwindProductAttribute:this.attributeTitle,
        }
        this.$axios.post('/AfwindProductcommerce/updateCommerceAndProducts',reqParams)
        .then((res) => {
          // console.log(JSON.parse(res.data.data));
        }).catch(() => {
          console.log("审核未通过提交失败")
        })
      },
      
      addParams(){//添加参数
        this.firstProParams.push(
          {name:'',afwindAttribute:[{remark:'',defaultValue:''}]}
        );
        this.proParamsBtn = true;
      },
      addParamsItem(outerIndex){//添加参数项
        this.firstProParams[outerIndex].afwindAttribute.push(
          {remark:'',defaultValue:''}
        )
      },
      delAllRow(outerIndex){//删除参数
        this.firstProParams.splice(outerIndex,1);
      },
      delTheRow(innerIndex,outerIndex){//删除参数项
        for(let i = 0;i<this.firstProParams.length;i++){
          if (this.firstProParams[i].afwindAttribute.length === 1){
            alert('最少留一个')
          }else{
            this.firstProParams[outerIndex].afwindAttribute.splice(innerIndex,1);
          }
        }
      },
      resetParams(){//删除所有参数
        //      console.log(this.firstProParams)
        this.firstProParams.splice(0,this.firstProParams.length);
        this.proParamsBtn = false;
      },
         //商品分类
      changeKey(val){
				for (let i = 0;i<this.options.length;i++) {
					for (let j = 0;j<this.options[i].children.length;j++) {
						for (let k = 0;k<this.options[i].children[j].children.length;k++) {
							if (this.options[i].children[j].children[k].value === val[2]) {
								this.finalValue = val[2]
							}
						}
					}
				}
      },
      
        //      获取级联数据
			getCascaderData(val) {
				this.selectionArr = val;
				if(val.length === 1) {
					for(let i = 0; i < this.options.length; i++) {
						if(this.options[i].value === val[0]) {
							let secondLevel = this.options[i].children;
							this.$axios.get('/category/selectCategoryByExample?category=two&id=' + val[0])
								.then((res) => {
									let myData = JSON.parse(res.data.data);
									secondLevel.splice(0, secondLevel.length)
									for(let i = 0; i < myData.length; i++) {
										secondLevel.push({
											label: '',
											value: '',
											children: []
										})
										secondLevel[i].label = myData[i].name;
										secondLevel[i].value = myData[i].id;
									}
								}).catch(() => {
									console.log("数据请求失败");
								})
						}
					}
				} else if(val.length === 2) {
					for(let i = 0; i < this.options.length; i++) {
						for(let j = 0; j < this.options[i].children.length; j++) {
							if(this.options[i].children[j].value === val[1]) {
								let thirdLevel = this.options[i].children[j].children;
								this.$axios.get('/category/selectCategoryByExample?category=three&id=' + val[1])
									.then((res) => {
										let myData = JSON.parse(res.data.data);
										thirdLevel.splice(0, thirdLevel.length);
										for(let i = 0; i < myData.length; i++) {
											thirdLevel.push({
												label: '',
												value: ''
											})
											thirdLevel[i].label = myData[i].name;
											thirdLevel[i].value = myData[i].id;
										}
									}).catch(() => {
										console.log("数据请求失败");
									})
							}
						}
					}

				}
			}
    }
}
</script>

<style scoped>
 .addNewPro_item,.addNew_item{
    margin:20px 0px;
  }
  .addNewPro_item{
    overflow: hidden;
    margin: 10px 0px;
    margin-left:60px;
  }
  .addNewPro_item p{
    float: left;
    width: 112px;
    height: 40px;
    line-height: 40px;
    text-align: right;
  }
  /* 商品用途修改 */
  .proDetailsInfo .addNewPro_item .checkbox_group {
    margin: 4px 0 0 70px;
    width: 800px;
  }
  .addNewPro_item .arr{
    float:left;
    font-family:"microsoft yahei";
    margin:0px 40px;
    width:110px;
    text-align: right;
  }
  .addNewPro_item .arr  .el-input__inner{
    width: 110px;
  }
  .addNewPro_item .el-input{
    float: left;
    width: 430px;
  }
  .addNewPro_item .com_btn{
    margin:0px 190px;
  }
  .com_btn .el-button{
    margin:20px 0px;
  }
  .addNewPro_item .el-textarea{
    float: left;
    width: 400px;
  }
  .addNewPro_item .el-input__inner{
    width: 430px;
  }
  .proDetailsInfo .el-select{
    width: 430px;
  }
  .addNewPro_item .el-input{
    width: 430px;
  }
  .addNewPro_item .el-cascader{
    width: 430px;
  }

  .proDetailsInfo .el-textarea{
    width: 430px;
  }
    .proDetailsInfo .el-checkbox-group{
    width: 430px;
  }
  .addNewPro_btn{
    margin: 10px;
    text-align: center;
  }
  .addNewPro_item .el-upload__tip{
    height: 15px;
  }
  .addNewPro_item .el-upload-list__item{
    margin-left: 100px;
    width: 400px;
  }
  .addNewPro_item .checkbox_group{
    margin: 5px 0 0 112px;
    width: 800px;
  }
  .addNewPro_item .checkbox_group .el-checkbox-group{
    width: 800px;
  }
  .addNewPro_item .checkbox_group .el-checkbox{
    margin-right: 15px;
  }
  .addNewPro_item .checkbox_group .el-checkbox+.el-checkbox{
    margin: 5px 15px 0 0;
  }
 
  .text_wrapper{
    width: 1000px;
    height: 110px;
  }
  .text_title{
    float: left;
    width: 112px;
    text-align: right
  }
  .text_content{
    float: left;
    margin-bottom: 10px;
    width: 800px
  }
  .fold-enter-active,
  .fold-leave-active {
    transition: all .5s;
  }
  .fold-enter,
  .fold-leave-active {
    transform: translate3d(0, -100px, 0);
  }
  .controlBtn{
    float: left;
    margin-left: 5px;
    height: 35px;
    margin-top:10px;
  }
  .controlBtn span{
    cursor: pointer;
  }
  .controlBtn span:hover{
    color: red;
  }
  .proDetailsInfo{
    margin-left: 0;
  }
  .proDetailsInfo .el-checkbox-group{
    width: 430px;
  }


</style>
