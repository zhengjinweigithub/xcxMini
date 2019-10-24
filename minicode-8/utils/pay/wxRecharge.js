//微信支付----余额充值
const appinit = getApp();
export default function wxRecharge(options) {
  //显示加载
  wx.showLoading({
    title: '加载中',
    mask: true,
  })
  options.platform = appinit.appData.port.miniAppKey;
  //统一下单调起
  console.log('统一下单调起', options)
  wx.request({
    url: appinit.appData.port.balancerecharge,
    method: 'post',
    data: options || {},
    success: function (res) {
      console.log('统一下单回调', res)
      if (res.data.result.success && res.data.info && res.data.info.prepayId && res.data.info.returnCode == 'SUCCESS') {
        //下单成功，调起微信支付
        var data = res.data.info;
        requestPayment(data).then(res => {
          options.obj.setData({
            input: '',
          })
          //支付成功,弹窗提示
          wx.showToast({
            title: "充值成功",
            icon: 'none',
            mask: true,
            duration: 2000
          })
          //成功后的操作
          if (options.pagecode) {
            
            // var pages = getCurrentPages();//页面栈
            // if (options.pagecode == 'closeorderpage') {
            //   //返回上一页（商品详情）并刷新页面
            //   wx.switchTab({
            //     url: '/pages/personal/personal/personal',
            //   })
            // } else if (options.pagecode == 'orderlist' || options.pagecode == 'orderdetail') {
            //   //刷新（订单列表||订单详情）页面
            //   var page = pages[pages.length - 1];//当前页
            //   setTimeout(() => {
            //     page.pageRefresh();
            //   }, 2000)
            // }

          }
        }).catch(err => {
          //支付失败
          wx.showToast({
            title: "支付失败",
            icon: 'none',
            mask: true,
            duration: 2000
          })
        });
      } else {
        //下单失败
        wx.showToast({
          title: "微信充值出错",
          icon: 'none',
          mask: true,
          duration: 2000
        })
      }
    },
    fail: function (res) {
      setTimeout(() => {
        wx.hideToast();
        wx.hideLoading();
      }, 2000);
    },
    complete: function (res) {

    },
  })
}

function requestPayment(options) {
  console.log('ss', options)
  var nonceStr = options.nonceStr + "";
  var packagea = "prepay_id=" + options.prepayId;
  var timeStamp = options.timeStamp + "";
  var paySign = options.paySign + "";
  return new Promise((res, rej) => {
    wx.requestPayment({
      timeStamp: timeStamp,
      nonceStr: nonceStr,
      package: packagea,
      signType: 'MD5',
      paySign: paySign,
      success: res,
      fail: rej,
      complete: function (res) {
      },
    })
  });

}