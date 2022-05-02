var $window = document.getElementById('window');
var $header = document.getElementById('winhead');

$header.onmousedown = function (event) {

    let shiftX = event.clientX - $window.getBoundingClientRect().left;
    let shiftY = event.clientY - $window.getBoundingClientRect().top;

    $window.style.position = 'absolute';
    $window.style.zIndex = 1000;
    document.body.append($window);

    moveAt(event.pageX, event.pageY);

    // переносит мяч на координаты (pageX, pageY),
    // дополнительно учитывая изначальный сдвиг относительно указателя мыши
    function moveAt(pageX, pageY) {
        $window.style.left = pageX - shiftX + 'px';
        $window.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // передвигаем мяч при событии mousemove
    document.addEventListener('mousemove', onMouseMove);

    // отпустить мяч, удалить ненужные обработчики
    $window.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        $window.onmouseup = null;
    };

};

$header.ondragstart = function () {
    return false;
};