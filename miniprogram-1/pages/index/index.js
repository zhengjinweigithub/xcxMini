const testDB = wx.cloud.database({
  env:'xcx-scan-ocr-x99m5'
});
Page({

  //页面的初始数据
  data: {
    input:'',
    id:'',
    content:'',
    type:0,
  },

  //监听页面加载
  onLoad: function (options) {

  },

  //增
  add: function (database, table, data){
    var than = this;
    database.collection(table).add({
      data: data,
      success(res){
        console.log('集合' + table+'新增记录成功',res);
        if (res.errMsg.indexOf('ok') != -1){
          than.setData({
            type:0,
            id:res._id,
            content: res
          })
        }
      },
      fail(err){
        console.log('集合' + table + '新增记录失败', err);
      }
    })
  },

  //删
  del: function (database, table, where){
    database.collection(table).doc(where).remove({
      success(res) {
        console.log('集合' + table + '删除记录成功', res);
      },
      fail(err) {
        console.log('集合' + table + '删除记录失败', err);
      }
    })
  },

  //改
  upd:function(database,table,where,data){
    database.collection(table).doc(where).update({
      data: data,
      success(res) {
        console.log('集合' + table + '更新记录成功', res);
      },
      fail(err) {
        console.log('集合' + table + '更新记录失败', err);
      }
    })
  },

  //查
  sel:function(database,table,where){
    var than = this;
    database.collection(table).where(where).get({
      success(res) {
        console.log('集合' + table + '查询记录成功', res);
        if(res.data){
          than.setData({
            type: 3,
            content:res.data
          })
        }
      },
      fail(err) {
        console.log('集合' + table + '查询记录失败', err);
      }
    })
  },

  //操作
  caozuo:function(e){
    var type = e.currentTarget.dataset.type;
    if (type == 'add'){
      this.add(testDB,'test',{
        name : this.data.input
      });
    } else if (type == 'del') {
      this.del(testDB, 'test', this.data.id)
    } else if (type == 'upd') {
      this.upd(testDB, 'test', this.data.id,{
          name: this.data.input
      })
    } else if (type == 'sel') {
      this.sel(testDB,'test',{
        _id:this.data.id
      })
    }
  },

  //输入框监听
  inp:function(e){
    var val = e.detail.value;
    this.setData({
      input:val
    })
  },

  //文件上传
  fileUpload:function(){
    wx.chooseImage({
      count:1,
      sizeType:['original'],
      sourceType:['album','camera'],
      success: function(res) {
        var filePath = res.tempFilePaths[0];
        const sjs = Math.floor(Math.random() * 1500);
        const cloudPath = sjs + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath, 
          filePath,
          success(ress){
            console.log('ress----', ress)
          },
          fail(err){
            console.log('err----', err)
          }
        })
      },
    })
  },
})