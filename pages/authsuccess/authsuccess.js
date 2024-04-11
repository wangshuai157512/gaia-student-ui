// pages/authstatus/authstatus.js
const app = getApp()
import {
    DrvSchoolInfo
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
        baseUrl:'https://jpypt.oss-cn-beijing.aliyuncs.com',
        photoaddr:wx.getStorageSync('photoaddr'),
        cityname:"",
        drvSchoolName:'',
        drvSchoolId:'',
    },
   
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo:app.globalData.userInfo || wx.getStorageSync('userInfo')
          })
        let { drvSchoolId } = options
        this.data.drvSchoolId = drvSchoolId
        this.getSchoolInfo(drvSchoolId)
    },
    //获取某驾校信息
    getSchoolInfo(id) {
        wx.apiRequest(DrvSchoolInfo,{id}).then(({data})=> {
            this.setData({
                cityname:data.city,
                drvSchoolName:data.name
            })
        })
    },
    // 重新认证
    handleRegister() {
        wx.redirectTo({
            url: `../authstatus/authstatus?applyAuditStatus=0&drvSchoolId=${this.data.drvSchoolId}`,
          })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})