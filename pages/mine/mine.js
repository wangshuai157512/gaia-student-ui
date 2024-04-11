// pages/mine/mine.js
import {
  StudentInfo,
  ImagOrigin,
  ExamCount
} from "../../config/api"
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: {},
    btnCount: 1,
    isGetUserInfo: false,
    userInfo: {},
    menu: [{
      name: '我的订单',
      imgUrl: '../../static/images/order.png',
      path: '../orderManagement/orderManagement'
    }, {
      name: '训练记录',
      imgUrl: '../../static/images/train.png',
      path: '../trainingrecord/trainingrecord'
    }, {
      name: '预约记录',
      imgUrl: '../../static/images/reserve.png',
      path: '../student/myAppointment/myAppointment'
    }, {
      name: '我的教练',
      imgUrl: '../../static/images/coach.png',
      path: '../coach/coach'
    }, {
      name: '消息中心',
      imgUrl: '../../static/images/msg.png',
      path: '../messageCenter/messageCenter'
    }]
  },


  subTap(e) {
    this.setData({
      btnCount: e.target.dataset.id
    })
    this.getExamCount(e.target.dataset.id == 1 ? 2 : 3)
  },

  getUserProfile() {
    // 获取用户信息 
    // 登录
    wx.pro.getUserProfile({
      desc: '业务需要'
    }).then(res => {
      this.setData({
        isGetUserInfo: false
      })
      app.globalData.userInfo = res.userInfo
      wx.setStorageSync('userInfo', res.userInfo);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getExamCount()
  },
  getExamCount(subject = 2) {
    wx.apiRequest(ExamCount, {
      subject
    }, ).then(res => {
      const {
        data
      } = res

      this.setData({
        count: {
          ...data,
          trainDuration: (data.trainDuration / 3600000).toFixed(data.trainDuration / 3600000 > 1 ? 0 : 1)
        }
      })
    })
  },
  handlePhoto() {
    wx.navigateTo({
      url: '../setting/setting',
    })
  },

  handleStatisticsTap() {
    wx.navigateTo({
      url: '../statistics/statistics',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      selected: 2
    })
    wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
      this.setData({
        userInfo: res.data
      })
    })
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