const appinit = getApp();
//图片选择
function imageSel(count){

}

/**
 * 图片下载
 * 保存商品的图片到本地，以及复制商品描述
 */
function downLoadImg(obj){

  wx.getSetting({
    success(res) {
      if (!res.authSetting['scope.writePhotosAlbum']) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success() {
            downLoadImg(obj);
          },
          fail(err){
            wx.showModal({
              title: '温馨提示',
              content: '您拒绝了下载授权,将无法正常下载,点击确定重新获取授权。',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting["scope.writePhotosAlbum"]) {////如果用户重新同意了授权登录
                        downLoadImg(obj);
                      }
                    }, fail: function (res) {

                    }
                  })

                }
              }
            })
            
          }
        })
      }else{
        var list = obj.list;//图片数组
        var text = obj.text;//商品描述
        var length = list.length;//图片数量
        if (length > 0) {
          wx.showLoading({
            title: '下载中',
            mask:true
          })
          downloadFile(list, text);
        } else {
          //复制
          wx.setClipboardData({
            data: text,
            success(res) {
              wx.showToast({
                title: '商品描述已复制',
                icon: 'none',
                duration: 2000
              })
            }
          })

        }
      }
    }
  })
  
}

function downloadFile(list, text){
  console.log('下载图片', list);
  var url = list[0];
  //下载图片
  wx.downloadFile({
    url: url, //仅为示例，并非真实的资源
    success(res) {
      console.log('下载成功',res);
      //保存到系统相册
      console.log('保存到系统相册');
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function (data) {
          console.log('保存成功', data);
          list.splice(0,1);
          if (list.length>0){
            downloadFile(list, text);
          }else{
            //复制
            wx.setClipboardData({
              data: text,
              success(res) {
                wx.showToast({
                  title: '图片下载文件复制成功',
                  icon:'none',
                  duration:2000
                })
              }
            })
            wx.hideLoading();
          }
        },
        fail(err){
          console.log('保存到系统相册出错', err);
          wx.hideLoading();
        }
      })
    },
    fail(err){
      console.log('下载图片出错',err);
      wx.hideLoading();
      wx.showToast({
        title: '图片无法下载',
        icon: 'none',
        duration: 2000
      })
    }
  })
}

//大图查看
function bigInage(current, urls){
  wx.previewImage({
    current: current, // 当前显示图片的http链接
    urls: urls // 需要预览的图片http链接列表
  })
}

module.exports = {
  downLoadImg: downLoadImg,
  bigInage: bigInage
}