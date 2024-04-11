// pages/appointment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipmentList:[
      {
        img:"../../static/images/appointment01.png",
        color:"#5B78CC"
      },
      {
        img:"../../static/images/appointment02.png",
        color:'#B74228'
      },
      {
        img:"../../static/images/appointment03.png",
        color:"#569808"
      },
      {
        img:"../../static/images/appointment04.png",
        color:"red"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  goAppointment(e) {
    let equipmentType = e.currentTarget.dataset.index
    wx.navigateTo({
        url: `../../../pages/appointmenting/appointmenting?equipmentType=${equipmentType}`
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})