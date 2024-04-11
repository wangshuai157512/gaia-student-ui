// pages/authstatus/authstatus.js
import {
    SelectCity
} from "../../config/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        city:[],//接口获取的城市
        cities : [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCity()
    },
    // 获取城市
    getCity() {
        
    },
    onChange(event){
        // console.log(event.detail,'click right menu callback data')
    },
    handleCity(e) {
        let pages = getCurrentPages();
        //上一页面
        let prevPage = pages[pages.length - 2];
        //将数值信息赋值给上一页面cityname变量
        prevPage.setData({
            cityname: e.target.dataset.cityname,
            drvSchoolName:"",
            cityId: e.target.dataset.cityid
        });
        wx.navigateBack({
          delta: 1
        })
    },
    async onReady(){
        let storeCity = new Array(26);
        const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        words.forEach((item,index)=>{
            storeCity[index] = {
                key : item,
                list : []
            }
        })
        let { data } = await  wx.apiRequest(SelectCity) 
        data.forEach(item=> {
            item.name = item.label
        })
        data.forEach((item)=>{
            let firstName = item.pinyin.substring(0,1).toUpperCase();
            let index = words.indexOf(firstName);
            storeCity[index].list.push({
                name : item.name,
                cityId:item.value,
                key : firstName
            });
        })
     
        this.data.cities = storeCity;
        this.setData({
            cities : this.data.cities
        })  
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})