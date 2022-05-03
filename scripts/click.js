import { addDrag } from './drag.js';

var $window = document.getElementById('window');

document.addEventListener('click', function (e) {
    // console.log(e.target);

    var menuentry = checkParent(e.target, 'file');

    if (hasClass(e.target, 'newbutton')) {
        openWindow();
    }

    else if (hasClass(e.target, 'closebutton')) {
        closeWindow();
    }


    if (menuentry) {

        var $winfile = document.createElement('div');
        $winfile.className = "window";
        $winfile.id = "window";

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

        var $nameile = document.createElement('p');
        $nameile.className = "namefile";
        $nameile.textContent = menuentry.toString();
        $nameile.style.width = '70%';
        $nameile.style.display = 'flex';
        $nameile.style.justifyContent = 'center';

        $headerfile.prepend($nameile);

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

function openWindow() {
    // открывает окно
    const openId = document.getElementById("window");
        
    openId.style.display = "grid";

    // // скрывает кнопку
    const openButton = document.getElementById("newbutton");
    openButton.style.display = "none";
}

function closeWindow(){
     // закрываем окно
    const closeId = document.getElementById("window");
    closeId.style.display = "none";

     // создаем кнопку, которая открывает окно
    const $openbutton = document.createElement('img')
    $openbutton.className = "newbutton";
    $openbutton.id = "newbutton";
    $openbutton.src = "res/icons/system/more.svg";

    const $top = document.getElementById('top');
    $top.prepend($openbutton);
}
