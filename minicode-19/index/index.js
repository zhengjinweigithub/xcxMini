const app = getApp()
const createRecycleContext = require('miniprogram-recycle-view');
Page({
  pageNum: 1,//页码
  listobj: Object,//RecycleContext对象
  postflg: true,//是否可以加载列表，用户误触控制
  windowWidth: 0,//系统页面可视宽度
  windowHeight:0,
  ischang:true,
  ischang1: false,
  listInd:0,
  data: {},

  onReady: function () {
    var than = this;
    //获取系统参数
    wx.getSystemInfo({
      success: function (res) {
        than.windowWidth = res.windowWidth;
        than.windowHeight = res.windowHeight;
        //创建RecycleContext对象来管理 recycle-view 定义的的数据
        than.listobj = createRecycleContext({
          id: 'recycleId',
          dataKey: 'recycleList',
          page: than,
          itemSize: than.itemSizeFunc,
        })

        than.getlist();//请求接口
      },
    })
  },

  //设置item宽高信息，样式所设必须与之相同
  itemSizeFunc: function (item, idx) {
    var than = this;
    var width = than.windowWidth * 0.5;
    item.itemH = width;
    if (item.ischang){
      item.itemH = width * 2;
    }
    // if (item.idxs == 0){
    //   than.ischang = true;
    //   than.ischang1 = false;
    // }
    // item.itemH = width;
    // if (!item.itemH){      
    //   var height = width;
    //   item.itemH = height;
    //   if (item.idxs % 2 == 0){
    //     if (than.ischang){
    //       item.itemH = height * 2;
    //     }else{
    //       item.itemH = height;
    //     }
    //     than.ischang = !than.ischang;
    //   }
    //   else{
    //     if (than.ischang1) {
    //       item.itemH = height * 2;
    //     } else {
    //       item.itemH = height;
    //     }
    //     than.ischang1 = !than.ischang1;
    //   }
    // }
    return {
      width: width,
      height: item.itemH
    }
  },

  //滚动到底部监听，分页加载
  bindscrolltolower(e) {
    console.log('滚动到底部----');
    if (this.postflg) {
      this.postflg = false;//请求完成前不再更改页码请求接口
      this.pageNum++;
      this.getlist();
    }
  },

  //数据请求
  getlist() {
    var than = this;
    wx.request({
      url: 'https://w.taopaitang.com/api/discover',
      data: {
        page: than.pageNum,
        pagenum:12
      },
      method: 'get',
      success(res) {
        console.log('数据请求成功----' + than.pageNum + '---', res);
        if (res.data.data.message+"".indexOf('success')!=-1) {
          res.data.data.items.forEach((o,index) => {  
            o.idxs = than.listInd;
            than.listInd++;
            if (index % 2 == 0) {
              if (than.ischang) {
                o.ischang = true;
              } else {
                o.ischang = false;
              }
              than.ischang = !than.ischang;
            } else {
              if (than.ischang1) {
                o.ischang = true;
              } else {
                o.ischang = false;
              }
              than.ischang1 = !than.ischang1;
            }
          })
          //append  RecycleContext 对象提供的方法:在当前的长列表数据上追加list数据
          than.listobj.append(res.data.data.items);
          than.postflg = true;
        }
      }
    })
  },

  //根据key，从连接获取参数
  getRequestByKey: function (url) {
    var wen = url.indexOf("=");
    var str = '';
    if (wen != -1) {
      str = url.substring(wen + 1, url.length);
    }
    return str;
  },
  //截取图片路径返回宽、高、比例
  getImgInfo: function (img) {
    var obj = {};
    var str = this.getRequestByKey(img);
    var arr = str.split(',');
    var w = arr[0];
    var h = arr[1];
    var lv = Number(h / w).toFixed(2);
    obj = {
      w: w,
      h: h,
      lv: lv,
    }
    return obj;
  }
})
