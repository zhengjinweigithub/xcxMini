const app = getApp()
function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300;//间隔时间，如果interval不传，则默认300ms
  return function () {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}
Page({
  pageNum: 1,
  pageSize: 40,
  postIng: false,
  wWidth: wx.getSystemInfoSync().windowWidth,
  xianz: Number(wx.getSystemInfoSync().windowWidth * 0.6),
  leftH: 0,
  rightH: 0,
  leftList: [],
  rightList: [],
  data: {
    leftList: [],
    rightList: []
  },

  onLoad: function() {
    this.getList();
  },

  //到底加载
  onReachBottom() {
    if (!this.postIng) {
      this.postIng = true;
      this.pageNum++;
      this.getList();
    }
  },

  //页面滚动
  onPageScroll: throttle(function(e){
    var scrollTop = e[0].scrollTop;
    this.setfun(scrollTop,'left');
    this.setfun(scrollTop, 'right');
  }),

  setfun: function (scrollTop, str){
    var than = this;
    try{
      var indexb, boundings, datalist, list;
      if (str === 'left') {
        indexb = than.leftindex;
        boundings = than.leftboundings;
        datalist = than.data.leftList;
        list = than.leftList;
      } else {
        indexb = than.rightindex;
        boundings = than.rightboundings;
        datalist = than.data.rightList;
        list = than.rightList;
      }
      if (boundings.length == datalist.length){
        indexb = indexb ? indexb : 0;
        boundings.forEach((o, index) => {
          if ((o.top < scrollTop + than.wWidth) && (scrollTop + than.wWidth <= o.bottom)) {
            indexb = index;
          }
        });
        datalist.forEach((o, index) => {
          if (index != 0) {
            if ((index == indexb || index == indexb - 1 || index == indexb - 2 || index == indexb + 1 || index == indexb + 2) && datalist[index] && !Array.isArray(datalist[index])) {
              than.setData({
                [str + `List[${index}]`]: list[index]
              })
            }
            if ((index > indexb + 2 || index < indexb - 2) && Array.isArray(datalist[index])) {
              than.setData({
                [str + `List[${index}]`]: { height: boundings[index].height }
              })
            }
          }
        });
      }
    }catch(err){
      console.log(err)
    }
  },

  getList() {
    var than = this;
    wx.request({
      url: 'https://w.taojianlou.com/ut/wx/goods/list',
      data: {
        page: {
          pageNum: than.pageNum,
          pageSize: than.pageSize
        },
        userAccountId: 68,
        platform: "ZPo4MV4TqsLfAHkist6wQai7S8tzDVmz"
      },
      method: 'post',
      success(res) {
        if (res.data.result.success) {
          var list = res.data.infos;
          list.forEach((o, index) => {
            var img = o.images[0];
            var imgInfo = than.getImgInfo(img);
            o.imgH = Number(than.wWidth) * Number(imgInfo.lv) * 0.45;
            if (o.imgH > than.xianz) {
              o.imgH = than.xianz
            }

            if (than.leftH > than.rightH) {
              //向右列表添加数据
              than.rightH = Number(than.rightH) + Number(o.imgH) + 40;
              than.rightList[than.pageNum - 1] = Array.isArray(than.rightList[than.pageNum - 1]) ? than.rightList[than.pageNum - 1] : [];
              than.rightList[than.pageNum - 1].push(o);
            } else {
              //向左列表添加数据
              than.leftH = Number(than.leftH) + Number(o.imgH) + 40;
              than.leftList[than.pageNum - 1] = Array.isArray(than.leftList[than.pageNum - 1]) ? than.leftList[than.pageNum - 1] : [];
              than.leftList[than.pageNum - 1].push(o);
            }
          });
          than.setData({
            [`leftList[${than.pageNum - 1}]`]: than.leftList[than.pageNum-1],
            [`rightList[${than.pageNum - 1}]`]: than.rightList[than.pageNum-1],
          },function(){
            //计算并记录外层列表数据的边界值
            than.leftboundings = Array.isArray(than.leftboundings) ? than.leftboundings : [];
            var leftindex = than.pageNum - 1;
            wx.createSelectorQuery().select(`#left${leftindex}`).boundingClientRect((rect) => {
              than.leftboundings[leftindex] = {
                height: rect.height,
                top: leftindex == 0 ? rect.top : than.leftboundings[leftindex - 1].top + than.leftboundings[leftindex - 1].height,
                bottom: leftindex == 0 ? rect.bottom : than.leftboundings[leftindex - 1].bottom + rect.height
              }
            }).exec();
            than.rightboundings = Array.isArray(than.rightboundings) ? than.rightboundings : [];
            var rightindex = than.pageNum - 1;
            wx.createSelectorQuery().select(`#right${rightindex}`).boundingClientRect((rect) => {
              than.rightboundings[rightindex] = {
                height: rect.height,
                top: rightindex == 0 ? rect.top : than.rightboundings[rightindex - 1].top + than.rightboundings[rightindex - 1].height,
                bottom: rightindex == 0 ? rect.bottom : than.rightboundings[rightindex - 1].bottom + rect.height
              }
            }).exec();
          });
        }
      },
      complete() {
        than.postIng = false;
      }
    })
  },

  //-------------------工具--------------------------
  //根据key，从连接获取参数
  getRequestByKey: function(url) {
    var wen = url.indexOf("=");
    var str = '';
    if (wen != -1) {
      str = url.substring(wen + 1, url.length);
    }
    return str;
  },
  //截取图片路径返回宽、高、比例
  getImgInfo: function(img) {
    var obj = {};
    var str = this.getRequestByKey(img);
    var arr = str.split(',');
    var w = arr[0];
    var h = arr[1];
    var lv = Number(h / w);
    obj = {
      w: w,
      h: h,
      lv: lv,
    }
    return obj;
  },

})