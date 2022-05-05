import { addDrag } from './drag.js';

var $window = document.getElementById('window');

document.addEventListener('click', function (e) {
    // console.log(e.target);
    var parent = getParentWindow(e.target);

    if (hasClass(e.target, 'openbutton')) {
        openWindow(e.target, parent);
    }

    else if (hasClass(e.target, 'closebutton')) {
        closeWindow(parent);
    }

    var menuentry = checkParent(e.target, 'file');

    if (menuentry) {
        createWindow(menuentry);
    }
}, false);


function hasClass(elem, className) {
    return elem.classList.contains(className);
}

function checkParent(elem, className) {
    if (hasClass(elem,className)) {
        return elem.id;
    }

    var parent = elem.parentNode
    while (parent.className != className) {
        parent = parent.parentNode;

        if (parent == null) {
            return false;
        } 
    }
    return parent.id;
}

function getParentWindow(elem) {
    var parent = elem.parentNode
    while (parent.className != 'window') {
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

//не делать кнопки для файлов.... это бессмысленно, я поняла
function openWindow(elem, parentWindow) {
    var idToOpen = splitBtnIdToOpen(elem);
    console.log(idToOpen);
    console.log(elem);

    var openId = document.getElementById(idToOpen);
        
    openId.style.display = "grid";

    // скрывает кнопку
    var openButton = document.getElementById(elem.id);
    openButton.style.display = "none";
}

function closeWindow(parentWindow){

    // закрываем окно
    parentWindow.style.display = "none";

    // создаем кнопку, которая открывает окно
    var $openbutton = document.createElement('div')
    $openbutton.className = "openbutton";
    $openbutton.id = "openBtn" + parentWindow.id.toString();
    $openbutton.textContent = splitWinIdToOpen(parentWindow);
    

    var $top = document.getElementById('top');
    $top.prepend($openbutton);
}

function createWindow(elemFile) {

    var $winfile = document.createElement('div');
    $winfile.className = "window";
    $winfile.id = getIdToOpen(elemFile); 

    var randomtop = getRndInteger(150, 400);
    var randomleft = getRndInteger(1000, 1400);
    

    $winfile.style.width = '500px';
    $winfile.style.height = '500px';
    $winfile.style.position = 'absolute';
    $winfile.style.top = randomtop.toString() + 'px';
    $winfile.style.left = randomleft.toString() + 'px';
    $winfile.style.zIndex = 1000;
    
    $window.after($winfile);

    var $headerfile = document.createElement('div');
    $headerfile.className = "header";
    
    $winfile.prepend($headerfile);
    addDrag($headerfile, getParentWindow($headerfile));

    var $namefile = document.createElement('p');
    $namefile.className = "namefile";
    $namefile.textContent = elemFile.toString();
    $namefile.style.width = '70%';
    $namefile.style.display = 'flex';
    $namefile.style.justifyContent = 'center';

    $headerfile.prepend($namefile);

    var $controlsfile = document.createElement('div');
    $controlsfile.className = "controls";

    $headerfile.append($controlsfile);

    var $closefile = document.createElement('div');
    $closefile.className = "control";

    $controlsfile.append($closefile);

    var $btnClosefile = document.createElement('img');
    $btnClosefile.className = "closebutton";
    $btnClosefile.src = "res/icons/system/close.svg";

    $closefile.append($btnClosefile);
}

function getIdToOpen(elemFile) {
    return "Win" + elemFile.toString();
}

function splitWinIdToOpen(elemFile) {
    return elemFile.id.replace('Win', '');
}

function splitBtnIdToOpen(elemFile) {
    return elemFile.id.replace('openBtn', '');
}