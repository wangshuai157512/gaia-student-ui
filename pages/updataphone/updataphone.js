// pages/updataphone/updataphone.js
import {
    StudentGetCode,
    StudentVerifyCode,
    StudentUpdatePhone
} from "../../config/api"
let Timer
Page({

    /**
     * 页面的初始数据
     */
    data: {
        step:0,
        time:60,
        startPhone:'',
        query:{
            id: 0,
            phone: "",
            requestCode: "",
            requestId: ""
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let { id,phone } = options
        this.setData({
            startPhone:phone,
            ['query.id']:id,
            ['query.phone']:phone
        })
    },
    handleGetCode() {
        if(this.data.step === 2) {
            this.data.query.requestCode = ''
            this.data.query.requestId = ''
            let regP = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            let regPhone = regP.test(this.data.query.phone)
            if(!regPhone) {
                wx.showToast({
                    title: '请输入正确的手机号',
                    icon: 'none',
                    duration: 2000
                  })
                  return
            }
        }
        this.startTime()
        this.setData({
            step:this.data.step+1
        })
        
    },
    // 发送验证码
    sendCode() {
        wx.apiRequest(StudentGetCode,this.data.query).then(({data})=> {
            this.data.query.requestId = data.requestId
        })
    },
    changePhone(e) {
        this.setData({
            ['query.phone']:e.detail.value 
        })
    },
    changeCode(e) {
        this.setData({
            ['query.requestCode']:e.detail.value
        })
    },
    handleNext() {
        wx.apiRequest(StudentVerifyCode,this.data.query).then(({data})=> {
          this.clear()
            this.setData({
                step:this.data.step+1
            })
        })
    },
    handleSubmit() {
        if(!this.data.query.requestCode) {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 2000
              })
              return
        }
        wx.apiRequest(StudentUpdatePhone,this.data.query).then(({data})=> {
            wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 2000
              })
            wx.navigateBack({})
        })
    },
    // 倒计时
    startTime() {
        this.sendCode()
        this.setData({
            time:60
        })
       Timer = setInterval(() => {
            this.setData({
                time:this.data.time-1
            })
            if(this.data.time === 0) {
                this.clear()
            }
        }, 1000);
    },
    clear() {
        clearInterval(Timer)
                Timer = null
    },

   onUnload() {
    this.clear()
   },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    }
})