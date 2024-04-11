import {
    OrderUseMsg
} from "../../config/api"
Page({
    onLoad(options) {
        let {
            orderId
        } = options
        this.getOrderUseMsg(orderId)
    },
    data: {
        // tab切换
        currentTab: 0,
        order: [],
        orderMsg: [],
    },
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },

    getOrderUseMsg(orderId) {
        wx.apiRequest(OrderUseMsg, {
            orderId
        }).then((res) => {
            const data = res.data.reduce((a, b) => ({
                ...a,
                [b.startTime.substr(0, 10)]: a[b.startTime.substr(0, 10)] ? a[b.startTime.substr(0, 10)].concat(b) : [b]
            }), {}) || {}

            this.setData({
                orderMsg: data
            })
        })
    },

    format(str) {
        console.log(str)
    }
})