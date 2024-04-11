import dateformat from '../../utils/datepicker'
import {
  ReserveDate,
  CanList
} from "../../config/api"
const {
  week,
  full,
  dateList
} = dateformat()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:{},
    week,
    full,
    dateList,
    today: `${new Date().getMonth()+1}.${new Date().getDate()}`,
    currentDate: ""
  },
  change(e) {
    this.setData({
      currentDate: e.currentTarget.dataset.date
    })
    let pages = getCurrentPages(); //当前页面
    let prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      //直接给上一个页面赋值
      'form.trainDate': e.currentTarget.dataset.date,
    });
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.query = options
    this.setData({
      currentDate: options.trainDate
    })
    if(options.equipmentType == 1) {
      this.getRobitDate()
    }
    if(options.equipmentType == 2) {
      this.getExtDate()
    }
  },

  getRobitDate() {
    let { equipmentType,drvSchoolId} = this.data.query
    wx.apiRequest(ReserveDate, {equipmentType,drvSchoolId}).then(res=> {
      res.data.forEach(item=> {
        item.finished = !item.stillCan
      })
      const full = res.data.reduce((a, b) => ({
        ...a,
        [b.trainDate]: b
      }), {});
      this.setData({
        full
      })
    })
  },

  getExtDate() {
    wx.apiRequest(CanList, {
      drvSchoolId: this.data.query.drvSchoolId
    }).then(res => {
      const full = res.data.reduce((a, b) => ({
        ...a,
        [b.trainDate]: b
      }), {});
      this.setData({
        full
      })
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