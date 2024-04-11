// pages/usesuccess/usesuccess.js
import {
  formatTimeStamp
} from "../../utils/util"
import {
  EquipmentUsed,
  TrainRecordFinish
} from "../../config/api"
var timer, useTimer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNum: 3,
    useTimer: '',
    equipmentTypeName: '',
    trainEquipmentId: '',
    equipmentType: 1,
  },

  onShow: function () {
    this.setData({
      timeNum: 3
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.apiRequest(EquipmentUsed, {}, 'GET').then(({
      data
    }) => {
      this.setData({
        useTimer: formatTimeStamp(Date.now() - parseInt(data.timestamp)),
        equipmentTypeName: ['智能模拟器', '机器人教练', '易学通'][data.equipmentType],
        trainEquipmentId: data.trainEquipmentId,
        equipmentType: data.equipmentType
      })
      useTimer = setInterval(() => {
        this.setData({
          useTimer: formatTimeStamp(Date.now() - parseInt(data.timestamp))
        })
      }, 1000);
    })
  },

  handleTouchStart() {
    this.setData({
      timeNum: this.data.timeNum - 1
    })
    timer = setInterval(() => {
      this.setData({
        timeNum: this.data.timeNum - 1
      })
      if (this.data.timeNum === 0) {
        clearInterval(timer)
        wx.apiRequest(TrainRecordFinish).then(res => {
          if (res.code === 705) {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000);

            return
          }
          wx.redirectTo({
            url: '../share/share?data=' + JSON.stringify(res.data)
          })
        })
      }
    }, 1000)

  },

  handleTouchEnd() {
    clearInterval(timer);
    this.setData({
      timeNum: 3
    })
  },

  onUnload: function () {
    clearInterval(useTimer)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})