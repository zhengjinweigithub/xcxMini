const app = getApp()

Page({
  data: {
    src: 'https://file.taojianlou.com/user/BEFE34966E974A10831353B423DB1A96.jpg',
    info: '',
  },
  getImageInfo() {
    wx.getImageInfo({
      src: this.data.src,
      complete: (res) => {
        console.log("------",res)
        this.setData({
          info: this.format(res)
        })
      }
    })
  },
  format(obj) {
    return '{\n' +
      Object.keys(obj).map(function (key) { return '  ' + key + ': ' + obj[key] + ',' }).join('\n') + '\n' +
    '}'
  }
})
