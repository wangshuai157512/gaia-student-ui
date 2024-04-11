// pages/student/selectDrvSchool/selectDrvSchool.js
import {
  SchoolList,
  SchoolRegister
} from "../../../config/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: '../../../static/images/ic-right.png',
    pickerIndex: -1,
    schoolList: [],
    list: [],
    applyAuditStatus: null,
    cityname: "",
    cityId: "",
    drvSchoolName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      applyAuditStatus,
      drvSchoolName
    } = options
    this.setData({
      applyAuditStatus,
      drvSchoolName
    })
  },
  onShow: function () {
    this.getSchool()
  },
  handleSelectCity() {
    wx.navigateTo({
      url: '../../city/city',
    })
  },

  // 获取驾校
  getSchool() {
    wx.apiRequest(SchoolList, {
      cityId: this.data.cityId
    }).then(res => {
      let list = res.data.map(item => {
        return {
          name: item.name,
          id: item.id
        }
      })
      this.setData({
        schoolList: list
      })
    })
  },

  //选择驾校
  handleSchool(e) {
    if (!this.data.cityname) {
      wx.showToast({
        title: '请先选择所在城市',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      pickerIndex: e.detail.value,
      drvSchoolName: this.data.schoolList[e.detail.value].name
    })

  },
  // 提交驾校
  schoolRegisterSubmit() {
    let shlinfo = this.data.schoolList[this.data.pickerIndex]
    let pages = getCurrentPages();
    // 获取上一页面
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      'formModel.drvSchoolId': shlinfo ? shlinfo.id : '',

      'formModel.drvSchoolName': shlinfo ? shlinfo.name : ''
    })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})