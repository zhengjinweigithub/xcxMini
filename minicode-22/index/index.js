const createRecycleContext = require('miniprogram-recycle-view');
Page({
  pageNum:1,
  objs:null,
  postflg:true,
  data: {

  },
  onLoad: function () {
    this.objs = createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: { // 这个参数也可以直接传下面定义的this.itemSizeFunc函数
        width: 375 * 0.45,
        height: 375 * 0.45
      }
    })
    this.getlist();
  },

  //滚动到底部
  bindscrolltolower(e){
    console.log('滚动到底部了-------',e);
    if (this.postflg){
      this.postflg = false;
      this.pageNum++;
      this.getlist();
    }
  },

  //数据请求
  getlist(){
    var than = this;
    wx.request({
      url: 'https://w.taojianlou.com/ut/wx/goods/list',
      data:{
        page: {
          pageNum: than.pageNum,
          pageSize: 44,
        },
        platform: "ZPo4MV4TqsLfAHkist6wQai7S8tzDVmz"
      },
      method:'post',
      success(res){
        console.log('列表返回------',res);
        if(res.data.result.success){
          than.objs.append(res.data.infos);
        }
        than.postflg = true;
      }
    })
  }
})
