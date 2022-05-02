window.onload = function(){

    var $window = document.getElementById('window');
    $window.style.position = 'absolute';
    $window.style.left = '118px';
    $window.style.top = '124px';

    window.setInterval(function(){
        var now = new Date();
        var clock = document.getElementById("clock");
        clock.innerHTML = now.toDateString().slice(0, -5) + " " + now.toLocaleTimeString().slice(0, -3);
    }, 1000);

    
};
