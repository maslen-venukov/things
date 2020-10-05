'use strict';

const navItem = document.querySelectorAll('.nav__item'),
      navLink = document.querySelectorAll('.nav__link');

navLink.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();
  });
});

navItem.forEach(function(item) {
  item.addEventListener('click', function() {
    alert('click');
  });
});