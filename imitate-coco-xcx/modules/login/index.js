const app = getApp()
const {
  decimalFormatUserID
} = require('../../utils/util')
const {
  getUser,
  createUpdateUser,
  getUserOpenId
} = require('../http/index')

function getUserInfo(openId) {
  return new Promise(function (resolve, reject) {
    getUser(openId).then((res) => {
      setUserInfo(res)
        .then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
    }).catch((res) => {
      reject()
    })
  })
}

function setUserInfo(res) {
  console.log(res)
  return new Promise(function (resolve, reject) {
    app.user.userId = decimalFormatUserID(8, res.id);
    app.user.userInfo = res
    if (!res.phone || res.phone.trim() === "") {
      app.user.userInfo.phone = "未绑定"
    }
    app.isLogin = true
    resolve()
  })
}

function createUpdateUserInfo() {
  var openId = wx.getStorageSync('openId')
  var session_key = wx.getStorageSync('session_key')
  let userData = {}
  return new Promise(function (resolve, reject) {
    if (openId) {
      userData.openId = openId
      createUpdateUser(userData)
        .then((res) => {
          resolve(res)
        })
        .catch((res) => {
          reject(res)
        })
    } else {
      wx.login({
        success(res) {
          console.log(`login调用成功:${res.code}`);
          let code = res.code;
          getUserOpenId(code)
            .then((res) => {
              openId = res.openid
              session_key = res.session_key
              wx.setStorageSync('openId', openId)
              wx.setStorageSync('session_key', session_key)
              userData.openId = openId
              createUpdateUser(userData)
                .then((res) => {
                  resolve(res)
                })
                .catch((res) => {
                  reject(res)
                })
            })
            .catch((res) => {
              reject(res)
            })
        },
        fail(res) {
          console.log(`login调用失败`);
          reject(res);
        }
      })
    }
  })
}
module.exports = {
  getUserInfo: getUserInfo,
  setUserInfo: setUserInfo,
  createUpdateUserInfo: createUpdateUserInfo
}