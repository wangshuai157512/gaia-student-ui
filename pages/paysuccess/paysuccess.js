// pages/paysuccess/paysuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      label: "支付金额：",
      value: '30元'
    }, {
      label: "订单时长：",
      value: '30元'
    }, {
      label: "训练科目：",
      value: '30元'
    }, {
      label: "训练车型：",
      value: '30元'
    }, {
      label: "当前登录车牌号码：",
      value: '30元'
    }, ]
  },

  close() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      amount,
      totalTimeDuration,
      carType,
      subject,
      chargeWay,
      hphm
    } = options

    this.setData({
      'list[0].value': `${amount}元`,
      'list[1].label': `${chargeWay==0?'订单时长：':'订单圈数：'}`,
      'list[1].value': `${totalTimeDuration}${chargeWay==0?'分钟':'圈数'}`,
      'list[2].value': subject == 2 ? '科目二' : '科目三',
      'list[3].value': carType,
      'list[4].value': hphm
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