// search.js
Page({
  data: {
      recommends: ["踏天封仙", "铁血佣兵", "魔兽战神", "我的大小姐老婆", "极品小农民", "锦绣大明", "道神", "遮天"],
      recommend_color: ['#7D9EC0', "#EEAEEE", "#EEAD0E", "#9BCD9B", "#CD5555", "#8B7500", "	#757575", "#528B8B"],
      searchHistory: []
  },
  //点击推荐标签进入搜索详情页面
  getRecommendDetail: function (e) {
      wx.navigateTo({
          url: './../searchDetail/searchDetail?searchDetailName=' + e.currentTarget.dataset.name
      })
  },
  //点击历史进入搜索详情页面
  getHistoryDetail: function (e) {
      wx.navigateTo({
          url: './../searchDetail/searchDetail?searchDetailName=' + this.data.searchHistory[e.currentTarget.dataset.index]
      })
  },
  //删除搜索历史
  deleteHistory: function (e) {
    var _searchHistory = this.data.searchHistory
    _searchHistory.splice(e.currentTarget.dataset.index,1)
      try {
          wx.setStorageSync('searchHistory', _searchHistory)
      } catch (e) {
      }
      this.setData({
          searchHistory: _searchHistory
      })
  },
  //搜索后保存搜索历史
  getSearchDetail: function (e) {
      var _searchHistory = []
      var _switch = 1
      var that = this
      wx.navigateTo({
          url: './../searchDetail/searchDetail?searchDetailName=' + e.detail.value
      })
      try {
          var value = wx.getStorageSync('searchHistory')
          if (value) {
              _searchHistory = value
              _searchHistory.forEach(function(value){
                if(value === e.detail.value){
                    _switch = 0
                } 
              })
              if(_switch === 1){
                  _searchHistory.push(e.detail.value)
                  that.setData({
                      searchHistory: _searchHistory
                  })
                  try {
                      wx.setStorageSync('searchHistory', _searchHistory)
                  } catch (e) {
                  }
              }
          }
          else {
              _searchHistory.push(e.detail.value)
              try {
                  wx.setStorageSync('searchHistory', _searchHistory)
              } catch (e) {
              }
          }
      } catch (e) {
      }
  },
  onLoad: function (options) {
      var that = this
      try {
          var value = wx.getStorageSync('searchHistory')
          if (value) {
              that.setData({
                  searchHistory: value
              })
          }
      } catch (e) {
      }
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