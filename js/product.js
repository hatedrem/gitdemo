$(function () {
    var listhtml = '';
    var pageid = 1;
    var pages;
    var ids = window.location.search.replace("?categoryid=", "");
    $.ajax({
        type: "get",
        dataType: "json",
        url: "http://127.0.0.1:3000/api/getcategorybyid",
        data: {
            categoryid: ids
        },
        success: function (data) {
            $(".listskip").html(data.result[0].category);
        }
    })
    getProductList(pageid);
    
    $(".nextPage").click(function () {
        $(".list").remove();
        pageid++;
        if(pageid>pages){
            alert("这是最后一页");
            pageid=pages;
        }
        getProductList(pageid);
    })

    $(".prevPage").click(function () {
        $(".list").remove();   
        pageid--;
        if(pageid<1){
           alert("这是第一页");
           pageid=1;
        }
        console.log(pageid);
        getProductList(pageid);
    })

    function getProductList(pageid) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getproductlist",
            data: {
                categoryid: ids,
                pageid: pageid
            },
            success: function (data) {
                pages = getCount(data);
                $(".select").html(""+pageid+"/" + pages + "");
                $.each(data.result, function (i, v) {
                    listhtml += '<li><a href="../html/info.html?productid='+data.result[i].productId+'"  class="clearfix">' + data.result[i].productImg + '<div class="commodity_info">' +
                        '<p class="productp">' + data.result[i].productName + '<span class="price">' + data.result[i].productPrice + '</span></p>' +
                        ' <div class="company_info clearfix">' +
                        '<span class="f_left">' + data.result[i].productQuote + '</span><span >' + data.result[i].productCom + '</span></div></div></a>' +
                        '</li>'
                });
                var ul = $("<ul class='list'></ul>");
                $(".commodity").append(ul);
                ul.append(listhtml);
                listhtml = '';
            }
        })
    }
    function getCount(data) {
        var count = data.totalCount; //总商品数
        var pagesize = data.pagesize; //每页多少条数据
        yeshu = Math.ceil(count / pagesize);
        return yeshu;
    };

})