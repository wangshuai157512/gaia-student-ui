// pages/study/studyunit/studyunit.js
import {
    StudyCarTypeTab,
    StudyCarTypeList
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        queryCar:{
            carModel:""
        },
        tabTitle: [],
        tabIndex:0,
        tabList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getTab()
    },
    handleTab(e) {
        let { index, ...queryCar } = e.target.dataset
        this.setData({
            tabIndex:index
        })
        let {carmodel} = queryCar
        this.data.queryCar = {
            carModel:carmodel
        }
        this.getCarTypeList() 
    },
    // 获取头部车型
    getTab() {
        wx.apiRequest(StudyCarTypeTab).then(res=> {
            this.setData({
                tabTitle:res.data,
                ['queryCar.carModel']:res.data[0]
            })
            this.getCarTypeList()
        })
    },
    // 部件列表
    getCarTypeList() {
        wx.apiRequest(StudyCarTypeList,this.data.queryCar).then(res=> {
            res.data.forEach((item)=> {
                if(item.duration) {
                    let m = parseInt(item.duration / 60)<10?('0'+parseInt(item.duration / 60)):parseInt(item.duration / 60)
                    let s = item.duration % 60 <10?('0'+item.duration % 60):item.duration % 60
                    item.duration = m + ":" + s
                }
            })
            this.setData({
                tabList:res.data
            })
        })
    },
    handleVideo(e) {
        wx.navigateTo({
          url: `../projectVideo/projectVideo?id=${e.target.dataset.id}`,
        })
    }
    
    

})