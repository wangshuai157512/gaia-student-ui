// pages/light/light.js
import {
    ProjectDetail,
    ShowCount
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
       videoMsg:{},
       flag : true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoDeatil(options.id)
    },

    //获取视频详细
    getVideoDeatil(id) {
        wx.apiRequest(ProjectDetail,{id}).then(res=> {
            this.setData({
                videoMsg:res.data
            })
        })
    },

    // 播放视频次数
    playVideo() {
        if(this.data.flag) {
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