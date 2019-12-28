function addLoadEvent(func) {
    var oldOnLoad = window.onload;
    if ( typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function() {
            oldOnLoad();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

// nav bar - highlight the current page
function highlightPage() {
    if (! document.getElementsByTagName) {
        return false;
    }
    if (! document.getElementById) {
        return false;
    }
    var headers = document.getElementsByTagName("header");
    if (headers.length === 0) {
        return false;
    }
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length === 0) {
        return false;
    }
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i=0; i<links.length; i++) {
        linkurl = links[i].getAttribute("href");
        // indexOf用于在字符串钟寻找子字符串的位置，若没有找到，则返回-1
        // 获取当前页面的URL: window.location.href
        if (window.location.href.indexOf(linkurl) !== -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

// page "index.html" - set slideshow for the link
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) {
        return false;
    }
    if (!document.getElementById(elementID)) {
        return false;
    }
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (! elem.style.left) {
        elem.style.left = "0px";
    }
    if (! elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;

    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    // var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + ")";
    // alert(repeat);
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
    if(!document.getElementsByTagName) {
        return false;
    }
    if(!document.getElementById) {
        return false;
    }
    if(!document.getElementById("intro")) {
        return false;
    }
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    var destination;
    for (var i=0; i < links.length; i++) {
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1) {
                moveElement("preview",0, 0,5);
            }
            if(destination.indexOf("about.html") != -1) {
                moveElement("preview",-150, 0,5);
            }
            if(destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300, 0,5);
            }
            if(destination.indexOf("live.html") != -1) {
                moveElement("preview",-450, 0,5);
            }
            if(destination.indexOf("contact.html") != -1) {
                moveElement("preview",-600, 0,5);
            }
        }
    }
}

// page "about.html" - click the link to display the section content
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") !== id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementsByTagName) {
        return false;
    }
    if (!document.getElementById) {
        return false;
    }
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) {
        return false;
    }
    var navs = articles[0].getElementsByTagName("nav");
    if(navs.length == 0) {
        return false;
    }
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) {
            continue;
        }
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}

// page "photos.html"
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
    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

function prepareGallery() {
    if (! document.getElementsByTagName) {
        return false;
    }
    if (! document.getElementById) {
        return false;
    }
    if (! document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
        }
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return false;
    }
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) {
        return false;
    }
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType === 3) {
        description.firstChild.nodeValue = text;
    }
    return true;
}

// page "live.html"
function stripeTables() {
    if (!document.getElementsByTagName) {
        return false;
    }
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd === true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) {
        return false;
    }
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        };
        rows[i].onmouseout = function() {
          this.className = this.oldClassName;
        }
    }
}

function displayAbbreviation() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
        return false;
    }
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) {
        return false;
    }
    var defs = [];
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) {
            continue;
        }
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) {
        return false;
    }
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length === 0) {
        return false;
    }
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

// page "contact.html"
// 当label的文本被单击时，关联的表单字段会获得焦点（默认已经实现）
function focusLabels() {
    if (!document.getElementsByTagName) {
        return false;
    }
    var labels = document.getElementsByTagName("label");
    for (var i=0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) {
            continue;
        }
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) {
                return false;
            }
            var element = document.getElementById(id);
            element.focus();
        }
    }
}
// 点击表单时，placeholder的内容会消失
function resetFields(whichform) {
    for (var i=0; i < whichform.elements.length;i++) {
        var element = whichform.elements[i];

        if (element.type === "submit" || element.type === 'fieldset') {
            continue;
        }
        var check = element.placeholder || element.getAttribute("placeholder");
        if (!check) {
            continue;
        }
        element.onfocus = function () {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value === text) {
                this.className = '';
                this.value = "";
            }
        };
        element.onblur = function () {
            if (this.value === "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        };
        element.onblur();
    }
}
// form验证
function isFilled(field) {
    return (field.value.length > 1 && field.value !== field.placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") !== -1 && field.value.indexOf(".") !== -1);
}

function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length;i++) {
        var element = whichform.elements[i];
        if(element.getAttribute("required") === 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + " field.");
                return false;
            }
        }
        if (element.getAttribute("type") === 'email') {
            if (!isEmail(element)) {
                alert("The " + element.name + " field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function prepareForms() {
    for ( var i=0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function () {
            if (!validateForm(this)) {
                return false;
            }
        }
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviation);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);