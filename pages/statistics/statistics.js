const app = getApp();
import {
  initChart
} from "../../utils/chart"
import {
  StudentDuration,
  StudentDeduct,
  StudentPass,
  StudentExamDeduct
} from "../../config/api"

const animationTransLate = wx.createAnimation({
  duration: 300,
  timingFunction: 'ease-out'
})

const animationRotateMain = wx.createAnimation({
  duration: 300,
  timingFunction: 'ease-out'
})

const animationRotateBack = wx.createAnimation({
  duration: 300,
  timingFunction: 'ease-out'
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    swiperHeight: 1164,
    dedChart: {
      sub2MainEc: null,
      sub2BackEc: null,
      sub3MainEc: null,
      sub3BackEc: null
    },
    passChart: {
      sub2MainEc: null,
      sub2BackEc: null,
      sub3MainEc: null,
      sub3BackEc: null
    },
    examDedChart: {
      sub2MainEc: null,
      sub2BackEc: null,
      sub3MainEc: null,
      sub3BackEc: null
    },
    table: {
      goldCoach: [],
      simulator: []
    },
    animationTranslateX: null,
    dedSub2: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
    dedSub3: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
    passSub2: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
    passSub3: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
    examDedSub2: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
    examDedSub3: {
      animationRotateyMain: null,
      animationRotateyBack: null
    },
  },

  swichNav: function (e) {
    const swiperItem = [1164, 1608, 3216]
    const current = e.target.dataset.current;
    const width = wx.getSystemInfoSync().windowWidth;
    const animationTranslateX = animationTransLate.translateX(-current * width).step();

    this.setData({
      currentTab: current,
      animationTranslateX: animationTranslateX.export(),
      swiperHeight: swiperItem[current]
    });
  },

  tapCard(e) {
    const doce = e.target.dataset.doce;
    const type = e.target.dataset.type;

    const animationRotateyMain = animationRotateMain.rotateY(doce === 'main' ? 180 : 0).step();
    const animationRotateyBack = animationRotateBack.rotateY(doce === 'main' ? 0 : -180).step();

    this.setData({
      [`${this.data.currentTab==1?'dedSub':'passSub'}${type}`]: {
        animationRotateyMain: animationRotateyMain.export(),
        animationRotateyBack: animationRotateyBack.export(),
      }
    })
    this[`${this.data.currentTab==1?'getStudentDeduct':'getStudentPass'}`]({
      "equipmentType": doce === 'main' ? '0' : '1',
      "subject": type
    }, doce)
  },

  examTapCard(e) {
    const doce = e.target.dataset.doce;
    const type = e.target.dataset.type;

    const animationRotateyMain = animationRotateMain.rotateY(doce === 'main' ? 180 : 0).step();
    const animationRotateyBack = animationRotateBack.rotateY(doce === 'main' ? 0 : -180).step();

    this.setData({
      [`examDedSub${type}`]: {
        animationRotateyMain: animationRotateyMain.export(),
        animationRotateyBack: animationRotateyBack.export(),
      }
    })
    this.getStudentExamDeduct({
      "equipmentType": doce === 'main' ? '0' : '1',
      "subject": type
    }, doce)
  },
  /**
   * 训练时长统计
   */
  getStudentDuration() {
    const goldCoachOption = { // 机器人教练
      "goldCoachBasic": "基础训练",
      "goldCoachSubTwo": "科目二",
      "goldCoachSum": "总计",
    }
    const simulatorOption = { // 模拟器
      "simulatorBasic": "基础训练",
      "simulatorSubTwo": "科目二",
      "simulatorSubThree": "科目三",
      "simulatorSum": "总计",
    }

    wx.apiRequest(StudentDuration).then(({
      data
    }) => {
      this.setData({
        table: {
          goldCoach: Object.keys(goldCoachOption).map((key) => {
            return {
              label: goldCoachOption[key],
              value: data[key]
            }
          }),
          simulator: Object.keys(simulatorOption).map((key) => {
            return {
              label: simulatorOption[key],
              value: data[key]
            }
          })
        }
      })
    })
  },
  /**
   * 学员扣分统计
   */
  getStudentDeduct(params = {
    "equipmentType": "1",
    "subject": "2"
  }, type = 'back') {

    wx.apiRequest(StudentDeduct, params).then(({
      data
    }) => {
      this.setData({
        [type === 'main' ? `dedChart.sub${params.subject}BackEc` : `dedChart.sub${params.subject}MainEc`]: {
          onInit: initChart(data.map(({
            projectName,
            count
          }) => {
            return {
              name: projectName,
              value: count
            }
          }))
        },
        [type !== 'main' ? `dedChart.sub${params.subject}BackEc` : `dedChart.sub${params.subject}MainEc`]: null
      })
    })
  },
  /**
   * 模拟考试通过率统计
   */
  getStudentPass(params = {
    "equipmentType": "1",
    "subject": "2"
  }, type = 'back') {

    wx.apiRequest(StudentPass, params).then(({
      data
    }) => {
      this.setData({
        [type === 'main' ? `passChart.sub${params.subject}BackEc` : `passChart.sub${params.subject}MainEc`]: {
          onInit: initChart(data.map(({
            projectName,
            count
          }) => {
            return {
              name: projectName,
              value: count
            }
          }))
        },
        [type !== 'main' ? `passChart.sub${params.subject}BackEc` : `passChart.sub${params.subject}MainEc`]: null
      })
    })
  },
  /**
   * 模拟扣分统计
   */
  getStudentExamDeduct(params = {
    "equipmentType": "1",
    "subject": "2"
  }, type = 'back') {

    wx.apiRequest(StudentExamDeduct, params).then(({
      data
    }) => {
      this.setData({
        [type === 'main' ? `examDedChart.sub${params.subject}BackEc` : `examDedChart.sub${params.subject}MainEc`]: {
          onInit: initChart(data.map(({
            projectName,
            count
          }) => {
            return {
              name: projectName,
              value: count
            }
          }))
        },
        [type !== 'main' ? `examDedChart.sub${params.subject}BackEc` : `examDedChart.sub${params.subject}MainEc`]: null
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStudentDuration();
    this.getStudentDeduct();
    this.getStudentDeduct({
      "equipmentType": "1",
      "subject": "3"
    }, 'back');
    this.getStudentPass();
    this.getStudentPass({
      "equipmentType": "1",
      "subject": "3"
    }, 'back');
    this.getStudentExamDeduct();
    this.getStudentExamDeduct({
      "equipmentType": "1",
      "subject": "3"
    }, 'back');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})