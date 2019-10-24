App({
  appData:{
    sysInfo:{}
  },
  onLaunch: function () {
    this.appData.sysInfo = wx.getSystemInfoSync();
  }
})
