function styleHeadersSiblings() {
    // 浏览器兼容性检查
    if(! document.getElementsByTagName) {
        return false;
    }
    // 获取所有h1元素
    var headers = document.getElementsByTagName("h1");
    var elem;
    for(var i = 0; i<headers.length;i++) {
        elem = getNextElement(headers[i].nextSibling);
        elem.style.fontWeight = "bold";
        elem.style.fontSize = "1.2em";
    }
}

// 获取下一个元素节点
function getNextElement(node) {
    if(node.nodeType==1) {
        return node;
    }
    if(node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

addLoadEvent(styleHeadersSiblings);