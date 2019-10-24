const app = getApp()
import tool from '../tools.js';
Page({
  postFlg:false,
  pageNum:1,//页数
  pageSize:20,
  allList:[],//全部列表数据
  sysInfo:{},//手机系统参数
  data: {
    showList: [],
  },

  onLoad: function () {
    var than = this;
    wx.getSystemInfo({
      success(res) {
        than.sysInfo = res;
        console.log('手机系统参数', than.sysInfo);
      }
    })
    than.getList();
  },

  //-------------------------监听----------------------------------
  //滚动监听
  onPageScroll: tool.throttle(function(e){
    var than = this;
    console.log('滚动监听----', e);
    than.onScrollCallback()
  }),

  //到底监听
  onReachBottom(e){
    console.log('到底监听----', e);
    var than = this;
    if(!than.postFlg){
      than.postFlg = true;
      than.pageNum++;
      than.getList();
    }
  },

  //-------------------------方法----------------------------------
  async onScrollCallback() {
    var than = this;
    try {
      const rectList = await than.calcFeedHeight();
      than.recycleCard(rectList);
    } catch (e) {
      console.error(e);
    }
  },
  calcFeedHeight() {
    var than = this;
    return new Promise((resolve, reject) => {
      than.createSelectorQuery()
        .selectAll('.record')
        .boundingClientRect(rectList => {
          resolve(rectList);
        })
        .exec()
    })
  },

  recycleCard(rectList) {
    var than = this;
    const newShowCards = [];
    for (let i = 0; i < than.data.showList.length; i++) {
      const rect = rectList[i];
      if (rect && Math.abs(rectList[i].top - 0) > than.sysInfo.windowHeight * 2) {
        newShowCards.push({
          type: 'empty-card',
          height: rectList[i].bottom - rectList[i].top
        });
      } else {
        const feed = than.allList[i];
        newShowCards.push(feed);
      }
    }
    than.setData({
      showList: newShowCards
    });
  },

  //获取列表数据
  getList(){
    var than = this;
    wx.request({
      url: 'https://w.taojianlou.com/ut/wx/goods/list',
      data:{
        page: { 
          pageNum: than.pageNum, 
          pageSize: than.pageSize
        },
        platform: "ZPo4MV4TqsLfAHkist6wQai7S8tzDVmz",
        userAccountId: 68,
      },
      method:'post',
      success(res){
        than.postFlg = false;
        if (res.data.result.success && res.data.infos){
          than.allList = than.allList.concat(res.data.infos);
          than.setData({
            showList: than.data.showList.concat(res.data.infos)
          })
          // if(than.pageNum <=2 ){
          //   than.allList = than.allList.concat(res.data.infos);
          //   than.setData({
          //     showList: than.data.showList.concat(res.data.infos)
          //   })
          // }else{
          //   than.allList = than.allList.concat(res.data.infos);
          // }
        }
      }
    })
  },

})
