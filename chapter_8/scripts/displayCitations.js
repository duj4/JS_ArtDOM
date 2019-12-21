function displayCitations() {
    // 兼容性检查
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
        return false;
    }

    // 获取所有blockquote元素
    var quotes = document.getElementsByTagName("blockquote");
    for (var i = 0; i < quotes.length; i++) {
        // 若元素中不包含cite属性，则直接跳过
        if (!quotes[i].getAttribute("cite")) {
            continue;
        }

        // 获取cite属性值
        var url = quotes[i].getAttribute("cite");

        // 获取blockquote元素下的所有元素节点
        // 有些浏览器会把换行符解释为一个文本节点，所以不能直接用lastChild属性直接获取p元素而是用DOM方法去获取
        var quoteChildren = quotes[i].getElementsByTagName("*");
        if (quoteChildren.length < 1) {
            continue;
        }
        // 获取最后一个元素节点
        var elem = quoteChildren[quoteChildren.length - 1];

        // 创建链接
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href", url);

        // 插入链接
        // 创建上标
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        elem.appendChild(superscript);

    }
}

addLoadEvent(displayCitations);