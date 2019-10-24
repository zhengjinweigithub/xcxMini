//余额支付--订单
const appinit = getApp();
import request from '../../utils/network.js';
export default function balancePay(options) {
  
  var data = {
    orderId: options.orderId,//订单标识//必须
    payPwd: options.payPwd//'支付密码'//必须
  }
  request({
    url: appinit.appData.port.balancepay,
    method:'post',
    data:data,
    log:true,
    isshow:true
  }).then(res=>{
    if(res.data.result.success){
      //成功后的操作
      if (options.pagecode) {
        var pages = getCurrentPages();//页面栈
        if (options.pagecode == 'closeorderpage') {
          //返回上一页（商品详情）并刷新页面
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/personal/personal/personal',
            })
          }, 2000)
        } else if (options.pagecode == 'orderlist' || options.pagecode == 'orderdetail') {
          //刷新（订单列表||订单详情）页面
          var page = pages[pages.length - 1];//当前页
          setTimeout(() => {
            page.pageRefresh();
          }, 2000)
        }
      }
      wx.showToast({
        title: "支付成功",
        icon: 'none',
        duration: 1000,
        mask:true
      })
    }else{
      wx.showToast({
        title: res.data.result.message,
        icon: 'none',
        duration: 1500,
        mask: true
      })
      if (options.pagecode == 'closeorderpage') {
        //跳转待支付列表
        setTimeout(()=>{
          wx.redirectTo({
            url: '/pages/orders/orderlist/orderlist?type=0&status=1',
          })
        },1500)
      }
    }
  }).catch(err=>{
    wx.showToast({
      title: '支付失败',
      icon: 'none',
      duration: 1500,
      mask: true
    })
    if (options.pagecode == 'closeorderpage') {
      wx.setTimeout(()=>{
        //跳转待支付列表
        wx.redirectTo({
          url: '/pages/orders/orderlist/orderlist?type=0&status=1',
        })
      },1500)
    } 
  })
}
