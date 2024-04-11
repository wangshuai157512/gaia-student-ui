// pages/student/addAppointment/addAppointment.js

const app = getApp()

import {
  StudyGet,
  ImagOrigin,
  StudentInfo,
  ReserveStudentAdd
} from "../../../config/api.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户基本信息
    userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
    myinfo: {
      applyAuditStatus: '', // 驾校报名审核状态0未认证，1认证中，2未通过，3已认证
      drvSchoolId: '', // 驾校ID
      drvSchoolName: '', // 驾校名称
      gender: '', // 性别,1:男.2:女
      id: "", // 主键	
      name: "", // 姓名
      nameAuthAuditStatus: '', // 实名认证审核状态0未认证，1认证中，2未通过，3已认证
      nickName: '', // 学员昵称
      photoaddr: '', // 	头像
      registrationPointId: '', // 报名点ID
      telephone: "" // 手机号码
    },
    // loginType	登录类型【0=学员预约，1=教练登录，2=学员登录】
    loginType: 0,
    // 学校审核状态
    // 用户是否加入该学校
    isUserJoin: 0,
    // 列表页传递过来得参数
    query: {
      equipmentType: 0,
    },
    // 设备类型选择
    equipmentTypeList: ['智能模拟器', '机器人教练','易学通'],
    appointmentDurationList: ['1', '2', '3'],
    //表单数据
    formModel: {
      drvSchoolId: '',
      drvSchoolName: '',
      loginType: 0,
      equipmentType: 0,
      appointmentDate: '',
      appointmentDuration: '0',
    },
    bannerList: [],
    baseUrl: ImagOrigin,
    currentIndex: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getStudentInfo()
    await this.getadvLst()
    this.setData({
      userInfo:app.globalData.userInfo || wx.getStorageSync('userInfo')
    })
    this.setData({
      'formModel.equipmentType': options.equipmentType
    })
    this.setData({
      'formModel.appointmentDate': this.getNowDate(),
      "formModel.drvSchoolId": this.data.myinfo.drvSchoolId,
      "formModel.drvSchoolName": this.data.myinfo.drvSchoolName,
    })

  },
  // 获取广告数据
  async getadvLst() {
    await wx.apiRequest(StudyGet).then(res => {
      let bannerList =  res.data.filter(item=> {
        if(30<parseInt(item.advType) && parseInt(item.advType)<40 ) {
          return item
        }
      })
      this.setData({
        bannerList: bannerList
      })
    })
  },
  // 获取学员信息
  async getStudentInfo() {
    await wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
      this.setData({
        myinfo: res.data
      })
    })
  },
  // 前往驾校认证
  // toAuth(e) {
  //   wx.redirectTo({
  //     url: `../../authstatus/authstatus?drvSchoolId=${this.data.myinfo.drvSchoolId}&applyAuditStatus=${this.data.myinfo.applyAuditStatus}`,
  //   })
  // },
  // 选择设备类型
  bindPickerEquipmentTypeChange(e) {
    this.setData({
      'formModel.equipmentType': e.detail.value
    })
  },
  // 选择驾校
  toSlctSchool() {
    // if (this.data.formModel.equipmentType == 0) {
    //   return
    // }
    wx.navigateTo({
      url: '../../student/selectDrvSchool/selectDrvSchool',
    })
  },
  //预约日期选择
  bindAppointmentDateChange(e) {
    this.setData({
      'formModel.appointmentDate': e.detail.value
    })
  },
  // 选择预约时长
  bindPickerAppointmentDurationChange(e) {
    this.setData({
      'formModel.appointmentDuration': e.detail.value
    })
  },
  // 提交预约
  submit() {
    let temForm = {
      // drvSchoolId	 驾校ID
      // loginType	登录类型【0=学员预约，1=教练登录，2=学员登录】
      // equipmentType	设备类型【0=简安行模拟器，1=机器人教练，2=易学通】			
      // totalTimeDuration	预约时长（单位：分钟）			
      // trainDate	预约日期		false	
      loginType: this.data.loginType,
      drvSchoolId: this.data.formModel.drvSchoolId,
      equipmentType: this.data.formModel.equipmentType,
      totalTimeDuration: this.data.appointmentDurationList[this.data.formModel.appointmentDuration],
      trainDate: this.data.formModel.appointmentDate,
    }
    wx.apiRequest(ReserveStudentAdd, {
      ...temForm
    }).then(res => {
      if (res.code == 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'none',
          duration: 2000
        }).then(() => {
          wx.navigateBack({
            delta: 1,
          })
        })
        return
      }
    })
  },
  // 点击广告
  currentbannerChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  // 获取今天日期
  getNowDate() {
    let date = new Date()
    let year = date.getFullYear() + "";
    let month = date.getMonth() + 1 > 9 ? String(date.getMonth() + 1) : '0' + String(date.getMonth() + 1)
    let day = date.getDate() > 9 ? String(date.getDate()) : '0' + String(date.getDate())
    // date.();
    return `${year}-${month}-${day}`
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