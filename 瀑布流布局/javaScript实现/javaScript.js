
// 页面加载完毕后执行
window.onload = function(){
    waterfall("main","box");
    var dataInt = {'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    // 滚轮滚动时触发事件
    window.onscroll = function(){
        if(checkscrollside()){
            var oparent=document.getElementById("main");
            for(var i=0;i<dataInt.data.length;i++){
                var ibox = document.createElement("div");
                ibox.className = "box";
                oparent.appendChild(ibox);
                var iPic = document.createElement("div");
                iPic.className = "pic";
                ibox.appendChild(iPic);
                var iImg = document.createElement("img");
                iImg.src = "../image/"+dataInt.data[i].src;
                iPic.appendChild(iImg);
            }
            waterfall("main","box");
        }
    }

}
function waterfall(parent,box) {
    // 每一行容纳的图片
    var oparent = document.getElementById(parent);
    var obox = document.getElementsByClassName("box");
    //获取图片的宽度
    var iboxW = obox[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / iboxW);
    // 设置单行宽度并水平居中
    oparent.style.cssText = 'width:' + num*iboxW + 'px;margin:0 auto;';

    //后面行排列,数组存储图像的高度
    var boxHArr = [];
    for (var i=0; i<obox.length;i++){
        var boxH = obox[i].offsetHeight;
        if (i<num) {
            boxHArr[i]=boxH;
        } else {
            var minH = Math.min.apply(null,boxHArr);
            var minHi = getMinHIndex(minH,boxHArr);
            obox[i].style.position = 'absolute';
            obox[i].style.top = minH + 'px';
            obox[i].style.left = obox[minHi].offsetLeft + 'px';
            // console.log(obox[minHi].offsetLeft);
            // 更新增加块后的高度，数组中最小高度+加了块之后的高度
            boxHArr[minHi] += obox[i].offsetHeight;
        }
    }

}
// //获取同类子元素的数组
// function getClassObj(parent,box){
//     // 获取全部box的子元素
//     var obj = parent.getElementsByTagName("*");
//     var boxs = [];
//     // 遍历子元素，得到直接子元素，存放数组中
//     for (var i=0; i<obj.length;i++){
//         if (obj[i].className === box) {
//             boxs.push(obj[i]);
//         }
//     };
//     return boxs;
// }
function getMinHIndex(minH,arr) {
    // 高度最小的索引值
    for(var i in arr){
        if (arr[i] ==  minH) {
            return i;
        }
    }
}
function checkscrollside(){
    var oparent = document.getElementById("main");
    var obox = document.getElementsByClassName("box");
    var lastHeight = obox[obox.length-1].offsetTop + Math.floor(obox[obox.length-1].offsetHeight/2);
    // 页面高度
    var documentH = document.documentElement.clientHeight||document.body.clientHeight;
    // 滚轮高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(lastHeight+'<'+documentH +'+'+ scrollTop);
    return (lastHeight<documentH + scrollTop) ? true :false;
}
/*一、定义图片布局函数waterfall

二、在waterfall函数中定义根据class获取元素函数getByClass

三、计算整个父盒子的宽度且让它在浏览器中水平居中

四、计算及排列每个数据块应该出现的位置，一开始数据块紧跟在第二张图片的后边且位于最高的那个图片的下边，然后通过动画分散到它该出现的位置

五、拖动滚动条时定义检测是否具备了滚条加载数据块条件的函数。

六、遍历给出的数据，将图片添加到数据块中渲染出来*/
