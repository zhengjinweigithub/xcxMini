const appinit = getApp();
import request from '../network.js';
//收藏
function collectgood(code,data,ind,than){
  if (appinit.appData.userInfoStatus){
    request({
      url: appinit.appData.port.collectgood,
      method:'post',
      data:{
        userAccountId: appinit.appData.userInfo.id,//用户标识
        goodsId: data.goodsId,//商品标识
        type: data.type//0-取消 1-收藏
      },
      log:true
    }).then(res=>{
      if(res.data.result.success){
        if (code=='index'){
          var key = 'productList[' + ind+'].collect';
          than.setData({
            [key]: data.type==1?true:false
          })
        } else if (code == 'productdetail'){
          than.setData({
            collect: data.type==1?true:false
          })
        } else if (code == 'shoplist'){
          var list = than.data.list;
          var key = 'list[' + ind + '].type';
          than.setData({
            [key]: data.type == 1 ? 0 : 1,
            collect: data.type == 1 ? true : false
          })
        }
        wx.showToast({
          title: data.type == 0 ? '已取消' : '已收藏',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(err=>{})
  }else{
    wx.showToast({
      title: '请先登录',
      icon:'none',
      duration:2000
    })
  }
}

//是否收藏
function collectiscollect(code, data, than) {
  if (appinit.appData.userInfoStatus) {
    request({
      url: appinit.appData.port.collectiscollect,
      method: 'post',
      data: {
        userAccountId: appinit.appData.userInfo.id,//用户标识
        goodsId: data.goodsId,//商品标识
      },
      log: true
    }).then(res => {
      if (res.data.result.success) {
        if (code == 'productdetail') {
          than.setData({
            collect: res.data.data.collect
          })
        }
      }
    }).catch(err => { })
  }
}

//收藏列表
function getCollectList(data,than){
  request({
    url: appinit.appData.port.collectlist,
    method: 'post',
    data: data,
    log: true,
    isshow: than.data.pageNum == 1 || than.data.collectLis.length==0 ? true : false
  }).then(res => {
    wx.stopPullDownRefresh();
    if (res.data.result.success && res.data.data) {
      if (res.data.data.length == 0) {
        than.setData({
          isnulllist: false,
          isnulllistshowimg: than.data.pageNum == 1 ? true : false
        })
      }
      var list = [];
      if (than.data.isPullDown) {
        //下拉刷新请求
        list = res.data.data;
      } else {
        list = than.data.list.concat(res.data.data);
      }
      var collectLis = [];
      var collectLis1 = [];
      list.forEach(o=>{
        o.type = 0;
        collectLis.push(o.createTime);
      })

      for (var i = 0; i < collectLis.length; i++) {
        if (collectLis1.indexOf(collectLis[i]) == -1) {
          collectLis1.push(collectLis[i]);
        }
      }

      than.setData({
        isPullDown:false,
        collectLis: collectLis1,
        list: list,
        isnulllistshowimg: list.length > 0 ? false : true
      })
    } else {
      than.setData({
        isPullDown: false,
        isnulllistshowimg: true
      })
    }
  }).catch(err => {
    wx.stopPullDownRefresh();
    // wx.showToast({
    //   title: '网络出错',
    //   icon: 'none',
    //   mask: true,
    //   duration: 2000
    // })
  })
}

module.exports = {
  collectgood: collectgood,
  collectiscollect: collectiscollect,
  getCollectList: getCollectList
}