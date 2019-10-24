var appinit = getApp();
import request from '../network.js';

//关注or取关请求
function followPost(code,data,index,than){
  request({
    url: appinit.appData.port.fansfollow,
    method:'post',
    data:data,
    log:true,
  }).then(res=>{
    var message = "";
    var duration = 2000;
    if(res.data.result.success){
      if (data.type==1){
        message = "已关注";
      }else{
        message = "已取关";
      }
      duration = 1000;
      if(code=='index'){
        var key = "productList[" + index + "].follow";
        than.data.productList.forEach((o,ind)=>{
          if (o.shopUri == data.shopUri){
            var key = 'productList[' + ind + '].follow';
            than.setData({
              [key]: data.type==1?true:false
            });
          }
        });
      }else if(code=='shoplist'){//关注店铺页面
        //刷新列表
        than.shuaxin();
        // var list = than.data.list;
        // list.splice(ind,1);
        // than.setData({
        //   list: list
        // });
      } else if (code =='productdetail'){
        than.setData({
          follow: data.type == 1 ? true : false
        });
      } else if (code =='merchantindex'){
        than.setData({
          follow: data.type == 1 ? true : false
        });
      }
    }else{
      message = res.data.result.message;
      wx.showToast({
        title: message,
        icon:'none',
        duration: duration
      })
    }
  }).catch(err=>{})
}

//获取关注列表
function getFollowList(data,than){
  request({
    url: appinit.appData.port.fanslist,
    method: 'post',
    data: data,
    log: true,
    isshow: than.data.pageNum == 1 || than.data.list.length == 0?true:false
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
      than.setData({
        isPullDown: false,
        list: list,
        isnulllistshowimg: list.length>0?false:true
      })
    } else {
      than.setData({
        isPullDown: false,
        isnulllistshowimg: true
      })
    }
  }).catch(err => { 
    wx.stopPullDownRefresh();
    wx.showToast({
      title: '网络出错',
      icon: 'none',
      mask: true,
      duration: 2000
    })
    
  })
}

//是否关注
function fansisfollow(code,data, than) {
  request({
    url: appinit.appData.port.fansisfollow,
    method: 'post',
    data: data,
    log: true,
  }).then(res => {
    if (res.data.result.success && res.data.data) {
      var follow = res.data.data.follow;
      if (code =='productdetail'){
        if (appinit.appData.userInfo.shopUri) {
          if (appinit.appData.userInfo.shopUri == than.data.shopUri) {
            follow = false;
          }
        }
        than.setData({
          follow: follow
        })
      } else if (code =='merchantindex'){
        if (appinit.appData.userInfo.shopUri){
          if (appinit.appData.userInfo.shopUri == than.data.shopUri){
            follow = true;
          }
        }
        than.setData({
          follow: follow
        })
      }
    }
  }).catch(err => {
    
  })
}
module.exports = {
  followPost: followPost,
  getFollowList: getFollowList,
  fansisfollow: fansisfollow
}