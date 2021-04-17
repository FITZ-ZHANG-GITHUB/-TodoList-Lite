// app.js
App({

  globalData:{
    openid: "Hi"
  },

  onLaunch: function () {
    //云开发环境初始化
    wx.cloud.init({
      env: "填写云环境ID"
    })
    console.log("init cloud env")
  }
  
})
