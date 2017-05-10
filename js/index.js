$(function () {
    //
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:3000/api/getindexmenu",
        dataType: "json",
        success: function (data) {
            var concent = '';
            $.each(data.result, function (i, v) {
                concent += '<li><a href="#">' +
                    data.result[i].img +
                    '<span>' + data.result[i].name + '</span></a></li>';
            })
            $(".menu_main").html(concent);
            $(".menu_main  li").eq("7").nextAll("li").hide();
            $(".menu_main  li").eq("7").click(function () {
                $(this).nextAll("li").toggle();
            })
            $(".menu_main  li").eq(0).find("a").attr("href", "./html/price.html");
            $(".menu_main  li").eq(1).find("a").attr("href", "./html/saveMoney.html");
            $(".menu_main  li").eq(2).find("a").attr("href", "./html/cityprict.html");
            $(".menu_main  li").eq(3).find("a").attr("href", "./html/smallPrice.html");
        }
    })

//
    $(".search_info").click(function () {
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://127.0.0.1:3000/api/getmoneyctrl",
            success: function (data) {
                var listhtml = '' , comCount;
                $.each(data.result, function (i, v) {
                    comCount = data.result[i].productComCount;
                    comCount = comCount.replace("有", "");
                    comCount = comCount.replace("人评论", "");
                    listhtml += '<li><a href="#" class="clearfix">' + data.result[i].productImg2 + '<div class="commodity_info">' +
                        '<p>' + data.result[i].productName + '<span>' + data.result[i].productPinkage + '</span></p>' +
                        ' <div class="company_info clearfix">' +
                        '<span class="f_left">' + data.result[i].productFrom + ' | ' + data.result[i].productTime + '</span><span class="iconcomments f_right iconfont icon-comments">' + comCount + '</span></div></div></a>' +
                        '</li>'
                });
                $(".lists").html(listhtml);
            }
        })
    })
})