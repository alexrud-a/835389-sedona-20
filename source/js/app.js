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

  var map = document.getElementById('map');
  if(map) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
          center: [34.869497,-111.760186],
          zoom: 10,
          controls: [],
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Соединённые Штаты Америки, штат Аризона, Коконино-Каунти',
          balloonContent: 'Соединённые Штаты Америки, штат Аризона, Коконино-Каунти'
        }, {
          iconLayout: 'default#image',
          iconImageHref: '../img/icon-map-marker.svg',
          iconImageSize: [27, 27],
          iconImageOffset: [-10, -10]
        });

      myMap.geoObjects
        .add(myPlacemark)
    });
  }

});
