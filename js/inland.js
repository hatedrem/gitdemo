$(function(){
    var productid=window.location.search.replace("?productid=","");
    $.ajax({
        type:"get",
        dataType:"json",
        url:"http://127.0.0.1:3000/api/getmoneyctrlproduct",
        data:{
            productid:productid
        },
        success:function(data){
            var listHtml='';
            var info='';
            var shop='';
            var result=data.result[0];
            //   商品介绍
             listHtml=  '<h3>'+result.productName+'</h3>'+
                            '<h4>'+result.productPinkage+'</h4>';                
              $(".productid").append(listHtml); 
                // 商品小信息
              info= '<span class="small">'+result.productFrom+'</span>'+
                    '<span class="time">'+result.productTime+'</span>'+
                    '<span class="buy">'+result.productTips+'</span>'+
                    '<span class="think"><a href="#">'+result.productComCount+'</a></span>';
            $(".shop_name").append(info);
            // 小图片
            $(".container_img").html(result.productImgSm);
            // 商品段落介绍
            shop=' <p>'+result.productInfo+'</p>'+
                    '<p>'+result.productInfo1+'</p>'+
                    '<p>'+result.productInfo2+'</p>';
             $(".container_info").html(shop); 
                //    商品图片
             $('.product_img').html(result.productImg2);
            //  商品大图
            $(".close").html(result.productImgLg);
            // 城市
            $(".drop").html(result.productCity);
            // 最新评价
            $(".list").html(result.productComment);
        }
    })
})