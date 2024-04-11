// pages/setmeal/setmeal.js
import {
  ScanCodeDriver,
  ImagOrigin,
  GetSetmeal,
  ToPay,
  StudyGet
} from "../../config/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    bannerList: [],
    ImagOrigin,
    payDataList: [],
    equipmentId: null,
    setmealUnit: ['分钟', '小时', '天'] // 不限时
  },

  handlePay(e) {
    wx.apiRequest(ToPay, {
      equipmentId: this.data.equipmentId,
      equipmentType: 0,
      setmealId: e.target.dataset.id
    }).then(({
      data
    }) => {
      if (data) {
        wx.requestPayment(data).then(res => {
          wx.showToast({
            title: '购买成功',
            icon: 'none',
            duration: 500
          })
          setTimeout(() => {
            wx.apiRequest(ScanCodeDriver, {
              equipmentId: this.data.equipmentId,
              equipmentType: 0
            }).then(({
              code
            }) => {
              if (code === 200) {
                wx.redirectTo({
                  url: '/pages/usesuccess/usesuccess',
                })
              }
            })
          }, 500);
        }).catch(err => {})
      }
    })

  },

  currentChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      equipmentId,
      equipmentType
    } = options

    this.setData({
      equipmentId
    })

    wx.apiRequest(StudyGet).then(res => {
      this.setData({
        bannerList: res.data.filter(item => {
          if (30 < parseInt(item.advType) && parseInt(item.advType) < 40) {
            return item
          }
        })
      })
    })

    wx.apiRequest(GetSetmeal, {
      equipmentId,
      equipmentType
    }, 'POST', 'application/x-www-form-urlencoded').then(res => {
      this.setData({
        payDataList: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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