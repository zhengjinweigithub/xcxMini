Page({
  data: {

  },
  onLoad: function() {

  },
  onTap(e) {
    wx.showToast({
      title: '触发点击',
    })
  },
  onDelete(e) {
    wx.showToast({
      title: '触发删除',
    });
    //执行删除动画
    e.detail.delete();
    //取消删除,关闭左滑
    //e.detail.close();
  },
  onSetting(e) {
    wx.showToast({
      title: '触发未读',
    })
  },
})