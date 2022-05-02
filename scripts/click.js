document.addEventListener('click', function (e) {
    // console.log(e.target);

    var menuentry = checkParent(e.target, 'file');

    if (hasClass(e.target, 'newbutton')) {
        // открывает окно
        const openId = document.getElementById("window");
        
        openId.style.display = "grid";

        // // скрывает кнопку
        const openButton = document.getElementById("newbutton");
        openButton.style.display = "none";
    }

    else if (hasClass(e.target, 'closebutton')) {
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

    // else if (hasClass(e.target, 'closebutton')) {

    // }

    if (menuentry) {
        console.log("I clicked on: " + menuentry)
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

