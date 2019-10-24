//index.js
var classList1 = [{
  id: '',
  name: '全部'
}]
//获取应用实例
const appinit = getApp();
import request from '../utils/network.js';
import imageUtil from '../utils/imageUtil.js';
import collectPost from '../utils/focus/collectPost.js';
Page({
  data: {
    //页面图片路径
    pageimg: [{
      url: '/images/index/ss@3x.png'
    },
    {
      url: '/images/index/more@3x.png'
    },
    {
      url: '/images/index/down@3x.png'
    },
    {
      url: '/images/index/share@3x.png'
    },
    {
      url: '/images/collect.png'
    }, {
      url: '/images/collect_on.png'
    },
    ],

    classList: [], //分类列表

    classTwoList: [], //二级分类列表

    categoryId: '', //所选分类id

    categoryTwoId: '', //所选二级分类id

    productList: [], //产品列表页

    pageNum: 1, //当前页数

    pageSize: 10, //每页记录数

    keyword: '', //搜索关键字

    isnulllist: true, //是否允许加载

    isnulllistshowimg: false,

    userType: 0,

    showtype: false,

    isPullDown: false,

    scrollTop: 0,

    menu_two: false,

    menu_two2: false,

    animationOne: Object,

    getclassListNum: 20,
  },

  onLoad: function (event) {
    var than = this;
    //获取分类列表
    than.getclassList();
    var sett = setInterval(() => {
      if (than.data.getclassListNum > 0) {
        than.setData({
          getclassListNum: than.data.getclassListNum - 1
        })
        if (appinit.appData.userInfoStatus) {
          wx.hideLoading();
          than.setData({
            userType: appinit.appData.userInfo.type
          })
          clearInterval(sett);
          than.getclassList();
          //获取产品列表
          than.getproductList();
        }
      } else if (than.data.getclassListNum == 0) {
        wx.hideLoading();
        clearInterval(sett);
        //获取产品列表
        than.getproductList();
      }
    }, 200)

  },

  //监听页面显示
  onShow: function (event) {
    var than = this;
    if (appinit.appData.userInfoStatus) {
      wx.removeStorageSync("viewShow");
      if (!wx.getStorageSync("onshownum")) {
        if (event && event.issx) {
          //获取产品列表
          than.getproductList();
        }

        than.setData({
          userType: appinit.appData.userInfo.type
        })

        //刷新分类
        than.getclassList();
        wx.setStorageSync("onshownum", 1);
      }
    }
    wx.setStorageSync("shopVS", 1);//用户判断收藏关注页面进入条件
  },

  onHide() {
    wx.removeStorageSync("onshownum");
  },

  //下拉刷新监听
  onPullDownRefresh(e) {
    setTimeout(() => {
      var than = this;
      //设置选中分类id
      than.setData({
        pageNum: 1,
        isnulllist: true,
        productList: [],
        // isnulllistshowimg: false,
        isPullDown: true,
        menu_two: false,
      })
      //获取产品列表
      than.getproductList();
    }, 1500)
  },
  //点击--------------------------------------------------------------------------------------------------------
  //隐藏二级菜单
  hidemenuclick: function () {
    if (this.data.menu_two || this.data.menu_two2) {

      this.setData({
        menu_two2: false,
        menu_two: true
      })
    }
  },
  //二级菜单更多
  moreshowclick: function () {
    this.setData({
      menu_two2: true,
      menu_two: false
    })
  },

  //跳转商家店铺首页列表
  toShopIndexPage: function (e) {
    var shopUri = e.currentTarget.dataset.shopuri;
    // url: '/pages/focus/shopindex/shopindex?shopUri=' + shopUri
    wx.navigateTo({
      url: '/pages/merchant/index/index?shopUri=' + shopUri
    })
  },

  //显示切换
  showtypeClick: function () {
    var than = this;
    than.setData({
      pageNum: 1,
      productList: [],
      isnulllist: true,
      isnulllistshowimg: false,
      showtype: this.data.showtype ? false : true
    })
    //获取产品列表
    than.getproductList();
  },

  //详情跳转
  bindplaynow: function (event) {
    var id = event.currentTarget.id;
    var shopUri = event.currentTarget.dataset.shopuri;
    wx.navigateTo({
      url: '/pages/products/productdetail/productdetail?id=' + id + '&shopUri=' + shopUri,
    })
  },

  //自定义事件:跳转搜索页面
  tosearchPage: function (e) {
    var keyword = this.data.keyword;
    wx.navigateTo({
      url: '/pages/seachpage/seach?keyword=' + keyword,
    })
  },

  //二级菜单隐藏
  hideMenu: function () {
    this.setData({
      animationOne: Object,
      menu_two: false
    })
  },

  //分类点击
  selectClass(event) {
    var than = this;
    var categoryId = event.currentTarget.dataset.ids;
    var ind = event.currentTarget.dataset.ind;
    var twolength = than.data.classList[ind].children ? than.data.classList[ind].children.length : 0;
    // if (categoryId != than.data.categoryId){
    //设置选中分类id
    this.setData({
      categoryId: categoryId,
      menu_two: twolength > 0 ? true : false,
      pageNum: 1,
      productList: [],
      isnulllist: true,
      isnulllistshowimg: false,
      menu_two2: false,
      categoryTwoId: "",
      scrollTop: 0
    })
    if (twolength > 0) {

      //二级菜单展示
      var animation = wx.createAnimation({
        duration: 300,
        timingFunction: 'ease',
      })
      animation.width(250 + 'rpx').step();
      var classTwoList = than.data.classList[ind].children;
      than.setData({
        animationOne: animation.export(),
        classTwoList: classTwoList,
      })
    } else {
      this.setData({
        menu_two: false,
        categoryTwoId: ""
      })
    }
    //获取产品列表
    than.getproductList();
    // }

  },

  //二级分类选择
  selectTwoClass: function (e) {
    var than = this;
    var categoryTwoId = e.currentTarget.dataset.ids;
    //设置选中分类id
    than.setData({
      categoryTwoId: categoryTwoId,
      pageNum: 1,
      productList: [],
      isnulllist: true,
      isnulllistshowimg: false,
      menu_two2: false,
      menu_two: true,
    })
    //获取产品列表
    than.getproductList();
  },

  /**
   * 全屏预览图片
   */
  previewImage(event) {
    var than = this;
    var list = event.currentTarget.dataset.list;
    for (var i = 0; i < list.length; i++) {
      list[i] = list[i] + '';
    }
    wx.previewImage({
      urls: list, // 需要预览的图片http链接列表
      current: event.currentTarget.dataset.current + ''
    })
  },

  //视频播放点击
  indexvideoplay: function (event) {
    var videourl = event.currentTarget.dataset.videourl;
    wx.navigateTo({
      url: '/pages/videopage/videoplay?videourl=' + videourl + '&&type=0'
    })

  }

  ,

  //转发点击
  onShareAppMessage: function (res) {
    var than = this;
    var shareAgentId = "";//代理用户标识
    if (appinit.appData.userInfoStatus) {
      shareAgentId = appinit.appData.userInfo.id;
    }
    if (res.from != "menu") {
      var data = res.target;
      var shareGoodsId = data.id;//产品id
      var shareShopUri = data.shopUri;//商家标识
      return {
        title: data.dataset.title,
        path: '/pages/products/productdetail/productdetail?shareGoodsId=' + shareGoodsId + '&shareShopUri=' + shareShopUri + '&shareAgentId=' + shareAgentId,
        imageUrl: data.dataset.img,
      }
    } else {
      return {
        title: "首页",
        path: '/pages/index/index?shareAgentId=' + shareAgentId
      }
    }
  },

  //下载点击
  downloadClick: function (e) {
    var dataset = e.currentTarget.dataset;
    var list = dataset.list || [];
    var text = dataset.text || "";
    var data = {
      list: list,
      text: text,
    }
    imageUtil.downLoadImg(data);
  },

  //收藏点击
  collectgood: function (e) {
    var flg = appinit.loginreturn();
    if (flg) {
      var than = this;
      var event = e.currentTarget.dataset;
      var data = {
        goodsId: event.goodsid,//商品标识
        type: event.collect ? 0 : 1
      }
      collectPost.collectgood('index', data, event.ind, than)
    }
  },
  //方法------------------------------------------------------------------------------------------------

  //获取分类列表
  getclassList() {
    var than = this;
    var data = {}
    if (appinit.appData.userInfoStatus) {
      data.userAccountId = appinit.appData.userInfo.id;
    }
    request({
      url: appinit.appData.port.goodscategorys,
      method: 'post',
      data: data,
      log: true,
    }).then(res => {
      if (res.data.result.success) {
        if (res.data.data) {
          res.data.data = classList1.concat(res.data.data);
        } else {
          res.data.data = classList1;
        }
        than.setData({
          classList: res.data.data, //渲染分类列表
          categoryId: than.data.categoryId ? than.data.categoryId : res.data.data[0].id //设置默认选中分类id
        })
      }
    }).catch(err => { })

  },

  //获取产品列表
  getproductList() {
    var than = this;
    if (than.data.isnulllist) {
      var data = {
        openId: appinit.appData.openId, //必须
        categoryId: than.data.categoryTwoId + "".length > 0 ? than.data.categoryTwoId : than.data.categoryId, //分类标识
        keyword: than.data.keyword, //关键词
        page: {
          pageNum: than.data.pageNum,
          pageSize: than.data.pageSize
        },
      }
      if (appinit.appData.userInfoStatus) {
        data.userAccountId = appinit.appData.userInfo.id
      }
      request({
        log: true,
        isshow: than.data.isPullDown ? false : true,
        url: appinit.appData.port.goodslist,
        method: 'post',
        data: data
      }).then(res => {

        if (res.data.result.success && res.data.infos) {
          if (res.data.infos.length == 0) {
            than.setData({
              isnulllist: false,
              isnulllistshowimg: than.data.pageNum == 1 ? true : false
            })
          }
          var list = [];
          if (than.data.isPullDown) {
            //下拉刷新请求
            list = res.data.infos;
          } else {
            list = than.data.productList.concat(res.data.infos);
          }
          than.setData({
            productList: list
          })
        } else {
          than.setData({
            isnulllistshowimg: true
          })
        }
        if (than.data.isPullDown) {
          than.setData({
            isPullDown: false,
            scrollTop: 0
          })
          wx.stopPullDownRefresh();
        }
      }).catch(err => {
        wx.showToast({
          title: '网络出错',
          icon: 'none',
          mask: true,
          duration: 2000
        })
        if (than.data.isPullDown) {
          wx.stopPullDownRefresh();
        }
      })
    } else {
      wx.hideLoading();
    }


  },

  //滚动到底部加载
  scrollLower: function () {
    var than = this;
    if (than.data.isnulllist) {
      than.setData({
        pageNum: Number(than.data.pageNum + 1)
      })
      than.getproductList();
    }
  },

  //图片保存本地
  saveImage: function (e) {
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {

            }
          })
        }
      }
    })
    wx.showToast({
      title: '图片点击',
    })
    console.log('下载点击', e);
    var img = e.currentTarget.dataset.img;
    console.log('下载', img);
    wx.saveImageToPhotosAlbum({
      filePath: img,
      success: function (res) {
        console.log('保存成功', res);
      }
    })
  }

})