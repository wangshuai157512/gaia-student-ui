import {
  TrainRecordInfo,
  ProjectSimple,
  TrainRecordInfoType,
  // TrainRecordProject
} from "../../config/api"
var typeOptins, loginId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeName: '测试',
    type: 0,
    typeNameList: ['智能模拟器', '机器人教练', '易学通'],
    info: null,
    project: [],
    current: 0,
    trainType: null,
    currentDropdown: {},
    show: false,
    duration: 200,
    position: 'bottom',
    customStyle: 'height: 70%;background: #F7F9FC;',
    round: true,
  },
  handleClose() {
    this.setData({
      show: false
    })
  },
  tapType() {
    this.setData({
      show: true
    })
    // wx.showActionSheet({
    //   alertText: ' 请选择要查看的训练项目',
    //   itemList: typeOptins.map(item => item.label),
    // }).then(res => {
    //   this.setData({
    //     typeName: typeOptins[res.tapIndex].label,
    //     trainType: typeOptins[res.tapIndex].value,
    //     current: 0,
    //   })
    //   this.getRecordProject(res.tapIndex)
    // }).catch(err => {})
  },

  tapProject(e) {
    this.setData({
      current: e.target.dataset.index
    })
    this.getRecordInfo(e.target.dataset.value)
  },

  getRecordInfo() {
    const {
      trainType
    } = this.data;
    wx.apiRequest(TrainRecordInfo, {
      loginId,
      projectId: trainType
    }).then(res => {
      this.setData({
        info: res.data
      })
    })
  },
  setProject(e) {
    const value = e.target.dataset.value;
    const label = e.target.dataset.label;
    this.setData({
      typeName: label,
      trainType: value,
      show: false
    }, this.getRecordInfo)
  },
  handleTapDropdown(e) {
    const index = e.target.dataset.index;

    this.setData({
      [`currentDropdown.${index}`]: !this.data.currentDropdown[index]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({
    id,
    type
  }) {
    loginId = id;
    wx.apiRequest(ProjectSimple, {
      id
    }).then(res => {
      typeOptins = res.data;
      this.setData({
        type
      })
      if (res.data.length) {
        this.setData({
          typeName: typeOptins[0].label,
          trainType: typeOptins[0].value,
          project: res.data
        }, this.getRecordInfo)
        // this.getRecordProject()
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