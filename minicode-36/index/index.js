Page({
  page: 1,
  pageNumber: 20,
  data: {
    list: [],
  },
  onLoad: function() {
    this.loadData();
  },

  loadData() {
    let data = [];
    for (let i = 0; i < this.pageNumber; i++) {
      data.push(1 + i + (this.page - 1) * this.pageNumber)
    }
    if (this.page == 1) {
      this.list = [];
      this.setData({
        list: []
      })
    }

    this.list[this.page - 1] = data;//缓存数据，优化性能时使用
    this.setData({
      [`list[${this.page-1}]`]: data//分页渲染数据
    })

    //计算并记录数据的边界值
    this.boundings = Array.isArray(this.boundings) ? this.boundings : [];
    let index = this.page - 1;
    wx.createSelectorQuery().select(`#page${index}`).boundingClientRect((rect) => {
      this.boundings[index] = {
        height: rect.height,//高度
        top: index == 0 ? rect.top : this.boundings[index - 1].top + this.boundings[index - 1].height,//上边界
        bottom: index == 0 ? rect.bottom : this.boundings[index - 1].bottom + rect.height//下边界
      };
    }).exec()

    wx.stopPullDownRefresh()
    wx.hideLoading()
  },

  onPageScroll(e){
     //当前与滚动区域底部相交的元素索引
    this.index = this.index ? this.index : 0;
    this.windowHeight = this.windowHeight ? this.windowHeight : wx.getSystemInfoSync().windowHeight;
    this.boundings.forEach((item, index) => {
      if ((item.top < e.scrollTop + this.windowHeight) && (e.scrollTop + this.windowHeight <= item.bottom)) {
        this.index = index;
      }
    })

    //当前相交元素的前2后2元素显示，超出部分隐藏
    this.data.list.forEach((item, index) => {
      if ((index == this.index || index == this.index - 1 || index == this.index - 2 || index == this.index + 1 || index == this.index + 2) &&
        this.data.list[index] && !Array.isArray(this.data.list[index])
      ) {
        this.setData({
          [`list[${index}]`]: this.list[index]
        })
      }
      if ((index > this.index + 2 || index < this.index - 2) && Array.isArray(this.data.list[index])) {
        this.setData({
          [`list[${index}]`]: { height: this.boundings[index].height }
        })
      }
    })
    console.log(this.data.list)
  },

  onPullDownRefresh() {
    this.page = 1;
    setTimeout(()=>{
      this.loadData();
    },1000)
  },

  onReachBottom() {
    this.page = ++this.page;
    wx.showLoading()
    setTimeout(() => {
      this.loadData();
    }, 1000)
  }
})