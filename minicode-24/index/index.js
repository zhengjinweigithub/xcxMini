Page({
  // bindscancode(e){
  //   console.log('e----------------', e)
  // },
  onLoad(){
    wx.scanCode({
      success(res) {
        console.log(res)
      }
    })
  }
  
})