import { request } from '../../request/index.js' // 网络请求
// import regeneratorRuntime from '../../lib/runtime/runtime'

Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    scrollTop: 0, // 右侧滚动条距离顶部的距离
  },
  // 接口返回数据
  Cates: [],

  onLoad: function(options) {
    /**
     * 0 小程序与web的本地存储区别
     *    1 写代码的方式不一样了 
     *     web: localStorage.setItem("key","value") localStorage.getItem("key")
     *    小程序中: wx.setStorageSync("key", "value"); wx.getStorageSync("key");
     *    2:存的时候 有没有做类型转换
     *     web: 不管存入的是什么类型的数据，最终都会先调用以下 toString(),把数据变成了字符串 再存入进去
     *    小程序: 不存在 类型转换的这个操作 存什么类似的数据进去，获取的时候就是什么类型
     *    
     * 1 先判断本地存储中有没有旧数据
     * 2 没有旧数据则发送请求
     * 3 有旧数据且旧数据没有过期，则使用本地数据
     *  */  

    // 1 获取本地存储数据
    const Cates = wx.getStorageSync("cates")
    // 2 判断
    if (!Cates) {
      // 本地无数据，获取分类数据
      this.getCates()
    } else {
      // 有旧数据 定义过期时间 10s→10mins
      if(Date.now() - Cates.time > 1000*10){
        this.getCates() // 重新发送
      } else {
        // 可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name);
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  // 获取分类数据
  getCates() {
    request({url: '/categories',})
      .then(res => {
        this.Cates = res
        // 把接口数据存储到本地存储中
        wx.setStorageSync("cates", {
          time:Date.now(), data:this.Cates
        });
        
        // 构造左侧大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        
      })
    
    // const res = await request({ url: '/categories' })
    // this.Cates = res
    // // 把接口数据存储到本地存储中
    // wx.setStorageSync("cates", {
    //   time: Date.now(), data: this.Cates
    // });
    
    // // 构造左侧大菜单数据
    // let leftMenuList = this.Cates.map(v => v.cat_name)
    // // 构造右侧商品数据
    // let rightContent = this.Cates[0].children;
    // this.setData({
    //   leftMenuList,
    //   rightContent
    // })
  },
  async getCates() {
    const res = await request({ url: '/categories' })
    this.Cates = res
    // 把接口数据存储到本地存储中
    wx.setStorageSync("cates", {
      time: Date.now(), data: this.Cates
    });
    
    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })
  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    // 1 获取被点击的标题索引
    // 2 给data中的currentIndex赋值
    const {index} = e.currentTarget.dataset
    // 3 根据索引渲染右侧内容
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0  // 重新设置右侧内容的scroll-view标签的距离顶部的距离
    })
    
  }
})