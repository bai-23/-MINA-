// 引入发送请求的方法
import { request } from '../../request/index.js'
Page({
  data: {
    swiperList: [], // 轮播图数组
    catesList: [], // 分类导航数组
    floorList: [], // 楼层数据
  },
  onLoad: function(options){
    // 1 发送异步请求获取轮播图数据
    this.getSwiperList()
    // 2 获取分类导航数据
    this.getCatesList()
    // 3 获取楼层数据
    this.getFloorList()

  },
  // 获取数据
  getSwiperList() {
    request({url: '/home/swiperdata',})
      .then(res => {
        this.setData({
          swiperList: res
        })
      })
  },
  getCatesList() {
    request({url: '/home/catitems',})
      .then(res => {
        this.setData({
          catesList: res
        })
      })
  },
  getFloorList() {
    request({url: '/home/floordata',})
      .then(res => {
        this.setData({
         floorList: res
        })
      })
  }

});