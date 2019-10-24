// components/generate-pic/generate-pic.js
// import wxApi from '../../service/wxApi'
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scene: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据 
   */
  data: {
    bgImgPath: '/resources/images/components/share-bg.png',
    dialogBgPath: '/resources/images/components/share-dialog.png',
    pixelRatio: 2,
    programCode: '',
    userHeadUrl: '',
    count: 0,
    spinning: false,
    loadingFlag: false // 是否重新加载图片
  },
  // 在组件完全初始化完毕、进入页面节点树后
  attached () {
    console.log(this.data.scene)
    wx.nextTick(() => {
      this.getFile() // 获取小程序码和头像的临时文件
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getFile () {
      // 请求接口 获取头像和小程序码的临时文件
      if (!this.data.loadingFlag) {
        this.initData()
      }
    },
    writeCanvas () {
      let that = this
      const ctx = wx.createCanvasContext('myCanvas', that)
      let canvasW = that.data.canvasW
      let canvasH = that.data.canvasH
      let bgImgPath = that.data.bgImgPath
      let dialogBgPath = that.data.dialogBgPath // 对话框背景
      let nickName = that.data.nickName.length > 6 ? that.data.nickName.substr(0, 6) + '...' : that.data.nickName // 昵称
      let userHeadUrl = '/resources/images/components/avatar.png' // 头像
      let programCode = '/resources/images/components/qrcode.png' // 小程序码
      // let userHeadUrl = that.data.userHeadUrl // 头像
      // let programCode = that.data.programCode // 小程序码

      // 画大背景 单位是 px 不是 rpx
      ctx.drawImage(bgImgPath, 0, 0, canvasW, canvasH)

      // 画中间的白色区域
      ctx.setFillStyle('#fff')
      let rect = {
        x: that.computedPercent(50),
        y: that.computedPercent(97),
        width: that.computedPercent(189),
        height: that.computedPercent(251)
      }
      that.drawRoundedRect(rect, 3, ctx)
      // 保存上下文
      ctx.save()

      //画圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      ctx.beginPath()
      // 先画个大圆，为了能有圆环
      ctx.arc(that.computedPercent(147), that.computedPercent(93), that.computedPercent(37), 0, Math.PI * 2, false)
      ctx.setFillStyle('#eee')
      ctx.fill()
      ctx.save()
      // 画小圆
      ctx.beginPath()
      ctx.arc(that.computedPercent(147), that.computedPercent(93), that.computedPercent(35), 0, Math.PI * 2, false)
      ctx.setFillStyle('#fff')
      ctx.fill()
      // 画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，
      // 则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
      ctx.clip()
      ctx.drawImage(
        userHeadUrl,
        that.computedPercent(112),
        that.computedPercent(58),
        that.computedPercent(70),
        that.computedPercent(70)
      )
      // 恢复画布
      ctx.restore()

      // 画对话框
      ctx.drawImage(dialogBgPath, that.computedPercent(175), that.computedPercent(37), that.computedPercent(95), that.computedPercent(33))

      // 写对话框里的文字
      ctx.setTextAlign('left')
      ctx.setFontSize(that.computedPercent(12))
      ctx.setFillStyle('#666')
      ctx.fillText('来喝茶呀！客官', that.computedPercent(180), that.computedPercent(55))

      // 写昵称 文本居中的起点是指居中的那个点
      ctx.setTextAlign('center')
      ctx.setFontSize(that.computedPercent(14))
      ctx.setFillStyle('#333')
      ctx.fillText(nickName + '的达人店', that.computedPercent(144), that.computedPercent(150))

      // 画小程序码
      ctx.drawImage(programCode, that.computedPercent(85), that.computedPercent(165), that.computedPercent(117), that.computedPercent(117))

      // 说明文字
      ctx.setTextAlign('center')
      ctx.setFontSize(that.computedPercent(12))
      ctx.setFillStyle('#666')
      ctx.fillText('长按小程序码，进入达人店', that.computedPercent(144), that.computedPercent(307))
      ctx.fillText('查看详情', that.computedPercent(144), that.computedPercent(325))

      // slogan
      ctx.setTextAlign('center')
      ctx.setFontSize(that.computedPercent(14))
      ctx.setFillStyle('#fff')
      ctx.fillText('感谢有你-让分享创造价值', that.computedPercent(144), that.computedPercent(370))

      ctx.draw(true, () => {
        that.setData({
          spinning: false
        })
      })
    },
    // 初始化数据
    initData () {
      let that = this
      that.setData({
        spinning: true,
        nickName: '用户昵称'
        // nickName: app.globalData.userInfo.nickName
      })
      // 获取设备宽度，计算canvas宽高
      wx.getSystemInfo({
        success: function(res) {
          let canvasW = Math.round(res.screenWidth * 0.768)
          let canvasH = canvasW * 1.361
          that.setData({
            pixelRatio: res.pixelRatio, // 图片像素比
            canvasW,
            canvasH
          })
          that.writeCanvas() // 暂时在此执行
        }
      })
      // 获取小程序码和用户头像
      // wxApi.getMiniCodeAndAvatar({
      //   sharePage: 'pages/index/index',
      //   shareScene: that.data.scene
      // }).then((res) => {
      //   if (app.globalData.codeConfig.errCode.SUCCESS_CODE === res.data.errCode) {
      //     console.log(res)
      //     that.setData({
      //       loadingFlag: false
      //     })
      //     let result = res.data.data
      //     Promise.all([
      //       that.downFile(result.programCode),
      //       that.downFile(result.userHeadUrl)
      //     ]).then((results) => {
      //       console.log (results)
      //       that.setData({
      //         programCode: results[0].tempFilePath,
      //         userHeadUrl: results[1].tempFilePath
      //       })
      //       that.writeCanvas()
      //     }).catch((res) => {
      //       wx.showToast({
      //         title: '网络异常，请稍后再试',
      //         icon: 'none'
      //       })
      //     })
      //   } else {
      //     that.setData({
      //       spinning: false,
      //       loadingFlag: true
      //     })
      //     wx.showToast({
      //       title: res.data.msg,
      //       icon: 'none'
      //     })
      //   }
      // }).catch((res) => {
      //   that.setData({
      //     spinning: false,
      //     loadingFlag: true
      //   })
      //   console.log(res)
      // })
    },
    // 绘制圆角矩形
    drawRoundedRect (rect, r, ctx) {
      let that = this
      let ptA = that.point(rect.x + r, rect.y)
      let ptB = that.point(rect.x + rect.width, rect.y)
      let ptC = that.point(rect.x + rect.width, rect.y + rect.height)
      let ptD = that.point(rect.x, rect.y + rect.height)
      let ptE = that.point(rect.x, rect.y)
      
      ctx.beginPath()
      
      ctx.moveTo(ptA.x, ptA.y)
      ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r)
      ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r)
      ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r)
      ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r)
    
      ctx.strokeStyle = "#fff"
      ctx.stroke()
      ctx.setFillStyle('#fff')
      ctx.fill()
    },
    point (x, y) {
      return {x, y}
    },
    // 下载文件
    downFile (url) {
      let timeStamp = new Date().getTime()
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: url + '?t=' + timeStamp,
          success(res) {
            console.log(res)
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              resolve(res)
            }
          },
          fail(res) {
            reject(res)
          }
        })
      })
    },
    // 保存图片
    save () {
      let that = this
      wx.canvasToTempFilePath({
        x: 0, // 起点横坐标
        y: 0, // 起点纵坐标
        width: that.data.canvasW, // canvas 当前的宽
        height: that.data.canvasH, // canvas 当前的高
        destWidth: that.data.canvasW * that.data.pixelRatio, // canvas 当前的宽 * 设备像素比
        destHeight: that.data.canvasH * that.data.pixelRatio, // canvas 当前的高 * 设备像素比
        canvasId: 'myCanvas',
        success: function (res) {
          //调取小程序当中获取图片
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '图片保存成功！',
                icon: 'none'
              })
            },
            fail: function (res) {
              console.log(res)
              if (res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                console.log("打开设置窗口");
                that.doAuth()
              }
            }
          })
        },
        fail: function (res) {
          console.log(res)
        }
      }, this)
    },
    // 获取授权
    doAuth () {
      wx.showModal({
        title: '获取授权',
        content: '您是否同意重新授权保存图片',
        cancelText: '不同意',
        confirmText: '好',
        confirmColor: '#21c0ae',
        success: function(res) {
          if (res.confirm) { // 点击确认
            wx.openSetting({
              success(settingdata) {
                console.log(settingdata)
                if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                  console.log("获取权限成功，再次点击图片保存到相册")
                } else {
                  console.log("获取权限失败")
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })
    },
    /**
     * 计算比例
     * @param {String} value 像素（二倍图量出来的要除2）
     */
    computedPercent (value) {
      let currentWidth = this.data.canvasW
      let oldWidth = 288
      return Math.floor(value * currentWidth / oldWidth)
    }
  }
})
