// pages/appointmenting/appointmenting.js
import {
  StudentInfo,
  SchoolList,
  ReserveStudentAdd,
  ReserveStudentYxtAdd,
  StandardCharge,
  DiscountRule,
  FindCarType,
  FindJxtCarType,
  JxtoperateList,
  CoachSimpleList,
  ReserveStudentJxtAdd
} from "../../config/api"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    initialAmount: 0, //初始金额
    tipMsg: ['', '', '', ''], //计算规则
    fullDecrementTipMsg: "", //满减优惠规则
    roundMoney: 0, //相同时间按圈
    timeMoney: 0, //相同时间按时
    form: {
      amount: 0,
      carType: "",
      drvSchoolId: null,
      equipmentType: "",
      loginType: "0",
      timeList: [],
      totalTimeDuration: null,
      trainDate: "",
      trainSubject: "",
      chargeWay: "",
      equipmentId: '', // 简学通选择车
      coachId: '',
    },
    trainSubjectChargeWay: {
      21: 'cycleChargeKm2', //科目二按圈收费
      31: 'cycleChargeKm3', //科目三按圈收费
      20: 'timeChargeKm2', //科目二按时收费
      30: 'timeChargeKm3' //科目三按时收费
    },
    menu: [],
    menuSimulator: [{
        imgUrl: '../../static/images/drvSchool.png',
        name: '请选择驾校',
        type: 'select',
        handle: "handleSchool",
        list: [],
        pickerIndex: "",
        label: "",
      },
      // {
      //   imgUrl: '../../static/images/site.png',
      //   name: '请选择设备地点'
      // },
      {
        imgUrl: '../../static/images/cartype.png',
        name: '请选择车型',
        type: 'select',
        handle: "handleCar",
        list: [{
            label: 'C1',
            value: 'C1'
          },
          {
            label: 'C2',
            value: 'C2'
          }
        ],
        pickerIndex: "",
        label: "",
      }, {
        imgUrl: '../../static/images/date.png',
        name: '请选择预约时间段',
        checkTime: true,
        formKey: "trainDate",
        handle: "handleTimepicker"
      }
    ],
    menuRobot: [{
        imgUrl: '../../static/images/drvSchool.png',
        name: '请选择驾校',
        type: 'select',
        handle: "handleSchool",
        list: [],
        pickerIndex: "",
        label: "",
      },
      {
        imgUrl: '../../static/images/cartype.png',
        name: '请选择车型',
        type: 'select',
        handle: "handleCar",
        list: [{
            label: 'C1',
            value: 'C1'
          },
          {
            label: 'C2',
            value: 'C2'
          }
        ],
        pickerIndex: "",
        label: "",
      },
      {
        imgUrl: '../../static/images/date.png',
        name: '请选择训练日期',
        formKey: "trainDate",
        handle: "handleTrainDate"
      },
      {
        imgUrl: '../../static/images/time.png',
        name: '请输入训练时长',
        type: "input",
        handle: "changeDuration"
      }
    ],
    menuYxt: [{
      imgUrl: '../../static/images/drvSchool.png',
      name: '请选择驾校',
      type: 'select',
      handle: "handleSchool",
      list: [],
      pickerIndex: "",
      label: "",
    }, {
      imgUrl: '../../static/images/cartype.png',
      name: '请选择车型',
      type: 'select',
      handle: "handleCar",
      list: [],
      pickerIndex: "",
      label: "",
    }, {
      imgUrl: '../../static/images/suject.png',
      name: '请选择科目',
      type: 'select',
      handle: "handleTrainSubject",
      list: [{
          label: '科目二',
          value: '2'
        },
        {
          label: '科目三',
          value: '3'
        }
      ]
    }, {
      imgUrl: '../../static/images/date.png',
      name: '请选择训练日期',
      formKey: "trainDate",
      handle: "handleTrainDate"
    }, {
      imgUrl: '../../static/images/feetype.png',
      name: '请选择计费类型',
      type: 'select',
      handle: "handleChargeWay",
      list: [{
          label: '按时计费',
          value: '0'
        },
        {
          label: '按圈计费',
          value: '1'
        }
      ],
      pickerIndex: "0",
      label: "按时计费",
    }, {
      imgUrl: '../../static/images/time.png',
      name: '请输入训练时长',
      type: "input",
      handle: "changeDuration",
      formKey: "totalTimeDuration"
    }],
    menuJax: [{
        imgUrl: '../../static/images/drvSchool.png',
        name: '请选择驾校',
        type: 'select',
        handle: "handleSchool",
        list: [],
        pickerIndex: "",
        label: "",
      },
      {
        imgUrl: '../../static/images/suject.png',
        name: '请选择科目',
        type: 'select',
        handle: "handleTrainSubject",
        list: [{
            label: '科目二',
            value: '2'
          },
          {
            label: '科目三',
            value: '3'
          }
        ]
      },
      {
        imgUrl: '../../static/images/cartype.png',
        name: '请选择车型',
        type: 'select',
        handle: "handleCar",
        list: [],
        pickerIndex: "",
        label: ""
      },
      {
        imgUrl: '../../static/images/cartype.png',
        name: '请选择车',
        type: 'select',
        handle: "handleCarNum",
        list: [],
        pickerIndex: "",
        label: "",
        isHide: true,
      },
      {
        imgUrl: '../../static/images/cartype.png',
        name: '请选择教练',
        type: 'select',
        handle: "handleCaoch",
        list: [],
        pickerIndex: "",
        label: "",
        isHide: true,
      },
      {
        imgUrl: '../../static/images/date.png',
        name: '请选择预约时间段',
        checkTime: true,
        formKey: "trainDate",
        handle: "handleTimepicker"
      }
    ],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      equipmentType
    } = options
    this.setData({
      'form.equipmentType': equipmentType
    }, () => {
      this.getSchool()
    })
    if (equipmentType === '0') {
      this.setData({
        menu: this.data.menuSimulator
      })
      wx.setNavigationBarTitle({
        title: "智能模拟器"
      })
    } else if (equipmentType === '1') {
      this.setData({
        menu: this.data.menuRobot
      })
      wx.setNavigationBarTitle({
        title: "机器人教练"
      })
    } else if (equipmentType === '2') {
      this.setData({
        menu: this.data.menuYxt,
        'form.chargeWay': '0',
      })
      wx.setNavigationBarTitle({
        title: "易学通"
      })
    } else {
      this.setData({
        menu: this.data.menuJax
      })
      wx.setNavigationBarTitle({
        title: "简学通"
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  // 获取今天日期
  getNowDate() {
    let date = new Date()
    let year = date.getFullYear() + "";
    let month = date.getMonth() + 1 > 9 ? String(date.getMonth() + 1) : '0' + String(date.getMonth() + 1)
    let day = date.getDate() > 9 ? String(date.getDate()) : '0' + String(date.getDate())
    // date.();
    return `${year}-${month}-${day}`
  },
  // 获取所有驾校
  getSchool() {
    wx.apiRequest(SchoolList, {
      hasYxt: this.data.form.equipmentType == 2 ? true : false
    }).then(res => {
      let list = res.data.map(item => {
        return {
          label: item.name,
          id: item.id
        }
      })
      this.setData({
        'menu[0].list': list
      }, () => {
        // 有已认证得驾校就选中认证的驾校，没有就选中第一个
        wx.apiRequest(StudentInfo, {}, 'Get').then(res => {
          // 驾校列表内是否有已认证的驾校
          let isDrvSchoolId = this.data.menu[0].list.some(item => res.data.drvSchoolId == item.id)
          if (res.data.drvSchoolId && isDrvSchoolId) {
            this.data.form.drvSchoolId = res.data.drvSchoolId
            this.data.menu[0].list.forEach((item, index) => {
              if (res.data.drvSchoolId == item.id) {
                this.setData({
                  ['menu[0].pickerIndex']: index,
                  ['menu[0].label']: this.data.menu[0].list[index]?.label,
                })
              }
            })
            if (this.data.form.equipmentType == 2) {
              this.getFindCarType()
            }
          } else {
            this.data.form.drvSchoolId = list[0]?.id,
              this.setData({
                ['menu[0].pickerIndex']: 0,
                ['menu[0].label']: list[0]?.label,
              })
            if (this.data.form.equipmentType == 2) {
              this.getFindCarType()
            }

          }
        })
      })

    })
  },

  // 易学通查车型
  getFindCarType() {
    let {
      drvSchoolId,
    } = this.data.form
    wx.apiRequest(FindCarType, {
      drvSchoolId,
      isOn: 1
    }).then(({
      data
    }) => {
      let list = data.map(item => {
        return {
          label: item.carType,
          value: item.carType
        }
      })
      this.setData({
        'menu[1].list': list
      })
    })
  },
  // 简学通查车型
  getJxtFindCarType() {
    let {
      drvSchoolId,
      trainSubject
    } = this.data.form
    wx.apiRequest(FindJxtCarType, {
      drvSchoolId,
      subject: trainSubject,
      isOn: 1
    }).then(({
      data
    }) => {
      let list = data.map(item => {
        return {
          label: item.carType,
          value: item.carType
        }
      })
      this.setData({
        'form.carType': '',
        'form.equipmentId': '',
        'form.coachId': '',
        'menu[2].list': list
      })
    })
  },
  // 简学通查车
  getJxtoperateList() {
    let {
      drvSchoolId,
      trainSubject,
      carType
    } = this.data.form
    wx.apiRequest(JxtoperateList, {
      id: drvSchoolId,
      subject: trainSubject,
      carType
    }).then(({
      data
    }) => {
      this.setData({
        'menu[3].list': data
      })
    })
  },
  // 简学通查教练
  getCoachSimpleList() {
    let {
      drvSchoolId,
      trainSubject,
      carType
    } = this.data.form
    wx.apiRequest(CoachSimpleList, {
      drvSchoolId,
      subject: trainSubject,
      carType
    }).then(({
      data
    }) => {
      this.setData({
        'menu[4].list': data
      })
    })
  },

  //选择驾校
  handleSchool(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.data.form.drvSchoolId = this.data.menu[currentIndex].list[e.detail.value].id
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label,
    })

    this.setData({
      'form.timeList': [],
      'form.trainDate': "",
    })

    if (this.data.form.equipmentType == 2) {
      this.getFindCarType()
      this.setData({
        'form.carType': "",
        'menu[1].label': ""
      }, () => {
        this.getMoney()
      })
    }
    if (this.data.form.equipmentType == 3) {
      this.getJxtFindCarType()
      this.setData({
        'form.carType': "",
        'menu[2].label': "",
        'form.equipmentId': "",
        'menu[3].label': "",
        'form.coachId': "",
        'menu[4].label': "",
        'form.trainDate': "",
        'form.timeList': [],
      })
    }

  },

  // 选择车型
  handleCar(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.data.form.carType = this.data.menu[currentIndex].list[e.detail.value].value
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label
    })
    if (this.data.form.equipmentType == 2) {
      this.getMoney()
    }
    if (this.data.form.equipmentType == 3) {
      this.getJxtoperateList()
      this.getCoachSimpleList()
      this.setData({
        'form.equipmentId': "",
        'menu[3].label': "",
        'form.coachId': "",
        'menu[4].label': "",
        'form.trainDate': "",
        'form.timeList': [],
      })
    }

  },
  // 选择车
  handleCarNum(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.data.form.equipmentId = this.data.menu[currentIndex].list[e.detail.value].value
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label,
      'form.trainDate': [],
      'form.timeList': [],
    })
  },
  // 选择教练
  handleCaoch(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.data.form.coachId = this.data.menu[currentIndex].list[e.detail.value].value
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label,
      'form.trainDate': [],
      'form.timeList': [],
    })
  },

  // 选择科目
  handleTrainSubject(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.data.form.trainSubject = this.data.menu[currentIndex].list[e.detail.value].value
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label
    })
    if (this.data.form.equipmentType === '2') {
      this.getMoney()
    }
    if (this.data.form.equipmentType === '3') {
      this.getJxtFindCarType()
      this.setData({
        'form.carType': "",
        'menu[2].label': "",
        'form.equipmentId': "",
        'menu[3].label': "",
        'form.coachId': "",
        'menu[4].label': "",
        'form.trainDate': "",
        'form.timeList': [],
      })
      // 科目二选择车型
      if (this.data.form.trainSubject == 2) {
        this.setData({
          'menu[3].isHide': false,
          'menu[4].isHide': true,
        })
      }
      // 科目三选择教练
      if (this.data.form.trainSubject == 3) {
        this.setData({
          'menu[3].isHide': true,
          'menu[4].isHide': false,
        })
      }
    }

  },

  // 选择计费类型
  handleChargeWay(e) {
    const currentIndex = e.currentTarget.dataset.index // 当前点击项
    this.setData({
      "form.chargeWay": this.data.menu[currentIndex].list[e.detail.value].value,
      "form.totalTimeDuration": null
    })
    this.setData({
      ['menu[' + currentIndex + '].pickerIndex']: e.detail.value,
      ['menu[' + currentIndex + '].label']: this.data.menu[currentIndex].list[e.detail.value]?.label
    })
    this.getMoney()
  },

  // 选择训练日期
  handleTrainDate() {
    let {
      equipmentType,
      drvSchoolId,
      trainDate
    } = this.data.form
    if (!drvSchoolId) {
      wx.showToast({
        title: '请先选择驾校',
        icon: "none",
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: `../datepicker/datepicker?equipmentType=${equipmentType}&drvSchoolId=${drvSchoolId}&trainDate=${trainDate}`
    })
  },

  // 准备关联车，暂时不做关联
  // // 选择教练
  // handleCoach() {
  //   let { drvSchoolId,trainSubject,carType } = this.data.form
  //   if (!drvSchoolId) {
  //     wx.showToast({
  //       title: '请先选择驾校',
  //       icon: "none",
  //       duration: 2000
  //     })
  //     return
  //   }
  //   if (!trainSubject) {
  //     wx.showToast({
  //       title: '请先选择科目',
  //       icon: "none",
  //       duration: 2000
  //     })
  //     return
  //   }
  //   if (!carType) {
  //     wx.showToast({
  //       title: '请先选择车型',
  //       icon: "none",
  //       duration: 2000
  //     })
  //     return
  //   }
  //   wx.navigateTo({
  //     url: `../appointcoach/appointcoach?drvSchoolId=${drvSchoolId}&subject=${trainSubject}&carType=${carType}`,
  //   })
  // },

  // 选择预约时间段
  handleTimepicker() {
    let {
      equipmentType,
      trainSubject,
      carType,
      equipmentId,
      coachId,
      drvSchoolId
    } = this.data.form
    // 易学通选择时间段
    if (!drvSchoolId) {
      wx.showToast({
        title: '请先选择驾校',
        icon: "none",
        duration: 2000
      })
      return
    }
    // 简学通查时间段
    if (equipmentType == 3) {
      if (!trainSubject) {
        wx.showToast({
          title: '请先选择科目',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (!carType) {
        wx.showToast({
          title: '请先选择车型',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (trainSubject == 2 && !equipmentId) {
        wx.showToast({
          title: '请先选择车',
          icon: "none",
          duration: 2000
        })
        return
      }
      if (trainSubject == 3 && !coachId) {
        wx.showToast({
          title: '请先选择教练',
          icon: "none",
          duration: 2000
        })
        return
      }
    }
    wx.navigateTo({
      url: `../timepicker/timepicker?equipmentType=${equipmentType}&drvSchoolId=${drvSchoolId}&subject=${trainSubject}&equipmentId=${equipmentId}&coachId=${coachId}`,
    })



  },

  // 输入预约时长
  changeDuration(e) {
    if (!e.detail.value || this.data.form.totalTimeDuration === e.detail.value) return
    this.setData({
      "form.totalTimeDuration": e.detail.value
    })
    if ((e.detail.value <= 20 && this.data.form.chargeWay == '0') || (e.detail.value < 1 && this.data.form.chargeWay == '1')) {
      this.setData({
        "form.amount": 0
      })
    } else {
      this.getMoney()
    }

  },

  // 收费标准
  getStandardCharge() {
    let {
      carType,
      drvSchoolId,
      trainSubject,
      chargeWay,
      totalTimeDuration
    } = this.data.form
    wx.apiRequest(StandardCharge, {
      carType,
      drvSchoolId,
      subject: trainSubject
    }).then(({
      data
    }) => {
      this.data.initialAmount = data[this.data.trainSubjectChargeWay[trainSubject + chargeWay]]
      this.setData({
        timeMoney: data[this.data.trainSubjectChargeWay[trainSubject + '0']],
        roundMoney: data[this.data.trainSubjectChargeWay[trainSubject + '1']]
      }, () => {
        if (!totalTimeDuration) return
        let h = (totalTimeDuration / 60).toFixed(2)
        let calTotalTimeDuration = Math.ceil(totalTimeDuration)
        this.setData({
          "form.amount": chargeWay == 1 ? (this.data.initialAmount * calTotalTimeDuration).toFixed(2) : (this.data.initialAmount * h).toFixed(2)
        })
      })
      this.getDiscountRule()
    })
  },
  // 优惠规则
  getDiscountRule() {
    let {
      carType,
      drvSchoolId,
      trainSubject,
      chargeWay,
      totalTimeDuration
    } = this.data.form
    wx.apiRequest(DiscountRule, {
      carType,
      drvSchoolId,
      subject: trainSubject,
      chargeWay
    }).then(({
      data
    }) => {
      this.setData({
        fullDecrementTipMsg: ''
      })

      let tiplist = data.filter(item => item.chargeType == chargeWay)
      this.setData({
        tipMsg: [
          `按圈计费,每圈${this.data.roundMoney}元`, `${chargeWay=='1' && tiplist[0]?',满' + tiplist[0].discountStandard + '圈'+ 
    (tiplist[0].discountType?(',打'+ tiplist[0].discount +'折'):(',减'+ tiplist[0].discount +'元')):''}`,
          `按时计费,每小时${this.data.timeMoney}元`, `${chargeWay=='0' && tiplist[0]?',满' + tiplist[0].discountStandard + '小时'+ 
    (tiplist[0].discountType?(',打'+ tiplist[0].discount +'折'):(',减'+ tiplist[0].discount +'元')):''}`,
        ]
      })
      //   console.log(`按圈计费,每圈${this.data.roundMoney}元`, `${chargeWay=='1' && tiplist[0]?',满' + tiplist[0].discountStandard + '圈'+ 
      // (tiplist[0].discountType?(',打'+ tiplist[0].discount +'折'):(',减'+ tiplist[0].discount +'元')):''}`,
      //     `按时计费,每小时${this.data.timeMoney}元`, `${chargeWay=='0' && tiplist[0]?',满' + tiplist[0].discountStandard + '小时'+ 
      // (tiplist[0].discountType?(',打'+ tiplist[0].discount +'折'):(',减'+ tiplist[0].discount +'元')):''}`)
      if (data && data.length > 0) {
        let tipsCol = []
        data.forEach(item => {
          if (item.chargeType == chargeWay) {
            tipsCol[0] = item
          }
          if (item.chargeType == 2) {
            tipsCol[0] = item
          }
        })
        if (tipsCol.length <= 0) return
        if (tipsCol[0]?.chargeType == 2) {
          this.setData({
            fullDecrementTipMsg: `,满${tipsCol[0].discountStandard}元减${tipsCol[0].discount}元`
          })
        }
        // 按时计费
        if (chargeWay === '0') {
          if (totalTimeDuration >= 20) {
            const h = (totalTimeDuration / 60).toFixed(2)
            if (tipsCol[0].chargeType == 2 && h * this.data.initialAmount >= tipsCol[0].discountStandard) {
              // 按时缴费满减
              this.setData({
                "form.amount": (h * this.data.initialAmount - Math.floor(h * this.data.initialAmount / tipsCol[0].discountStandard) * tipsCol[0].discount).toFixed(2)
              })
              return
            }
            if (h >= tipsCol[0].discountStandard) {
              if (tipsCol[0].discountType == 1) {
                // 打折
                this.setData({
                  "form.amount": (h * this.data.initialAmount * (tipsCol[0].discount / 10)).toFixed(2)
                })
              } else {
                // 满减
                this.setData({
                  "form.amount": (h * this.data.initialAmount - Math.floor(h / tipsCol[0].discountStandard) * tipsCol[0].discount).toFixed(2)
                })
              }

            } else {
              this.setData({
                "form.amount": (h * this.data.initialAmount).toFixed(2)
              })
            }
          }
        }
        // 按圈计费
        if (chargeWay === '1') {
          const calTotalTimeDuration = Math.ceil(totalTimeDuration)
          if (tipsCol[0].chargeType == 2 && calTotalTimeDuration * this.data.initialAmount >= tipsCol[0].discountStandard) {
            // 按圈缴费满减
            this.setData({
              "form.amount": (calTotalTimeDuration * this.data.initialAmount - Math.floor(calTotalTimeDuration * this.data.initialAmount / tipsCol[0].discountStandard) * tipsCol[0].discount).toFixed(2)
            })
            return
          }
          if (calTotalTimeDuration >= tipsCol[0].discountStandard) {
            if (tipsCol[0].discountType == 1) {
              // 打折
              this.setData({
                "form.amount": (calTotalTimeDuration * this.data.initialAmount * (tipsCol[0].discount / 10)).toFixed(2)
              })
            } else {
              // 满减
              this.setData({
                "form.amount": (calTotalTimeDuration * this.data.initialAmount - Math.floor(calTotalTimeDuration / tipsCol[0].discountStandard) * tipsCol[0].discount).toFixed(2)
              })
            }

          } else {
            this.setData({
              "form.amount": (calTotalTimeDuration * this.data.initialAmount).toFixed(2)
            })
          }
        }
      } else {
        if (chargeWay === '0' && totalTimeDuration >= 20) {
          this.setData({
            "form.amount": (totalTimeDuration / 60 * this.data.initialAmount).toFixed(2)
          })
        } else if (chargeWay === '1' && Math.ceil(totalTimeDuration) >= 1) {
          this.setData({
            "form.amount": (Math.ceil(totalTimeDuration) * this.data.initialAmount).toFixed(2)
          })
        }
      }



    })
  },

  // 易学通计费算钱
  getMoney() {
    const {
      equipmentType,
      carType,
      drvSchoolId,
      trainSubject,
      chargeWay
    } = this.data.form
    if (equipmentType == 2) {
      if (carType && drvSchoolId && trainSubject && chargeWay) {
        this.getStandardCharge()
      }
    }
  },

  // 模拟器预约
  handleAppoin() {
    if (this.data.form.timeList && this.data.form.timeList.length > 0) {
      this.data.form.timeList.forEach(item => {
        if (item.startTime.length === 5) {
          item.startTime = item.startTime + ':00'
          item.endTime = item.endTime + ':00'
        }

      })
    }
    if (this.data.form.equipmentType === '2') {
      // 易学通预约
      if (this.data.form.totalTimeDuration <= 20 && this.data.form.chargeWay == 0) {
        wx.showToast({
          title: '训练时长必须大于20分钟',
          icon: "none",
          duration: 2000
        })
        return
      }
      let discountContent = this.data.fullDecrementTipMsg.replace(',', '') || (this.data.form.chargeWay == 1 ? this.data.tipMsg[1].replace(',', '') : this.data.tipMsg[3].replace(',', ''))
      wx.apiRequest(ReserveStudentYxtAdd, {
        ...this.data.form,
        discountContent
      }).then(res => {
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          })
          return
        }
        wx.redirectTo({
          url: `../appointmensuccess/appointmensuccess?form=${JSON.stringify(this.data.form)}`,
        })
      })
    } else if (this.data.form.equipmentType === '3') {
      // 简学通预约
      if (this.data.form.timeList.length <= 0) {
        wx.showToast({
          title: '请选择预约时间段',
          icon: "none",
          duration: 2000
        })
        return
      }
      let {
        drvSchoolId,
        trainSubject,
        carType,
        equipmentId,
        coachId,
        trainDate,
        equipmentType,
        timeList
      } = this.data.form
      let paramsFoemJxt = {
        drvSchoolId,
        trainSubject,
        carType,
        equipmentId,
        coachId,
        trainDate,
        equipmentType,
        startTime: timeList[0].startTime,
        endTime: timeList[0].endTime
      }
      wx.apiRequest(ReserveStudentJxtAdd, paramsFoemJxt).then(res => {
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          })
          return
        }
        wx.redirectTo({
          url: `../appointmensuccess/appointmensuccess?form=${JSON.stringify(this.data.form)}`,
        })
      })

    } else {
      if (this.data.form.equipmentType === '1' && this.data.form.totalTimeDuration <= 0) {
        wx.showToast({
          title: '请输入训练时长',
          icon: "none",
          duration: 2000
        })
        return
      }
      wx.apiRequest(ReserveStudentAdd, this.data.form).then(res => {
        if (res.code === 400) {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 2000
          })
          return
        }
        wx.redirectTo({
          url: `../appointmensuccess/appointmensuccess?form=${JSON.stringify(this.data.form)}&rotcode=${res.data}`,
        })
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})