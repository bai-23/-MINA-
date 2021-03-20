// 同时发送异步代码的次数
//  该变量用于解决多个请求同时发送时，触发多个加载中图标
let ajaxTimes = 0

export const request = (params) => {
  // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
  if(params.url.includes("/my/")){
    // 拼接header 带上token
    header["Authorization"]=wx.getStorageSync("token");
  }

  ajaxTimes++
  // 发请求前 加载中图标
  wx.showLoading({
    title: '加载中',
    mask: true
  })

  // 定义公共URL
  const baseUrl='https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,  // 解构参数
      header:header,
      url: baseUrl + params.url,
      success: (res) => {
        resolve(res.data.message);
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--
        if(ajaxTimes === 0) {
          // 关闭加载中图标
        wx.hideLoading();
        }
      }
    })
  })
}