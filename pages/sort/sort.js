// sort.js
Page({
    data: {
        sortMain: []
    },
    //获取详细分类
    getsortDetail: function (e) {
        var sortDetailInfo = []
        sortDetailInfo.push(e.currentTarget.dataset.name)
        sortDetailInfo.push(e.currentTarget.dataset.sex)
        wx.navigateTo({
            url: './../sortDetail/sortDetail?sortDetailInfo=' + sortDetailInfo
        })
    },
    onLoad: function (options) {
        var that = this
        wx.showLoading({
            title: '努力加载中'
        })
        wx.request({
            url: 'https://novel.juhe.im/categories',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    sortMain: res.data.data
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
    onReachBottom: function () {

    },
    onShareAppMessage: function () {

    }
})