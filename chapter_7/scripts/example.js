window.onload = function () {
    // 创建元素节点，createElement，nodeType=1
    // 创建文本节点，createTextNode，nodeType=3
    var para = document.createElement("p");
    var txt1 = document.createTextNode("This is");
    var txt2 = document.createTextNode(" my ");
    var txt3 = document.createTextNode("content.");
    var emphasis = document.createElement("em");
    para.appendChild(txt1);
    emphasis.appendChild(txt2);
    para.appendChild(emphasis);
    para.appendChild(txt3);
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
};