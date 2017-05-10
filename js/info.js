$(function(){
    var id=window.location.search.replace("?productid=",""),str='';
    $.get("http://127.0.0.1:3000/api/getproduct?productid="+id,function(data){
        $.each(data.result,function(i,v){
            str+='<p>'+v.productName+'</p><div class="info_img">'+v.productImg+'</div>';
        })
        $(".info_main").html(str);
    })

})