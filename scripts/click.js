import { addDrag } from "./drag.js";

var $window = document.getElementById("window");

// THIS BULLSHIT IS BROKEN IN CHROME 
// HOW?????
document.addEventListener("click", function (e) {

    // закрытие окон и открытие главного окна
    var parent = getParentWindow(e.target);

    if (hasClass(e.target, "openbutton")) {
        openWindow(e.target, parent);
    }

    else if (hasClass(e.target, "closebutton")) {
            closeWindow(parent);
    }

    // создание окон файлов
    var menuentry = checkParent(e.target, "file");

    if (menuentry) {
        // console.log(menuentry);

        var filename = getFileName(menuentry);

        // console.log(filename);
        createWindowImage(menuentry);

    }

    
}, false);


function hasClass(elem, className) {
    return elem.classList.contains(className);
}

function checkParent(elem, className) {
    if (hasClass(elem,className)) {
        return elem;
    }

    var parent = elem.parentNode
    while (parent.className != className) {
        parent = parent.parentNode;

        if (parent == null) {
            return false;
        } 
    }
    return parent;
}

function getFileName(elem) {
    var pChildren = elem.children[0].children[1].textContent;
    console.log(pChildren)

    return pChildren;


}

function getParentWindow(elem) {
    var parent = elem.parentNode
    while (parent.className != "window") {
        parent = parent.parentNode;

        if (parent == null) {
            return false;
        } 
    }
    return parent;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function openWindow(elem, parentWindow) {

    var idToOpen = splitBtnIdToOpen(elem);

    var openId = document.getElementById(idToOpen);
        
    openId.style.display = "grid";

    // скрывает кнопку
    var openButton = document.getElementById(elem.id);
    openButton.style.display = "none";
}

function closeWindow(parentWindow){

    // закрываем окно
    parentWindow.style.display = "none";

    if (parentWindow == $window) {
         // создаем кнопку, которая открывает окно
        var $openbutton = document.createElement("img")
        $openbutton.className = "openbutton";
        $openbutton.id = "openBtn" + parentWindow.id.toString();
        $openbutton.src = "res/icons/system/more.svg";


        var $top = document.getElementById("top");
        $top.prepend($openbutton);
    }
}

function createWindowImage(elemFile) {

    var $winfile = document.createElement("div");
    $winfile.className = "window";
    $winfile.id = getIdToOpen(elemFile); 

    var randomtop = getRndInteger(150, 400);
    var randomleft = getRndInteger(1000, 1400);
    
    $winfile.style.display = "flex";
    $winfile.style.flexDirection = "column";
    $winfile.style.width = "500px";
    $winfile.style.height = "500px";
    $winfile.style.position = "absolute";
    $winfile.style.top = randomtop.toString() + "px";
    $winfile.style.left = randomleft.toString() + "px";
    $winfile.style.zIndex = 1000;
    
    $window.after($winfile);

    var $headerfile = document.createElement("div");
    $headerfile.className = "header";
    
    $winfile.prepend($headerfile);
    addDrag($headerfile, getParentWindow($headerfile));

    var $namefile = document.createElement("p");
    $namefile.className = "namefile";
    $namefile.textContent = elemFile.id.toString();
    $namefile.style.width = "90%";
    $namefile.style.display = "flex";
    $namefile.style.justifyContent = "center";

    $headerfile.prepend($namefile);

    var $controlsfile = document.createElement("div");
    $controlsfile.className = "controls";

    $headerfile.append($controlsfile);

    var $closefile = document.createElement("div");
    $closefile.className = "control";

    $controlsfile.append($closefile);

    var $btnClosefile = document.createElement("img");
    $btnClosefile.className = "closebutton";
    $btnClosefile.src = "res/icons/system/close.svg";

    $closefile.append($btnClosefile);

    // var $contentFile = document.createElement("div");
    // $contentFile.className = "contentFile";
    // $contentFile.display = "flex";

    // $contentFile.style.width = "100%";
    // $contentFile.style.height = "100%";
    // $contentFile.style.padding = "0";

    // $headerfile.after($contentFile);

    var $contentFile = document.createElement("img");
    $contentFile.className = "contentFile";
    $contentFile.id = "contentFileImage";
    $contentFile.display = "flex";

    $contentFile.style.width = "100%";
    $contentFile.style.height = "100%";
    $contentFile.style.padding = "0";

    var fileName = getFileName(elemFile)

    $contentFile.src = "res/content/" + fileName; 

    $headerfile.after($contentFile);
}

function getIdToOpen(elemFile) {
    return "Win" + elemFile.id.toString();
}

function splitWinIdToOpen(elemFile) {
    return elemFile.id.replace("Win", "");
}

function splitBtnIdToOpen(elemFile) {
    return elemFile.id.replace("openBtn", "");
}
