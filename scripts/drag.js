var $window = document.getElementById('window');
var $header = document.getElementsByClassName('header');

console.log($header);

for (var i = 0; i < $header.length; i++) {

    addDrag($header[i], $window);
    
}

// class Element {
//     constructor() {
//         this.svoistvo = 1;
//     }

//     doHello() {
//         console.log("hello!");
//     }
// }
// var testelem = new Element();
// console.log(testelem.svoistvo);
// testelem.doHello();

function addDrag(elem, parentWindow) {
    elem.onmousedown = function (event) {

        let shiftX = event.clientX - parentWindow.getBoundingClientRect().left;
        let shiftY = event.clientY - parentWindow.getBoundingClientRect().top;

        parentWindow.style.position = 'absolute';
        parentWindow.style.zIndex = 800;
        document.body.append(parentWindow);

        moveAt(event.pageX, event.pageY);

        // переносит мяч на координаты (pageX, pageY),
        // дополнительно учитывая изначальный сдвиг относительно указателя мыши
        function moveAt(pageX, pageY) {
            parentWindow.style.left = pageX - shiftX + 'px';
            parentWindow.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        parentWindow.onmouseup = function () {
            document.removeEventListener('mousemove', onMouseMove);
            parentWindow.onmouseup = null;
        };

    };

    elem.ondragstart = function () {
        return false;
    };
}

export { addDrag };