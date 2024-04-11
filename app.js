// app.js
import {
  promisifyAll,
  promisify
} from 'wx-promise-pro'
promisifyAll()
import {
  request
} from "./utils/util"


wx.apiRequest = request;

App({
  onLaunch() {
    //获取手机信息
    wx.pro.getSystemInfo().then(res => {
      this.globalData.systemInfo = res
    })
  },
  globalData: {
    systemInfo: null,
    userInfo: null,
    tabarCount: 0
  }
})