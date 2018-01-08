import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index.vue'
import Home from '../pages/Home/home.vue'
import Login from '../pages/login/login.vue'
import CompleteInfo from '../pages/completeInfo/completeInfo.vue'
import Cart from '../pages/cart/cart.vue'
import goodDetails from '../pages/goods/goodDetails.vue'
import goodsList from '../pages/goods/goods.vue'
import goodsListFromAside from '../components/goodCards/goodsFromAside.vue'
import brandCenterPro from '../pages/brandCenterPro/brandCenterPro.vue'
import User from '../pages/user/user.vue'
import main from '../pages/user/children/main/main.vue'
import passed from '../pages/user/children/basicInfo/passed.vue'
import audit from '../pages/user/children/basicInfo/audit.vue'
import allProducts from '../pages/user/children/productMag/allProducts.vue'
import balanceProducts from '../pages/user/children/productMag/balanceProducts.vue'
import banProducts from '../pages/user/children/productMag/banProducts.vue'
import downProducts from '../pages/user/children/productMag/downProducts.vue'
import newProducts from '../pages/user/children/productMag/newProducts.vue'
import onProducts from '../pages/user/children/productMag/onProducts.vue'
import accountMag from '../pages/user/children/accountMag/accountMag.vue'
import orderMag from '../pages/user/children/orderMag/order.vue'
import settleMag from '../pages/user/children/settleMag/settleMag.vue'
import newBrand from '../pages/user/children/brandMag/newBrand.vue'
import brandList from '../pages/user/children/brandMag/brandList.vue'
import storeMag from '../pages/user/children/storeMag/newStore.vue'
import myStore from '../pages/user/children/storeMag/myStore.vue'
import operationMag from '../pages/user/children/operationMag/operationMag.vue'
import chainMag from '../pages/user/children/chainMag/chainMag.vue'

import deliveryCycle from '../pages/shippingCycleDescription/shippingCycleDescription.vue'



Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Index,
      name:'index',
      redirect: '/home',
      children:[
        {path:'home',component:Home},
        {path:'goodDetails',name:'goodDetails',component:goodDetails}
      ]
    },
    {path:'/goodsList',name:'goodsList', component:goodsList},
    {path:'/brandCenterPro',name:'brandCenterPro', component:brandCenterPro},
    {path:'/goodsListFromAside',name:'goodsListFromAside', component:goodsListFromAside},
    {path:'/login',name:'login',component:Login},
    {path:'/completeInfo',name:'complete',component:CompleteInfo},
    {path:'/cart',name:'cart',component:Cart},
    {
      path:'/user',
      name:'user',
      component:User,
      redirect:'/user/main',
      children:[
        {path:'main',name:'个人中心首页',component:main},
        {path:'passed',name:'我的信息',component:passed},
        {path:'audit',name:'审核中的信息',component:audit},
        {path:'allProducts',name:'全部商品',component:allProducts},
        {path:'balanceProducts',name:'商品库存',component:balanceProducts},
        {path:'banProducts',name:'违规商品',component:banProducts},
        {path:'downProducts',name:'未上架商品',component:downProducts},
        {path:'newProducts',name:'新增商品',component:newProducts},
        {path:'onProducts',name:'已上架商品',component:onProducts},
        {path:'accountMag',name:'账户管理',component:accountMag},
        {path:'orderMag',name:'订单管理',component:orderMag},
        {path:'settleMag',name:'结算管理',component:settleMag},
        {path:'newBrand',name:'新增品牌',component:newBrand},
        {path:'brandList',name:'品牌列表',component:brandList},
        {path:'storeMag',name:'店铺管理',component:storeMag},
        {path:'myStore',name:'我的店铺',component:myStore},
        {path:'operationMag',name:'运营管理',component:operationMag},
        {path:'chainMag',name:'供应链管理',component:chainMag},
      ]
    },
    {path:'/deliveryCycle',name:'供货周期',component:deliveryCycle}
  ]
})
