let tabBarCount = 0;
import {
  ScanCodeDriver,
  IsAuthAudit,
  ActiveOrder
} from "../config/api"
import {
  showToast
} from "../utils/util"

const errTips = {
  701: {
    content: '用户未实名认证,无法登录',
    confirmText: '去认证',
    url: '/pages/authname/authname'
  },
  702: {
    content: '用户无剩余时长',
    confirmText: '去购买',
    url: '/pages/setmeal/setmeal'
  },
}
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#2072FD",
    backgroundColor: "#ffffff",
    list: [{
        pagePath: "/pages/studypage/studypage",
        text: "学习",
        iconPath: "/static/images/student.png",
        selectedIconPath: "/static/images/student-s.png",
      },
      {
        pagePath: "/pages/scancode/scancode",
        text: "",
        iconPath: "/static/images/code.png",
        selectedIconPath: "/static/images/code.png",
      },
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        iconPath: "/static/images/mine.png",
        selectedIconPath: "/static/images/mine-s.png",
      },
    ],
  },

  attached() {},
  methods: {
    switchTab(e) {
      const {
        path,
        index
      } = e.currentTarget.dataset;

      if (index !== 0 && !wx.getStorageSync('token')) {
        wx.reLaunch({
          url: '../login/login'
        })
        return
      }

      if (index !== 1) {
        wx.switchTab({
          url: path,
        });
      }
    },
    scanCode() {
      if (!wx.getStorageSync('token')) {
        wx.reLaunch({
          url: '../login/login'
        })
        return
      }
      wx.pro
        .scanCode()
        .then(async ({
          result
        }) => {
          console.log(result)
          const {
            type,
            data,
            kskm
          } = JSON.parse(result);
          if (type === 3) {
            wx.navigateTo({
              url: `/pages/bindreferrer/bindreferrer?code=${data}`,
            });
          } else if (type === 4) {
            wx.apiRequest(ActiveOrder, {
              id: data
            }).then(({
              msg,
              code
            }) => {
              if (code == 200) {
                showToast({
                  title: "订单激活成功！",
                  icon: 'none',
                  duration: 1200
                })
              }
            })
          } else {
            wx.apiRequest(ScanCodeDriver, {
              subject: kskm,
              equipmentId: data,
              equipmentType: type
            }).then(({
              code,
              msg
            }) => {
              errTips[702].url = `/pages/setmeal/setmeal?equipmentId=${data}&equipmentType=${type}`
              if (errTips[code]) {
                const {
                  url,
                  content,
                  confirmText
                } = errTips[code];

                wx.showModal({
                  title: '提示',
                  content,
                  confirmText,
                  success(res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url,
                      })
                    }
                  }
                })
              } else if (code === 200 && type !== 2) {
                wx.navigateTo({
                  url: '/pages/usesuccess/usesuccess',
                })
              } else if (code === 200 && type === 2) {
                showToast({
                  title: '设备登录成功!',
                  icon: 'none',
                  duration: 1200
                })
              } else if (code === 703) {
                wx.navigateTo({
                  url: '/pages/schoolauth/schoolauth',
                })
              } else if (code === 704) {
                wx.navigateTo({
                  url: '/pages/notusedevice/notusedevice',
                })
              } else if (code === 706) {
                wx.navigateTo({
                  url: `/package/pages/placeorder/placeorder?equipmentId=${data}&equipmentType=${type}&kskm=${kskm}`,
                })
              } else if (code === 707) {
                setTimeout(() => {
                  wx.navigateTo({
                    url: `/package/pages/placeorder/placeorder?equipmentId=${data}&equipmentType=${type}&kskm=${kskm}`,
                  })
                }, 800);
                showToast({
                  title: msg,
                  icon: 'none',
                  duration: 800
                })
              } else {
                showToast({
                  title: msg,
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
});