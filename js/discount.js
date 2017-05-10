$(function(){
    var productid=window.location.search.replace("?productid=","");
    $.ajax({
        type:"get",
        dataType:"json",
        url:"http://127.0.0.1:3000/api/getdiscountproduct",
        data:{
            productid:productid
        },
        success:function(data){
            var listHtml='';
            var result=data.result[0];
            var info='';
            var shop='';
            //   商品介绍
             listHtml=  '<h3>'+result.productName+'</h3>'+
                            '<h4>'+result.productPrice+'</h4>';                
              $(".productid").append(listHtml); 
                // 商品小信息
              info= '<span class="small">'+result.productFrom+'</span>'+
                    '<span class="time">'+result.productTime+'</span>'+
                    '<span class="buy">'+result.productTips+'</span>';
                    
            $(".shop_name").append(info);
            // 小图片
            $(".container_img").html(result.productImg);
            // 商品段落介绍
            shop=' <p>'+result.productInfo+'</p>';
                    
             $(".container_info").html(shop); 
                //    商品图片
             $('.product_img').html(result.productImg2);
            //  商品大图
            $(".close").html("");
            // 城市
            $(".drop").html('');
            // 最新评价
            $(".listss").html(result.productComment);
        }
    })
})