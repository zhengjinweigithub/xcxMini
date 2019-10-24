//根据传入的日期对象返回字符串格式时间
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//根据时间戳返回时间
const getTimeByTimeN = timeN =>{
  const date = new Date(Number(timeN));
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const result = {
    y: year,
    m: month,
    d: day,
    h: hour,
    mi:minute,
    s:second
  }
  return result;
}

//倒计时----根据时间戳返回剩余日时分秒
const countDownByTimeN = timeN =>{
  let day = 0,hou = 0,min = 0,sec = 0;
  const nowT = new Date().getTime();
  const overT = Number(timeN - nowT) / 1000;
  if (overT > 0) {
    day = parseInt(overT / (60 * 60 * 24));
    hou = parseInt(overT % (60 * 60 * 24) / 3600);
    min = parseInt(overT % (60 * 60 * 24) % 3600 / 60);
    sec = parseInt(overT % (60 * 60 * 24) % 3600 % 60);
    sec = sec >= 10 ? sec : '0' + sec;
  }
  const result = {
    d: day,
    h: hou,
    mi: min,
    s: sec,
  }
  return result;
}

//订单列表倒计时
const odderlistCdown = timeN =>{
  const obj = countDownByTimeN(timeN);
  return (obj.d > 0 ? obj.d + '天' : '') + (obj.h > 0 ? obj.h + '时' : '') + (obj.mi > 0 ? obj.mi + '分' : '') + (obj.s > 0 ? obj.s + '秒' : '');
}

module.exports = {
  formatTime: formatTime,
  getTimeByTimeN: getTimeByTimeN,
  countDownByTimeN: countDownByTimeN,
  odderlistCdown: odderlistCdown,
}
