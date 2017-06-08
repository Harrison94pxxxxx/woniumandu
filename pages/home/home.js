// home.js
Page({
    data: {
        homeBooks: [],
        loading: false
    },
    getBookDetail: function (e) {
        wx.navigateTo({
            url: './../bookDetail/bookDetail?bookDetailId=' + this.data.homeBooks[e.target.dataset.index].id
        })
    },
    showLoading: function () {
        this.setData({
            loading: !this.data.loading
        })
    },
    //获取首页小说封面等信息
    getHomeBooks: function () {
        try {
            var value = wx.getStorageSync('homeBooksInfo')
            if (value) {
                this.setData({
                    homeBooks: value
                })
            }
        } catch (e) {
            // Do something when catch error
        }
    },
    //初次打开小程序
    onLoad: function (options) {
        var that = this
        try {
            var that = that
            var value = wx.getStorageSync('homeBooksInfo')
            if (value) {
                that.getHomeBooks()
            }
            else {
                let homeBooksInfo = [
                    { id: "51d11e782de6405c45000068", name: "大主宰", author: "天蚕土豆", image: "http://statics.zhuishushenqi.com/agent/http://image.cmfu.com/books/2750457/2750457.jpg"},
                    { id: "57206c3539a913ad65d35c7b", name: "一念永恒", author: "耳根", image: "http://statics.zhuishushenqi.com/agent/http://image.cmfu.com/books/1003354631/1003354631.jpg" },
                    { id: "5816b415b06d1d32157790b1", name: "圣墟", author: "辰东", image: "http://statics.zhuishushenqi.com/agent/http://qidian.qpic.cn/qdbimg/349573/1004608738/180" }]
                try {
                    wx.setStorageSync('homeBooksInfo', homeBooksInfo)
                    that.getHomeBooks()
                } catch (e) {
                }
            }
        } catch (e) {
            console.log('no books')
        }
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
        this.getHomeBooks()
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