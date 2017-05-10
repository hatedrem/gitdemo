$(function () {
    var listhtml = '';
    var pageid = 1;
    var pages;
     getProductList(pageid);
    $(".nextPage").click(function () {
        $(".lists").remove();
        pageid++;
        if(pageid>pages){
            alert("这是最后一页");
            pageid=pages;
        }
        getProductList(pageid);
    })

    $(".prevPage").click(function () {
        $(".lists").remove();
       
        pageid--;
        if(pageid<1){
           alert("这是第一页");
           pageid=1;
        }
        console.log(pageid);
        getProductList(pageid);
    })
// 所在页显示的内容 （设置分页效果）
    function getProductList(pageid) {
        $.ajax({
            url: "http://127.0.0.1:3000/api/getmoneyctrl",
            data: {
                pageid: pageid
            },
            success: function (data) {
                pages = getCount(data);
                $(".select").html("" + pageid + "/" + pages + "");
                $.each(data.result, function (i, v) {
                    comCount = data.result[i].productComCount;
                    comCount = comCount.replace("有", "");
                    comCount = comCount.replace("人评论", "");
                    listhtml += '<li><a href="../html/inland.html?productid='+v.productId+'"  class="clearfix">' + data.result[i].productImg2 + '<div class="commodity_info">' +
                        '<p>' + data.result[i].productName + '<span>' + data.result[i].productPinkage + '</span></p>' +
                        ' <div class="company_info clearfix">' +
                        '<span class="f_left">' + data.result[i].productFrom + ' | ' + data.result[i].productTime + '</span><span class="iconcomments f_right iconfont icon-comments">' + comCount + '</span></div></div></a>' +
                        '</li>'
                });
                 var ul = $("<ul class='lists'></ul>");
                $(".commodity").append(ul);
                ul.append(listhtml);
                listhtml = '';
            }
        })
    }
// 获取到页数
    function getCount(data) {
        var count = data.totalCount; //总商品数
        var pagesize = data.pagesize; //每页多少条数据
        yeshu = Math.ceil(count / pagesize);
        return yeshu;
    };
})