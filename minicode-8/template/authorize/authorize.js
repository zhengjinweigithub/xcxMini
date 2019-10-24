// template/authorize/authorize.js
/**授权组件 */
const appinit = getApp();
import request from '../../utils/network.js';
Component({
  //组件的属性列表
  properties: {
    pageCode: String,
    isshow:{
      type:Boolean,
      value:false
    },
  },

  //组件的初始数据
  data: {
    postNumber:20,
    issquan:false,//是否授权点击    
  },

  //组件的方法列表
  methods: {
    //体验
    nologin:function(){
      appinit.appData.isty = true;
      this.setData({
        isshow:false
      })
      wx.showTabBar({})
    },
    //判断是否授权
    getauthorizestatus(){
      var than = this;
      var flg = false;
      //逻辑处理
      wx.getSetting({
        success(res) {
          
          // console.log('授权信息',res)
          if (!res.authSetting['scope.userInfo']) {
            wx.hideTabBar({});
            than.setData({
              isshow: true
            });
          }else{
            
            // console.log('已授权，查询是否存在opendId');
            // //已授权，查询是否存在opendId
            // var openId = wx.getStorageSync("openId");
            // if(openId&&openId!=''){
            //   //直接获取用户信息
            //   appinit.getAppUserInfo(openId);
            // }else{
            //   //，未存在，从新走登录
            //   console.log('openId本地缓存不存在，重新登录');
            // }
            than.login(than.data.postNumber);

          }
        },
        fail(err){
          console.log('出错',err)
        }
      })
    },

    //用户信息授权回调
    getuserinfo:function(options){
      //授权点击
      this.setData({
        issquan:true
      })
      console.log("用户信息授权回调",options);
      if (options.detail.errMsg =="getUserInfo:fail auth deny"){
        wx.showModal({
          title: '温馨提示',
          content: '您点击了拒绝授权,将使无法使用小程序,点击确定重新获取授权。',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.getUserInfo"]) {////如果用户重新同意了授权登录
                    this.getuserinfo();
                  }
                }, fail: function (res) {
                  
                }
              })
            }
          }
        })
      }else{
        console.log('已授权');
        //登录
        this.login(this.data.postNumber);
      }
    },

    login:function(num){
      var than = this;
      console.log('已授权');
      if(num>0){
        num--;
        than.setData({
          postNumber:num
        })
        wx.login({
          success(res) {
            if (res.code) {
              console.log('微信登录成功', res);
              //登录成功，获取微信用户信息
              var rescode = res.code;
              wx.getUserInfo({
                success: function (res) {
                  console.log('获取微信用户信息成功', res);
                  var userInfo = res.userInfo
                  var nickName = userInfo.nickName;//昵称
                  var avatarUrl = userInfo.avatarUrl;//头像
                  //生成平台账号,并返回用户信息
                  var obj = {
                    nickname: nickName,
                    headimg: avatarUrl,
                    code:rescode,
                  }
                  if (appinit.appData.shareAgentId){
                    obj.agent = appinit.appData.shareAgentId;
                  }
                  than.getOpendId(obj);

                },
                fail: function (userError) {
                  console.log('获取微信用户信息失败', res);
                },
              })
              
            } else {
              setTimeout(() => {
                console.log('微信登录失败，2秒后重新请求！剩余请求次数' + num, err);
                than.login(than.data.postNumber);
              }, 2000)
            }
          },fail(err){
            setTimeout(()=>{
              console.log('微信登录失败，2秒后重新请求！剩余请求次数' + num, err);
              than.login(than.data.postNumber);
            },2000)
          }
        })
      }else{
        wx.showToast({
          title: '登录超时',
          icon:'none',
          mask:true,
          duration:3000
        })
      }
    },

    //获取openId
    getOpendId: function (obj) {
      var than = this;
      request({
        url: appinit.appData.port.queryopenid,
        method: 'post',
        data: obj,
        log:true,
        // isshow:true,
      }).then(res => {//成功
        if (res.data.result.success && res.data.info) {
          appinit.appData.isty = false;
          //用戶生成成功存儲openId 
          wx.setStorageSync("openId", res.data.info.openId)
          appinit.appData.loginStatus = true;
          appinit.appData.userInfoStatus = true;//用户信息获取状态
          appinit.appData.openIdStatus = true;
          
          appinit.appData.userInfo = res.data.info;
          appinit.appData.openId = res.data.info.openId;
          appinit.appData.orderInfo = res.data.orderInfo;
          appinit.appData.userInfo.gdheadimg = res.data.info.headimg;//用于用户头像修改

          if (res.data.info.shopUri) {//为商家
            appinit.appData.userInfo.goodsManagerNum = res.data.supplierInfo.goodsManagerNum;
            appinit.appData.userInfo.fansNum = res.data.supplierInfo.fansNum;
            //显示发布
            // wx.setTabBarItem({
            //   index: 1,
            //   text: '发布',
            //   iconPath: '/images/index/fb@3x.png',
            //   selectedIconPath: '/images/index/fb_on@3x.png',
            // })
          }
          
          wx.showTabBar({});
          than.setData({
            isshow: false
          });
          if (than.data.pageCode == 'index' && than.data.issquan){
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } else if(than.data.pageCode == 'personal'){
            wx.reLaunch({
              url: '/pages/personal/personal/personal',
            })
          } else if (than.data.pageCode == 'productdetail' && than.data.issquan) {
            wx.reLaunch({
              url: '/pages/personal/personal/personal',
            })
          } else if (than.data.pageCode == 'merchantindex' && than.data.issquan) {
            wx.reLaunch({
              url: '/pages/personal/personal/personal',
            })
          }
        } else {
          setTimeout(() => {
            console.log('用户信息不存在，重新走登录流程,剩余次数' + than.data.postNumber, res);
            than.login(than.data.postNumber);
          }, 2000)
        }
      }).catch(err => {
        //失败
        setTimeout(() => {
          console.log('用户信息不存在，重新走登录流程,剩余次数' + than.data.postNumber, err);
          than.login(than.data.postNumber);
        }, 2000)
      })
    },
  }
  ,
  //组件生命周期函数-在组件实例进入页面节点树时执行)
  attached:function(e){
    if (this.data.pageCode != 'personal' && !appinit.appData.isty &&!appinit.appData.userInfoStatus){
      this.getauthorizestatus();
    }
  },
  
})
