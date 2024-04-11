// pages/timepicker/timepicker.js
import {
  ReserveDate,
  ReserveJxtDate,
  ReserveTime,
  ReserveJxtTime,
} from "../../config/api"
import {
  getweekday,
  formatTime
} from "../../utils/util"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    timeQueue: {},
    weekList: [],
    timeList: [],
    queryOption: {},
    trainDate: formatTime(new Date()).split(' ')[0],
    querytimeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      queryOption:options
    })
    // this.data.queryOption = options
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getWeek()
  },
  // 获取日期状态
  getWeek() {
    const seachDate =this.data.queryOption.equipmentType==3?ReserveJxtDate:ReserveDate
    wx.apiRequest(seachDate, this.data.queryOption).then(({
      data
    }) => {
       let activeItem = data.some((item,index)=> {
        if(item.stillCan === true) {
          this.setData({
            activeIndex:index,
            trainDate:item.trainDate
          })
          this.getTime()
          return item
        }
      })
      data.forEach((item, index) => {
        item.week = '周' + getweekday(item.trainDate)
        if (index === 0) {
          item.date = '今天'
        } else {
          item.date = item.trainDate.slice(5, 10).replace('-', '/')
        }
      })
      this.setData({
        weekList: data
      })
    })
  },

  // 获取时间
  getTime() {
    let trainDate = this.data.trainDate
    const querytime = {
      trainDate,
      ...this.data.queryOption
    }
    const seachDate =this.data.queryOption.equipmentType==3?ReserveJxtTime:ReserveTime
    wx.apiRequest(seachDate, querytime).then(({
      data
    }) => {
      // 创建一个 Date 对象，表示当前时间
const now = new Date();
const hours = now.getHours();
const minutes = now.getMinutes();
const hoursStr = String(hours).padStart(2, '0');
const minutesStr = String(minutes).padStart(2, '0');
// 获取当前时间分钟数
const currentTime = `${hoursStr}:${minutesStr}`; 
// 获取当前时间分钟数
const [hours1, minutes1] = currentTime.split(':').map(Number);
const currentMinutes1 = hours1 * 60 + minutes1;
      this.setData({
        timeList: data.map((item, index) => {
          const [hours2, minutes2] =  item.endTime.substr(0, 5).split(':').map(Number);
          const endMinutes1 = hours2 * 60 + minutes2;
         
          return {
            ...item,
            startTime: item.startTime.substr(0, 5),
            endTime: item.endTime.substr(0, 5),
            isAm: item.startTime < "12:00:00",
            key: index,
            isDisabled: false, //结束时间小于当前时间禁用
          }
        })
      })
    })
  },

  handleWeek(e) {
    if (e.currentTarget.dataset.state === false) return
    this.setData({
      timeQueue:[]
    })
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.data.trainDate = e.currentTarget.dataset.traindate
    this.getTime()
  },
  handleTime(e) {
    const {
      key,
      count
    } = e.currentTarget.dataset
    if (count === 0) return
    this.setData({
      [`timeQueue[${key}]`]: !this.data.timeQueue[key]
    })
    this.data.querytimeList = Object.keys(this.data.timeQueue).filter(key => this.data.timeQueue[key]).map(item => {
      const {
        startTime,
        endTime
      } = this.data.timeList[item];

      return {
        startTime,
        endTime
      }
    })
    if(this.data.queryOption.equipmentType==3) {
      this.preBtn()
    }
  },

  preBtn() {
    let pages = getCurrentPages();   //当前页面
    let prevPage = pages[pages.length - 2];   //上一页面
    prevPage.setData({
          //直接给上一个页面赋值
          'form.timeList': this.data.querytimeList,
          'form.trainDate': this.data.trainDate,
    });
    wx.navigateBack({
      delta: 1,
    })
  }
})