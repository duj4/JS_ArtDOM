function displayAccessKeys() {
    // 兼容性检查
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode){
        return false;
    }

    // 获取所有a元素
    var links = document.getElementsByTagName("a");
    var akeys = [];
    for (var i = 0; i < links.length; i++) {
        var current_link = links[i];
        // 若没有accesskey属性，则跳过
        if(!current_link.getAttribute("accesskey")){
            continue;
        }
        var key = current_link.getAttribute("accesskey");
        var text = current_link.lastChild.nodeValue;
        akeys[key] = text;
    }

    // 创建列表
    var list = document.createElement("ul");
    for (key in akeys) {
        var str = key + ": " + text;
        var item = document.createElement("li");
        var item_text = document.createTextNode(str);
        item.appendChild(item_text);
        list.appendChild(item);
    }

    // 创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Accesskeys");
    header.appendChild(header_text);

    // 将标题和列表添加到页面主体
    document.body.appendChild(header);
    document.body.appendChild(list);
}
addLoadEvent(displayAccessKeys);
