const app = getApp()

Page({
  data: {
    showCards: [],
    totalCards: []
  },
  onLoad: function () {
    this.getlist(1);
    this.calcFeedHeight();
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
      },
    })
  },

  onReachBottom() {

    // const newCards = this.fetchNewCards();
    // this.data.showCards.push(newCards);
    // this.setData({
    //   showCards: this.data.showCards
    // })
  },

  //滚动监听
  async onPageScroll() {
    var than = this;
    try {
      const rectList = await this.calcFeedHeight();
      // console.log('rectList-------',rectList)
      than.recycleCard(rectList);
    } catch (e) {
      console.error(e);
    }
  },

  calcFeedHeight() {
    return new Promise((resolve, reject) => {
      this.createSelectorQuery()
        .selectAll('.card')
        .boundingClientRect(rectList => {
          resolve(rectList);
        })
        .exec()
    })
  },

  recycleCard(rectList) {
    var than = this;
    const newShowCards = [];
    for (let i = 0; i < than.data.showCards.length; i++) {
      const rect = rectList[i];
      // console.log('rect--------', rect.id);
      // console.log('top--------', Math.abs(rectList[i].top - 0));
      // console.log('603 * 2--------', 603 * 2);
      if (rect && Math.abs(rectList[i].top - 0) > 603 * 2) {
        newShowCards.push({
          type: 'empty-card',
          height: rectList[i].bottom - rectList[i].top
        });
      } else {
        const feed = than.data.totalCards[i];
        newShowCards.push(feed);
      }
    }
    than.setData({
      showCards: newShowCards
    });
  },

  getlist:function(num){
    var than = this;
    var list = [
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
      { url: 'https://file.taojianlou.com/goods/U94kMQDwGn6VsmyehlqjA5kEb0ghE0IN.jpg?image=640,640' },
    ];
    than.setData({
      totalCards: list
    })
    if (num==1){
      than.setData({
        showCards: list
      })
    }
  },
})
