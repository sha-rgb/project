var index = 0;
/*获取左右两个箭头，实现手动轮播*/
var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = () => next_pic();
prev.onclick = () => prev_pic();
function next_pic() {
    var newLeft;
    if (wrap.style.left == "-3600px") {
        newLeft = -1200;
    } else {
        newLeft = parseInt(wrap.style.left) - 600;
    }
    wrap.style.left = newLeft + "px";

    index++;
    if (index > 4) {
        index = 0;
    }
    showCurrentDot();

}
function prev_pic() {
    var newLeft;
    if (wrap.style.left == "0px") {
        newLeft = -2400;
    } else {
        newLeft = parseInt(wrap.style.left) + 600;
    }
    wrap.style.left = newLeft + "px";

    index--;
    if (index < 0) {
        index = 4;
    }
    showCurrentDot();

}
/*实现自动轮播*/
var timer = null;
function autoPlay() {
    timer = setInterval(function () {
        next_pic();
    }, 1000);
}
autoPlay();
var container = document.querySelector(".container");
container.onmouseenter = () => clearInterval(timer);
container.onmouseleave = () => autoPlay();
/*实现红点随着轮播图而移动*/
var dots = document.getElementsByTagName("span");
function showCurrentDot() {
    for (var dot of dots) {
        dot.className = "";
    }
    dots[index].className = "on";
}
/*实现点击小圆点数字可以跳转到相应的图片*/
for (var i = 0, len = dots.length; i < len; i++) {
    (function (i) {
        dots[i].onclick = function () {
            var dis = index - i;
            //和使用prev和next一样，在最开始的照片5和最后的照片1使用时会出现问题
            if (index == 4 && parseInt(wrap.style.left) != -3000) {
                dis = dis - 5;
            }
            if (index == 0 && parseInt(wrap.style.left) != -600) {
                dis = dis + 5;
            }
            wrap.style.left = (parseInt(wrap.style.left) + dis * 600) + "px";
            index = i;
            showCurrentDot();
        }
    })(i)
}