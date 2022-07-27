let hamburger = document.querySelector('#hamburger');
let menu = document.querySelector('#menu');

const toggleMenu = (e) => {
    e.preventDefault ();
    hamburger.classList.toggle('hamburger--active');
    menu.classList.toggle('menu--active');
    pageScroll.toggleBlock();
}

hamburger.addEventListener('click', toggleMenu);


menu.addEventListener('click', function (ev){
    ev.preventDefault ();
    const target = ev.target;
    if (target.classList.contains('menu__link')) {
        toggleMenu(ev);
        pageScroll.toggleBlock("unblock");
    }
})

