
'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
let xrTargetURL = 'http://192.168.1.100:8082/commerce-web';
let jyTargetURL = 'http://192.168.1.222:8082/commerce-web';
let lqTargetURL = 'http://192.168.1.12:8082/commerce-web';
let TARGET = "http://127.0.0.1:8050/commerce-web"

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/regist/saveregist.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/saveregist.ajax': '/regist/saveregist.ajax'
        }
      },
      '/regist/tostortmessage.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/tostortmessage.ajax': '/regist/tostortmessage.ajax'
        }
      },
      '/entanduser/upload.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/upload.ajax': '/entanduser/upload.ajax'
        }
      },
      '/regist/countenterprisename.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countenterprisename.ajax': '/regist/countenterprisename.ajax'
        }
      },
      '/regist/countcreditcode.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countcreditcode.ajax': '/regist/countcreditcode.ajax'
        }
      },
      '/regist/countusename.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countusename.ajax': '/regist/countusename.ajax'
        }
      },
      '/regist/countmobile.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/regist/countmobile.ajax': '/regist/countmobile.ajax'
        }
      },
      '/xuan/verifyCode.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/xuan/verifyCode.ajax':'/xuan/verifyCode.ajax'
        }
      },
      '/login.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^login.ajax':'login.ajax'
        }
      },
      '/region/region.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/region/region.ajax':'/region/region.ajax'
        }
      },
      '/entanduser/updateEntAndUser.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateEntAndUser.ajax':'/entanduser/updateEntAndUser.ajax'
        }
      },
      '/entanduser/getEntAndUser.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/getEntAndUser.ajax':'/entanduser/getEntAndUser.ajax'
        }
      },
      '/entanduser/gettypei.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/gettypei.ajax':'/entanduser/gettypei.ajax'
        }
      },
      '/entanduser/getEntityIndustryList.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/getEntityIndustryList.ajax':'/entanduser/getEntityIndustryList.ajax'
        }
      },
      '/entanduser/updateEnt.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateEnt.ajax':'/entanduser/updateEnt.ajax'
        }
      },
      '/entanduser/updateUser.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/entanduser/updateUser.ajax':'/entanduser/updateUser.ajax'
        }
      },
      '/store/insertstore.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/store/insertstore':'/store/insertstore'
        }
      },
      '/store/upload.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/store/upload.ajax':'/store/upload.ajax'
        }
      },
      '/brand/savebrand.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brand/savebrand.ajax':'/brand/savebrand.ajax'
        }
      },
      '/brandrequest/selectByExample':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandrequest/selectByExample':'/brandrequest/selectByExample'
        }
      },
      '/brandrequest/updateStatus':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandrequest/updateStatus':'/brandrequest/updateStatus'
        }
      },
      '/brandrequest/selectByPrimaryKeyadmin.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandrequest/selectByPrimaryKeyadmin.ajax':'/brandrequest/selectByPrimaryKeyadmin.ajax'
        }
      },
      '/brand/deletebrand':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brand/deletebrand':'/brand/deletebrand'
        }
      },
      '/brandrequest/deleteByExample':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandrequest/deleteByExample':'/brandrequest/deleteByExample'
        }
      },
      '/brand/updatebrand.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brand/updatebrand.ajax':'/brand/updatebrand.ajax'
        }
      },
      '/storeAdmin/selectStoreInfoById.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/storeAdmin/selectStoreInfoById.ajax':'/storeAdmin/selectStoreInfoById.ajax'
        }
      },
      '/product/verificationProductes.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/product/verificationProductes.ajax':'/product/verificationProductes.ajax'
        }
      },
      '/product/insertProducts.ajax':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/product/insertProducts.ajax':'/product/insertProducts.ajax'
        }
      },
      '/category/selectCategoryByExample':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/category/selectCategoryByExample':'/category/selectCategoryByExample'
        }
      },
      '/AfwindProductcommerce/selectConfig':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/selectConfig':'/AfwindProductcommerce/selectConfig'
        }
      },
      '/AfwindProductcommerce/getProductsCommerceAndPicAndBrandByCategoryId':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getProductsCommerceAndPicAndBrandByCategoryId':'/AfwindProductcommerce/getProductsCommerceAndPicAndBrandByCategoryId'
        }
      },
      '/AfwindProductcommerce/getBrandOrderById':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getBrandOrderById':'/AfwindProductcommerce/getBrandOrderById'
        }
      },
      '/AfwindProductcommerce/recommend':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/recommend':'/AfwindProductcommerce/recommend'
        }
      },
      '/AfwindProductcommerce/getProductsAndProductsCommerceAndPicBySaleUpAndDown':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getProductsAndProductsCommerceAndPicBySaleUpAndDown':'/AfwindProductcommerce/getProductsAndProductsCommerceAndPicBySaleUpAndDown'
        }
      },
      '/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySalePriceUpAndDown':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySalePriceUpAndDown':'/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySalePriceUpAndDown'
        }
      },
      '/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySaleCycleUpAndDown':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySaleCycleUpAndDown':'/AfwindProductcommerce/getAllProductsAndProductsCommerceAndPicBySaleCycleUpAndDown'
        }
      },
      '/AfwindProductcommerce/selectBrandBysaleType':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/selectBrandBysaleType':'/AfwindProductcommerce/selectBrandBysaleType'
        }
      },
      '/brandrequest/selectBrandByFirstName':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandrequest/selectBrandByFirstName':'/brandrequest/selectBrandByFirstName'
        }
      },
      '/AfwindProductcommerce/getMeteringList':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getMeteringList':'/AfwindProductcommerce/getMeteringList'
        }
      },
      '/AfwindProductcommerce/insertCommerceProducts':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/insertCommerceProducts':'/AfwindProductcommerce/insertCommerceProducts'
        }
      },
      '/AfwindProductcommerce/getPurposeList':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getPurposeList':'/AfwindProductcommerce/getPurposeList'
        }
      },
      '/productcommerce/selectCommerceProductInfo':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/productcommerce/selectCommerceProductInfo':'/productcommerce/selectCommerceProductInfo'
        }
      },
      '/store/selectByStoreId':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/store/selectByStoreId':'/store/selectByStoreId'
        }
      },
      '/category/selectByExampleList':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/category/selectByExampleList':'/category/selectByExampleList'
        }
      },
      '/AfwindProductcommerce/getThirdProductsRelatesByThirdCategoryBySaleVAndStockUpAndDown':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getThirdProductsRelatesByThirdCategoryBySaleVAndStockUpAndDown':'/AfwindProductcommerce/getThirdProductsRelatesByThirdCategoryBySaleVAndStockUpAndDown'
        }
      },
      '/AfwindProductcommerce/getProductsCommerceListByBrandId':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getProductsCommerceListByBrandId':'/AfwindProductcommerce/getProductsCommerceListByBrandId'
        }
      },
      '/brandCategory/getCategoryByBrandId':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/brandCategory/getCategoryByBrandId':'/brandCategory/getCategoryByBrandId'
        }
      },
      '/AfwindProductcommerce/getProductBrandByCategoryFirstId':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/getProductBrandByCategoryFirstId':'/AfwindProductcommerce/getProductBrandByCategoryFirstId'
        }
      },
      // 改动url
      '/AfwindProductcommerce/selectByExampleList':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/selectByExampleList':'/AfwindProductcommerce/selectByExampleList'
        }
      },
//新增通过id 查询商品信息
      '/AfwindProductcommerce/selectCommerceProductInfo':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/selectCommerceProductInfo':'/AfwindProductcommerce/selectCommerceProductInfo'
        }
      },
//库存价格管理
      '/AfwindProductcommerce/selectByExampleListStatus':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/selectByExampleListStatus':'/AfwindProductcommerce/selectByExampleListStatus'
        }
      },
//编辑 审核通过后修改信息提交的接口
      '/AfwindProductcommerce/updateCommerceProducts':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/updateCommerceProducts':'/AfwindProductcommerce/updateCommerceProducts'
        }
      },
//编辑 审核未通过修改信息提交的接口
      '/AfwindProductcommerce/updateCommerceAndProducts':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/updateCommerceAndProducts':'/AfwindProductcommerce/updateCommerceAndProducts'
        }
      },
// 点击上下架 接口
      '/AfwindProductcommerce/updateStatus':{
        target:TARGET,
        changeOrigin: true,
        pathRewrite:{
          '^/AfwindProductcommerce/updateStatus':'/AfwindProductcommerce/updateStatus'
        }
      },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
