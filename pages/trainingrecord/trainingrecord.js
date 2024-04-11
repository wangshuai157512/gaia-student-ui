// pages/trainingrecord/trainingrecord.js
import {
  TrainRecord
} from "../../config/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    pageList: {},
    isShow: false
  },


  swichNav: function (e) {
    const current = e.target.dataset.current;

    this.setData({
      currentTab: current
    });
    this.getTrainRecord(current)
  },

  getTrainRecord(id = 0) {
    wx.apiRequest(TrainRecord + id).then(res => {
      const data = res.records.reduce((a, b) => ({
        ...a,
        [b.trainDate]: a[b.trainDate] ? a[b.trainDate].concat(b) : [b]
      }), {}) || {}

      this.setData({
        pageList: data,
        isShow: Object.keys(data).length > 0
      })
    })
  },

  getDetails(e) {
    const {
      currentTab
    } = this.data

    wx.navigateTo({
      url: `../trainingtype/trainingtype?id=${e.currentTarget.dataset.id}&type=${currentTab}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrainRecord()
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