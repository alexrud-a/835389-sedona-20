document.addEventListener('DOMContentLoaded', function(){
  var width = document.body.clientWidth;

  if (width <= 768) {
    var nav = document.querySelector('.nav-js');
    var toggle = document.querySelector('.toogle-js');
    nav.classList.remove('header__nav--open');
    toggle.classList.remove('nav__toogle--open');
    toggle.classList.add('nav__toogle--close');

    toggle.addEventListener('click', function () {
      toggle.classList.toggle('nav__toogle--open');
      toggle.classList.toggle('nav__toogle--close');
      nav.classList.toggle('header__nav--open');
    })
  }
});
