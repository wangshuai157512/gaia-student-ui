/* 我的-我的预约 */
import {
  StudentInfo,
  ReserveStudentPage,
  ReserveStudentCancelUpdate,
  YxtReserveStudent
} from "../../../config/api.js"
const app = getApp()
Page({
  data: {
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
    // 设备类型 字典 
    equipmentTypeList: ['智能模拟器', '机器人教练', '易学通','简学通'
      // ,'易学通'
    ],
    chargeWayList: [{
        label: '按时',
        value: 0
      },
      {
        label: '按圈',
        value: 1
      },
    ],
    // 预约状态 字典
    statusList: [{
        label: '训练中', //（至少登录过一次了，可多次）
        value: 2
      },
      {
        label: '已过期',
        value: 3
      },
      {
        label: '已取消',
        value: 4
      },
      {
        label: '已训练',
        value: 5
      },
    ],
    // 登录类型	字典
    loginTypeList: [{
        label: '学员预约',
        value: 0
      },
      {
        label: '教练登录', //（至少登录过一次了，可多次）
        value: 1
      },
      {
        label: '学员登录',
        value: 2
      },
    ],
    //
    total: 0,
    // 查询接口参数
    queryForm: {
      drvSchoolId: '',
      //设备类型
      equipmentType: 0,
      // 登录类型【0=学员预约，1=教练登录，2=学员登录】
      loginType: '0',
      pageNum: 1,
      pageSize: 20,
      desc: 'createTime'
    },
    // 列表数据
    datalist: [],
    // 取消预约弹窗设置
    showDialog: false,
    // 选择的数据
    sdData: {},
    showRezuilt: false
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
      'queryForm.equipmentType': options.equipmentType || 0
    })
  },
  async onShow() {
    // 1、获取登录信息---实名认证状态 登录类型
    // 获取学员 
    await this.getStudentInfo()
    this.setData({
      'queryForm.drvSchoolId': this.data.myinfo.drvSchoolId,
      datalist: [],
      'queryForm.pageNum': 1,
      total: 0
    })
    // 2、获取列表数据
    this.getList()
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      'queryForm.pageNum': this.data.queryForm.pageNum + 1
    })
    this.getList()

  },
  // 获取学员信息
  async getStudentInfo() {
    await wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
      this.setData({
        myinfo: {
          ...res.data,
          drvSchoolId: ''
        }
      })
    })
  },
  // 切换tab
  swichNav: function (e) {
    var that = this;
    if (that.data.queryForm.equipmentType === e.target.dataset.current) {
      return false;
    }
    that.setData({
      'queryForm.equipmentType': e.target.dataset.current,
      'queryForm.pageNum': 1,
      datalist: [],
      total: 0
    })
    that.getList()
  },

  // 获取列表数据
  getList: function () {
    const that = this
    let tembtmls = this.data.datalist
    let query = that.data.queryForm
    wx.apiRequest(ReserveStudentPage, {
      ...query,
    }).then(({
      total,
      records,
      code
    }) => {
      if (code == 200 && records && records.length > 0) {
        records.forEach(item => {
          // item.equipmentTypeName = that.setDataListName(item.equipmentType, that.data.equipmentTypeList)
          item.statusName = that.setDataListName(item.status, that.data.statusList)
          if (item.status == 2) {
            let nc = this.setProsess(item)
            item.progress = nc.progress
            item.totalTrainTime = nc.totalTrainTime
            item.isTrainTime = nc.isTrainTime
          }
          item.startTime && (item.startTime = item.startTime.substr(0, 5))
          item.endTime && (item.endTime = item.endTime.substr(0, 5))
          tembtmls.push(item)
        })
        // 的进度是开始时间与当前时间 计算的
        that.setData({
          total: total,
          'datalist': tembtmls
        })
      }
    })
    // } else {
    //   wx.apiRequest(YxtReserveStudent, {
    //     ...query,
    //   }).then(res => {
    //     this.setData({
    //       datalist: res.data
    //     })
    //   })

    // }

  },
  setProsess(item) {
    let nc = {
      progress: 0,
      isTrainTime: 0,
      totalTrainTime: 0
    }
    // 进度是开始时间与当前时间 计算的
    let d1 = new Date(item.nowTime).getTime()
    let d2 = new Date(item.startTime).getTime()
    let d12 = (d1 - d2) / 60 / 1000
    let yysc = item.totalTimeDuration ? item.totalTimeDuration * 60 : 0
    let d12yysc = Math.floor(((d12 / yysc) * 100))
    nc.progress = d12yysc > 100 ? "100" : d12yysc.toFixed(0)
    nc.totalTrainTime = item.totalTimeDuration ? Math.round(item.totalTimeDuration / 60).toFixed(0) : 0
    nc.isTrainTime = Math.round(d12 / 60).toFixed(0)
    return nc
  },
  // 获取字段名称
  setDataListName(type, list) {
    let str = ''
    list.forEach(item => {
      if (item.value == type) {
        str = item.label
      }
    })
    return str
  },
  //显示弹窗
  handleShowDialog(e) {
    let that = this
    let id = e.currentTarget.dataset.current
    wx.showModal({
      title: '提示',
      content: '您确定要取消此次预约吗',
      confirmText: "再等等",
      cancelText: '立即取消',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
        } else if (res.cancel) {
          let query = {
            id
          }
          wx.apiRequest(ReserveStudentCancelUpdate, {
            ...query,
          }).then(({
            code
          }) => {
            if (code == 200) {
              wx.showToast({
                title: '取消成功',
                icon: 'none',
                duration: 2000
              })

              that.setData({
                datalist: [],
                'queryForm.pageNum': 1,
                total: 0
              })
              that.getList()
              that.setShowRezuilt()
            }
          })
        }
      }
    })
  },
  // 弹窗确认按钮操作
  confirm() {

  },
  // 弹窗取消按钮操作
  waitamoment() {
    let that = this
    that.setData({
      'sdData': {},
      'showDialog': false
    })
  },
  // 显示提示
  setShowRezuilt(msg) {
    let that = this
    that.waitamoment()
    that.setData({
      'showRezuilt': msg
    })
    let tm = setTimeout(() => {
      that.setData({
        'showRezuilt': ''
      })
      clearTimeout(tm)
    }, 3000)

  },
  // 跳转预约页面
  resbtn(e) {
    wx.navigateTo({
      url: `../../appointmenting/appointmenting?equipmentType=${this.data.queryForm.equipmentType}`
    })
  },
  // 跳转认证页面
  // toAuth(e) {
  //   // 暂时没有个人认证
  //   wx.navigateTo({
  //     url: `../../authstatus/authstatus?drvSchoolId=${this.data.myinfo.drvSchoolId}&applyAuditStatus=${this.data.myinfo.applyAuditStatus}`,
  //   })
  // },
})