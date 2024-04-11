// pages/setting/setting.js
const app = getApp()
import {
    ApiRootUrl,
    StudentInfo,
    StudentGender
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: app.globalData.userInfo || wx.getStorageSync('userInfo'),
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        myMsg: {},
        statusSty: ['', 'authenticating', 'unpass', 'authentica'],
        statusText: ['待认证', '认证中', '未通过', '已认证'],
        icon: '../../static/images/ic-right.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        this.setData({
            userInfo:app.globalData.userInfo || wx.getStorageSync('userInfo')
          })
    },
    onShow() {
        this.getStudentInfo()
    },

    // 获取学员信息
    getStudentInfo() {
        wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
            this.setData({
                myMsg: res.data
            })
            wx.setStorageSync('photoaddr', res.data.photoaddr)
        })
    },

    // 头像
    handlePhotoAddr() {
        wx.pro.chooseImage({
            count: 1
        }).then(res => {
            let photoaddr = res.tempFilePaths[0]
            wx.pro.uploadFile({
                header: {
                    "content-type": "multipart/form-data",
                    'Authorization': wx.getStorageSync('token') ? `Bearer ${wx.getStorageSync('token')}` : null
                },
                url: ApiRootUrl + "mp/student/student/uploadPhoto",
                filePath: photoaddr,
                name: 'photo',
                formData: {
                    id: this.data.myMsg.id
                }
            }).then(res => {
                let data = JSON.parse(res.data)
                this.setData({
                    ['myMsg.photoaddr']: data.data.addr
                })
            })
        })
    },

    // 昵称
    handleNickName() {
        wx.navigateTo({
            url: `../nickname/nickname?id=${this.data.myMsg.id}&nickName=${this.data.myMsg.nickName}`
        })
    },

    // 性别
    updataSex() {
        wx.pro.showActionSheet({
            itemList: ['男', '女']
        }).then(res => {
            wx.apiRequest(StudentGender, {
                id: this.data.myMsg.id,
                gender: res.tapIndex + 1
            }).then(res => {
                this.getStudentInfo()
            })
        })
    },
    // 更换手机号
    handlephone() {
        let {id,telephone } = this.data.myMsg
        wx.navigateTo({
          url: `../updataphone/updataphone?id=${id}&phone=${telephone}`,
        })
    },

    // 实名认证
    handleAuthName() {
        let {
            name,
            idCard,
            nameAuthAuditStatus
        } = this.data.myMsg
        wx.navigateTo({
            url: `../authname/authname?name=${name}&idCard=${idCard}&nameAuthAuditStatus=${nameAuthAuditStatus}`
        })
    },

    //驾校认证
    handleSchool() {
        if(!this.data.myMsg.nameAuthAuditStatus) {
            wx.showToast({
                title: '请先进行实名认证',
                icon: 'none',
                duration: 2000
              })
              return
        }
        let {
            applyAuditStatus,
            drvSchoolId
        } = this.data.myMsg
        if (applyAuditStatus == 3) {
            wx.navigateTo({
                url: `../authsuccess/authsuccess?drvSchoolId=${drvSchoolId}`
            })
        } else {
            wx.navigateTo({
                url: `../authstatus/authstatus?applyAuditStatus=${applyAuditStatus}&drvSchoolId=${drvSchoolId}`
            })
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})