function showPic(whichpic) {
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

function countBodyChildren() {
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
    for (var i = 0; i < body_element.childNodes.length; i++) {
        // nodeType不是英文而是数字（共有12种可取值）:
        // 元素节点的nodeType属性值是1，属性节点的nodeType属性值是2，文本节点的nodeType属性值是3
        alert(body_element.childNodes[i].nodeType);
    }
}
// window.onload = countBodyChildren; 显示body节点下面每个子节点的nodeType