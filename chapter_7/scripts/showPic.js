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

// 手动实现JS中没有的insertAfter函数，将新元素插入到指定元素后面
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

// placeholder和description只有在showPic时才会被使用，所以单独放到一个函数里，和HTML本身分开
function preparePlaceholder() {
    if (!document.createElement) {
        return false;
    }
    if (!document.createTextNode) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");

    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Choose an image");
    description.appendChild(desctext);

    // 把新创建的两个节点插入到body末尾，也可以使用document.getElementByTagName("body")[0].appendChild(placeholder)
    // 但只能把这两个元素加到body末尾，如果ul后面还有元素则没法保证原有顺序
    // document.body.appendChild(placeholder);
    // document.body.appendChild(description);

    // 利用insertBefore可以在指定元素节点前面插入新元素
    // 在gallery.html中，在ul的前面插入placeholder和description
    var gallery = document.getElementById("imagegallery");
    // gallery.parentNode.insertBefore(placeholder, gallery);
    // gallery.parentNode.insertBefore(description, gallery);
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

function prepareGallery() {
    // 若当前浏览器不支持该方法，则直接退出
    if (! document.getElementsByTagName) {
        return false;
    }
    // 若当前浏览器不支持该方法，则直接退出
    if (! document.getElementById) {
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
            // 由showPic的返回值决定是否跳转页面
            return !showPic(this);
        };
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return false;
    }
    // 下面的DOM Core语句可以用HTML-DOM替换成var source = whichpic.href;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    // 如果placeholder的nodeName不是图片
    if (placeholder.nodeName != "IMG") {
        return false;
    }
    // 改变节点的属性值
    // HTML-DOM写法: placeholder.src = source;
    placeholder.setAttribute("src", source);

    if (document.getElementById("description")) {
        if (whichpic.getAttribute("title")) {
            var text = whichpic.getAttribute("title");
        }
        else {
            var text = "";
        }
        var description = document.getElementById("description");
        // 如果节点类型是文本节点
        if (description.firstChild.nodeType == 3) {
            // 改变节点的值
            // p元素里的文本节点是p元素第一个子节点，因此需要获取p元素第一个子节点的nodeValue，而不是p元素本身的nodeValue
            // node.childNodes[0]等价于node.firstChild, node.childNodes[node.childNodes.length - 1]等价于node.lastNode
            // alert(description.firstChild.nodeValue);
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);