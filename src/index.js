// loader
// https://cssloaders.github.io/
// сповіщення
// https://notiflix.github.io/documentation

import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages, loaderVar } from './fetchImages.js';

import { markUper } from './markUper.js';

// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const formVar = document.querySelector('.search-form');

formVar.addEventListener('submit', submiterF);

const galeryVar = document.querySelector('.gallery');
let inputValue = null;

// обсервер параметри
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
// екзмемпляр  обзервера
let observer = new IntersectionObserver(onObserv, options);

// для таргета обсервера********************************************
const targetForObservVar = document.querySelector('.js-oserverTarget');
// console.log(targetForObservVar);
let currentPage = 1;

// функція обробки сабміту
function submiterF(event) {
  event.preventDefault();

  // перверіка на маячню у вводі
  inputValue = event.currentTarget.searchQuery.value;
  if (inputValue === '' || inputValue === ' ') {
    Notify.warning(`🤗 Будь ласка введіть свій запит`);
    return;
  }
  galeryVar.innerHTML = '';
  // console.log(inputValue);

  // виклик функції запиту
  fetchImages(inputValue)
    .then(async resp => {
      // виклик функції малівника
      const images = await markUper(resp);
      galeryVar.insertAdjacentHTML('beforeEnd', images);
      //  обсервер спостерігає таргет
      observer.observe(targetForObservVar);
    })
    .catch(error =>
      Notify.warning(`😒 Сталася помилка завантаженя, спробуйте ще`)
    );
}
// функція обсервера
async function onObserv(entries, observer) {
  try {
    let gallery = new SimpleLightbox('.gallery a', {
      navText: ['💫', '💫'],
      captionsData: 'alt',
      captionPosition: '',
      captionDelay: 250,
      closeText: '🙅‍♀️',
      animationSpeed: 300,
      download: 'true',
    });
    const entr = await entries.forEach(entry => {
      if (entry.isIntersecting) {
        // console.log('обс', entry);
        currentPage += 1;
        fetchImages(inputValue, currentPage)
          .then(data => {
            galeryVar.insertAdjacentHTML('beforeend', markUper(data));
            // метод бібліотеки руйнування лайтбоксу
            gallery.refresh();
            // ставимо умову щоб вимикати обсервер
            // console.log(data.views, "tot")
            if (data.page === data.total) {
              // //   // вимикання обсервера методом його ві вимикає тільки слідкування за тим дівчиком а не за всим за всим є інший метод
              observer.unobserve(targetForObservVar);
            }
          })
          .catch(error =>
            Notify.warning(`😒 Сталася помилка завантаженя спробуйте ще`)
          );
      }
    });
  } catch (error) {
    Notify.warning(`😒 Сталася помилка завантаженя, спробуйте ще`);
  }
}

export { inputValue, targetForObservVar, galeryVar, observer };
