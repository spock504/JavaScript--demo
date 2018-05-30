$(function (){
    //获取参数
    var slider = $(".slider"),
        imageBox = slider.children('.imageBox'),      //图片容器
        titleBox = slider.children('.titleBox'),      //标题容器
        titleArr = titleBox.children('p'),
        icoBox = slider.children('.icoBox'),      //图标容器
        icoArr = icoBox.children('span'),       //小圆点
        imageNum = imageBox.children('a').length,
        imageWidth = slider.width(),
        imageReelWidth = imageWidth*imageNum,   //图片容器的宽度
        setIntervalID,
        //相关ID
        activeID = parseInt(icoBox.children('.active').attr('rel')),    //当前ID
        nextID = 0,         //下一个图片ID
        //相关参数
        intervalTime = 2000,
        titleSpeed = 250,
        imageSpeed = 500;
        // 设置图片容器的宽度
        imageBox.css({'width':imageReelWidth + "px"});

        //DOM加载结束开始执行，图片轮播函数
        var rotate = function(clickID) {
            //获取图片ID，   点击图片ID,则成为下一个图片相对应的ID
            if (clickID) {
                nextID = clickID;
            } else {
                // 正常轮播情况，下一个ID不是最后一张图片的话，是获得下一个图片ID
                nextID = activeID <= imageNum -1 ? activeID + 1 : 1;  //这里呀要注意
            }
            // 轮播开始，当前小圆点移除样式，下一个添加样式
            $(icoArr[activeID-1]).removeClass('active');
            $(icoArr[nextID-1]).addClass('active');
            // 开始轮播，当前标题隐藏，下一个标题显示
            $(titleArr[activeID-1]).animate(
                {bottom:"-40px"},
                titleSpeed,
                function() {
                    $(titleArr[nextID-1]).animate({bottom:"0"},titleSpeed);
            })
            //图片框向左边平移一个图片的宽度
            $(imageBox).animate({left:"-"+(nextID-1)*imageWidth+"px"},imageSpeed)
            //轮播结束，则获取下一个ID
            activeID = nextID;
        };
        // 启动图片轮播
        setIntervalID = setInterval(rotate, intervalTime);

            // 鼠标移入则停止轮播
        imageBox.hover(function(){
            clearInterval(setIntervalID);
        }, function(){
            setIntervalID = setInterval(rotate, intervalTime);
        });
            // 右下角点击事件
        icoArr.on('click',function(){
            //清除轮播
            clearInterval(setIntervalID);
            // 轮播当前图片
            var clickID = parseInt($(this).attr("rel"));
            rotate(clickID);
            // 开启轮播
            setIntervalID = setInterval(rotate, intervalTime);
        });

});




