import {
  OrderPage,
  PaymentRepay,
  OrdersCancel
} from "../../config/api"
Page({
  onLoad() {
    this.getOrderPage(this.data.queryOrder)
  },
  data: {
    // tab切换
    activeTab: 0,
    currentTab: 0,
    order: [],
    orderlist: [],
    queryOrder:  {
      orderType:0,
      status:'',
    },
    payStatus:["","已支付","使用中","已完成","已过期","已关闭"],
    payColor: ['','#000000', '#2B9CE8', '#58BB96', '#FF3621','#999999'],
    statusSubject:['','科目一','科目二','科目三','科目四'],
    equipmentTypeList: [{
      lable: "智能模拟器",
      value: 0
    }, {
      lable: "易学通",
      value: 2
    }],
    orderStatuslist: [
      {
        lable: "全部",
        value: ''
      },
      // {
      //   lable: "待支付",
      //   value: 0
      // },
      {
        lable: "已支付",
        value: 9
      },
      {
        lable: "使用中",
        value: 2
      },
      {
        lable: "已完成",
        value: 3
      },
      {
        lable: "已过期",
        value: 4
      },
      {
        lable: "已关闭",
        value: 5
      }
  ]
  },
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  equipmentTypeTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.current
    })
    this.data.queryOrder.orderType = e.currentTarget.dataset.ordertype
    this.getOrderPage(this.data.queryOrder)
  },
  swichNav: function (e) {
    if (this.data.currentTab !== e.target.dataset.current) {
      this.setData({
        currentTab: e.target.dataset.current
      })
      this.data.queryOrder.status = e.currentTarget.dataset.status
      this.getOrderPage(this.data.queryOrder)
    }

  },

// 去支付
handlePay(e) {
  const { id } = e.currentTarget.dataset.item
  wx.apiRequest(PaymentRepay, {
   id
  }).then(res => {
    if (res.data) {
      wx.requestPayment(res.data).then(res => {
        this.getOrderPage()
      }).catch(err => {})
    }
  })
},

// 取消订单
handleOrdersCancel(e) {
  const { id } = e.currentTarget.dataset
  wx.apiRequest(OrdersCancel, {
    id
   }).then(res=> {
    this.getOrderPage()
   })
  
},

  getOrderPage(data) {
    wx.apiRequest(OrderPage, data).then(({
      records,
    }) => {
      records.forEach(item=> {
        if(item.useDate && (new Date(item.useDate).getTime()+item.effectiveDays*24*60*60*1000)>new Date().getTime()) {
          item.isOrder=true
        }
      })
      this.setData({
        orderlist: records
      })
    })
  },

})