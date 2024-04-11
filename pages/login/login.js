// pages/login/login.js
import {
  LoginConfig,
  AuthLoginByWeixin,
  NeedPhone
} from "../../config/api"

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wH: 1206,
    code: null,
    userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
    isLogin: false,
    btnDisabled: true
  },

  onShow() {
    if (wx.getStorageSync('token')) {
      wx.reLaunch({
        url: '../studypage/studypage',
      })
    } else {
      wx.pro.login().then(({
        code
      }) => {
        this.setData({
          code
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.wH = app.globalData.systemInfo.windowHeight * 2;

  },

  getPhoneNumber({
    detail
  }) {
    const {
      encryptedData,
      errMsg,
      iv
    } = detail;

    if (errMsg === 'getPhoneNumber:ok') {
      const {
        nickName,
        avatarUrl
      } = app.globalData.userInfo
      wx.apiRequest(AuthLoginByWeixin, {
        ...LoginConfig,
        "js_code": this.data.code,
        encryptedData,
        iv,
        nickName,
        avatar: avatarUrl
      }).then(({
        data,
        code
      }) => {
        if (code == 200) {
          wx.setStorageSync('token', data)
          wx.reLaunch({
            url: '../mine/mine',
          })
        } else {
          this.setData({
            code
          })
        }
      }).catch(err => {
        wx.pro.login().then(({
          code
        }) => {
          this.setData({
            code
          })
        })
      })
    } else {
      wx.pro.login().then(({
        code
      }) => {
        this.setData({
          code
        })
      })
    }
  },

  getUserProfile() {
    // 获取用户信息 
    // 登录
    if (this.data.btnDisabled) {
      wx.showToast({
        title: '请先勾选《用户协议》和《隐私政策》',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.pro.getUserProfile({
      desc: '业务需要'
    }).then(res => {

      app.globalData.userInfo = res.userInfo
      wx.setStorageSync('userInfo', res.userInfo);
      wx.pro.login().then(({
        code
      }) => {
        wx.apiRequest(NeedPhone, {
          ...LoginConfig,
          "js_code": code,
        }).then(({
          data
        }) => {
          if (!data) {
            wx.pro.login().then(({
              code
            }) => {
              const {
                nickName,
                avatarUrl
              } = app.globalData.userInfo
              wx.apiRequest(AuthLoginByWeixin, {
                ...LoginConfig,
                "js_code": code,
                nickName,
                avatar: avatarUrl
              }).then(({
                data,
                code
              }) => {
                if (code == 200) {
                  wx.setStorageSync('token', data)
                  wx.reLaunch({
                    url: '../mine/mine',
                  })
                }
              }).catch(err => {
                wx.pro.login().then(({
                  code
                }) => {
                  this.setData({
                    code
                  })
                })
              })
            })
          } else {
            this.setData({
              isLogin: true,
            })
          }
        })
      })



    })
  },

  redioboxChange() {
    this.setData({
      btnDisabled: !this.data.btnDisabled
    })
  },
  //用户协议跳转
  textcontent() {
    wx.navigateTo({
      url: `../loginagreement/loginagreement`,
    })
  },

  //隐私政策跳转
  textcontent2() {
    wx.navigateTo({
      url: `../loginpolicy/loginpolicy`,
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})