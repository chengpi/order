// pages/list/list.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 0,
    // screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    waysIndex: 0,
    sizeIndex: 0,
    // sugarIndex: 0,
    // temIndex: 0,
    // sugar: ['常规糖', '无糖', '微糖', '半糖', '多糖'],
    // tem: ['常规冰', '多冰', '少冰', '去冰', '温', '热'],
    ways: ['堂食', '打包'],
    size: ['小份', '大份'],
    cartList: [],
    sumMonney: 0,
    cupNumber:0,
    showCart: false,
    loading: false,
    scrollArr: [],
    scrollArrLen: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var sysinfo = wx.getSystemInfoSync().windowHeight;
    // console.log(sysinfo)
    wx.showLoading({
      title: '努力加载中',
    })
    //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
    wx.request({
      url: app.globalData.apiHost + '/getfoodList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        let scrollArr = [0]
        //动态计算联动节点
        for (let i = 0; i < res.data.data.length; i++) {
          // console.log(res.data.data[i].foods.length)
          scrollArr.push(scrollArr[i] + 73 * res.data.data[i].foods.length + 18)
        }
        that.setData({
          scrollArr: scrollArr,
          scrollArrLen: scrollArr.length,
          listData: res.data.data,
          loading: true
        })
        wx.hideLoading()
      },
      fail: function (err) {
        wx.showToast({
          icon: 'error',
          title: '网络失败',
        }, 3000)
        wx.hideLoading()
      }
    })
  },
  selectMenu: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index
    // console.log(index)
    that.setData({
      activeIndex: index,
      toView: 'a' + index,
    })
    // console.log(this.data.toView)
    // console.log(this.data.scrollArr)
  },
  scroll: function (e) {
    var dis = e.detail.scrollTop
    var sysH = wx.getSystemInfoSync().windowHeight
    let max = this.data.scrollArr[this.data.scrollArr.length - 1]
    // console.log(sysH, dis, max)
    for (let i = 0; i < this.data.scrollArr.length; i++) {
      if (i < this.data.scrollArr.length - 1) {
        if (dis >= this.data.scrollArr[i] && dis < this.data.scrollArr[i + 1]) {
          // console.log(this.data.scrollArr[i], dis, this.data.scrollArr[i + 1], i)
          // max - sysH + 55 == dis
          if (max - sysH + 55 == dis) {
            // console.log('dfg')
            this.setData({
              activeIndex: 6,
            })
          } else {
            this.setData({
              activeIndex: i,
            })
          }
          break
        }
      } else {
        this.setData({
          activeIndex: 6,
        })
      }
    }
  },
  scrolltolower: function (e) {
    // console.log(e)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  selectInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    this.setData({
      showModalStatus: !this.data.showModalStatus,
      currentType: type,
      currentIndex: index,
      sizeIndex: 0,
      sugarIndex: 0,
      temIndex: 0
    });
  },

  chooseSE: function (e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      this.setData({
        sizeIndex: index
      });
    }
    if (type == 1) {
      this.setData({
        waysIndex: index
      });
    }
    // if (type == 1) {
    //   this.setData({
    //     sugarIndex: index
    //   });
    // }
    // if (type == 2) {
    //   this.setData({
    //     temIndex: index
    //   });
    // }
  },

  addToCart: function () {
    var a = this.data
    var addItem = {
      "name": a.listData[a.currentType].foods[a.currentIndex].name,
      "price": a.listData[a.currentType].foods[a.currentIndex].price,
      // "detail": a.size[a.sizeIndex] + "+" + a.sugar[a.sugarIndex] + "+" + a.tem[a.temIndex],
      "detail": a.size[a.sizeIndex] + "+" + a.ways[a.waysIndex],
      "number": 1,
      "sum": a.listData[a.currentType].foods[a.currentIndex].price,
    }
    var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].price
    var cartList = this.data.cartList
    cartList.push(addItem)
    this.setData({
      cartList: cartList,
      showModalStatus: false,
      sumMonney: sumMonney,
      cupNumber: a.cupNumber + 1
    })
    console.log(this.data.cartList)
  },
  showCartList: function () {
    console.log(this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      })
    }
  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var cartList = this.data.cartList
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].price
    cartList[index].sum += cartList[index].price

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber + 1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index
    console.log(index)
    var cartList = this.data.cartList

    var sum = this.data.sumMonney - cartList[index].price
    cartList[index].sum -= cartList[index].price
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber-1
    });
  },
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList)
      wx.setStorageSync('sumMonney', this.data.sumMonney)
      wx.setStorageSync('cupNumber', this.data.cupNumber)
      wx.navigateTo({
        url: '../order/balance/balance'
      })
    }
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})