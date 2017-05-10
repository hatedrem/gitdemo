
$(function () {
    var str = '';
    var initNum = 8;
    var naxNum = 0;
    var maxNum=0;   
     var docHeight , bodyHeight;
    // 一开始就加载的数据
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:3000/api/getinlanddiscount",
        success: function (data) {
         maxNum=data.result.length;
            for (var i = 0; i < initNum; i++) {
                str += '<li>' +
                    ' <a href="../html/discount.html?productid=' + data.result[i].productId + '">' + data.result[i].productImg + ' <p class="product_tit">' + data.result[i].productName.substr(0, 30) + '.....' + '</p>' +
                    ' <p class="product_price">' + data.result[i].productPrice + '</p>' +
                    '<p class="product_time"><span>' + data.result[i].productFrom + '&nbsp;|</span>&nbsp;' + data.result[i].productTime + '</p>' +
                    '</a>' +
                    '</li>'
            }
            $(".product_list ul").html(str);
            get_end();
        }
    })
    // 是否需要加载
    function get_end() {
         docHeight = document.documentElement.clientHeight;
         bodyHeight = $(".product_list").height();
        // console.log(bodyHeight);
         s=bodyHeight-docHeight;
        // console.log(s);
        $(window).scroll(function () {
            // console.log($(window).scrollTop());
            if(s<$(window).scrollTop()){
                // console.log("initNum="+initNum)
                if(initNum<maxNum-3){
                    add();
                    // console.log("hao");
                }else{
                }
            }
        })
    }
// 后面加载数据
    function add() {
        $.ajax({
            type: "get",
            dataType: "json",
            url: "http://127.0.0.1:3000/api/getinlanddiscount",
            success: function (data) {
                for (var i = initNum; i < (initNum+4); i++) {
                    str += '<li>' +
                        ' <a href="../html/discount.html?productid=' + data.result[i].productId + '">' + data.result[i].productImg + ' <p class="product_tit">' + data.result[i].productName.substr(0, 30) + '.....' + '</p>' +
                        ' <p class="product_price">' + data.result[i].productPrice + '</p>' +
                        '<p class="product_time"><span>' + data.result[i].productFrom + '&nbsp;|</span>&nbsp;' + data.result[i].productTime + '</p>' +
                        '</a>' +
                        '</li>'
                }
                $(".product_list ul").html(str);
                initNum=initNum+4;
                get_end();
            }
        })
    }
})