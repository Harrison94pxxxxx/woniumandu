// pages/rankList/rankList.js
Page({
  data: {
    rankList: [],
    rankDetailUrl: ''
  },
  getRankDetailUrl: function (e) {
    var sex = e.currentTarget.dataset.sex
    var index = e.currentTarget.dataset.index
    if(sex === 'male') {
      this.setData({
        rankDetailUrl: 'https://novel.juhe.im/rank/' + this.data.rankList.male[index]._id
      })
    }
    else if(sex === "female") {
      this.setData({
        rankDetailUrl: 'https://novel.juhe.im/rank/' + this.data.rankList.female[index]._id
      })
    }
    wx.navigateTo({
      url: './../rankDetail/rankDetail?rankDetailUrl=' + this.data.rankDetailUrl
    })
  },
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '努力加载中',
    })
    wx.request({
      url: 'https://novel.juhe.im/rank-category',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          rankList: res.data.data
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})