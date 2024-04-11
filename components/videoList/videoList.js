// components/videoList/videoList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        titleOption: {
            type: Object,
            value: {
                title: "",
                operate: "",
                icon: ""
            }
        },
        videoList:{
            type:Array,
            value:[]
        },
        changName:{
            type:String,
            value:'name'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        baseUrl: 'https://jpypt.oss-cn-beijing.aliyuncs.com',
        isAuto:false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleChild() {
            this.data.isAuto = !this.data.isAuto
           this.triggerEvent('changeState',this.data.isAuto)
        },
        handleVideo(e) {
            this.triggerEvent('lookVideo',e.currentTarget.dataset)
        }
    },
    // ready: function () {
    //     console.log(this.titleOption, 111)
    // }
})