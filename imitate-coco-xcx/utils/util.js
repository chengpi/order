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
//数字转为固定长度的字符串
function decimalFormatUserID(num,id){
  var that = this;
  var str = id.toString();   // 数字转字符串
  var array = str.split("");    //字符串转数组
  var num0 = num - array.length;
  var array0 = new Array;
  for(var i = 0;i < num0;i++){
    array0[i] = 0; 
  }
  var str0 = array0.join("");    //数组转字符串
  return str0 + str;
}

module.exports = {
  formatTime: formatTime,
  decimalFormatUserID: decimalFormatUserID,
}
