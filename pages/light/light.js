// pages/light/light.js
import {
    StudyLightList,
    StudyCarLightList,
    ShowCount
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        videoMsg:{},
        flag:true,
        titleOption:{
            title:"其它车型",
        },
        videoList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getLight()
        this.getCarType()
    },
    // 获取灯光视频
    // getLight() {
    //     wx.apiRequest(StudyLightList).then(res=> {
    //         this.setData({
    //             videoMsg:res.data
    //         })
    //     })
    // },
    // 观看视频
    lookVideo(e) {
        e.detail.videoScreen = e.detail.videoscreen
       this.setData({
         videoMsg:e.detail
       })
       this.data.flag = true
    },
    //获取车型车辆灯光讲解
    getCarType() {
        wx.apiRequest(StudyCarLightList).then(res=> {
            this.setData({
                videoMsg:res.data[0]
            })
            this.setData({
                videoList:res.data
            })
        })
    },
    // 播放视频次数
    playVideo() {
        if(this.data.flag) {
            console.log(this.data.videoMsg)
            wx.apiRequest(ShowCount,{id:this.data.videoMsg.id}).then(res=> {
            //   console.log(res)
            })
            this.data.flag = false
        } 
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})