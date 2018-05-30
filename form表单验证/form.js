//获得输入字符串的长度
function getLength(str) {
    //不匹配ASCII代码中十六进制代码为0-255的，匹配双字节字符,替换成两个xx，并且获得替换的长度
    return str.replace(/[^\x00-\xff]/g,"xx").length;
}
//不能用相同字符
// charAt() 方法可返回指定位置的字符。
function findStr(str,n) {
    var tmp=0;
    for (var i=0; i<str.length; i++) {
        if (str.charAt(i)==n) {
            tmp++;
        }
    }
    return tmp;
}
window.onload = function(){
    // 获得表单中输入框的元素
    var aInput = document.getElementsByTagName("input");
    var oName = aInput[0];
    var pwd = aInput[1];
    var pwd2 = aInput[2];
    //获得注释的元素
    var anote = document.getElementsByClassName("note");
    var name_msg = anote[0];
    var pwd_msg = anote[1];
    var pwd2_msg = anote[2];
    var count = document.getElementById("count");
    var oem = document.getElementsByTagName("em");
    var oem1=oem[0];
    var oem2=oem[1];
    var oem3=oem[2];

    var name_len = 0;
    // 正则表达式表示匹配非法字符（非字母数字和汉字）
    var re = /[^\w\u4e00-\u9fa5]/g;
    // 用户名输入验证
    oName.onfocus = function() {
        name_msg.style.display = "inline-block";
        name_msg.innerHTML = '<i>6-25字符，推荐使用中文名</i>';
    }
    oName.onkeyup = function() {
        count.style.visibility = 'visible';
        name_len = getLength(this.value);
        count.innerHTML = name_len + "个字符";
        if (name_len == 0 ) {
            count.style.visibility = 'hidden';
        }
    }
    oName.onblur = function() {
// 不能含有非法字符
// 不能为空
// 长度不能超过25个字符
// 长度不能少于6个字符
// OK
    var re = /[^\w\u4e00-\u9fa5]/g;
    if (re.test(this.value)) {
        name_msg.innerHTML = '<i>含有非法字符</i>';
    } else if (this.value == "") {
        name_msg.innerHTML = '<i>不能为空</i>';
    } else if (name_len < 6) {
        name_msg.innerHTML = '<i>字符少于6个</i>';
    } else if (name_len > 25) {
        name_msg.innerHTML = '<i>字符大于25个</i>';
    } else {
        name_msg.innerHTML = '<i>OK!</i>';
    }
}
    //密码输入验证
    pwd.onfocus = function() {
        pwd_msg.style.display = 'inline-block';
        pwd_msg.innerHTML = '<i>6-25字符,一个汉字为两个字符</i>'
    }
    pwd.onkeyup = function() {
        // 密码弱中强的显示
        if (this.value.length > 6) {
            oem1.className = "active";
            pwd2.removeAttribute("disabled");
            pwd2_msg.style.display = "inline-block";
        } else {
            oem1.className = "";
            pwd2.setAttribute("disabled", "disabled");
            pwd2_msg.style.display = "none";
        }
         if (this.value.length > 10) {
            oem2.className = "active";
        } else {
            oem2.className = "";
        }
         if (this.value.length >14) {
            oem3.className = "active";
        } else {
            oem3.className = "";
        }
    }
    pwd.onblur = function() {
        //不能全为字符
        var m = findStr(pwd.value,pwd.value[0]);
        var re_num = /[^\d]/g;
        var re_str = /[^a-zA-Z]+/g;
        if (this.value == "") {
            pwd_msg.innerHTML = '<i>不能为空</i>';
        } else if (m == this.value.length) {
            pwd_msg.innerHTML = '<i>不能全为相同字符</i>';
        } else if (!re_num.test(this.value)) {
            pwd_msg.innerHTML = '<i>不能全为数字</i>';
        } else if (!re_str.test(this.value)){
            pwd_msg.innerHTML = '<i>不能全为字符</i>';
        } else if (this.value.length < 6 || this.value.length >25) {
            pwd_msg.innerHTML = '<i>长度应该为6-25</i>';
        }
         else {
            pwd_msg.innerHTML = '<i>OK!</i>';
        }
        // 不能全为数字
        // 不能全为字母
        // OK!
    }
    //再次输入密码
    pwd2.onblur = function() {
        if (this.value != pwd.value) {
            pwd2_msg.innerHTML = '<i>两次输入密码不一致</i>';
        } else {
            pwd2_msg.innerHTML = '<i>OK!</i>';
        }
    }

}
