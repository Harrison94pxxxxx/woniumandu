// searchDetail.js
Page({
  data: {
      searchResult: []
  },
  //跳转小说详情页
  getBookDetail: function (e) {
    wx.navigateTo({
        url: './../bookDetail/bookDetail?bookDetailId=' + e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
      console.log(options.searchDetailName)
      var that = this
      wx.showLoading({
          title: '努力加载中',
      })
      wx.request({
          url: 'https://novel.juhe.im/search?keyword=' + options.searchDetailName,
          header: {
              'content-type': 'application/json'
          },
          method: "GET",
          success: function (res) {
              that.setData({
                  searchResult: res.data.data.books
              })
              wx.hideLoading()
          },
          fail: function () {
              console.log('请求搜索结果失败')
          }
      })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})