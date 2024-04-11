// pages/nickname/nickname.js
const app = getApp()
import {
    RealName
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        photoaddr: wx.getStorageSync('photoaddr'),
        query: {
            name: "",
            idCard: "",
            nameAuthAuditStatus: '0'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo:app.globalData.userInfo || wx.getStorageSync('userInfo')
          })
        if (options.idCard === 'null') {
            options.idCard = ''
        }
        if (options.nameAuthAuditStatus === '3') {
            this.setData({
                query: options
            })
        }
    },

    changeName(e) {
        this.setData({
            ['query.name']: e.detail.value
        })
    },
    changeCard(e) {
        this.setData({
            ['query.idCard']: e.detail.value
        })
    },

    // 实名认证
    subAuthName() {
        let {
            name,
            idCard
        } = this.data.query
        let regN = /^[\u2E80-\u9FFF]+$/;
        let regName = regN.test(name)
        let regC = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
        let regIdCard = regC.test(idCard)
        if (!name || !regName) {
            wx.showToast({
                title: '请输入真实姓名',
                icon: 'none'
            })
        } else if (!idCard || !regIdCard) {
            wx.showToast({
                title: '请输入正确的身份证号码',
                icon: 'none'
            })
        } else {
            let {
                nameAuthAuditStatus,
                ...newQuery
            } = this.data.query
            wx.apiRequest(RealName, newQuery).then(res => {
              wx.navigateBack({})
                wx.showToast({
                    title: '认证成功',
                    icon: 'none'
                })
            })
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})