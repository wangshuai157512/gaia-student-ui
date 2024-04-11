// pages/share/share.js
import {
    StudentInfo,
    ShareFinish
} from "../../config/api"
import Wxml2Canvas from 'wxml2canvas';
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        photoaddr: '',
        trainMsg: {},
        showPop: false,
        showCanvas: false,
        canvasUrl: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getInfo()
        for(let attr in options.data) {
            if(options.data[attr] === 'null' || options.data[attr] === null) {
                options.data[attr] = ''
            }
        } 
        let trainMsg = JSON.parse(options.data)      
        this.setData({
            trainMsg: {...trainMsg,curTrainDurations:(trainMsg.curTrainDuration/60).toFixed(2)}
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },
    getInfo() {
        wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
            this.setData({
                photoaddr: res.data.photoaddr,
            })
          })
    },
    draw() {
        let that = this
        //创建wxml2canvas对象
        let drawImage = new Wxml2Canvas({
            element: 'share', // canvas节点的id,
            obj: that, // 在组件中使用时，需要传入当前组件的this
            width: this.width * 2, // 宽高
            height: this.height * 4,
            background: '#F7F9FC', // 默认背景色
            progress(percent) { // 绘制进度
                // console.log(percent,66)
            },
            finish(url) {
                // console.log("创建的图片", url);
                that.data.canvasUrl = url
                wx.hideLoading()
            },
            error(res) {
                console.log(res);
                // uni.hideLoading()
                // 画失败的原因
            }
        }, this);
        let data = {
            //直接获取wxml数据
            list: [{
                type: 'wxml',
                class: '.share__canvas  .draw_canvas',
                limit: '.share__canvas',
                x: 0,
                y: 0
            }]
        }
        //传入数据，画制canvas图片
        drawImage.draw(data, this);
    },

    // 打开分享页
    handleShare() {
        this.setData({
            showPop: true
        })
        wx.showLoading({
            title: '正在合成图片',
            mask: true
        })
        setTimeout(() => {
            this.draw()
        }, 1500);
    },
    // 取消分享
    cancelShare() {
        this.setData({
            showPop: false
        })
    },

    // 保存图片 
    handleSave() {
        // wx.pro.chooseImage().then(res=>{
        //     console.log(res,555)
        //     const tempFilePaths = res.tempFilePaths
        wx.pro.saveImageToPhotosAlbum({
            filePath: this.data.canvasUrl
        }).then(Response => {
            // console.log(Response,666)
        })
        // })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '学员小蜜',
            path: '/pages/studypage/studypage',
            imageUrl: '../../static/images/appcode.png'
        }
    }
})