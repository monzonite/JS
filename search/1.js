(function ($) {
    $('.ifrBox').each(function (idx) {
        var url = $(this).data('url');
        var selt = $(this);
        $.ajax(url).done(function (result) {
            selt.html(result);
        });
    });
})(jQuery);

(function ($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchWord') ? getQueryString('searchWord') : '';
    var pageSize = 40;
    var totalPage = 0;
    var getUrl = 'http://search3.china.com.cn/search/jsonfn.jsp?port=8925&page=' + startpage + '&nItem=' + pageSize + '&searchText=' + searchText;

    $('.searchWord').val(searchText);
    $.getScript(getUrl);
    window.searchRes = function (data) {
        var len = data.size;
        var pageHref = [];
        var temp = [];
        totalPage = Math.ceil(len / pageSize);
        $('.titleBox span').html('(' + len + ')');
        for (var i = 0; i < data.list.length; i++) {
            var t_title = data.list[i].title.replace(/&amp;#039;/g, "'").replace(/&amp;#39;/g, "'"),
            t_text = data.list[i].text.replace(/&amp;#039;/g, "'").replace(/&amp;#39;/g, "'");
            temp.push('<li><h2><a href="' + data.list[i].url + '">' + t_title + '</a></h2><p>' + t_text + '</p><p>' + data.list[i].url + '</p></li>');
        }
        $('.searchResult li').html(temp.join(''));
        //$('.searchResult li').each(function() {
        //    var str = $(this).text();
        //    $(this).html(str.replace(/&amp;#39;/g, "'"));
        //});
        pageObj();
    };

    function pageObj() {
        var i;
        var pageHref = []; 
        var key = 'searchText';
        var txt = getQueryString(key) ? getQueryString(key) : '';

        var pagination_buf = [];
        // prev
        pagination_buf.push(startpage > 1 ? '<a href="?port=8925&page=' + (startpage - 1) + '&' + key + '=' + txt + '">Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
            for (i = 1; i <= totalPage; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
            }
        } else {
            // total page > 10
            if (startpage <= 4) {
                // 1 2 3 4 5 ... 8 9 10 11
                for (i = 1; i <= 5; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 2; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else if (startpage >= totalPage - 3) {
                // 1 2 3 ... 7 8 9 10 11
                for (i = 1; i <= 3; i++) {
                    pagination_buf.push('<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 4; i <= totalPage; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else {
                // 1 2 ... 5 6 7 ... 9 10 11100342
                for (i = 1; i <= 2; i++) {
                    pagination_buf.push('<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = startpage - 1; i <= startpage + 1; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 1; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?port=8925&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            }
        }
        // next
        pagination_buf.push(startpage < totalPage ? '<a href="?port=8925&page=' + (startpage + 1) + '&' + key + '=' + txt + '">Next</a>' : '<span>Next</span>');
        $('#autopage').html(pagination_buf.join(''));
    }

    function sortby(int) {
        if (int == 1) {
            window.location.href = location.href + '&strSortBy=1';
        } else {
            window.location.href = location.href + '&strSortBy=2';
        }
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);