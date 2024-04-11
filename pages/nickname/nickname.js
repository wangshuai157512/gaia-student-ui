// pages/nickname/nickname.js
import {
    StudentNickName
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query:{
            id:"",
            nickName:""
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            query:options
        })
    },

    changeInput(e) {
        this.setData({
            ['query.nickName']:e.detail.value
        })
    },

    // 修改昵称
    upStudentNickName() {
        wx.apiRequest(StudentNickName,this.data.query).then(res=> {
            wx.showToast({
                title: '修改成功',
                icon:'none'
              })
              wx.navigateBack()
        })
      
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})