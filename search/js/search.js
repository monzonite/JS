(function (window, $) {
    var server = 'http://query.china.com.cn/news/queryFn',
        DEFAULT_KEY = 'cipg',
        CIIC = window.CIIC || {},
        el_logo = $('.logo'),
        el_link = $('.logo-url'),
        el_title = $('title'),

        default_param = {
            pagetag: '2',//默认为1
            noFields: 'channel',
            nokws: 2,
            //index: CIIC[DEFAULT_KEY].index, //art,market,en...
            fetch: 'title,abstra,content,url,date,picurl,sourcename,liability,nodeid',
            fields: '',
            kws: '',
            startPage: 1,
            pageSize: 20,
            kw: '',
            fromDate: '',
            toDate: '',
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
            el_link.attr('href', conf.url);
            el_title.html(conf.title);
            el_logo.attr('src', conf.image);
        },
        init = function () {
            key = get_params('index') || DEFAULT_KEY;
            conf = CIIC[key] || {
                index: key,
                image: 'http://images.china.cn/images1/ch/2015china/images/logo.gif',
                url: 'http://www.china.com.cn',
                title: '中国网-站内检索',
                strUrl: '',
            };
            kw = get_params('kw') ? get_params('kw').replace(/\+/g, ' ') : '';
            $('.search-input').val(window.decodeURIComponent(kw));
            param.index = conf.index;
            param.strUrl = conf.strUrl;
            param.noFields = conf.noFields;
            param.nokws = conf.nokws;
            param.kw = kw;
            load_meta(conf);
        },
        render_data = function (data) {
            var list_buf = [],
                contentShow = '',
                num_start = Math.ceil(data.currentPage * data.pageSize - (data.pageSize - 1)),
                num_end, num_list = [];
            $.each(data.recordList, function (i, v) {
                var searchText = new RegExp('<span', 'g'),
                    publishDate = v.date.substr(0, 16),
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

            if (0 == data.recordCount) {
                $('.list').html('<div><div class="nothing"><a class="btn btn-primary" href="javascript:location.reload()">返回</a></div></div>');
                // $('.search-input').val('');
                // param['kw']='';
            } else {
                $('.list').html(list_buf.join(''));
            }
            $('.recordcount').html(data.recordCount);
            $('.totalTime').html(data.tookSecond);
            $('.search-word').html(param['kw'] ? param['kw'] : param['kws']);
            num_list.push((num_end == 0) ? 0 : num_start + '-' + num_end);
            $('.Ppage').html(num_list.join(''));//1-20
        },
        page_num = function (startPage, endPage, curPage, totalPage) {
            var i, listr = [];

            if (curPage > 1) {
                listr.push('<li><a href="#" id="firstPage">首页</a></li><li><a id="previousPage" href="#">«</a></li>');
            }

            for (i = startPage; i <= endPage; i++) {
                listr.push('<li><a ' + (i == curPage ? 'class="active"' : '') + ' href="#" class="pages" data-val="' + i + '">' + i + '</a></li>');
            }

            if (curPage < totalPage) {
                listr.push('<li><a id="nextPage" href="#">»</a></li><li><a href="#" id="lastPage">末页</a></li>');
            }

            $('.pagination').html(listr.join(''));
        },
        render_page = function () {
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
            if(0 == totalPage){
                totalPage = 1;
                page_num(1,1,1,1)
            }

            page_num(curPage - 2, curPage + 2, curPage, totalPage);
        },
        route = function (data) {
            render_data(data);
            render_page(data);
        },
        gotoPage = function (page) {
            if(0 == totalPage){
                totalPage = 1;
            }
            if (page < 1 || page > totalPage) {
                return;
            }
            param['startPage'] = page;
            exec();
        },
        advSearch = function () {
            var j, adv_title = $('.adv-title').val(),
                adv_author = $('.adv-author').val(),
                adv_keyword = $('.adv-keyword').val(),
                adv_path = $('.adv-path').val(),
                adv_content = $('.adv-content').val(),
                adv_nodeid = $('.adv-nodeid').val(),
                adv_sourcename = $('.adv-sourcename').val(),
                adv_fromdate = $('.adv-fromdate').val(),
                adv_todate = $('.adv-todate').val(),

                fieldsArr = [],
                kwsArr = [],
                fieldsKwsMap = {
                    'title': adv_title,
                    'liability': adv_author,
                    'url': adv_path,
                    'content': adv_content,
                    'nodeid': adv_nodeid,
                    'sourcename': adv_sourcename
                };

            for (j in fieldsKwsMap) {
                if (!!fieldsKwsMap[j]) {
                    fieldsArr.push(j);
                    kwsArr.push(fieldsKwsMap[j]);
                }
            }
            param['fields'] = fieldsArr.join(',');
            param['kws'] = kwsArr.join(',');
            param['kw'] = adv_keyword;
            // param['fromDate'] = adv_fromdate;
            param['toDate'] = adv_todate;
            console.log(adv_fromdate);
        },
        //send
        exec = function () {
            $.getScript(server + '?' + $.param(param).replace(/\+/g, '%20'));
        };

    //callback
    window.queryRes = function (data) {
        totalPage = data.pageCount;
        curPage = data.currentPage;
        route(data);
    };

    //DOM exec
    init();
    exec();
    //高级检索
    $('.advSearch').on('click', function () {
        advSearch();
        $('.search-input').val('');
        gotoPage(1);
    });

    //重置
    $('.reset').on('click', function () {
        $('.modal input').val('');
    })

    //搜索点击事件
    $('.search-button').on('click', function () {
        delete param.fields;
        delete param.kws;
        $('.modal input').val('');
        param['kw'] = $('.search-input').val();
        gotoPage(1);
    });
    $('.search-input').on('keyup', function (evt) {
        if (13 == evt.keyCode) {
            delete param.fields;
            delete param.kws;
            $('.modal input').val('');
            param['kw'] = this.value;
            gotoPage(1);
        }
    });
    // $('.search-input').change( function(){
    //     param['kw'] = this.value;
    //     gotoPage(1);
    //     alert(this.value)
    // })

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
    $('.dateRelevance').change(function () {
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
        if ($('#exact').prop('checked')) {
            delete param.flag;
            exec();
        } else {
            param['flag'] = 1;
            exec();
        }
    });

    //page click
    $(document).on('click', '.pages', function () {
        var page = window.parseInt($(this).attr('data-val'));
        gotoPage(page);
    });
    $(document).on('click', '#nextPage', function () {
        gotoPage(curPage + 1);
    });
    $(document).on('click', '#previousPage', function () {
        gotoPage(curPage - 1)
    });
    $(document).on('click', '#firstPage', function () {
        gotoPage(1);
    });
    $(document).on('click', '#lastPage', function () {
        gotoPage(totalPage);
    });
}(window, window.jQuery));