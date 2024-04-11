/* 我的-消息中心 */
import {
  ImagOrigin,
  pageSysApi,
  pageActivityApi
} from "../../config/api.js"
Page({
  data: {
    ImagOrigin: ImagOrigin,
    // 消息类型
    msgTypeList: [{
        label: '系统消息',
        value: 0
      },
      {
        label: '活动消息',
        value: 1
      },
    ],
    pageNum: 1,
    total: 0,
    msgType: '0',
    // 列表数据
    datalist: [],
  },
  onLoad() {
    var that = this;
    that.setData({
      datalist: [],
      total: 0
    })
    // 2、获取列表数据
    that.getList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum: this.data.pageNum + 1,
    })
    this.getList()

  },
  // 切换tab
  swichNav: function (e) {
    const that = this;
    if (that.data.msgType === e.target.dataset.current) {
      return false;
    }
    that.setData({
      'msgType': e.target.dataset.current,
      datalist: [],
      pageNum: 1,
      total: 0
    })
    that.getList()
  },
  // 获取列表数据
  getList: function () {
    const that = this
    let tembtm = this.data.datalist
    let tempApi = that.data.msgType == 0 ? pageSysApi : pageActivityApi
    wx.apiRequest(tempApi, {
      pageNum: this.data.pageNum
    }).then(({
      records,
      code,
      total
    }) => {
      if (code == 200) {
        records.forEach(item => {
          tembtm.push(item)
        })
        that.setData({
          total: total,
          'datalist': tembtm
        })
      }
    })
  },
  // 跳转详情页面
  toDetail: function (e) {
    const that = this;
    wx.navigateTo({
      url: '../messageCenterDetail/messageCenterDetail',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('sendDetaiData', {
          ...e.currentTarget.dataset.current
        })
      }
    })
  },
})