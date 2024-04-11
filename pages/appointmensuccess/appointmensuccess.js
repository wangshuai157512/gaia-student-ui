// pages/appointmensuccess/appointmensuccess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{},
    menu: [],
    menuSimulator:[
      {
        imgUrl: '../../static/images/equipment.png',
        label:"预约设备",
        value: 'equipmentTypeChinese',
      },
      {
        imgUrl: '../../static/images/date.png',
        label: '预约时间',
        value: 'trainDate',
        checkTime: true
      },
    ],
   menuRobot:[
    {
      imgUrl: '../../static/images/equipment.png',
      label:"预约设备",
      value: 'equipmentTypeChinese',
    },
    {
      imgUrl: '../../static/images/date.png',
      label: '训练日期',
      value: 'trainDate',
    },
    {
      imgUrl: '../../static/images/rotcode.png',
      label: '验证码',
      value: 'rotcode',
    },
    {
      imgUrl: '../../static/images/time-dur.png',
      label: '预约时长',
      value: 'totalTimeDuration',
      company:'分钟',
      round:"圈"
    }
   ],
   menuYxt:[
    {
      imgUrl: '../../static/images/equipment.png',
      label:"预约设备",
      value: 'equipmentTypeChinese',
    },
    {
      imgUrl: '../../static/images/date.png',
      label: '训练日期',
      value: 'trainDate',
    },
    {
      imgUrl: '../../static/images/time-dur.png',
      label: '预约时长',
      value: 'totalTimeDuration',
      company:'分钟',
      round:"圈"
    },
    {
      imgUrl: '../../static/images/time-dur.png',
      label: '应缴金额',
      value: 'amount',
      company:'元'
    }
   ],
   menuJxt:[
    {
      imgUrl: '../../static/images/equipment.png',
      label:"预约设备",
      value: 'equipmentTypeChinese',
    },
    {
      imgUrl: '../../static/images/date.png',
      label: '训练日期',
      value: 'trainDate',
    },
    {
      imgUrl: '../../static/images/time-dur.png',
      label: '预约时间段',
      value: 'durTime',
    }
   ],
   explain:[
     "到训练场地后，请扫描训练设备的二维码登录智能设备模拟器。","到训练场地后，请扫描训练设备的二维码登录，也可以输入“验证码”登录机器人教练。","到训练场地后，您可以请扫描训练设备的二维码登录，也可以输入“验证码”登录易学通设备。"
   ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let queryForm = JSON.parse(options.form)
  
      queryForm.timeList=queryForm.timeList.map(item=> {
        item.startTime = item.startTime.slice(0,5)
        item.endTime = item.endTime.slice(0,5)
        return item
      })
      this.setData({
        form:queryForm,
        'form.timeList': queryForm.timeList,
        'form.rotcode': options.rotcode
      })
    
    if(queryForm.equipmentType==3) {
      this.setData({
        'form.durTime':`${queryForm.timeList[0].startTime}-${queryForm.timeList[0].endTime}`
      })
    }
    if (queryForm.equipmentType === '0') {
      this.setData({
        menu: this.data.menuSimulator,
        'form.equipmentTypeChinese':'智能模拟器'
      })
      wx.setNavigationBarTitle({
        title: "智能模拟器"
      })
    } else if (queryForm.equipmentType === '1') {
      this.setData({
        menu: this.data.menuRobot,
        'form.equipmentTypeChinese':'机器人教练'
      })
      wx.setNavigationBarTitle({
        title: "机器人教练"
      })
    }else if (queryForm.equipmentType === '2') {
      this.setData({
        menu: this.data.menuYxt,
        'form.equipmentTypeChinese':'易学通'
      })
      wx.setNavigationBarTitle({
        title: "易学通"
      })
    }else {
      this.setData({
        menu: this.data.menuJxt,
        'form.equipmentTypeChinese':'简学通'
      })
      wx.setNavigationBarTitle({
        title: "简学通"
      })
    }
  },

  goAppointment() {
    wx.navigateTo({
        url: `../appointmenting/appointmenting?equipmentType=${this.data.form.equipmentType}`
    })
  },

  // 查看预约记录
  lookAppointment() {
    wx.navigateTo({
      url: `../student/myAppointment/myAppointment?equipmentType=${this.data.form.equipmentType}`,
    })
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