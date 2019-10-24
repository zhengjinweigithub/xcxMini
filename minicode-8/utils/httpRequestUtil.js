// common.js
/**
 * 发送Post网络请求
 */
function postRequest(u, d, s, f, c) {
  var app = getApp()
  d.platform = app.appData.port.miniAppKey;
  // console.log('请求参数',d)
  wx.request({
    url: u,
    header:
    {
      "content-type": "application/json",
    },
    method: 'POST',
    data: d,
    success: s,
    fail: f,
    complete: c
  })
}

/**
 * 发送Post网络请求,无platform参数
 */
function postRequestnotplatform(u, d, s, f, c) {
  var app = getApp()
  wx.request({
    url: u,
    header:
    {
      "content-type": "application/json",
    },
    method: 'POST',
    data: d,
    success: s,
    fail: f,
    complete: c
  })
}

/**
 * 发送get网络请求
 */
function getRequest(u, d, s, f, c) {
  var app = getApp()
  d.platform = app.appData.port.miniAppKey;
  wx.request({
    url: u,
    method: 'Get',
    data: d,
    success: s,
    fail: f,
    complete: c
  })
}

/**
 * 发送get网络请求,无platform参数
 */
function getRequestnotplatform(u, d, s, f, c) {
  wx.request({
    url: u,
    method: 'Get',
    data: d,
    success: s,
    fail: f,
    complete: c
  })
}

module.exports = {
  postRequest: postRequest,
  postRequestnotplatform: postRequestnotplatform,
  getRequest: getRequest,
  getRequestnotplatform: getRequestnotplatform
}