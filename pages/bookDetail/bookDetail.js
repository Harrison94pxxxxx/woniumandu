// bookDetail.js
Page({
    data: {
        bookDetailId: '',
        bookDetail: [],
        follow: '追更新',
        followTheme:'follow',
        tagsColor: [
            '#7D9EC0', "#EEAEEE", "#EEAD0E", "#9BCD9B", "#CD5555", "#8B7500", "	#757575", "#528B8B"
        ],
        loading: false
    },
    //跳转阅读页
    startRead: function (e) {
        wx.navigateTo({
            url: './../read/read?readSource=' + this.data.bookDetailId
        })
    },
    //显示加载组件
    showLoading: function () {
        this.setData({
            loading: !this.data.loading
        })
    },
    //follow小说，添加到首页
    followBook: function () {
        var followSwitch = 1
        var _homeBooksInfo_new = { id: '', name: '', author: '', image: '' }
        _homeBooksInfo_new.id = this.data.bookDetail._id
        _homeBooksInfo_new.name = this.data.bookDetail.title
        _homeBooksInfo_new.author = this.data.bookDetail.author
        _homeBooksInfo_new.image = this.data.bookDetail.cover
        var _homeBooksInfo = wx.getStorageSync('homeBooksInfo')
        if (_homeBooksInfo) {
            var that = this
            var removeIndex = ''
            _homeBooksInfo.forEach(function(value,index){
                if (value.id === that.data.bookDetailId ){
                    followSwitch = 0
                    removeIndex = index 
                }
            })
            if (followSwitch === 1){
                _homeBooksInfo.push(_homeBooksInfo_new)
                try {
                    wx.setStorageSync('homeBooksInfo', _homeBooksInfo)
                    that.setData({
                        follow: '不追了',
                        followTheme: 'offFollow'
                    })
                } catch (e) {
                }
            }else {
                _homeBooksInfo.splice(removeIndex, 1)
                wx.setStorageSync('homeBooksInfo', _homeBooksInfo)
                that.setData({
                    follow: '追更新',
                    followTheme: 'follow'
                })
            }
        }
    },
    onLoad: function (options) {
        this.setData({
            bookDetailId: options.bookDetailId
        })
        var that = this
        that.showLoading()
        wx.request({
            url: 'https://novel.juhe.im/book-info/' + this.data.bookDetailId,
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    bookDetail: res.data.data
                })
                console.log('加载完毕')
                that.showLoading()
            }
        })
    },
    onReady: function () {

    },
    onShow: function () {
        var _homeBooksInfo_new = { id: '', name: '', author: '', image: '' }
        _homeBooksInfo_new.id = this.data.bookDetail._id
        _homeBooksInfo_new.name = this.data.bookDetail.title
        _homeBooksInfo_new.author = this.data.bookDetail.author
        _homeBooksInfo_new.image = this.data.bookDetail.cover
        var _homeBooksInfo = wx.getStorageSync('homeBooksInfo')
        if (_homeBooksInfo) {
            var that = this
            _homeBooksInfo.forEach(function (value) {
                if (value.id === that.data.bookDetailId) {
                    that.setData({
                        follow: '不追了',
                        followTheme: 'offFollow'
                    })
                }
            })
        }
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