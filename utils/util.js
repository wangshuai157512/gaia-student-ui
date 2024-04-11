import {
  LoginConfig,
  AuthLoginByWeixin,
  RefreshToken
} from "../config/api.js"
const isShow = {
  loading: false,
  toast: false
}

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatTimeStamp(timestamp) {
  const hour = parseInt((timestamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minute = parseInt((timestamp % (1000 * 60 * 60)) / (1000 * 60));
  const second = parseInt((timestamp % (1000 * 60)) / 1000);

  return `${hour}小时${minute}分${second}秒`
}

function getweekday(date) {
  var weekArray = new Array("日", "一", "二", "三", "四", "五", "六");
  var week = weekArray[new Date(date).getDay()];
  return week;

}

function showToast(option) {
  const {
    duration
  } = option

  wx.showToast(option);
  isShow.toast = true
  setTimeout(() => {
    isShow.toast = false
  }, duration);
}

function showLoading() {
  const {
    toast,
    loading
  } = isShow

  if (!toast && !loading) {
    wx.showLoading({
      title: '加载中…'
    });
    isShow.loading = true
  }
}

function hideLoading() {
  const {
    toast,
    loading
  } = isShow

  if (!toast && loading) {
    wx.hideLoading();
    isShow.loading = false
  }
}
/**
 * request
 */
function request(url, data = {}, method = "POST", contentType = 'application/json') {
  return new Promise(function (resolve, reject) {
    showLoading()
    const tokenHeader = {
      'Content-Type': contentType
    }
    const header = {
      'Content-Type': contentType,
      'Authorization': wx.getStorageSync('token') ? `Bearer ${wx.getStorageSync('token')}` : null
    }

    wx.request({
      url: url,
      data: data,
      method: method,
      timeout: 30000,
      header: data.token | /study/.test(url) ? tokenHeader : header,
      complete: function (cpl) {

      },
      success: async function ({
        data
      }) {
        hideLoading()
        if (data.code === 401) {
         
          // if (url === RefreshToken) {
          //   wx.removeStorageSync('token')
          //   wx.reLaunch({
          //     url: '../login/login'
          //   })
          //   return
          // }

          // const {
          //   data: token
          // } = await request(RefreshToken, {
          //   token: wx.getStorageSync('token')
          // })

          if(!(wx.getStorageSync('token'))) {
            wx.reLaunch({
              url: '../login/login',
            })
          }else {
            wx.pro.login().then(({
              code
            }) => {
              const {
                nickName,
                avatarUrl
              } = wx.getStorageSync('userInfo')
              wx.apiRequest(AuthLoginByWeixin, {
                ...LoginConfig,
                "js_code": code,
                nickName,
                avatar: avatarUrl
              }).then(({
                data,
                code
              }) => {
                if (code == 200) {
                  wx.setStorageSync('token', data)
                  wx.reLaunch({
                    url: '../studypage/studypage',
                  })
                }
              })
            })
          }
          
        } else if (data.code === 500) {
          showToast({
            title: data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          resolve(data)
        }
      },
      fail: function (err) {
        wx.hideLoading()
        reject(err)
        console.log("failed")
      }
    })
  });
}

function get(url, data = {}) {
  return request(url, data, 'GET')
}

function post(url, data = {}) {
  return request(url, data, 'POST')
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function () {
        resolve(true);
      },
      fail: function () {
        reject(false);
      }
    })
  });
}


function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  formatTime,
  request,
  get,
  post,
  redirect,
  showErrorToast,
  checkSession,
  formatTimeStamp,
  getweekday,
  showToast
}