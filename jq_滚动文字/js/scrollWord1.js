
var scrollBox = document.getElementById("wrapper");
var scrollContent = document.getElementById("scroll-content");
var animate;
var time = 30;
var ul = document.createElement("ul");
// 重复添加内容
    ul.innerHTML = scrollContent.innerHTML;
    scrollBox.appendChild(ul);

scrollBox.addEventListener('mouseover', function(){
    clearTimeout(animate);
}, false)
scrollBox.addEventListener('mouseout', function(){
    scrollup();
}, false)

function scrollup(){
    animate = setTimeout(function(){
        if (scrollBox.scrollTop >= scrollContent.offsetHeight) {
            scrollBox.scrollTop = 0;
            // console.log(scrollBox.scrollTop)
        } else {
            scrollBox.scrollTop ++;
        }
        scrollup();
    },time)
}
scrollup();
