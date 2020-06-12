(function (window, $) {
    var server = 'http://query.china.com.cn/news/queryFn',
        DEFAULT_KEY = 'cipg',
        CIIC = window.CIIC || {},
        el_logo = $('.logo'),
        el_link = $('.logo-url'),
        el_input = $('.search-input'),
        el_title = $('title'),
        default_param = {
            pagetag: '2',//默认为1
            fetch: 'title,abstra,content,url,date,picurl,sourcename,liability,nodeid',
            noFields: 'channel',
            nokws: 2,
            //index: CIIC[DEFAULT_KEY].index, //art,market,en...
            startPage: 1,
            pageSize: 20,
            kw: '',
            strUrl: ''
        },
        param = $.extend({}, default_param),
        get_params = function (query) {
            var result, search = location.search.substr(1),
                regex = new RegExp(query + '=([^&]*)', 'ig').exec(search);
            result = (!!regex && !!regex[1]) ? window.decodeURIComponent(regex[1]) : '';
            return result;
        },
        load_meta = function (conf) {
            el_logo.attr('src', conf.image);
            el_link.attr('href', conf.url);
            el_title.html(conf.title);
        },
        init = function () {
            key = get_params('index')|| DEFAULT_KEY;
            conf = CIIC[key] || {
                index: key,
                image: 'http://images.china.cn/images1/ch/2015china/images/logo.gif',
                url: 'http://www.china.com.cn',
                title:'china.org.cn',
                strUrl:'',
                noFields: 'channel',
                nokws: 2
            };
            kw = get_params('kw') || '';
            el_input.val(window.decodeURIComponent(kw));
            param.index = conf.index;
            param.strUrl = conf.strUrl;
            param.noFields = conf.noFields;
            param.nokws = conf.nokws;
            param['kw'] = kw = get_params('kw') ? get_params('kw').replace(/\+/g, ' ') : '';
            load_meta(conf);
        },
        exec = function () {
            $.getScript(server + '?' + $.param(param).replace(/\+/g, '%20'));
        },
        render_data = function (data) { 
            var list_buf = [],
                contentShow = '',
                num_start = Math.ceil(data.currentPage * data.pageSize - (data.pageSize - 1)),
                num_end, num_list = [];
            $.each(data.recordList, function (i, v) {
                var searchText = new RegExp('<span', 'g'),
                    publishDate = v.date.substr(0,16),
                    contentArr = v.content.split('', 150),
                    contentBuf = '……' + contentArr.join('') + '……',
                    matche = searchText.exec(v.content);
                contentShow = (matche == null) ? contentBuf : v.content;
                if (v.picurl != '') {
                    list_buf.push('<li class="row mb-3 article-list"><div class="col-md-3"><a href="' + v.url + '" target="_blank"><img src="' + v.picurl + '" alt="" class="article-img" /></a></div><div class="article-right col-md-9"><h5><a href="' + v.url + '" target="_blank">' + v.title + '</a></h5><div class="date">' + publishDate + '</div><div class="cont">' + (v.content != '' ? contentShow : v.abstra) + '</div><div><a class="url" href="' + v.url + '" target="_blank">' + v.url + '</a></div><div class="source">' + v.sourcename + '</div></div></li>');
                } else {
                    list_buf.push('<li class="row mb-3 pb-3 article-list"><div class="article-right col-md-12"><h5><a href="' + v.url + '" target="_blank">' + v.title + '</a></h5><div class="date">' + publishDate + '</div><div class="cont">' + (v.content != '' ? contentShow : v.abstra) + '</div><div><a class="url" href="' + v.url + '" target="_blank">' + v.url + '</a></div><div class="source">' + v.sourcename + '</div></div></li>');
                }
            });
            if (Math.ceil(data.recordCount / data.currentPage) < data.pageSize) {
                num_end = data.recordCount;
            } else {
                num_end = data.currentPage * data.pageSize;
            }
            // $('.searchKey').html('<div>Search from <b>Title</b>、<b>Content</b>、<b>Keywords</b><b class="search-word">' + el_input.val() + '</b></div>');
            $('.search-word').html(el_input.val());
            $('.list').html(list_buf.join(''));
            $('.recordcount').html(data.recordCount);
            $('.totalTime').html(data.tookSecond);
            num_list.push((num_end == 0) ? 0 : num_start + '-' + num_end);
            $('.Ppage').html(num_list.join(''));
        },
        page_num = function (startPage, endPage, curPage, totalPage) {
            var i, listr = [];

            if (curPage > 1) {
                listr.push('<li><a href="#" id="firstPage">First</a></li><li><a id="previousPage" href="#">«</a></li>');
            }

            for (i = startPage; i <= endPage; i++) {
                listr.push('<li><a ' + (i == curPage ? 'class="active"' : '') + ' href="#" class="pages" data-val="' + i + '">' + i + '</a></li>');
            }

            if (curPage < totalPage) {
                listr.push('<li><a id="nextPage" href="#">»</a></li><li><a href="#" id="lastPage">Last</a></li>');
            }

            $('.pagination').html(listr.join(''));
        },
        render_page = function (data) {
            var curPage = data.currentPage,
                totalPage = data.pageCount;

            if (totalPage <= 5) {
                page_num(1, totalPage, curPage, totalPage);
                return;
            }

            if ((curPage - 3) < 0) {
                page_num(1, 5, curPage, totalPage);
                return;
            }

            if ((curPage + 3) > totalPage) {
                page_num(totalPage - 4, totalPage, curPage, totalPage);
                return;
            }

            page_num(curPage - 2, curPage + 2, curPage, totalPage);
        },
        route = function (data) {
            render_data(data);
            render_page(data);
        },
        gotoPage = function (page) {
            if (page < 1 || page > pageCount) {
                return;
            }
            param['startPage'] = page;
            exec();
        };

    window.queryRes = function (data) {
        pageCount = data.pageCount;
        curPage = data.currentPage;
        route(data);
    };

    //DOM exec
    init();
    exec();

    //搜索点击事件
    $('#button-addon').on('click', function () {
        gotoPage(1);
        exec();
    });
    $('.search-input').on('keyup', function (evt) {
        if (13 == evt.keyCode) {
            gotoPage(1);
            exec();
        }
    });

    //keyword
    $('.search-input').change(function(){
        param['kw']= this.value;
        exec();
    });
    //First page 只搜首页
    $('#onlyFirst').change(function () {
        if ($(this).prop("checked")) {
            param['pagetag'] = '2';
            exec();
        } else {
            param['pagetag'] = '1';
            exec();
        }
    });
    //order 按时间/相关度
    $('input[type=radio][name=dateRelevance]').change(function () {
        if (this.value == 'order1') {
            param['order'] = 'date';
            exec();
        } else if (this.value == 'order2') {
            param['order'] = '_score';
            exec();
        }
    });
    //extend 精确/扩展
    $('input[type=radio][name=exactExtend]').change(function () {
        if (this.value == 'order3') {
            delete param.flag;
            exec();
        } else if(this.value == 'order4') {
            param['flag'] = 1;
            exec();
        }
    });

    //绑定点击页码事件
    $(document).on('click', '.pages', function () {
        var page = window.parseInt($(this).attr('data-val'));
        gotoPage(page);
    });

    //绑定下一页点击事件
    $(document).on('click', '#nextPage', function () {
        gotoPage(curPage + 1);
    });

    //绑定上一页点击事件
    $(document).on('click', '#previousPage', function () {
        gotoPage(curPage-1)
    });

    //首页点击事件
    $(document).on('click', '#firstPage', function () {
        gotoPage(1);
    });
    //末页点击事件
    $(document).on('click', '#lastPage', function () {
        gotoPage(pageCount);
    });

    //高级检索
    $('#button-addon2').on('click',function(){
        $('.mask').show();
    })
    $('#button-close').on('click',function(){
        $('.mask').hide();
    })

}(window, window.jQuery));