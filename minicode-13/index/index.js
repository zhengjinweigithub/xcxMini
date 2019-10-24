// pages/merchant/code/code.js
const appinit = getApp();
Page({

  //初始数据
  data: {

  },

  onReady: function (e) {
    var than = this;
    wx.createSelectorQuery().select('#merchantcode').boundingClientRect().exec(res => {
      var convaswidth = res[0].width;
      var convasheight = res[0].height;
      if (convasheight / convaswidth <= 1.333) {
        convasheight = convaswidth * 1.5;
      }
      // 使用 wx.createContext 获取绘图上下文 context
      var ctx = wx.createCanvasContext('merchantcode');

      //小程序码参数
      var codeWidth = convaswidth * 0.498;
      var codeHeight = codeWidth;
      var codeX = (convaswidth - codeWidth) / 2;
      var codeY = (convasheight - codeHeight) / 5.5;
      //店铺名称参数
      var nameX = codeX + (codeWidth / 2);
      var nameY = codeY + codeHeight + (codeHeight * 0.25);
      var fontSize = (convaswidth / 20).toFixed(0);
      //公共参数
      var obj = {
        convaswidth: convaswidth,
        convasheight: convasheight,
        codeInfo: {
          codeX: codeX,
          codeY: codeY,
          codeWidth: codeWidth,
          codeHeight: codeHeight,
          img: '/images/xcxm.jpg',
        },
        merchantName: {
          name: "轩辕阁",
          nameX: nameX - 15,
          nameY: nameY,
          fontSize: fontSize,
          color: '#333333',
          // scaled: scaled
        }
      }
      than.drawBg(ctx, obj);//背景
      than.drawWhiteBg(ctx, obj);//白色背景
      than.drawCode(ctx, obj);//小程序码
      than.drawHeadImg(ctx, obj);//店铺头像
      than.drawMerchantName(ctx, obj);//店铺名称绘制
      than.drawGrade(ctx, obj);//等级绘制
      than.drawIconRZ(ctx, obj);//认证图标绘制
      ctx.draw()//绘制
    })
  },

  //背景绘制
  drawBg(ctx, obj) {
    //创建渐变背景（沿直线从(0,0）到（0,height)进行渐变）
    const grd = ctx.createLinearGradient(0, 0, 0, obj.convasheight);
    grd.addColorStop(0, '#191B23');
    grd.addColorStop(1, '#252627');
    ctx.setFillStyle(grd);//画
    ctx.fillRect(0, 0, obj.convaswidth, obj.convasheight);//填充渐变背景
    ctx.fill();
    ctx.save();
  },

  //白色背景绘制
  drawWhiteBg(ctx, obj) {
    //创建白色矩形
    var baiW = obj.convaswidth * 0.83;
    var baiH = obj.convasheight * 0.85;
    var left = (obj.convaswidth - baiW) / 2;
    var top = left;
    ctx.rect(left, top, baiW, baiH);
    ctx.setFillStyle('#fff');
    ctx.fill();
    ctx.save();
  },

  //二维码绘制
  drawCode(ctx, obj) {
    //二维码绘制
    ctx.drawImage(obj.codeInfo.img, obj.codeInfo.codeX, obj.codeInfo.codeY, obj.codeInfo.codeWidth, obj.codeInfo.codeHeight);
    ctx.save();
  },

  //商家头像绘制
  drawHeadImg(ctx, obj) {
    ctx.beginPath();
    var yuanR = (obj.codeInfo.codeWidth / 2) * 0.451;
    var yuanX = obj.codeInfo.codeX + (obj.codeInfo.codeWidth / 2);
    var yuanY = obj.codeInfo.codeY + (obj.codeInfo.codeHeight / 2);
    ctx.arc(yuanX, yuanY, yuanR, 0, Math.PI * 2, false);
    ctx.setFillStyle('#fff');
    ctx.fill();
    ctx.clip();
    var dWidth = yuanR * 2;
    var dHeight = dWidth;
    var dx = obj.codeInfo.codeX + ((obj.codeInfo.codeWidth - dWidth) / 2);
    var dy = obj.codeInfo.codeY + ((obj.codeInfo.codeHeight - dHeight) / 2);
    ctx.drawImage('/images/tx@3x.png', dx, dy, dWidth, dHeight);
    ctx.restore();
    ctx.save();
  },

  //文字及图标绘制
  drawMerchantName(ctx, obj) {
    if (obj.merchantName.name.length >= 11) {
      obj.merchantName.name = obj.merchantName.name.substring(0, 11) + '...';
    }
    ctx.setFillStyle(obj.merchantName.color);
    ctx.setTextAlign('center');
    var ctxfont = 'normal bold ' + obj.merchantName.fontSize + 'px sans-serif';
    ctx.font = ctxfont;
    ctx.fillText(obj.merchantName.name, obj.merchantName.nameX, obj.merchantName.nameY);
    var metrics = ctx.measureText(obj.merchantName.name);
    obj.merchantName.metricsWidth = metrics.width;
    ctx.save();
  },

  //等级绘制
  drawGrade(ctx, obj) {
    //背景绘制
    var than = this;
    ctx.beginPath();
    var iconX = obj.merchantName.nameX + (obj.merchantName.metricsWidth) / 2 + 10;
    var iconY = obj.merchantName.nameY - Number(obj.merchantName.fontSize) * 0.9 / 1.25 - 1.5;
    ctx.setFillStyle('#DF9652');
    var rect = { x: iconX, y: iconY, width: Number(obj.merchantName.fontSize) * 2.2, height: Number(obj.merchantName.fontSize) * 0.9 };

    than.drawRoundedRect(rect, Number(obj.merchantName.fontSize) * 0.9 / 2, ctx);
    ctx.fill()
    ctx.save();
    //文字绘制
    var fsize = (obj.merchantName.fontSize / 1.9).toFixed(0);
    fsize = fsize >= 10 ? fsize : 10
    var gradeX = rect.x + rect.width / 2;
    var gradeY = rect.y + (rect.height / 2) + (fsize / 2) * 0.85;
    ctx.setFillStyle('#fff');
    ctx.setTextAlign('center');
    console.log('normal-----', fsize)
    var ctxfont = 'normal ' + fsize + 'px sans-serif';
    ctx.font = ctxfont;
    ctx.fillText('等级1', gradeX, gradeY);
  },

  aPointaaaa: function (x, y) {
    return { x: x, y: y };
  },
  drawRoundedRect: function (rect, r, ctx) {
    var ptA = this.aPointaaaa(rect.x + r, rect.y);
    var ptB = this.aPointaaaa(rect.x + rect.width, rect.y);
    var ptC = this.aPointaaaa(rect.x + rect.width, rect.y + rect.height);
    var ptD = this.aPointaaaa(rect.x, rect.y + rect.height);
    var ptE = this.aPointaaaa(rect.x, rect.y);

    ctx.beginPath();

    ctx.moveTo(ptA.x, ptA.y);
    ctx.arcTo(ptB.x, ptB.y, ptC.x, ptC.y, r);
    ctx.arcTo(ptC.x, ptC.y, ptD.x, ptD.y, r);
    ctx.arcTo(ptD.x, ptD.y, ptE.x, ptE.y, r);
    ctx.arcTo(ptE.x, ptE.y, ptA.x, ptA.y, r);
    ctx.setStrokeStyle('#DF9652');
    ctx.stroke();
  },

  //已认证绘制
  drawIconRZ: function (ctx, obj) {
    var rzx = obj.merchantName.nameX - 10;
    var rzy = obj.merchantName.nameY + 20;
    var rzWidth = obj.codeInfo.codeWidth * 0.095;
    var rzHeight = rzWidth;
    ctx.drawImage('/images/extension/dun.png', rzx, rzy, rzWidth, rzHeight);
    ctx.save();
    ctx.setFillStyle(obj.merchantName.color);
    var fonts = (Number(rzWidth * 0.8).toFixed(0)) + '';
    console.log('fonts-----', fonts)
    var ctxfont = 'normal ' + fonts + 'px sans-serif';
    ctx.font = ctxfont;
    ctx.fillText('已认证', rzx + (obj.codeInfo.codeWidth * 0.21), rzy + Number((rzWidth / 1.2).toFixed(2)));
    ctx.save();
  },

})