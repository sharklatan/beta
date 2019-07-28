var myApp = new Framework7({
    modalTitle: 'SharkApp'
});
myApp.confirm('Follow our Twitter to get more information', function() {
    window.location.href = "https://twitter.com/sharklatan"
});
var mySwiper = new Swiper('.swiper-container', {
        preloadImages: false,
        lazyLoading: true,
        pagination: '.swiper-pagination'
    })
    // 为便于使用，自定义DOM库名字为$$
    // Para facilitar su uso, el nombre de la biblioteca DOM personalizada es $$
var $$ = Dom7;
var mySwiper = new Swiper('.swiper-container', {
        preloadImages: true,
        lazyLoading: true,
        pagination: '.swiper-pagination'
    })
    // 添加视图
    // Añadir vista
var view1 = myApp.addView('#view-1', {
    // 让这个视图支持动态导航栏
    // Deje que esta vista soporte la barra de navegación dinámica
    dynamicNavbar: true
});
var view2 = myApp.addView('#view-2', {
    // 让这个视图支持动态导航栏
    // Deje que esta vista soporte la barra de navegación dinámica
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3', {
    // 让这个视图支持动态导航栏
    // Deje que esta vista soporte la barra de navegación dinámica
    dynamicNavbar: true
});
var view4 = myApp.addView('#view-4', {
    // 让这个视图支持动态导航栏
    // Deje que esta vista soporte la barra de navegación dinámica
    dynamicNavbar: true
});
var view4 = myApp.addView('#view-5', {
    // 让这个视图支持动态导航栏
    // Deje que esta vista soporte la barra de navegación dinámica
    dynamicNavbar: true
});
// 下面代码是给“关于”页面使用的（关于页面加载完毕后触发）
// El siguiente código es para la página "Acerca de" (se activa después de cargar la página)

// 方式1：通过页面回调 (推荐):
// Método 1: pasar la devolución de llamada de la página (recomendado):
myApp.onPageInit('type', function(page) {

        var category = page.query.type;
        var server = "https://topstore.vip/GetBrief/AppListByCategory.action?category="
        $.ajax({
            type: 'GET',
            url: server + category,
            async: true,
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            success: function(data) {
                var str = ""
                for (var x = 0; x < data.AppList.length; x++) {
                    str += addRow(data.AppList[x].id, data.AppList[x].name, data.AppList[x].developer, data.AppList[x].subtitle);

                }
                document.getElementById("title").innerHTML = category
                document.getElementById("header").innerHTML = category
                document.getElementById("appsByType").innerHTML = str;
            },
            error: function() {
                alert("network error");
            }
        });
    })
    /*
    // 方式2：通过pageInit事件处理所有页面
    // Método 2: procesar todas las páginas a través del evento pageInit
    $$(document).on('pageInit', function (e) {
        // 获取页面数据
        // Obtener datos de la página
        var page = e.detail.page;

        //判断是否是“关于”页面
        //Determine si es la página "Acerca de"
        if (page.name === 'type') {
            myApp.alert('"关于"页面加载完毕2!');
        }
    })

    */
$$(document).on('pageInit', '.page[data-page="index-1"]', function(e) {
    init(appData);
})
$$(document).on('pageInit', '.page[data-page="index-2"]', function(e) {
    init(appData);
})
$$(document).on('pageInit', '.page[data-page="index-3"]', function(e) {
    init(appData);
})
$$(document).on('pageInit', '.page[data-page="index-4"]', function(e) {
    init(appData);
})

function addRow(id, name, developer, subtitle) {
    var str = "                                    <li class=\"item-content\">\n" +
        "                                        <div class=\"item-media\">\n" +
        "                                            <img src=\"https://topstore.vip/image/" + id + ".png\" width=\"44\">\n" +
        "                                        </div>\n" +
        "                                        <div class=\"item-inner\">\n" +
        "                                            <div class=\"item-title-row\">\n" +
        "                                                <div class=\"app-title\">" + reserve(name) + "</div>\n" +
        "                                                <div class=\"\" style=\"margin-right: 20px;\">\n" +
        "                                                    <a href=\"detail.html?id=" + id + "\" class=\"button button-fill button-round\"style=\"background: #F0F1F6; color: #007AFF; font-weight:bold;\">GET</a>\n" +
        "                                                </div>\n" +
        "                                            </div>\n" +
        "                                            <div class=\"app-subtitle\">" + reserve(subtitle) + "</div>\n" +
        "                                        </div>\n" +
        "                                    </li>"
    return str;
}
myApp.onPageInit('detail', function(page) {
    var id = page.query.id;
    var server = "https://topstore.vip/GetDetail/AppDetail.action?id="
    $.ajax({
        type: 'GET',
        url: server + id,
        async: true,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function(data) {
            addDetail(data);
        },
        error: function() {
            alert("network error");
        }
    });
    var id = page.query.id;
    var server = "https://topstore.vip/GetCategory/AppCategory.action?id="
    $.ajax({
        type: 'GET',
        url: server + id,
        async: true,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function(data) {
            appCategory(data);
        },
        error: function() {
            alert("network error");
        }
    });
})

function addDetail(data) {
    document.getElementById("avatar").src = "https://topstore.vip/image/" + data.id + ".png"
    document.getElementById("preview").src = "https://topstore.vip/preview/" + data.id + ".png"
    document.getElementById("name").innerHTML = data.name
    document.getElementById("subtitle").innerHTML = data.subtitle
    document.getElementById("downloadLink").href = "itms-services://?action=download-manifest&url=https://topstore.vip/plist/" + data.id + ".plist"
    document.getElementById("Size").innerHTML = data.filesize
    var predata = data.description.substring(0, 20);
    var postdata = data.description.substr(20);
    var description = predata + "<div class=\"desc\" style=\"display: none;\">" + postdata + "</div>" +
        "<p>\n" +
        "  <a href=\"#\" onclick=\"if ($$('.desc').css('display') == 'none'){$$('.desc').css('display', 'inline'); this.innerHTML='Less...'} else {$$('.desc').css('display', 'none'); this.innerHTML='More...'}\" class=\"\">More...</a>\n" +
        "</p>";
    document.getElementById("Describtion").innerHTML = description.replace(/\n/g, "<br>")

    document.getElementById("Developer").innerHTML = data.developer
    document.getElementById("Version").innerHTML = data.version
}

function appCategory(data) {
    for (var x = 0; x < data.category.length; x++) {
        $("#Category").append(getCategory(data.category[x].categoryId) + "<br/>");
    }
}
myApp.onPageInit('index-4', function(page) {
    alert("search")
})

function getCategory(id) {
    if (id == "1")
        return "Tweaked Apps"
    else if (id == "2")
        return "Paid and Other Apps"
    else if (id == "3")
        return "Tweaked Games"
    else if (id == "4")
        return "Paid and Other Games"
    else if (id == "27")
        return "Recommended This Week"
    else if (id == "31")
        return "Movies on iOS"
    else if (id == "32")
        return "Top Apps"
    else
        return ""
}
