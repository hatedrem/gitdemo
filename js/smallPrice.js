$(function () {
    function getClick(tit_id) {
        $.get("http://127.0.0.1:3000/api/getbaicaijiaproduct?titleid=" + tit_id, function (data) {
            var listHtml = '';
            for (var i = 0, len = data.result.length; i < len; i++) {
                var s = data.result[i];
                listHtml += '<li class="clearfix">' +
                    '<div class="wrap_img">' +
                    '' + s.productImg + '' +
                    '</div>' +
                    '<div class="info">' +
                    '<p>' + s.productName.substr(0, 300) + '......' + ' </p>' +
                    '<div class="price">' + s.productPrice + '</div>' +
                    '<div class=" o">' + s.productCouponRemain + '</div>' +
                    '<div class="link clearfix">' +
                    '<span class="money ">' + s.productCoupon + '</span>' +
                    '<span class="downLink ">' + s.productHref + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
            }
            $(".wrap ul").html(listHtml);
        })
    }
    $.get("http://127.0.0.1:3000/api/getbaicaijiatitle", function (data) {
        var str = '';
        var width = 0;
        for (var i = 0, len = data.result; i < len.length; i++) {
            str += ' <li data-index=' + len[i].titleId + '><a href="javascript:void(0)">' + len[i].title + '</a></li>';
        }
        $(".tit_menu ul").html(str);
        $(".tit_menu ul li:first-child a").addClass("check");
        $(".tit_menu ul li").each(function (i, v) {
            width += $(v).width();
        })
        $(".tit_menu ul").width(width);
        getClick(0);

        // 触摸滑动效果start
        var ul = $(".tit_menu ul");
        var start = 0,
            end = 0,
            move = 0,
            distance = 0,
            last = 0;
        var maxdistance = ul.width() - ul.parent().width();
        console.log(maxdistance)
        //ul 移动的距离
        function move_to(distance) {
            ul.css("transform", "translate(" + distance + "px)");
            ul.css("transtion", "all .5s")
        }
        // 触摸开始位置
        ul.on("touchstart", function (e) {
            start = e.originalEvent.touches[0].clientX;
        });
        // 触摸移动位置
        ul.on("touchmove", function (e) {
            move = e.originalEvent.touches[0].clientX;
            distance = move - start;
            move_to(distance + last);
        });
        // 触摸最后结束位置
        ul.on("touchend", function (e) {
            last = last + distance;
            if (last > 0) {
                move_to(0);
                last = 0;
            }
            if (last < -maxdistance) {
                move_to(-maxdistance);
                last = -maxdistance;
            }
        })
         // 触摸滑动效果end

    })
    $(".tit_menu ul").delegate("li", "click", function () {
        $(this).find("a").addClass("check").end().siblings("li").find("a").removeClass("check");
        var tit_id = $(this).data("index");
        getClick(tit_id);
    });
    // 顶部效果
    $(".top_a").css("opacity", "0");
    $(window).scroll(function (e) {
        if ($(window).scrollTop() > $(window).height() + 200) {
            $(".top_a").css("opacity", "1");
            $(".top_a").css("transition", "all 1s");
        } else {
            $(".top_a").css("opacity", "0");
            $(".top_a").css("transition", "all 1s");

        }
    })
})