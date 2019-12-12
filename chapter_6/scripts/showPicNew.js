function showPicNew(whichpic) {
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    // 改变节点的属性值
    placeholder.setAttribute("src", source);
    var text = whichpic.getAttribute("title");
    var description = document.getElementById("description");
    // 改变节点的值
    // p元素里的文本节点是p元素第一个子节点，因此需要获取p元素第一个子节点的nodeValue，而不是p元素本身的nodeValue
    // node.childNodes[0]等价于node.firstChild, node.childNodes[node.childNodes.length - 1]等价于node.lastNode
    // alert(description.firstChild.nodeValue);
    description.firstChild.nodeValue = text;
}

function prepareGallery() {
    // 若当前浏览器不支持该方法，则直接退出
    if (! document.getElementsByTagName) {
        return false;
    }
    // 若当前浏览器不支持该方法，则直接退出
    if (! document.getElementsById) {
        return false;
    }
    // 测试调用当前JS的HTML中是否有“imagegallery”这样的id
    if (! document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");

    for (var i=0; i < links.length; i++) {
        links[i].onclick = function() {
            showPicNew(this);
            return false;
        }
    }
}

function addLoadEvent(func) {
    // 把现有window.onload事件处理函数的值存入变量oldOnLoad
    var oldOnLoad = window.onload;
    // 如果在这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它
    if (typeof window.onload != 'function') {
        window.onload = func;
    }
    // 如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾
    else {
        window.onload = function () {
            oldOnLoad();
            func();
        }
    }
}
addLoadEvent(prepareGallery);