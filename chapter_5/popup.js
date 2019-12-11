// HTML全部加载完将触发一个事件，这个时间有它自己的事件处理函数
window.onload = function() {
    // 如果浏览器的JS被禁用
    if (!document.getElementsByTagName) {
        return false;
    }
    // 这条语句在JS文件被加载时立刻执行
    // 如果JS文件从HTML的head通过外部引用的方式调用，它将在HTML文档加载之前加载到浏览器里
    // 如果JS文件位于HTML底部</body>之前，就无法保证哪个文件时最先结束加载，因为浏览器可以同时加载多个
    // 考虑到JS加载时HTML可能不完整，那么将没有完整的DOM，所以不能直接调用该方法
    else {
        var links = document.getElementsByTagName("a");
        for (var i = 0; i < links.length; i++) {
            if (links[i].getAttribute("class") == "popup"){
                links[i].onclick = function() {
                    popUp(this.href);
                    return false;
                }
            }
        }
    }
};

function popUp(winURL) {
    window.open(winURL, "popup", "width=320, height=480");
}