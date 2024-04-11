// pages/appointcoach/appointcoach.js
import {
  CoachSimpleList
} from "../../config/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},
    myCoachSimpleList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query:options
    },()=> {
      this.getCoachSimpleList()
    })
  },

  getCoachSimpleList() {
    wx.apiRequest(CoachSimpleList,this.data.query).then((data)=> {
      console.log(data)
      this.setData({
        myCoachSimpleList:data
      })
    })
  },

  handleCoach() {
    let pages = getCurrentPages();   //当前页面
    let prevPage = pages[pages.length - 2];   //上一页面
    prevPage.setData({
          //直接给上一个页面赋值
          'form.coachName': '王教练',
          'form.coachId': '111111',
    });
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})