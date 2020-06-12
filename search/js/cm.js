(function ($) {
    $('.ifrBox').each(function (idx) {
        var url = $(this).data('url');
        var selt = $(this);
        $.ajax(url).done(function (result) {
            selt.html(result);
        });
    });
})(jQuery);

(function (window, $) {
    var server = 'http://query.china.com.cn/news/queryFn',

        default_param = {
            pagetag: '2',
            noFields: 'channel',
            nokws: 2,
            fetch: 'title,url,content',
            index: 'sdbwg',
            startPage: 1,
            pageSize: 20,
            kw: '',
            strUrl: ''
        },
        param = $.extend({}, default_param),
        init = function () {
            $('.searchWord').val(searchText);
            param['kw'] = searchText;
            param['startPage'] = get_params('startPage');
        },
        get_params = function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return window.decodeURIComponent(r[2]);
            return null;
        },
        searchText = get_params('kw') ? get_params('kw').replace(/\+/g, ' ') : '';
    


    function renderData(data) {
        var len = data.recordCount,
            temp = [];
        kw = get_params('kw') || '';
        $('.titleBox span').html('(' + len + ')');
        for (var i = 0; i < data.recordList.length; i++) {
            var t_title = data.recordList[i].title.replace(/&amp;#039;/g, "'").replace(/&amp;#39;/g, "'"),
                t_text = data.recordList[i].content.replace(/&amp;#039;/g, "'").replace(/&amp;#39;/g, "'").replace(/&amp;#183;/g, ""),
                t_show = t_text.slice(0, 150)+'…';
            temp.push('<li><h2><a href="' + data.recordList[i].url + '">' + t_title + '</a></h2><p>' + t_show + '</p><p>' + data.recordList[i].url + '</p></li>');
        }
        $('.searchResult li').html(temp.join(''));
        param.kw = searchText;
    }

    function pageObj(data) {
        var i, key = 'kw',
            txt = get_params(key) ? get_params(key) : '',
            totalPage = data.pageCount,
            startPage = data.currentPage,
            pagination_buf = [];

        // prev
        pagination_buf.push(startPage > 1 ? '<a href="?startPage=' + (startPage - 1) + '&' + key + '=' + txt + '">Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
            for (i = 1; i <= totalPage; i++) {
                pagination_buf.push(i == startPage ? '<span>' + i + '</span>' : '<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
            }
        } else {
            // total page > 10
            if (startPage <= 4) {
                // 1 2 3 4 5 ... 8 9 10 11
                for (i = 1; i <= 5; i++) {
                    pagination_buf.push(i == startPage ? '<span>' + i + '</span>' : '<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                    // currentPage = i;
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 2; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else if (startPage >= totalPage - 3) {
                // 1 2 3 ... 7 8 9 10 11
                for (i = 1; i <= 3; i++) {
                    pagination_buf.push('<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 4; i <= totalPage; i++) {
                    pagination_buf.push(i == startPage ? '<span>' + i + '</span>' : '<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else {
                // 1 2 ... 5 6 7 ... 9 10 11100342
                for (i = 1; i <= 2; i++) {
                    pagination_buf.push('<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = startPage - 1; i <= startPage + 1; i++) {
                    pagination_buf.push(i == startPage ? '<span>' + i + '</span>' : '<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 1; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?startPage=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            }
            param['startPage'] = get_params('currentPage');
        }
        // next
        pagination_buf.push(startPage < totalPage ? '<a href="?startPage=' + (startPage + 1) + '&' + key + '=' + txt + '">Next</a>' : '<span>Next</span>');
        $('#autopage').html(pagination_buf.join(''));
    }

    //send
    exec = function () {
        $.getScript(server + '?' + $.param(param).replace(/\+/g, '%20'));
    };

    //callback
    window.queryRes = function (data) {
        pageCount = data.pageCount;
        curPage = data.currentPage;
        renderData(data);
        pageObj(data);

    };
    init();
    exec();
})(window, window.jQuery);