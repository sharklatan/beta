var appData;
$(function() {
    loadSearch();

});
function init(data){

    var str=""
    for (var x = 0;x <data.AllApps.length;x++){
        str+=addRow(data.AllApps[x].id,data.AllApps[x].name,data.AllApps[x].developer,data.AllApps[x].subtitle);
    }
    document.getElementById("apps").innerHTML=str;
    var str=""
    for (var x = 0;x <data.TopApps.length;x++){
        if(x == 10)
            break;
        str+=addRow(data.TopApps[x].id,data.TopApps[x].name,data.TopApps[x].developer,data.TopApps[x].subtitle);

    }
    document.getElementById("TopApps").innerHTML=str;
    var str=""
    for (var x = 0;x <data.TweakedApps.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.TweakedApps[x].id,data.TweakedApps[x].name,data.TweakedApps[x].developer,data.TweakedApps[x].subtitle);

    }
    document.getElementById("TweakedApps").innerHTML=str;
    var str=""
    for (var x = 0;x <data.PaidAndOtherApps.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.PaidAndOtherApps[x].id,data.PaidAndOtherApps[x].name,data.PaidAndOtherApps[x].developer,data.PaidAndOtherApps[x].subtitle);
    }
    document.getElementById("PaidAndOtherApps").innerHTML=str;
    var str=""
    for (var x = 0;x <data.TweakedGames.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.TweakedGames[x].id,data.TweakedGames[x].name,data.TweakedGames[x].developer,data.TweakedGames[x].subtitle);
    }
    document.getElementById("TweakedGames").innerHTML=str;
    var str=""
    for (var x = 0;x <data.PaidAndOtherGames.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.PaidAndOtherGames[x].id,data.PaidAndOtherGames[x].name,data.PaidAndOtherGames[x].developer,data.PaidAndOtherGames[x].subtitle);

    }
    document.getElementById("PaidAndOtherGames").innerHTML=str;
    var str=""
    for (var x = 0;x <data.RecommendedThisWeek.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.RecommendedThisWeek[x].id,data.RecommendedThisWeek[x].name,data.RecommendedThisWeek[x].developer,data.RecommendedThisWeek[x].subtitle);

    }
    document.getElementById("RecommendedThisWeek").innerHTML=str;
    var str=""
    for (var x = 0;x <data.MoviesOnIOS.length;x++){
        if(x == 5)
            break;
        str+=addRow(data.MoviesOnIOS[x].id,data.MoviesOnIOS[x].name,data.MoviesOnIOS[x].developer,data.MoviesOnIOS[x].subtitle);

    }
    document.getElementById("MoviesOnIOS").innerHTML=str;
}
/*
# id, name, quantity, tab
'1', 'Tweaked Apps', '12', 'app'
'2', 'Paid and Other Apps', '12', 'app'
'3', 'Tweaked Games', '12', 'game'
'4', 'Paid and Other Games', '12', 'game'
'5', 'Featured', '12', 'today'
'6', 'Tweaked ++ Apps', '12', 'today'
'27', 'Recommended This Week', '12', 'today'
'29', 'Jailbreak', '12', 'today'
'30', 'Stream Live TV', '12', 'today'
'31', 'Movies on iOS', '12', 'today'
*/
/*
    private int id;
    private String name;
    private String developer;
    private String subtitle;

 */
function loadSearch() {
    var server ="https://api.sharklatan.com/GetBrief/AllApps.action"
    $.ajax({
        type: 'GET',
        url: server,
        async: true,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function (data) {
            appData=data
            init(data)
            loadLatest()
        },
        error: function () {
            loadLatest()
        }
    });
}
function loadLatest() {
    var server ="https://api.sharklatan.com/GetBrief/Latest.action"
    $.ajax({
        type: 'GET',
        url: server,
        async: true,
        dataType: 'jsonp',
        jsonp: "jsonpCallback",
        success: function (data) {

            var str=""
            for (var x = 0;x <data.Latest.length;x++){
                str+=addRow(data.Latest[x].id,data.Latest[x].name,data.Latest[x].developer,data.Latest[x].subtitle);
            }
            document.getElementById("Latest").innerHTML=str;

        },
        error: function () {
            alert("network error");
        }
    });

}
function load(category){
    var server ="https://api.sharklatan.com/GetBrief/AppListByCategoryLimit.action?category="
        $.ajax({
            type: 'GET',
            url: server+category,
            async: true,
            dataType: 'jsonp',
            jsonp: "jsonpCallback",
            success: function (data) {
                var str=""
                for (var x = 0;x <data.AppList.length;x++){
                    str+=addRow(data.AppList[x].id,data.AppList[x].name,data.AppList[x].developer,data.AppList[x].subtitle);

                }
            },
            error: function () {
                alert("network error");
            }
        });



    /*$.post(server+""+category,{},function(obj){
        for (var x = 0;x <obj.AppList.length;x++){
            str+=addRow(obj.AppList[x].id,obj.AppList[x].name,obj.AppList[x].developer,obj.AppList[x].subtitle);
        }
        $(getDiv(category)).append(str);
    },"json");*/
}
function addRow(id,name,developer,subtitle){
     var html = "";
    var str="                                    <li class=\"item-content\">\n" +
        "                                        <div class=\"item-media\">\n" +
        "                                            <img class=\"lazy lazy-fadeIn\" src=\"https://api.sharklatan.com/image/loading.gif\" data-src=\"https://api.sharklatan.com/image/"+id+".png\" width=\"44\">\n" +
        "                                        </div>\n" +
        "                                        <div class=\"item-inner\">\n" +
        "                                            <div class=\"item-title-row\">\n" +
        "                                                <div class=\"app-title\">"+name+"</div>\n" +
        "                                                <div class=\"\" style=\"margin-right: 20px;\">\n" +
        "                                                    <a href=\"detail.html?id="+id+"\" class=\"button button-fill button-round\"style=\"background: #F0F1F6; color: #007AFF; font-weight:bold;\">GET</a>\n" +
        "                                                </div>\n" +
        "                                            </div>\n" +
        "                                            <div class=\"app-subtitle\">"+subtitle+"</div>\n" +
        "                                        </div>\n" +
        "                                    </li>"
    return str;
}

function getDiv(category) {
    if(category=="Top Apps")
        return "TopApps";
    else if(category=="Paid and Other Apps")
        return "PaidAndOtherApps"
    else if(category=="Tweaked Apps")
        return "TweakedApps"
    else if(category=="Tweaked Games")
        return "TweakedGames"
    else if(category=="Paid and Other Games")
        return "PaidAndOtherGames"
    else if(category=="Recommended This Week")
        return "Recommended"
    else if(category=="Movies on iOS")
        return "MoviesOnIOS"

}
