const app = getApp()

Page({
  data: {
    countdown: '', // 倒计时
    endDate: '2019-10-19 09:29:11' // 结束时间
  },
  onLoad: function() {
    this.countTime();
  },

  //  生命周期函数--监听页面卸载
  onUnload: function() {
    clearTimeout(this.ime);
  },

  // 倒计时
  countTime() {
    const date = new Date();
    const now = date.getTime();
    const endDate = new Date(this.data.endDate); //设置截止时间
    const end = endDate.getTime();
    const leftTime = end - now; //时间差                              
    let d, h, m, s, ms;
    if (leftTime >= 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
      ms = Math.floor(leftTime % 1000);
      ms = ms < 100 ? "0" + ms : ms
      s = s < 10 ? "0" + s : s
      m = m < 10 ? "0" + m : m
      h = h < 10 ? "0" + h : h
      this.setData({
        countdown: m + ":" + s + ":" + ms,
      })
      //递归每秒调用countTime方法，显示动态时间效果
      this.time = setTimeout(this.countTime, 100);
    } else {
      this.setData({
        countdown: '00:00:00'
      })
      clearTimeout(this.time);
    }
  }

})