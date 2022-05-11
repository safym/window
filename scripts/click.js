import { addDrag } from './drag.js';

var $window = document.getElementById('window');

// THIS BULLSHIT IS BROKEN IN CHROME 
// HOW?????
document.addEventListener('click', function (e) {
    console.log("addEventListener");

    // console.log(e.target);
    var parent = getParentWindow(e.target);

    if (hasClass(e.target, 'openbutton')) {
        openWindow(e.target, parent);
    }

    else if (hasClass(e.target, 'closebutton')) {
            closeWindow(parent);
    }

    var menuentry = checkParent(e.target, 'file');
    var filename = getFileName(menuentry);
    console.log(filename);

    if (menuentry) {
        if (menuentry.id == "image") {
            console.log(filename);
            createWindowImage(menuentry);
        }
        if (menuentry.id == "video") {
            
        }
        if (menuentry.id == "text") {
            
        }
        if (menuentry.id == "music") {
            
        }
        if (menuentry.id == "folder") {
            
        }
        
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
    return parent;
}

function getFileName(elem) {
    // console.log(elem.children[0].children[1].textContent);

    return elem.children[0].children[1].textContent;

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

function openWindow(elem, parentWindow) {

    console.log(parentWindow);

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

    console.log(parentWindow);


    // закрываем окно
    parentWindow.style.display = "none";

    if (parentWindow == $window) {
         // создаем кнопку, которая открывает окно
        var $openbutton = document.createElement('img')
        $openbutton.className = "openbutton";
        $openbutton.id = "openBtn" + parentWindow.id.toString();
        $openbutton.src = "res/icons/system/more.svg";


        var $top = document.getElementById('top');
        $top.prepend($openbutton);
    }
}

function createWindowImage(elemFile) {

    var $winfile = document.createElement('div');
    $winfile.className = "window";
    $winfile.id = getIdToOpen(elemFile); 

    var randomtop = getRndInteger(150, 400);
    var randomleft = getRndInteger(1000, 1400);
    
    $winfile.style.display = 'flex';
    $winfile.style.flexDirection = 'column';
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

    // var $contentFile = document.createElement('div');
    // $contentFile.className = "contentFile";
    // $contentFile.display = 'flex';

    // $contentFile.style.width = '100%';
    // $contentFile.style.height = '100%';
    // $contentFile.style.padding = '0';

    // $headerfile.after($contentFile);

    var $contentFile = document.createElement('img');
    $contentFile.className = "contentFile";
    $contentFile.display = 'flex';

    $contentFile.style.width = '100%';
    $contentFile.style.height = '100%';
    $contentFile.style.padding = '0';
    $contentFile.src = "res/content/image.jpg"

    $headerfile.after($contentFile);
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