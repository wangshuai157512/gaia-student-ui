import {
  StudentInfo,
} from "../../config/api"
import Wxml2Canvas from 'wxml2canvas';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photoaddr: "",
    show: false,
    duration: 200,
    position: 'bottom',
    customStyle: 'height: 30%;background: #F7F9FC;',
    round: true,
    canvasImgesUrl: null,
    isPageShow: false
  },

  getInfo() {
    wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
      this.setData({
        photoaddr: res.data.photoaddr,
      })
    })
  },
  /**
   * 分享
   */
  share() {
    this.setData({
      show: true
    }, () => {
      setTimeout(() => {
        this.setData({
          isPageShow: true
        })
      }, 200);
    })
  },
  /**
   * 取消分享
   */
  cancelShare() {
    this.setData({
      isPageShow: false
    }, () => {
      this.setData({
        show: false,
      })
    })
  },
  /**
   * 创建wxml2canvas对象
   */
  draw() {
    console.log(this.width, this.height)
    const drawImage = new Wxml2Canvas({
      element: 'share', // canvas节点的id,
      obj: this, // 在组件中使用时，需要传入当前组件的this
      width: this.width * 2, // 宽高
      height: 400,
      background: '#F7F9FC', // 默认背景色
      progress(percent) { // 绘制进度
        console.log(percent)
      },
      finish(url) {
        wx.hideLoading()
        console.log("创建的图片", url);
      },
      error(res) {
        console.log(res);
        // uni.hideLoading()
        // 画失败的原因
      }
    }, this);
    const data = {
      //直接获取wxml数据
      list: [{
        type: 'wxml',
        class: '.contaner_page .draw_canvas',
        limit: '.contaner_page',
        x: 0,
        y: 0
      }]
    }
    //传入数据，画制canvas图片
    drawImage.draw(data, this);
  },

  handleSave() {
    wx.showLoading({
      title: '正在生成图片',
      mask: true
    })
    this.draw()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getInfo()
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