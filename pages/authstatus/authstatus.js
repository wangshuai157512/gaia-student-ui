// pages/authstatus/authstatus.js
import {
    SchoolList,
    SchoolRegister,
    DrvSchoolInfo
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        icon:'../../static/images/ic-right.png',
        pickerIndex:-1,
        schoolList:[],
        list:[],
        applyAuditStatus:null,
        cityname:"",
        cityId:"",
        drvSchoolName:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let { applyAuditStatus,drvSchoolId } = options
        this.setData({
            applyAuditStatus
        })
        if(applyAuditStatus != 0) this.getSchoolInfo(drvSchoolId)
    },
    onShow:function() {
        this.getSchool()
    },
    handleSelectCity() {
        wx.navigateTo({
          url: '../city/city',
        })
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

    // 获取所有驾校
    getSchool() {
        wx.apiRequest(SchoolList,{cityId:this.data.cityId}).then(res=> {
            let list = res.data.map(item=> {
                return {
                    name:item.name,
                    id:item.id
                }
            })
            this.setData({
                schoolList:list
            })
        })
    },

     //选择驾校
     handleSchool(e) {
         if(!this.data.cityname) {
            wx.showToast({
                title: '请先选择所在城市',
                icon: 'none',
                duration: 2000
              })
              return
         }
        this.setData({
            pickerIndex: e.detail.value,
            drvSchoolName:this.data.schoolList[e.detail.value]?.name
          })
       
    },
    // 提交驾校
    schoolRegisterSubmit() {
        let schoolId = this.data.schoolList.map(item=> {
            if(this.data.drvSchoolName === item.name) {
                return item.id
            }
        }).join('')
        wx.apiRequest(SchoolRegister,{schoolId}).then(res=>{
            wx.showToast({
                title: '提交成功',
                icon: 'none',
                duration: 2000
              })
              wx.navigateBack({})
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})