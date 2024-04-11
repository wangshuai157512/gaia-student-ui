// pages/placeorder/placeorder.js
import {
  ReserveStudent,
  YxtDetail,
  TopDrvSchoolById,
  StandardCharge,
  DiscountRule,
  YxtPrePay,
  YxtCarInfo
} from "../../../config/api"
const optKey = {
  '按时计费': 0,
  '按圈计费': 1,
  '科目二': '2',
  '科目三': '3',
}
let discountContent, drvSchoolId, standard, rules, subject, inSchool, subjectOpt = {
    2: '科目二',
    3: '科目三'
  },
  ruleStr = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
      imgUrl: '../../static/images/cartype.png',
      label: '训练车型',
      value: '',
      key: 0,
    }, {
      imgUrl: '../../static/images/suject.png',
      label: '训练科目',
      value: '',
      key: 1,
    }, {
      imgUrl: '../../static/images/feetype.png',
      label: '计费类型',
      value: '',
      key: 2,
    }, {
      imgUrl: '../../static/images/time.png',
      label: '训练',
      value: '',
      key: 3,
    }],
    options: [
      [],
      ['科目二', '科目三'],
      ['按时计费', '按圈计费']
    ],
    amount: 0,
    isNewOrder: true,
    tipsMsg: ["", ""],
    isAccordCar: true,
    equipmentId: "",
    reverseId: null
  },
  /**获取后台配置金额**/
  getStandardCharge() {
    const {
      menu
    } = this.data;

    return new Promise(function (resolve, reject) {
      wx.apiRequest(StandardCharge, {
        drvSchoolId,
        carType: menu[0].value,
        subject: optKey[menu[1].value]
      }).then(resolve).catch(reject)
    })
  },
  /**获取优惠规则**/
  getDiscountRule() {
    const {
      menu
    } = this.data;

    return new Promise(function (resolve, reject) {
      wx.apiRequest(DiscountRule, {
        drvSchoolId,
        carType: menu[0].value,
        subject: optKey[menu[1].value]
      }).then(resolve).catch(reject)
    })
  },
  /**支付金额计算**/
  discountRule() {
    const {
      menu
    } = this.data;
    const count = menu[3].value //  数量
    const chargType = optKey[menu[2].value] //计费类型
    const chargeTypeUnit = [60, 1][chargType]; // 单位(分钟、圈数)
    const isFullDecre = rules.data.some(item => item.chargeType === 2) //是否有满减优惠,优先级最高
    const rule = rules.data.find(item => item.chargeType == (isFullDecre ? 2 : chargType)) // 优惠规则
    const amount = standard.data[`${['timeChargeKm', 'cycleChargeKm'][chargType]}${optKey[menu[1].value]}`] || 0 // 按科目及类型单位费用
    let value = count * amount / chargeTypeUnit;

    if (rule) {
      const {
        discount,
        discountType,
        discountStandard,
      } = rule // 折扣类型
      const expression = isFullDecre ? value : count / chargeTypeUnit; // 设置满减优惠优先满减优惠(金额/小时或圈)

      if (discountType === 0 && discountStandard <= expression) {
        value = value - Math.floor(expression / discountStandard) * discount
      } else if (discountType === 1 && discountStandard <= expression) {
        value = value * discount / 10
      }
    }
    this.setData({
      amount: value > 0 ? value.toFixed(2) : 0
    })
  },
  /**Picker**/
  bindPickerChange(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;
    const {
      menu
    } = this.data;

    this.setData({
      [`menu[${key}].value`]: this.data.options[key][value]
    }, async () => {
      // if ((key === 0 && menu[1].value) || (key === 1 && menu[0].value)) {
      [standard, rules] = await Promise.all([this.getStandardCharge(), this.getDiscountRule()]);
      // }
      if ( // 查询订单优惠规则
        (key === 0 || key === 1 || key === 2) &&
        menu[0].value && menu[1].value && menu[2].value
      ) {
        const chargTypep = optKey[menu[2].value] //计费类型
        const [value, res] = [optKey[menu[1].value], rules.data];
        const isFullDecre = res.some(item => item.chargeType === 2);
        const rule = res.find(item => item.chargeType == (isFullDecre ? 2 : chargTypep))

        let cycleStr = `按圈计费,每圈${standard.data[`cycleChargeKm${value}`]||0}元`,
          timeStr = `按时计费,每小时${standard.data[`timeChargeKm${value}`]||0}元`;

        if (rule) {
          const {
            discount,
            chargeType,
            discountType,
            discountStandard,
          } = rule

          if (chargTypep === 1) {
            cycleStr += ',' + (ruleStr = `满${discountStandard}${chargeType==2?`元`:`圈`},${discountType?`打${discount}折`:`减${discount}元`}`)
          } else {
            timeStr += ',' + (ruleStr = `满${discountStandard}${chargeType==2?`元`:`小时`},${discountType?`打${discount}折`:`减${discount}元`}`)
          }
        }

        this.discountRule()
        this.setData({
          tipsMsg: [cycleStr, timeStr]
        })
      }
    })
  },
  /**input 输入**/
  bindInputChange(e) {
    const {
      value,
    } = e.detail
    this.setData({
      ['menu[3].value']: value
    }, this.discountRule)
  },
  /**下单**/
  submit() {
    const {
      menu,
      amount,
      reverseId,
      equipmentId
    } = this.data

    wx.apiRequest(YxtPrePay, {
      reverseId,
      equipmentId,
      drvSchoolId,
      amount: Number(amount), //Number(amount)
      carType: menu[0].value,
      chargeWay: optKey[menu[2].value],
      trainSubject: optKey[menu[1].value],
      totalTimeDuration: menu[3].value,
      discountContent: discountContent || `${ruleStr}${ruleStr?`(${inSchool==0?'校外':'校内'})`:''}`
    }).then(res => {
      if (res.data) {
        wx.requestPayment(res.data).then(res => {
          wx.apiRequest(YxtCarInfo, {
            id: equipmentId
          }).then(res => {
            if (res.data) {
              const {
                hphm
              } = res.data

              wx.redirectTo({
                url: `../../../pages/paysuccess/paysuccess?amount=${amount}&totalTimeDuration=${menu[3].value}&carType=${menu[0].value}&subject=${optKey[menu[1].value]}&chargeWay=${optKey[menu[2].value]}&hphm=${hphm}`,
              })
            }
          })
        }).catch(err => {})
      }
    })
  },
  /**
   * 重新下单
   */
  again() {
    const {
      menu
    } = this.data

    this.setData({
      menu: menu.map((item, index) => ({
        ...item,
        value: index === 0 ? item.value : index === 1 ? subjectOpt[subject] : ""
      })),
      isNewOrder: true,
      isAccordCar: true,
      amount: 0,
      reverseId: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad({
    kskm,
    equipmentId,
    equipmentType
  }) {
    subject = kskm
    this.setData({
      equipmentId,
      'menu[1].value': subjectOpt[kskm]
    })
    wx.apiRequest(TopDrvSchoolById, {
      id: equipmentId
    }).then(res => {
      drvSchoolId = res.data;
      wx.apiRequest(ReserveStudent, {
        equipmentId,
        drvSchoolId,
        equipmentType
      }).then(res => {
        if (res.data) {
          const {
            matchCarType,
            amount,
            carType,
            chargeWay,
            totalTimeDuration,
            trainSubject,
            id
          } = res.data
          discountContent = res.data.discountContent
          this.setData({
            amount,
            isNewOrder: false,
            'menu[0].value': carType,
            'menu[1].value': subjectOpt[trainSubject],
            'menu[2].value': ['按时计费', '按圈计费'][chargeWay],
            'menu[3].value': totalTimeDuration,
            isAccordCar: matchCarType,
            reverseId: id
          })
        }
      })
    })
    wx.apiRequest(YxtDetail, {
      id: equipmentId
    }).then(res => {
      if (res.data) {
        const {
          carType,
          isInSchool
        } = res.data
        inSchool = isInSchool
        this.setData({
          'menu[0].value': carType,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})