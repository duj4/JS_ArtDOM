function styleElementSiblings(tag, theClass) {
    // 浏览器兼容性检查
    if(! document.getElementsByTagName) {
        return false;
    }
    // 获取所有h1元素
    // var headers = document.getElementsByTagName("h1");
    var elems = document.getElementsByTagName(tag);
    var elem;
    for(var i = 0; i<elems.length;i++) {
        elem = getNextElement(elems[i].nextSibling);
        // elem.style.fontWeight = "bold";
        // elem.style.fontSize = "1.2em";
        addClass(elem, theClass)
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

function addClass(element, value) {
    if(!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}
addLoadEvent(function () {
    styleElementSiblings("h1", "intro");
});