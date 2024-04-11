/* 我的-消息详情 */
import {
  ImagOrigin,
} from "../../config/api.js"
Page({
  data: {
    ImagOrigin:ImagOrigin,
    msg: {
      createTime: '',
      url: '',
      title: '',
      body: '',
    }
  },
  onLoad(options) {
    var that = this;
    const eventChannel = that.getOpenerEventChannel()
    eventChannel.on('sendDetaiData', function (data) {
      that.setData({
        msg: data
      })
    })
  },
})