// pages/study/studypage/studypage.js
import {
  StudyGet,
  StudyProjectVideo,
  EquipmentUsed
} from "../../config/api"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryProjectVideo: {
      carType: "",
      subject: "2"
    },
    baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
    tabTitle: ['科目二', '科目三'],
    tabIndex: 0,
    bannerList: [],
    currentIndex: 0,
    briefObj: {
      twoBrief: [{
          img: '../../static/images/brief01.png',
          name: "科二 简介",
          toUrl: "../subtwodescriptions/subtwodescriptions"
        },
        {
          img: '../../static/images/brief02.png',
          name: "部件 学习",
          toUrl: "../studyunit/studyunit"
        }
      ],
      threeBrief: [{
          img: '../../static/images/brief01.png',
          name: "科三 简介",
          toUrl: "../subthreedescriptions/subthreedescriptions"
        },
        {
          img: '../../static/images/brief02.png',
          name: "灯光 讲解",
          toUrl: "../light/light"
        }
      ],
    },
    titleOption: {
      title: "科目二考试项目讲解",
      operate: "手动挡",
      icon: "../../static/images/tab-icon.png"
    },
    videoList: [],
    isUseing: null,
  },
  jump() {
    wx.navigateTo({
      url: '../usesuccess/usesuccess',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geTBannerList()
    this.getVideoList()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUsed()
    this.getTabBar().setData({
      selected: 0
    })
  },


  // 获取广告
  geTBannerList() {
    wx.apiRequest(StudyGet).then(res => {
      let myBanner = res.data.map((item) => {
        if (this.data.tabIndex === 0 && 10 < parseInt(item.advType) && parseInt(item.advType) < 20) {
          return item
        } else if (this.data.tabIndex === 1 && 20 < parseInt(item.advType) && parseInt(item.advType) < 30) {
          return item
        }
      }).filter((item) => {
        return item
      })
      this.setData({
        bannerList: myBanner
      })
    })
  },
  // 获取设备使用情况
  getUsed() {
    if (wx.getStorageSync('token'))
      wx.apiRequest(EquipmentUsed, {}, 'GET').then(res => {
        this.setData({
          isUseing: res.data
        })
      })
  },
  // 获取视频列表
  getVideoList() {
    let {
      carType,
      subject
    } = this.data.queryProjectVideo
    if (!carType && subject === '2') {
      this.data.queryProjectVideo.carType = 'C1'
    }
    if (subject === '3') {
      this.data.queryProjectVideo.carType = ''
    }
    wx.apiRequest(StudyProjectVideo, this.data.queryProjectVideo).then(res => {
      this.setData({
        videoList: res.data
      })
    })
  },
  handleTab(e) {
    this.setData({
      ['titleOption.operate']: e.currentTarget.dataset.index === 1 ? "" : "手动挡",
    })
    this.setData({
      tabIndex: e.currentTarget.dataset.index,
      ['queryProjectVideo.subject']: e.currentTarget.dataset.index + 2 + '',
      ['titleOption.title']: `${this.data.tabTitle[e.currentTarget.dataset.index]}考试项目讲解`
    }, () => {
      this.geTBannerList()
      this.getVideoList()
    })
  },
  currentChange(e) {
    this.setData({
      currentIndex: e.detail.current
    })
  },
  // 部件详情
  briefDetail(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },

  // 手动自动切换
  hanldlePartent(e) {
    if (e.detail) {
      this.setData({
        ['titleOption.operate']: '自动挡',
        ['queryProjectVideo.carType']: 'C2'
      })
    } else {
      this.setData({
        ['titleOption.operate']: '手动挡',
        ['queryProjectVideo.carType']: 'C1'
      })
    }
    this.getVideoList()
  },

  // 观看视频
  lookVideo(e) {
    wx.navigateTo({
      url: `../projectVideo/projectVideo?id=${e.detail.id}`
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '学员小蜜',
      path: '/pages/studypage/studypage',
      imageUrl: '../../static/images/appcode.png'
    }
  }



})