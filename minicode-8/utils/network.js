import * as domainUtil from '../utils/domainUtil.js';
//请求封装
export default function request(options){
  options.data.platform = domainUtil.domainList.miniAppKey;
  if (options.log){console.log((options.postname||'')+'请求开始', options);}
  if (options.isshow){
    //显示加载动画
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
  }
  return new Promise((res,rej)=>{
    wx.request({
      url: options.url,
      method: options.method||'GET',
      data: options.data || {},
      header:{
        'content-type': options.header ? options.header+'':'application/json' // 默认值
      },
      success: res,
      fail: rej,
      complete: function(res) {
        if (options.log) { console.log((options.postname || '') + '请求结束', res); }
        if (options.isshow) {
          wx.hideLoading();//结束加载动画
        }
      },
    })
  });
}