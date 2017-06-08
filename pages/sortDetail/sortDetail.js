// sortDetail.js
Page({
    data: {
        category_male: [],
        category_female: [],
        category_now: [],
        categoryMain_now: '',
        categorySex_now: '',
        bookList: [],
        bookListNow: [],
        tagTheme: [],
        tagNow: [],
        tagIndex: 0,
        start: []
    },
    //跳转小说详情页
    getBookDetail: function (e) {
        wx.navigateTo({
            url: './../bookDetail/bookDetail?bookDetailId=' + e.currentTarget.dataset.id
        })
    },
    //分类，书列表联动
    changeBookList: function (e) {
        var tagTheme = this.data.tagTheme
        for (let i = 0; i < this.data.category_now.length;i++){
            tagTheme[i] = 'default'
        }
        tagTheme[e.currentTarget.dataset.index] = 'red'
        var that = this
        if (this.data.bookList[e.currentTarget.dataset.index]){
            that.setData({
                tagNow: that.data.category_now[e.currentTarget.dataset.index],
                bookListNow: that.data.bookList[e.currentTarget.dataset.index],
                tagTheme: tagTheme,
                tagIndex: e.currentTarget.dataset.index
            })
        }
        else {
            wx.showToast({
                title: '努力加载中',
                icon: 'loading',
                duration: 2000
            })
        }
    },
    //设置bookList
    setBookList: function (source) {
        this.setData({
            bookList: source,
            bookListNow: source[0]
        })
    },
    //请求20条书目
    getSortDetailBooks: function () {
        var that = this
        var _bookList = []
        wx.showLoading({
            title: '努力加载中'
        })
        for (var i = 0; i < that.data.category_now.length; i++) {
            wx.request({
                url: 'https://novel.juhe.im/category-info?gender=' + that.data.categorySex_now + '&type=hot&major=' + that.data.categoryMain_now + '&minor=' + that.data.category_now[i]  + '&start=0&limit=20',
                header: {
                    'content-type': 'application/json'
                },
                method: "GET",
                success: function (res) {
                    _bookList.push(res.data.data.books)
                    if (i === that.data.category_now.length){
                        that.setBookList(_bookList)
                    }
                    wx.hideLoading()
                },
                fail: function () {
                    wx.hideLoading()
                }
            })
        }
    },
    onLoad: function (options) {
        options.sortDetailInfo = options.sortDetailInfo.split(",")
        this.setData({
            categoryMain_now: options.sortDetailInfo[0],
            categorySex_now: options.sortDetailInfo[1]
        })
        var that = this
        var tagTheme = []
        var start = []
        wx.showLoading({
            title: '努力加载中'
        })
        wx.request({
            url: 'https://novel.juhe.im/sub-categories',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
                that.setData({
                    category_male: res.data.data.male,
                    category_female: res.data.data.female
                })
                if (that.data.categorySex_now === 'male') {
                    for (let i = 0; i < that.data.category_male.length; i++) {
                        if (that.data.category_male[i].major === that.data.categoryMain_now) {
                            that.setData({
                                category_now: that.data.category_male[i].mins,
                                indexNow: that.data.category_male[i].mins[0]
                            })
                        }
                    }
                }
                else if (that.data.categorySex_now === 'female') {
                    for (let i = 0; i < that.data.category_female.length; i++) {
                        if (that.data.category_female[i].major === that.data.categoryMain_now) {
                            that.setData({
                                category_now: that.data.category_female[i].mins,
                                indexNow: that.data.category_female[i].mins[0]
                            })
                        }
                    }
                }
                for (let i = 0; i < that.data.category_now.length;i++){
                    tagTheme.push('default')
                    start.push(20)
                }
                tagTheme[0] = 'red'
                that.setData({
                    tagTheme: tagTheme,
                    start: start
                })
                wx.hideLoading()
                that.getSortDetailBooks()
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
        var that = this
        var _bookList = that.data.bookList
        var start = that.data.start
        wx.showLoading({
            title: '努力加载中'
        })
        wx.request({
            url: 'https://novel.juhe.im/category-info?gender=' + that.data.categorySex_now + '&type=hot&major=' + that.data.categoryMain_now + '&minor=' + that.data.category_now[that.data.tagIndex] + '&start=' + start[that.data.tagIndex]  +'&limit=20',
            header: {
                'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
                res.data.data.books.forEach(function(value){
                    _bookList[that.data.tagIndex].push(value)
                })
                start[that.data.tagIndex] = start[that.data.tagIndex] + 20
                that.setData({
                    start: start,
                    bookList: _bookList,
                    bookListNow: _bookList[that.data.tagIndex]
                })
                wx.hideLoading()
            },
            fail: function () {
                wx.hideLoading()
            }
        })
    },
    onShareAppMessage: function () {

    }
})