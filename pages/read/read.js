// read.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readSource: [],
    chapters: [],
    readMain: [],
    err: '',
    nowChapter: 0,
    showSettingBar :false,
    showChapters: false,
    showSettingDetail: false,
    showChangeSource: false,
    showMaskLayer: false,
    showToggleChapter: false
  },
  //点击遮罩层隐藏所有组件
  hideAll: function () {
    this.hideSettingBar()
    this.hideChapters()
    this.hideChangeSource()
    this.hideSettingDetail()
    this.setData({
      showMaskLayer: false,
    })
  },
  //显示read页面settingBar
  showSettingBar: function () {
    this.setData({
      showSettingBar: true,
      showMaskLayer: true
    })
  },
  //隐藏read页面settingBar
  hideSettingBar: function () {
    this.setData({
      showSettingBar: false,
    })
  },
  //显示章节目录
  showChapters: function () {
    this.hideSettingBar
    this.setData({
      showChapters: true,
      showSettingBar: false
    })
  },
  //隐藏章节目录
  hideChapters: function () {
    this.setData({
      showChapters: false
    })
  },
  //显示切换书源面板
  showChangeSource: function () {
    this.setData({
      showChangeSource: true,
      showMaskLayer: true,
      showSettingBar: false
    })
  },
  //隐藏切换书源面板
  hideChangeSource: function () {
    this.setData({
      showChangeSource: false
    })
  },
  //切换书源按钮
  changeSource: function (e) {
    this.data.readSource.forEach(function (value) {
      value.checked = false
    })
    var readSource = this.data.readSource
    readSource[e.target.dataset.index].checked = true
    this.setData({
      readSource: readSource
    })
    this.changeReadSource(e.target.dataset.index)
    this.hideAll()
  },
  //显示详细设置面板
  showSettingDetail: function () {
    this.setData({
      showSettingDetail: true,
      showMaskLayer: true,
      showSettingBar: false
    })
  },
  //隐藏详细设置面板
  hideSettingDetail: function () {
    this.setData({
      showSettingDetail: false
    })
  },
  //详细面板设置
  //字号缩小
  
  //上一章按钮
  prevChapter: function () {
    if(this.data.nowChapter === 0){
      wx.showToast({
        title: '前面已经没有章节了!',
        icon: 'fail',
        duration: 2000
      })
    }
    else {
      this.setData({
        nowChapter: this.data.nowChapter - 1
      })
      this.changeNowChapter(this.data.nowChapter)
    }
  },
  //下一章按钮
  nextChapter: function () {
    this.setData({
      nowChapter: this.data.nowChapter + 1
    })
    this.changeNowChapter(this.data.nowChapter)
  },
  //章节目录点击切换章节
  changeChapter: function (e) {
    this.changeNowChapter(e.target.dataset.index)
    this.hideAll()
  }, 
  //请求章节目录(切换书源)
  changeReadSource: function(index) {
      var that = this
      that.setData({
        showToggleChapter: false
      })
      wx.showLoading({
        title: '努力加载中',
      })
      console.log('开始请求章节目录')
      wx.request({
        url: 'https://novel.juhe.im/book-chapters/' + this.data.readSource[index]._id,
        header: {
          'content-type': 'application/json'
        },
        method: "GET",
        success: function (res) {
          that.setData({
            chapters: res.data.data.chapters
          })
          wx.hideLoading()
          that.changeNowChapter(that.data.nowChapter)
        },
        fail: function () {
          console.log('请求章节目录失败')
        }
      })
  },
  //请求文章(切换章节)
  changeNowChapter: function (index) {
    var that = this
    that.setData({
      showToggleChapter: false
    })
    wx.showLoading({
      title: '正在全力加载',
    })
    console.log('开始请求章节内容')
    wx.request({
      url: 'https://novel.juhe.im/chapters/' + encodeURIComponent(this.data.chapters[index].link),
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        if (res.data.code === -1){
          that.setData({
            readMain: {body:"糟糕，找不到该章节了，请换源后尝试"},
            showToggleChapter: true
          })
          wx.hideLoading()
        }
        else {
        that.setData({
          readMain: res.data.data.chapter,
          showToggleChapter: true
        })
        wx.hideLoading()
        }
        }
    })
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      showToggleChapter: false
    })
    wx.showLoading({
      title: '正在全力加载',
    })
    wx.request({
      url: 'https://novel.juhe.im/book-sources?view=summary&book=' + options.readSource,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        that.setData({
          readSource: res.data.data
        })
        //初始源选择
        that.data.readSource.forEach(function(value){
          value.checked = false
        })
        var readSource = that.data.readSource
        readSource[0].checked = true
        that.setData({
          readSource: readSource
        })
        console.log(that.data.readSource)
        //初始源
        wx.hideLoading()
        that.changeReadSource(0)
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