// document.querySelector("#controls").onclick = () => closewindow()

// var closewindow = function () {
//     // закрываем окно
//     const closeId = document.getElementById("window");
//     closeId.style.display = "none";

//     // создаем кнопку, которая открывает окно
//     const $openbutton = document.createElement('img')
//     $openbutton.className = "newbutton";
//     $openbutton.id = "newbutton";
//     $openbutton.src = "res/icons/system/filemanager.svg";

//     const $window = document.getElementById('window');
//     $window.after($openbutton);

// }

document.addEventListener('click', function (e) {
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
        $openbutton.src = "res/icons/system/filemanager.svg";

        const $window = document.getElementById('window');
        $window.after($openbutton);

    }
}, false);


function hasClass(elem, className) {
    return elem.classList.contains(className);
}