var appinit = getApp();
const createRecycleContext = require('miniprogram-recycle-view');
var windowWidth = appinit.appData.sysInfo.windowWidth;
var screenHeight = appinit.appData.sysInfo.screenHeight;
var statusBarHeight = appinit.appData.sysInfo.statusBarHeight;
var obj = Object;
Page({
  categoryId: '',//分类标识
  pageNum: 1,
  postIng: false,
  //页面的初始数据
  data: {
    recycleH: 0,//长列表组件高度
    bottomCss: appinit.appData.bottomCss,
    pageimg1: [
      '/images/sortup.png',
      '/images/sortdown.png',
      '/images/updown.png'
    ],
    sortField: 'all',// 操作的属性  价格-price 销售价-agentPrice 创建时间-intime 销量-sales
    sort: 1, //0-升序!1-降序
  },


  //监听页面加载
  onLoad: function (options) {
    console.log('监听页面加载-----', options);
    options.categoryId = 2;
    if (options && options.categoryId) {

      if (options.categoryName) {
        //设置页面title
        wx.setNavigationBarTitle({
          title: options.categoryName
        })
      }

      //初始化长列表组件
      obj = createRecycleContext({
        id: 'recycleId',
        dataKey: 'recycleList',
        page: this,
        itemSize: this.itemSizeFunc
      })
      //设置参数
      this.categoryId = options.categoryId;
      if (appinit.appData.sysInfo.model.indexOf('iPhone') !== -1) {
        screenHeight = screenHeight - statusBarHeight - 44;
      } else {
        screenHeight = screenHeight - statusBarHeight - 48;
      }
      console.log(Number(screenHeight - 50 - obj.transformRpx(100)))
      this.setData({
        recycleH: Number(screenHeight - 50 - obj.transformRpx(100)),
      })
      //请求列表
      this.getList();
    }
  },

  //监听页面显示
  onShow: function () {

  },

  // 下拉刷新
  onPullDownRefresh: function () {

  },

  // 分享
  onShareAppMessage: function () {

  },

  //----------------------------点击------------------------------------

  //----------------------------方法-----------------------------------
  // item宽高设置
  itemSizeFunc: function (item, idx) {
    item.itemSizeW = windowWidth * 0.5;
    item.itemSizeH = windowWidth * 0.45 + obj.transformRpx(206);
    return {
      width: windowWidth * 0.5,
      height: windowWidth * 0.45 + obj.transformRpx(206)
    }
  },
  //获取列表
  getList() {
    var than = this;
    var data = {
      platform: "ZPo4MV4TqsLfAHkist6wQai7S8tzDVmz",
      categoryId: than.categoryId,//分类标识
      userAccountId: appinit.appData.userInfoStatus ? appinit.appData.userInfo.id : '',//传递用户标识，才会返 follow
    }
    if (than.data.sortField.indexOf('all') != -1) {
      data.page = {
        pageNum: than.pageNum,
        pageSize: 40,
      }
    } else {
      data.page = {
        pageNum: than.pageNum,
        pageSize: 40,
        sortField: than.data.sortField,
        sort: than.data.sort
      }
    }
    wx.request({
      url: 'https://w.taojianlou.com/ut/wx/goods/list',
      method: 'post',
      data: data,
      success(res){
        than.postIng = false;
        if (res.data.result.success && res.data.infos) {
          obj.append(res.data.infos);
        }
      }
    })
  },
  //----------------------------监听------------------------------------

  //滚动到底部
  scrolltolower(e) {
    console.log('滚动到底部', e);
    var than = this;
    if (!than.postIng) {
      //下一页
      than.postIng = true;
      than.pageNum++;
      than.getList();
    }
  },
})