$(function () {
    $.ajax({
        type: "get",
        dataType: "json",
        url: 'http://127.0.0.1:3000/api/getcategorytitle',
        success: function (data) {
            var list = '';
            $.each(data.result, function (i, v) {
                list += ' <li class="clearfix" titleid="' + v.titleId + '"><a href="javascript:void(0)">' + data.result[i].title + ' <span class="icon_bottom iconfont icon-arrowdown"></span></a></li>' +
                    '<li data-index=' + i + ' class="liclick clearfix" style="display: none"></li>'
            })
            $(".tlists").html(list);
            $("ul.tlists li").click(function () {
                var table_tr = '';
                var s = $(this).next().attr("index");
                $(this).next().toggle().end().next().siblings("li[data-index]").hide();
                var $s = $(this).attr("titleId");
                $.get("http://127.0.0.1:3000/api/getcategory?titleid=" + $s, function (data) {

                    $.each(data.result, function (i, v) {
                        table_tr += "<a href=" + "../html/product.html?categoryid=" + v.categoryId + ">" + v.category + "</a>";
                    })
                    $(".liclick").html(table_tr);
                })
            })
        }
    });
})