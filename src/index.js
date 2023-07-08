import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages.js';

import {markUper} from './markUper.js';

const formVar = document.querySelector('.search-form');

formVar.addEventListener('submit', submiterF);

const galeryVar = document.querySelector(".gallery");
let  inputValue = null;

// обсервер
let options = {
  root: null,
  // тобто буде за замовчування слухати MDN
  rootMargin: '200px',
  // threshold: 1.0
}

let observer = new IntersectionObserver(onObserv, options);

// для таргета обсервера********************************************
const targetForObservVar = document.querySelector(".js-oserverTarget");
// console.log(targetForObservVar);
let currentPage = 1;

// функція обробки сабміту
function submiterF(event) {
  event.preventDefault();
  inputValue = event.currentTarget.searchQuery.value;
  if(inputValue === "" || inputValue === " ")
  {
    Notify.warning(`🤗 Будь ласка введіть свій запит`);
    return;
  }
  galeryVar.innerHTML = "";

  // console.log(inputValue);
  // виклик функції запиту
  fetchImages(inputValue)
  .then(async resp => {
    const images =await markUper(resp);
    galeryVar.insertAdjacentHTML('beforeEnd',  images);
      observer.observe(targetForObservVar);

  })
  
  // console.log(event.currentTarget);
  // console.log(event.currentTarget.searchQuery.value);
}


function onObserv (entries, observer) {
  entries.forEach((entry) => {
      if(entry.isIntersecting)
      {
        console.log("keyky");
        currentPage +=1;
                fetchImages(inputValue, currentPage).then((data) => {galeryVar.insertAdjacentHTML('beforeend', markUper(data));
// ставимо умову щоб вимикати обсервер
// if(page !== total)
// // ойя тотал пейдж може інашке називтиася треба в відповіді дивтись у мене в кошаках я її не знайшов
// {
//   // вимикання обсервера методом його ві вимикає тільки слідкування за тим дівчиком а не за всим за всим є інший метод
//   observer.unobserve(targetForObservVar)}
})
.catch((error) => {
  Notify.warning(`😒 Сталася помилка, спробуйте ще...`);
  console.log(error)
})
}
})
}










export { inputValue, targetForObservVar };
