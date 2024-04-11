import {
  QueryRecommend,
  BindRecommend,
  ImagOrigin
} from "../../config/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coachInfo: null,
    ImagOrigin
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.apiRequest(QueryRecommend, {
      recommendCode: options.code
    }).then(({
      data
    }) => {
      this.setData({
        coachInfo: data
      })
    })
  },

  handleBindTap() {
    wx.apiRequest(BindRecommend, {
      coachId: this.data.coachInfo.id
    }).then(({
      code,
      msg
    }) => {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000 //持续的时间
      })
      if (code === 200) {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 3000);
      }
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