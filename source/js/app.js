document.addEventListener('DOMContentLoaded', function(){
  var width = window.innerWidth;

  if (width < 768) {
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

  var links = document.querySelectorAll('.nav__menu-link');
  links.forEach(function(item, i) {
    var link = links[i].getAttribute('href');
    var path = window.location.pathname;
    path = path.slice(1);
    if (link == path) {
      links[i].classList.add('nav__menu-link--active');
    }
  });

});
