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
let currentPage = 1;
let observer = new IntersectionObserver(onObserv, options);

// для таргета обсервера********************************************
const targetForObservVar = document.querySelector('.js-oserverTarget');
// console.log(targetForObservVar);

// функція обробки сабміту

async function submiterF(event) {
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
  const fetch = await fetchImages(inputValue, currentPage)
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
  //  formVar.reset();
}
// функція обсервера
async function onObserv(entries, observer) {
  let gallery = new SimpleLightbox('.gallery a', {
    navText: ['💫', '💫'],
    captionsData: 'alt',
    captionPosition: '',
    captionDelay: 250,
    closeText: '🙅‍♀️',
    animationSpeed: 300,
    download: 'true',
  });
  try {
    const entry = await entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentPage += 1;
        fetchImages(inputValue, currentPage)
          .then(async data => {
            galeryVar.insertAdjacentHTML('beforeend', markUper(data));
            // плавний скрол
            const { height: cardHeight } = document
              .querySelector('.gallery')
              .firstElementChild.getBoundingClientRect();

            window.scrollBy({
              top: cardHeight * 2,
              behavior: 'smooth',
            });
            // метод бібліотеки руйнування лайтбоксу
            gallery.refresh();
            // console.log('обс', inputValue, currentPage, "555555", data[1]);

            // ставимо умову щоб вимикати обсервер
            if (currentPage === data[1]) {
              observer.unobserve(targetForObservVar);
            }
          })
          .catch(error => Notify.warning(`😒 Сталася помилка !!!!!!!!!!!!!!`));
      }
    });
  } catch (error) {
    Notify.warning(`😒 Сталася помилка повторного запиту`);
  }
}

export { inputValue, targetForObservVar, galeryVar, observer, currentPage };
