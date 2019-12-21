function displayAbbreviations() {
    // 兼容性检查
    if (!document.getElementsByName || !document.createElement || !document.createTextNode) {
        return false;
    }

    // 获取文档中所有的abbr元素
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) {
        return false;
    }

    // 获取并保存每个abbr元素提供的信息，即每个abbr标签包含的文本及其title属性
    var defs = [];
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        // 获取title属性
        // 对于IE浏览器，在统计abbr元素的子节点个数时总会返回一个错误的值0，所以这条语句会让IE浏览器不再继续执行这个循环的后续代码
        if (current_abbr.childNodes.length < 1) {
            continue;
        }
        var definition = current_abbr.getAttribute("title");
        // 获取文本内容
        var key = current_abbr.firstChild.nodeValue;
        defs[key] = definition;
    }
    
    // 创建定义列表
    var dlist = document.createElement("dl");

    for (key in defs) {
        var definition = defs[key];

        // 创建dt节点及其文字节点
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);

        // 创建dd节点及其文字节点
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);

        // 拼装定义列表dl
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    // 当IE浏览器执行到abbr的循环体时，最后得到的defs数组为空，所以后续的dl列表没法进一步创建，故而这里直接退出
    if (dlist.childNodes.length < 1) {
        return false;
    }

    // 创建标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);

    // 将header和dl插入到当前页面
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);