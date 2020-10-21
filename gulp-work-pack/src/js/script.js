// alert('agagd');

const header = document.querySelector('.header');

if(header) {
  console.log(header);
  header.addEventListener('click', () => {
    myFunc(header);
  });
} else {
  console.log('there\'s no header');
};

let a = 5;
console.log(a);

a = 7;
console.log(a);

const myFunc = el => {
  el.style.background = 'green';
};
