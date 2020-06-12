! function (window) {
    var CIIC = window.CIIC || {};
    CIIC = {
        'cn': {
            index: 'cn',
            image: 'http://images.china.cn/images1/ch/2015china/images/logo.gif',
            url: 'http://www.china.com.cn',
            title:'中国网-站内检索',
            strUrl:''
        },
        'en': {
            index: 'en',
            image: 'images/logo_en.jpg',
            url: 'http://www.china.org.cn',
            title:'China.org.cn'
        },
        'cipg': {
            index: 'cipg',
            image: 'images/logo_cipg.png',
            url: 'http://www.cipg.org.cn',
            title:'中国外文局-站内检索'
        },
        'wrsa':{
            index:'wrsa',
            image:'images/wrsa.png',
            url:'http://www.wrsa.net/',
            title:'欧美同学会-站内检索'
        },
        'ciis':{
            index:'ciis',
            image:'images/ciis.png',
            url:'http://www.ciis.org.cn/',
            title:'国研所-站内检索'
        },
        'gyzz':{
            index:'ciis',
            image:'images/gyzz1.png',
            url:'http://www.ciis.org.cn/gyzz/',
            title:'国际问题研究杂志-站内检索',
            strUrl:'gyzz'
        },
        'ciis_en':{
            index:'ciis',
            image:'images/ciis.png',
            url:'http://www.ciis.org.cn/english/index.htm',
            title:'China Institute of International Studies-search',
            strUrl:'english'
        },
        'ciic_cn_cppcc':{
            index:'ciic_cn_cppcc',
            image:'http://images.china.cn/images1/ch/cppcc/images/logo.jpg',
            url:'http://cppcc.china.com.cn/',
            title:'中国政协-站内检索'
        },
        'tea':{
            index:'cn',
            image:'http://images.china.cn/images1/ch/2017TeaChina/logo1.gif',
            url:'http://tea.china.com.cn/',
            title:'茶叶中国-站内检索',
            strUrl:'tea.china.com.cn'
        },
        'ccwm': {
            index: 'ccwm',
            image: 'images/ccwm.jpg',
            url: 'http://ccwm.china.com.cn/',
            title:'妇女儿童博物馆-站内检索'
        },
        'dyxh': {
            index: 'dyxh',
            image: 'images/comra.png',
            url: 'http://www.comra.org/',
            title:'大洋协会-站内检索'
        },
        'ou': {
            index: 'ou',
            image: 'http://images.china.cn/images1/ch/kfdx/images/logo.jpg',
            url: 'http://ou.china.com.cn/',
            title:'开放大学-站内检索'
        },
        'grassland': {
            index: 'grassland',
            image: 'images/grassland.png',
            url: 'http://grassland.china.com.cn/',
            title:'中国网草原频道-站内检索'
        },
        'jkzg': {
            index: 'jkzg',
            image: 'images/logo_health.png',
            url: 'http://health.china.com.cn/',
            title:'健康中国-站内检索'
        },
        'jilin': {
            index: 'jilin',
            image: 'images/jilin.png',
            url: 'http://jilin.china.org.cn/',
            title:'Discover Jilin',
            noFields:'channel,url',
            nokws:'2,russian'
        },
        'idc': {
            index: 'idc',
            image: 'http://images.china.cn/images1/ch/2015china/images/logo.gif',
            url: 'http://idc.china.com.cn/',
            title:'大数据中心-站内检索'
        },
        'iot': {
            index: 'iot',
            image: 'images/iot.png',
            url: 'http://iot.china.com.cn/',
            title:'中国物联网-站内检索'
        },
        'chuangxin': {
            index: 'chuangxin',
            image: 'http://images.china.cn/images1/ch/2014jishuzhg/Logo.gif',
            url: 'http://home.china.com.cn/',
            title:'中国网联播-站内检索'
        },
        'sdbwg': {
            index: 'sdbwg',
            image: 'images/capitalmuseum.png',
            url: 'http://en.capitalmuseum.org.cn/',
            title:'Capital Museum-Search'
        },
        'jlpd': {
            index: 'jlpd',
            image: 'http://images.china.cn/images1/market/jilu/201612/logo.jpg',
            url: 'http://jilu.china.com.cn/',
            title:'纪录中国-站内检索'
        },
        'shichuang': {
            index: 'shichuang',
            image: 'http://images.china.cn/images1/ch/2017sc/images/logo.jpg',
            url: 'http://zgsc.china.com.cn/',
            title:'中国视窗-站内检索'
        },
        'zgjpd': {
            index: 'zgjpd',
            image: 'http://images.china.cn/images1/market/wine/zgj_logo.png',
            url: 'http://zgj.china.com.cn/',
            title:'中国酒-站内检索'
        },
        'wdy': {
            index: 'wdy',
            image: 'http://images.china.cn/images1/ch/2019vfilm/images/yxbg.png',
            url: 'http://vfilm.china.com.cn/',
            title:'中国微电影-站内检索'
        },
        'cx': {
            index: 'cx',
            image: 'http://images.china.cn/images1/market/cxzg/201811/zglzlogo.jpg',
            url: 'http://innovate.china.com.cn/',
            title:'创新中国-站内检索'
        },
        'zmqz': {
            index: 'zmqz',
            image: 'images/quzhou.png',
            url: 'http://qz.china.com.cn/',
            title:'衢州有礼-站内检索'
        },
        'nanning': {
            index: 'nanning',
            image: 'images/nanning.png',
            url: 'http://www.nanning.china.com.cn/',
            title:'中国南宁-站内检索'
        },
        'ar': {
            index: 'ar',
            image: 'images/logo_org.gif',
            url: 'http://arabic.china.org.cn/',
            title:'شبكة الصين'
        },
        'fr': {
            index: 'fr',
            image: 'images/logo_org.gif',
            url: 'http://french.china.org.cn/',
            title:'French'
        },
        'ge': {
            index: 'ge',
            image: 'images/logo_org.gif',
            url: 'http://german.china.org.cn/',
            title:'German'
        },
        'jp': {
            index: 'jp',
            image: 'images/logo_org.gif',
            url: 'http://japanese.china.org.cn/',
            title:'Japaneses'
        },
        'ru': {
            index: 'ru',
            image: 'images/logo_org.gif',
            url: 'http://russian.china.org.cn/',
            title:'Russian'
        },
        'sp': {
            index: 'sp',
            image: 'images/logo_org.gif',
            url: 'http://spanish.china.org.cn/',
            title:'Spanish'
        },
        'esp': {
            index: 'esp',
            image: 'images/logo_org.gif',
            url: 'http://esperanto.china.org.cn/',
            title:'Esperanto'
        },
        'kr': {
            index: 'kr',
            image: 'images/logo_org.gif',
            url: 'http://korean.china.org.cn/',
            title:'Korean'
        },
        'ydah': {
            index: 'ydah',
            image: 'images/ydah.png',
            url: 'http://ydah.china.com.cn/',
            title:'韵动安徽-站内检索'
        },
    };

    window.CIIC = CIIC;
}(window);