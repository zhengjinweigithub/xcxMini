//app.js
//导入域名配置
//请求封装
import request from '/utils/network.js';
import * as domainUtil from '/utils/domainUtil.js';
const domainList = domainUtil.domainList;
App({
  appData: {
    port: {
      miniAppKey: domainList.miniAppKey,
      appId: domainList.appId,
      queryopenid: domainList.request + '/wx/user/queryopenid',//获取openId
      perfectinfo: domainList.request + '/wx/user/perfectinfo',//完善个人信息
      getUserInfoByAdmin: domainList.request + '/wx/user/info',//获取用户信息
      personset: domainList.request + '/wx/user/personset',//个人设置
      feedback: domainList.request + '/wx/user/feedback',//意见反馈
      paypwdadd: domainList.request + '/wx/user/paypwd/add',//添加支付密码
      paypwdreset: domainList.request + '/wx/user/paypwd/reset',//重置支付密码
      balanceexempt: domainList.request + '/wx/user/balance-exempt',//开通免密支付
      fixsupplier: domainList.request + '/wx/user/fixsupplier',//固定我的为商家

      goodsnewest: domainList.request + '/wx/goods/newest',//获取发布的最新商品
      goodslist: domainList.request + '/wx/goods/list',//首页产品列表
      goodsdesc: domainList.request + '/wx/goods/desc',//商品详情页
      goodspublish: domainList.request + '/wx/goods/publish',//商品发布
      goodssupplierlist: domainList.request + '/wx/goods/supplier-list',//商品管理列表
      uppershelf: domainList.request + '/wx/goods/uppershelf',//商品上架
      lowershelf: domainList.request + '/wx/goods/lowershelf',//商品下架
      goodsdel: domainList.request + '/wx/goods/del',//商品删除
      goodsedit: domainList.request + '/wx/goods/edit',//商品修改
      goodsclear: domainList.request + '/wx/goods/clear',//清空草稿箱
      goodsattributes: domainList.request + '/wx/goods/attributes',//获取属性列表
      goodscategorys: domainList.request + '/wx/category/list',//获取分类列表
      goodscategoryall: domainList.request + '/wx/goods/categorys',//获取分类列表全部
      categorysupplier: domainList.request + '/wx/category/supplier-list',//获取店铺分类列表
      collectgood: domainList.request + '/wx/collect/goods',//收藏商品
      collectiscollect: domainList.request + '/wx/collect/iscollect',//是否收藏
      collectlist: domainList.request + '/wx/collect/list',//收藏列表
      categorypublist: domainList.request + '/wx/category/pub-list',//分类列表(发布时使用)

      userheadimg: domainList.upload + '/upload/user/headimg',//上传头像
      delfile: domainList.request + '/upload/del-file',//删除文件
      uploadgoodsfile: domainList.request + '/upload/goods/file',//文件上传
      uploadvideofile: domainList.request + '/upload/goods/video',//视频文件文件上传
      uploadwatermark: domainList.request + '/upload/user/watermark',//审核图片上传


      addresslist: domainList.request + '/wx/address/user',//用户地址列表
      addressadd: domainList.request + '/wx/address/add',//用户地址新增
      addressedit: domainList.request + '/wx/address/edit',//更新收货地址
      addressdel: domainList.request + '/wx/address/del',//删除收货地址

      districtlist: domainList.request + '/wx/district/list',//获取全部行政区划
      districtchildren: domainList.request + '/wx/district/children',//获取子级行政区划

      orderadd: domainList.request + '/wx/order/add',//生成订单
      orderlist: domainList.request + '/wx/order/list',//订单列表
      orderinfo: domainList.request + '/wx/order/desc',//订单详情
      confirmship: domainList.request + '/wx/order/confirm-ship',//确认发货
      confirmtake: domainList.request + '/wx/order/confirm-take',//确认收货
      ordercomment: domainList.request + '/wx/order/comment',//订单评价
      orderpay: domainList.request + '/wx/order/pay',//订单支微信付
      balancepay: domainList.request + '/wx/order/balance-pay',//订单余额支付
      ordercancel: domainList.request + '/wx/order/cancel',//取消订单

      application: domainList.request + '/wx/refund/application',//申请退款
      outcancel: domainList.request + '/wx/refund/cancel',//取消退款
      refundinfo: domainList.request + '/wx/refund/info',//退款详情
      refundagree: domainList.request + '/wx/refund/agree',//同意退款
      refundreject: domainList.request + '/wx/refund/reject',//拒绝退款
      intervene: domainList.request + '/wx/refund/intervene',//平台介入
      refundsend: domainList.request + '/wx/refund/send',//用户确认退货
      confirmsend: domainList.request + '/wx/refund/confirm-send',//商家确认收货
      commentinfo: domainList.request + '/wx/comment/info',//评价详情


      supplierdesc: domainList.request + '/wx/supplier/desc',//获取商户信息
      supplierapply: domainList.request + '/wx/supplier/apply',//商户申请
      supplierinfo: domainList.request + "/wx/supplier/info",//查看商户申请
      supplierfanslist: domainList.request + "/wx/supplier/fans-list",//粉丝列表


      warrantadd: domainList.request + '/wx/warrant/add',//缴纳消保金
      warrantthaw: domainList.request + '/wx/warrant/thaw',//消保金提现申请
      warrantlist: domainList.request + '/wx/warrant/list',//消保金明细

      expresslist: domainList.request + "/express/list",//快递公司列表
      expressquery: domainList.request + "/express/query",//查询物流信息


      balancewithdraw: domainList.request + "/wx/balance/withdraw",//余额提现
      balancerecharge: domainList.request + "/wx/balance/recharge",//余额充值
      balancelist: domainList.request + "/wx/balance/list",//余额明细
      withdrawcategory: domainList.request + "/wx/balance/category",//余额明细分类
      receiveorshipp: domainList.request + "/wx/balance/receiveorshipp",//待发货,待收货的金额

      withdrawquery: domainList.request + "/wx/withdraw/query",//当日提现次数

      fansfollow: domainList.request + "/wx/fans/follow",//关注店铺
      fanslist: domainList.request + "/wx/fans/list",//关注列表
      fansisfollow: domainList.request + "/wx/fans/isfollow",//是否关注
      fanstop: domainList.request + "/wx/fans/top",//关注置顶


      kucoininfo: domainList.request + '/wx/kucoin/info',//金币信息
      kucoinlist: domainList.request + '/wx/kucoin/list',//金币明细列表
      categorykucoinlist: domainList.request + '/wx/category/kucoin-list',//金币明细分类列表
      kucoinwithdraw: domainList.request + '/wx/kucoin/withdraw',//金币提现


    },

    userInfo: {},//用户信息
    orderInfo: {},//订单统计
    openId: wx.getStorageSync("openId") || null,
    userInfoStatus: false,//用户信息获取状态
    openIdStatus: wx.getStorageSync("openId") ? true : false,
    loginStatus: false,//登录状态
    shareAgentId: '',
    isty: false,//是否体验用户

  },

  //---------------------------函数--------------------------------------------------------

  //获取平台用户信息
  getAppUserInfo: function (openId) {
    var than = this;
    request({
      url: than.appData.port.getUserInfoByAdmin,
      method: 'post',
      data: {
        openId: openId
      },
      isshow: false,
      log: true
    }).then(res => {//成功
      if (res.data.result.success && res.data.info) {
        than.appData.userInfoStatus = true;//用户信息获取状态
        than.appData.userInfo = res.data.info;
        than.appData.orderInfo = res.data.orderInfo;
        than.appData.userInfo.gdheadimg = res.data.info.headimg;//用于用户头像修改

        if (res.data.info.shopUri) {//为商家
          than.appData.userInfo.goodsManagerNum = res.data.supplierInfo.goodsManagerNum;
          than.appData.userInfo.fansNum = res.data.supplierInfo.fansNum;
          //显示发布
          // wx.setTabBarItem({
          //   index: 1,
          //   text:'发布',
          //   iconPath:'/images/index/fb@3x.png',
          //   selectedIconPath: '/images/index/fb_on@3x.png',
          // })
        }
      } else {
        setTimeout(() => {
          // this.wxlogin(20);
        }, 2000)
      }
    }).catch(err => {
      setTimeout(() => {
        // this.wxlogin(20);
      }, 2000)
    })

  },

  //未登录拦截
  loginreturn: function () {
    if (!this.appData.userInfoStatus) {
      wx.showToast({
        title: '请先前往个人中心登录',
        icon: 'none',
        duration: 2000
      })
      return false;
    } else {
      return true;
    }
  },

  //--------------------------------------生命周期监听----------------------------------------------------

  //小程序初始化（全局只触发一次）
  onLaunch: function (options) {
    console.log('小程序初始化', options)
    if (options.query.shareAgentId) {
      this.appData.shareAgentId = options.query.shareAgentId;
    }
  },

})
