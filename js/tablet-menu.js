let hamburger = document.querySelector('#hamburger');
let menu = document.querySelectorAll('.menu');
let back = document.querySelectorAll('body');
let menu__list = document.querySelectorAll('.menu__list');

hamburger.onclick = function(){
    hamburger.classList.toggle('--active');
    menu.classList.toggle('active');
    back.classList.toggle('lock');
}

header__list.onclick = function () {
    menu__list.classList.remove('active');
    back.classList.toggle('lock');
}