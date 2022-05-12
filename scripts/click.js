import { addDrag } from "./drag.js";

var $window = document.getElementById("window");

// THIS BULLSHIT IS BROKEN IN CHROME 
// HOW?????
document.addEventListener("click", function (e) {
    console.log("addEventListener");

    // console.log(e.target);

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
        var filename = getFileName(menuentry);

        if (menuentry.id == "image") {
            console.log(filename);
            createWindowImage(menuentry);
        }
        if (menuentry.id == "video") {
            
        }
        if (menuentry.id == "text") {
            
        }
        if (menuentry.id == "music") {
            createWindowMusic(menuentry);
        }
        if (menuentry.id == "folder") {
            
        }
        
    }

    // действия окна файла музыки
    // console.log(checkParent(e.target, "window"));
    // console.log(e.target);
        if (checkParent(e.target, "window")) {
            // Audio = document.getElementById("contentFileMusic");
            Audio = document.querySelector("#contentFileMusic");
            // console.log(Audio);
            if (e.target.id == "playMusic") {
                addMusicPlay(Audio);
                changeMusicButton(e.target);
            }

            if (e.target.id == "pauseMusic") {
                addMusicPause(Audio);
                changeMusicButton(e.target);
            }
            
            // console.log(checkParent(e.target, "Winmusic"))
            
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
    $contentFile.src = "res/content/image.jpg"

    $headerfile.after($contentFile);
}

function createWindowMusic(elemFile) {

    // создание окна (основные параметры)
    var $winfile = document.createElement("div");
    $winfile.className = "window";
    $winfile.id = getIdToOpen(elemFile); 

    var randomtop = getRndInteger(150, 400);
    var randomleft = getRndInteger(1000, 1400);
    
    $winfile.style.display = "flex";
    $winfile.style.flexDirection = "column";
    $winfile.style.width = "300px";
    $winfile.style.height = "200px";
    $winfile.style.position = "absolute";
    $winfile.style.top = randomtop.toString() + "px";
    $winfile.style.left = randomleft.toString() + "px";
    $winfile.style.zIndex = 1000;
    
    $window.after($winfile);

    //создание заголовка окна
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

    // создание кнопок окна
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

    // создание элемента аудио
    var $contentFile = new Audio("res/content/ambhouse.mp3");
    $contentFile.className = "contentFile";
    $contentFile.id = "contentFileMusic";
    $contentFile.preload = "none";
    //addMusicPlay($contentFile);

    $contentFile.style.width = "100%";
    $contentFile.style.height = "100%";
    $contentFile.style.padding = "0";
    // $contentFile.src = "res/content/ambhouse.mp3"

    $headerfile.after($contentFile);

    // ДЕЛАЮ кнопки воспроизведения аудио
    var $containerPlayMusic = document.createElement("div");
    $containerPlayMusic.style.display = "flex";
    $containerPlayMusic.style.alignItems = "center";
    // $containerPlayMusic.className = "button";
    // $containerPlayMusic.id = "play";
    
    // $btnPlayMusic.src = "res/icons/system/play.svg";

    $headerfile.after($containerPlayMusic);

    var $btnPlayMusic = document.createElement("img");
    $btnPlayMusic.className = "button";
    $btnPlayMusic.id = "playMusic";
    $btnPlayMusic.style.width = "50px";
    $btnPlayMusic.style.height = "50px";
    $btnPlayMusic.style.padding = "10px";
    $btnPlayMusic.src = "res/icons/system/play.svg";

    $containerPlayMusic.append($btnPlayMusic);
    
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

function addMusicPlay(music) {
    music.play()
}

function addMusicPause(music) {
    music.pause()
}

function changeMusicButton(musicButton) {
    if (musicButton.id == "playMusic") {
        musicButton.id = "pauseMusic";
        return
    }
    if (musicButton.id == "pauseMusic") {
        musicButton.id = "playMusic";
        return
    }
}