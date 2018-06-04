/*
点击数字键，需要实现的几个功能：
    1.开头只能输入一个0
    2.最多两位小数
    3.字符串最长为5位数
    4.如果直接输入小数点，没有0则直接加一个，
点击delete,删除最后一个数字;
    */
window.onload = function() {
    var numKeyboard = document.querySelector('.num-keyboard'); //键盘
    var cancle = document.querySelector('#cancle'); //删减
    var cursor = document.querySelector('.cursor'); //光标
    var  inputNum = document.querySelector('#input-num'); //金额输入框
    var confirmBtn = document.querySelector('#confirm-btn'); //隐藏域的金额;
    var submitForm = document.querySelector('form'); //表单

// 进入页面，键盘弹起和光标出现
    numKeyboard.style.bottom = 0;
    cursor.style.display = 'inline-block';
// 为数字键盘添加触碰屏幕事件||事件委托
    numKeyboard.addEventListener('touchstart', function(e){
        //阻止默认事件
        e.preventDefault();
        // 当点击小数点时
        if (e.target.id == 'dot') {
            // 输入小数点，没有点输入并且没有值，直接把值变成 0.
            if (inputNum.innerHTML.indexOf('.') == -1 && inputNum.innerHTML == "") {
                    inputNum.innerHTML += "0.";
                // 如果存在小数点，则返回
            } else if (inputNum.innerHTML.indexOf('.') > -1) {
                return;
            } else {
                inputNum.innerHTML += e.target.firstChild.nodeValue;
                submitSum();
            } //如果删除键
        }else if (e.target.id == 'cancle') {
        // 如果输入框的数字为空的话
           if (inputNum.innerHTML == '') {
                submitForm.className = 'success-form';
                confirmBtn.value = '';
            } else {
                inputNum.innerHTML = inputNum.innerHTML.substring(0,inputNum.innerHTML.length-1);
                submitSum();
            }   //输入0 的时候
        } else if (e.target.id == 'zero') {
            //如果一开始输入的就是0，那么就不再输入
            if (inputNum.innerHTML == '0') {
                return;
            } else {
                inputNum.innerHTML += e.target.firstChild.nodeValue;
                submitSum();
            }   //输入其他数字
        } else {
            if (e.target.tagName.toLowerCase() == 'span') {
                // 如果第一个数字是0
                if (inputNum.innerHTML == "0") {
                    inputNum.innerHTML = e.target.firstChild.nodeValue;
                    submitSum();
                } else {
                    // 判断是否有点
                    if (inputNum.innerHTML.indexOf('.') == -1) {
                        // 如果没有点，字符长度为5个
                        if (inputNum.innerHTML.length < 5) {
                            inputNum.innerHTML += e.target.firstChild.nodeValue;
                            submitSum();
                        }
                        //找到小数点,小数点后面只能有两位小数
                    } else {
                            var dotIndex = inputNum.innerHTML.indexOf('.');
                            var dotlen = inputNum.innerHTML.substring(dotIndex,inputNum.innerHTML.length).length;
                            if (dotlen < 2) {
                                inputNum.innerHTML += e.target.firstChild.nodeValue;
                                submitSum();
                            }
                        }
                }
            }
        }
    },false);

function submitSum(){
          // 获取此时输入框的值
        confirmBtn.value = inputNum.innerHTML;
        // 如果此时输入框的值为空，则不能提交
        if (confirmBtn.value == '') {   
            submitForm.style.backgroundColor = '#8fcc8f';
        // 如果不为空字符串，则判断其值在可支付的区间内
        }else if(parseFloat(confirmBtn.value) >= 0.01 && parseFloat(confirmBtn.value) <= 10000){
            submitForm.className = 'success-form';
        }else{
            submitForm.className = 'fail-form';
        }
        
    }


    // 判断是否可以提交表单
     submitForm.addEventListener('touchstart',function(e){
        // 金额通过的话，执行表单的提交
        if (submitForm.className == 'success-form') {
            console.log('提交表单');
        }else{
            // 如果金额不通过的话，则不执行表单提交
            console.log('不满足条件，不能提交表单');
        }
     },false);
}
