//app.js
const {
  createUpdateUserInfo
} = require('./modules/login/index')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    createUpdateUserInfo()
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    user: {
      userId: "00000000",
      userInfo: {
        id: 0,
        // areaCode: "",
        phone: "未绑定", //手机号
        // aliAccount: "未绑定",
        // wxAccount: "未绑定",
        password: null,

        avatarUrl: "/images/ico.jpg",
        nickName: "登录",
        city: null,
        country: null,
        gender: null,
        language: null,
        province: null,
        // encryptedData: null,
        // iv: null,

        // unionId: "",
        openId: "",
        //anonymousOpenid: null,
        // sessionKey: "",

        //recommendUserId: 0,

        status: 0,
        createTime: "",
        // updateTime: "",
        last_loginTime: "",
        // validTime: "",
        // verifyCode: "",
      }
    },
    isLogin: false,
    apiHost: "http://192.168.0.100:7003", //电脑本地联调
  }
})