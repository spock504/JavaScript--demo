// 页面加载完毕后执行
$().on('load',function(){
    waterfall("main","box");
})
window.onload = function(){
    waterfall("main","box");
    var dataInt = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    // 滚轮滚动时触发事件
    window.onscroll = function(){
        if(checkscrollside()){
                $.each(dataInt.data,function(index,value){
                    var $ibox = $('<div>').addClass('box').appendTo($('#main'));
                    var $ipic = $('<div>').addClass('pic').appendTo($ibox);
                    $('<img>').attr('src','../image/'+$(value).attr('src')).appendTo($ipic);
                });
            waterfall("main","box");
        }
    }

}
function waterfall(parent,box) {
    //获取图片的宽度
    var iboxW = $('.pic').outerWidth();
    var num = Math.floor($( window ).width() / iboxW);
    // 设置单行宽度并水平居中
    $('#main').css({
        'width':'num*iboxW',
        'margin':'0 auto',
    });

    //后面行排列,数组存储图像的高度
    var boxHArr = [];
    $('.box').each(function(index,value){
        var boxH = $('.box').eq(index).height();
        if (index<num) {
            boxHArr[index]=boxH;
        } else {
            var minH = Math.min.apply(null,boxHArr);
            var minHi = $.inArray(minH, boxHArr);
            // console.log(value);
            $(value).css({
                'position': 'absolute',
                'top': minH,
                'left': $('.box').eq(minHi).position().left,
            });
            boxHArr[minHi] += $('.box').eq(index).outerHeight();
}
    })

}
function checkscrollside(){
    // get(0)获得DOM对象
    var lastHeight =$('.box').last().get(0).offsetTop + Math.floor($('.box').last().height()/2);
    // 页面高度
    // console.log($('.box').last().get(0));
    var documentH = $(window).height();
    // 滚轮高度
    var scrollTop = $(window).scrollTop();
    console.log(lastHeight+'<'+documentH +'+'+ scrollTop);
    return (lastHeight<documentH + scrollTop) ? true :false;
}
