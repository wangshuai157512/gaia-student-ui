import {
    OrderInfo
} from "../../config/api"
Page({
    onLoad(options) {
        let {
            id,
            status
        } = options
        this.getOrderInfo(id, status)
    },
    data: {
        // tab切换
        currentTab: 0,
        order: [],
        orderMsg: {},
        status: 0,
        
    },
    bindChange: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },

    getOrderInfo(id, status) {
        wx.apiRequest(OrderInfo, {
            id
        }).then(({
            data
        }) => {
            this.setData({
                orderMsg: data,
                status
            })
        })
    },
    useMsg() {
        wx.navigateTo({
            url: `../orderusagerecord/orderusagerecord?orderId=${this.data.orderMsg.id}`,
        })
    },

})