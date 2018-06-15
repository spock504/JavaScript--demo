$('#menu li ul')
    .hide()
    .click(function(event) {
        event.stopPropagation();//阻止事件冒泡,不然点击ul中的li事件时，也会触发toggle
    });

$('#menu > li').toggle(function(){
    $(this)
    .find('ul').slideDown()

},function(){
    $(this)
    .css('background-position','right top')
    .find('ul').slideUp();
});
//延迟执行
// 鼠标悬停时展开菜单，用类进行管理状态
$('#menu > li').hover(function(){
    // 添加类，悬停600毫秒之后执行操作
    $(this).addClass('waiting');
    setTimeout(function(){
        $('#menu .waiting')
        .click() //不带参数，在目标上触发单击事件，而不是事件处理程序
        .removeClass('waiting');
    },600);
},function(){
    $(this).removeClass('waiting');
});
