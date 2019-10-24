// index.js

Page({
  data: {
    currentPage: 0,
    pageFrame:[]
  },
  pageSize: 10,
  currentPage:0,
  onLoad: function () {
      var list = [];
      for (var i = 0; i< 10000 ; i++) {
        list.push({
          name: 'ssss----' + i,
          desc: 'aaaaa----' + i,
          content: 'adasdadasdadadasdadadadadasdadad ----' + i
        });
      }
      this.pagedList = this.pageList(list);
      this.setData({
        listLength: list.length,
        list: [this.pagedList[0]]
      })
  },
  onListScroll(e) {
    if (this.inPageUpdate) {
      return;
    }
    var { scrollTop } = e.detail;
    if (this.currentPage > 0) {
      var pageFrame = this.data.pageFrame[this.currentPage - 1];
      var screenHeight = wx.getSystemInfoSync().screenHeight;
      if ((scrollTop + screenHeight) - (pageFrame.lastBottom + pageFrame.height) < -200) {
        this.inPageUpdate = true;
        this.currentPage -= 1;
        this.setData({
          currentPage: this.currentPage,
        }, () => {
          this.inPageUpdate = false;
        })
      }
    }
    var currentPageFrame = this.data.pageFrame[this.currentPage];
    if (currentPageFrame) {
      if (scrollTop - (currentPageFrame.lastBottom + currentPageFrame.height) > 200) {
        this.inPageUpdate = true;
        this.currentPage += 1;
        this.setData({
          currentPage: this.currentPage,
        }, () => {
          this.inPageUpdate = false;
        })
      }
    }
  },
  reachPageBottom() {
    if (this.inPageUpdate) {
      return;
    }
    this.inPageUpdate = true;
    if (this.currentPage < this.pagedList.length - 1) {
      var self = this;
      var currentPage = this.currentPage;
      wx.createSelectorQuery().select('#listpage-' + this.currentPage).boundingClientRect(function (rect) {
        if (currentPage > 0) {
          rect.lastBottom = self.data.pageFrame[currentPage - 1].height + self.data.pageFrame[currentPage - 1].lastBottom
        } else {
          rect.lastBottom = 0;
        }
        self.setData({
          [`pageFrame[${currentPage}]`]: rect
        })
      }).exec();

      this.currentPage = this.currentPage + 1;
      var nextPage = this.pagedList[this.currentPage];
      var key = `list[${this.currentPage}]`
      var data = {};
      data[key] = nextPage;
      data.currentPage = this.currentPage;
      console.log(data);
      this.setData(data, () => {
        this.inPageUpdate = false;
      });
    } else {
      this.setData({
        pageEnd: true,
      }, () => {
        this.inPageUpdate = false;
      })
    }

  },
  listItemTap(e) {
    console.log(e.currentTarget.dataset);
  },
  pageList(list) {
    var splitArray = (arr, len) => {
      var a_len = arr.length;
      var result = [];
      for (var i = 0; i < a_len; i += len) {
        result.push(arr.slice(i, i + len));
      }
      return result;
    }
    var pagedList = splitArray(list, this.pageSize);
    return pagedList;
  }

})
