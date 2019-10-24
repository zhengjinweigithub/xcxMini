//app.js
App({
  data:{},
  onLaunch: function () {
    if(!wx.cloud){
      console.log('请使用2.2.3或以上基础库使用云能力');
    }else{
      wx.cloud.init({
        env:'xcx-scan-ocr-x99m5',
        traceUser:true
      })
    }
  },
})