// 阻止子li点击事件冒泡,默认显示第一个li元素的子ul(其余不是第一个的都隐藏)
$('#menu li > ul')
    .click(function(event) {
        event.stopPropagation();
    })
    .filter(':not(:first)')
    .hide();
// 将当前打开的项目关闭（同一时刻只有一个项目打开），然后打开我们现在单击的项目(若已经打开就不用滑上滑下)
$('#menu > li').click(function(){
    // 先检查项目有没有打开
    var selfClick = $(this).find('ul:first').is(':visible');
    //如果单击的项目打开则返回
    if (selfClick) {
        return;
    }
    //其他打开的项目隐藏
    $(this)
    .parent()
    .find('> li ul:visible')
    .slideToggle();
    //单击的项目打开
    $(this)
    .find('ul:first')
    .slideToggle();
});
