// pages/coach/evaluate/evaluate.js
import {
    evaluate
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        queryCoach:{
            coachId:null,
            memo:'',
            prefessionalLevel:-1,
            serveAttitude:-1,
        },
        item:{},
        activeStar:'../../static/images/starActive.png',
        nomalStar:'../../static/images/nomalStar.png',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let photo = wx.getStorageSync('photo')
        this.setData({
            item : {...options,photo}
        })
        this.data.queryCoach.coachId =  this.data.item.id
    },
    // 服务态度评分
    handleManner(e) {
        this.setData({
            ['queryCoach.serveAttitude']:e.target.dataset.index
        })
    },
    // 服务专业度评分
    handleMajor(e) {
        this.setData({
            ['queryCoach.prefessionalLevel']:e.target.dataset.index
        })
    },

    changeMemo(e) {
        this.setData({
            ['queryCoach.memo']:e.detail.value
        })
    },

    //提交
    handleSubmit(e) {
        let {coachId,memo,prefessionalLevel,serveAttitude} = this.data.queryCoach
        let resultStar = (prefessionalLevel+1) + (serveAttitude+1)
        if(serveAttitude<1) {
            wx.showToast({
                title: '请选择服务态度',
                icon: 'none', duration: 2000
              })
        }else if(prefessionalLevel<1) {
            wx.showToast({
                title: '请选择专业度',
                icon: 'none', duration: 2000
              })
        }else if(!memo && resultStar<8) {
            wx.showToast({
                title: '请选择评价',
                icon: 'none', duration: 2000
              })
        }else {
            wx.apiRequest(evaluate,{...this.data.queryCoach,prefessionalLevel:prefessionalLevel+1,serveAttitude:serveAttitude+1}).then(res=> {
                wx.showToast({
                    title: '评价完成',
                    icon: 'none', duration: 2000
                })
                wx.navigateBack({})
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})