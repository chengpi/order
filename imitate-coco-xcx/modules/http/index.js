const url = require('./url')

function getUser(openId) {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    wx.request({
      url: url.apiHost + url.getUser_url + "?openId=" + openId,
      header:{
        // "Authorization": "",
        "content-type": "application/json"
      },
      method: "GET",
      success(res) {
        wx.hideLoading()
        console.log("获取用户信息:" + res)
        resolve(res)
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: '网络访问失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
        reject(res)
      }
    })
  })
}
function createUpdateUser(data) {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    wx.request({
      url: url.apiHost + url.createUpdateUser_url,
      header:{
        // "Authorization": "",
        "content-type": "application/json"
      },
      method: "POST",
      data: data,
      success(res) {
        wx.hideLoading()
        console.log("创建或更新用户信息:" + res)
        resolve(res)
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: '网络访问失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
        reject(res)
      }
    })
  })
}
function getUserOpenId(code) {
  return new Promise(function (resolve, reject) {
    wx.showLoading({
      title: '数据加载中',
      icon: 'loading'
    })
    wx.request({
      url: url.apiHost + url.getUserOpenId_url + "?code=" + code,
      header:{
        // "Authorization": "",
        "content-type": "application/json"
      },
      method: "GET",
      success(res) {
        wx.hideLoading()
        console.log("获取用户openId:" + res)
        if(res && res.data && res.data.code === 0) {
          resolve(res.data.data)
        }else {
          reject(res)
        }
      },
      fail(err) {
        wx.hideLoading()
        wx.showToast({
          title: '网络访问失败',
          icon: 'none',
          duration: 2000,
          mask:true
        })
        reject(res)
      }
    })
  })
}
module.exports = {
  getUser: getUser,
  createUpdateUser: createUpdateUser,
  getUserOpenId: getUserOpenId,
}