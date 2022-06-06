import { addDrag } from "./drag.js";

var $window = document.getElementById("window");

// обработка события нажания (не работает в хроме :( ...)
document.addEventListener("click", function (e) {

    // закрытие окон и открытие главного окна
    var $parent = getParentWindow(e.target);

    if (hasClass(e.target, "openbutton")) {
        openWindow(e.target, $parent);
    }

    else if (hasClass(e.target, "closebutton")) {
            closeWindow($parent);
    }

    // создание окон файлов
    var $menuentry = checkParent(e.target, "file");

    if ($menuentry) {

        createWindowImage($menuentry);

    }

    
}, false);

//открытие основного окна проводника //
function openWindow(elem, parentWindow) {

    var $idToOpen = splitBtnIdToOpen(elem);

    var $openId = document.getElementById($idToOpen);
        
    $openId.style.display = "grid";

    // скрывает кнопку
    var $openButton = document.getElementById(elem.id);
    $openButton.style.display = "none";
}

// закрытие основного окна проводника//
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

// создание новых окон //

function createWindowImage(elemFile) {
    
    var $fileName = getFileName(elemFile)

    //создание основы нового окна
    var $winfile = document.createElement("div");

    $winfile.className = "window";
    $winfile.id = getIdToOpen(elemFile); 

    var $randomtop = getRndInteger(150, 400);
    var $randomleft = getRndInteger(1000, 1400);
    
    $winfile.style.display = "flex";
    $winfile.style.flexDirection = "column";
    $winfile.style.width = "500px";
    $winfile.style.height = "500px";
    $winfile.style.position = "absolute";
    $winfile.style.top = $randomtop.toString() + "px";
    $winfile.style.left = $randomleft.toString() + "px";
    $winfile.style.zIndex = 1000;
    
    $window.after($winfile);

    //создание шапки нового окна
    var $headerfile = document.createElement("div");
    $headerfile.className = "header";
    
    $winfile.prepend($headerfile);
    addDrag($headerfile, getParentWindow($headerfile));

    var $namefile = document.createElement("p");
    $namefile.className = "namefile";
    $namefile.textContent = $fileName;
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

    //создание контента в новом окне
    var $contentFile = document.createElement("img");
    $contentFile.className = "contentFile";
    $contentFile.id = "contentFileImage";
    $contentFile.display = "flex";

    $contentFile.style.width = "100%";
    $contentFile.style.height = "100%";
    $contentFile.style.padding = "0";
    $contentFile.style.borderBottomLeftRadius = "10px";
    $contentFile.style.borderBottomRightRadius = "10px";

    $contentFile.src = "res/content/" + $fileName; 

    $headerfile.after($contentFile);
}

// вспомогательные функции //

function getIdToOpen(elemFile) {
    return "Win" + elemFile.id.toString();
}

function splitBtnIdToOpen(elemFile) {
    return elemFile.id.replace("openBtn", "");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function hasClass(elem, className) {
    return elem.classList.contains(className);
}

function checkParent(elem, className) {
    if (hasClass(elem,className)) {
        return elem;
    }

    var $parent = elem.parentNode
    while ($parent.className != className) {
        $parent = $parent.parentNode;

        if ($parent == null) {
            return false;
        } 
    }
    return $parent;
}

function getFileName(elem) {
    var $Children = elem.children[0].children[1].textContent;

    return $Children;
}

function getParentWindow(elem) {
    var $parent = elem.parentNode
    while ($parent.className != "window") {
        $parent = $parent.parentNode;

        if ($parent == null) {
            return false;
        } 
    }
    return $parent;
}
