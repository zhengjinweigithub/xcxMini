const app = getApp()
const createRecycleContext = require('miniprogram-recycle-view');
// const listobj;
Page({
  pageNum:1,
  data: {
    recycleList:[]
  },
  onReady: function () {
    createRecycleContext({
      id: 'recycleId',
      dataKey: 'recycleList',
      page: this,
      itemSize: this.itemSizeFunc,
      useInPage:true,
      root:getCurrentPages()
    })
    // ctx.append(newList)
    // ctx.update(beginIndex, list)
    // ctx.destroy()
  },
  itemSizeFunc: function (item, idx) {
    console.log('item---', item)
    return {
      width: 375,
      height: 603
    }
  },
  
  //滚动到底部
  bindscrolltolower(e) {
    console.log('滚动到底部----');
    // this.pageNum = this.pageNum + 1;
    this.getlist();
  },

  onLoad: function () {
    this.getlist();
  },

  //数据请求
  getlist(){
    var than = this;
    wx.request({
      url: 'https://w.taojianlou.com/wx/goods/list',
      data:{
        platform:'ZPo4MV4TqsLfAHkist6wQai7S8tzDVmz',
        page: {
          pageNum: than.pageNum,
          pageSize: 30,
        }
      },
      method: 'post',
      success(res){
        
        var list = [];
        if (than.data.recycleList.length==0){
          list = res.data.infos
        }else{
          list = than.data.recycleList.concat(res.data.infos)
        }
        than.setData({
          recycleList: list
        })
      }
    })
  }
})
