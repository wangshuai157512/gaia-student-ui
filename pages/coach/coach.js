const api = require("../../config/api")
import {
    MyCoach
} from "../../config/api"
// pages/coach/coach.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        normalPhoto:'../../static/images/photoUpload.png',
        coachMsg: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function (options) {
        this.getMyCoach()
    },

    callCoach(e) {
        wx.pro.showActionSheet({
            itemList: [e.target.dataset.phone]
        }).then(({
            tapIndex
        }) => {
            if (tapIndex === 0) {
                wx.makePhoneCall({
                    phoneNumber: e.target.dataset.phone //仅为示例，并非真实的电话号码
                })
            }
        })
    },
    // 获取教练信息
    getMyCoach() {
        wx.apiRequest(MyCoach, {}, 'GET').then(({
            data
        }) => {
            this.setData({
                coachMsg: data
            })
        })
    },
    // 评价
    handleEvaluate(e) {
        let msg = this.data.coachMsg[e.target.dataset.msg]
        let { id,photo,name,drivingAge,studentCount,score,drvSchoolName } = msg 
        wx.setStorageSync('photo', photo)
        wx.navigateTo({
            url: `../evaluate/evaluate?id=${id}&name=${name}&drivingAge=${drivingAge || ''}&studentCount=${studentCount}&score=${score || ''}&drvSchoolName=${drvSchoolName}`
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})