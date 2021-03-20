// pages/login/index.js
Page({
  handleGetUserInfo(e){
    const {userInfo}=e.detail;
    wx.setStorageSync("userinfo", userInfo);
    // console.log(userInfo)
    wx.navigateBack({
      delta: 1
    });
      
  }
})