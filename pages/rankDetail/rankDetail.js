// rankDetail.js
Page({
  data: {
    rankDetail: [],
    rankDetailAll: [],
    loadCounter: 0
  },
  //跳转书籍详情
  getBookDetail: function (e) {
      wx.navigateTo({
          url: './../bookDetail/bookDetail?bookDetailId=' + e.currentTarget.dataset.id
      })
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: options.rankDetailUrl,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        res.data.data.ranking.books.forEach(function (value) {
            value.cover = 'http://statics.zhuishushenqi.com' + value.cover
        })
        that.setData({
            rankDetailAll: res.data.data.ranking
        })
        var rankDetailBooks = []
        for(let i=0;i<10;i++){
            rankDetailBooks.push(res.data.data.ranking.books[i])
        }
        res.data.data.ranking.books = rankDetailBooks
        that.setData({
          rankDetail: res.data.data.ranking,
          loadCounter: that.data.loadCounter + 10
        })
        wx.hideLoading()
      },
      fail: function () {
        wx.hideLoading()
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
  //下拉加载更多
  onReachBottom: function () {
      var loadCounter = this.data.loadCounter
      var rankDetail = this.data.rankDetail
      if(loadCounter < 91){
          wx.showLoading({
              title: '加载中',
          })
      for (var i = loadCounter; i < loadCounter + 10; i++) {
          rankDetail.books.push(this.data.rankDetailAll.books[i])
      }
      this.setData({
          rankDetail: rankDetail,
          loadCounter: this.data.loadCounter + 10
      })
      wx.hideLoading()
      }
      console.log(this.data.rankDetail)
  },
  onShareAppMessage: function () {
  
  }
})