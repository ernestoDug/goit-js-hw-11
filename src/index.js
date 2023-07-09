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
// форма
const formVar = document.querySelector('.search-form');
// слухач ф
formVar.addEventListener('submit', submiterF);
// галер
const galeryVar = document.querySelector('.gallery');
let inputValue = null;

// опції обсервера
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
// поточна сторінка
let currentPage = 1;

// функція  сабміту
function submiterF(event) {
  event.preventDefault();

  // перверіка на пусту маячню у вводі
  inputValue = event.currentTarget.searchQuery.value;
  if (inputValue === '' || inputValue === ' ') {
    Notify.warning(`🤗 Будь ласка введіть свій запит`);
    return;
  }
  // очищення після рестарту пошуку
  galeryVar.innerHTML = '';
  // currentPage = 1;
  // console.log(inputValue);

  // виклик функції запиту
  fetchImages(inputValue).then(async resp => {
    const images = await markUper(resp);
    galeryVar.insertAdjacentHTML('beforeEnd', images);
    //  обсервера почина. спостерігати таргет
    observer.observe(targetForObservVar);
    const { height: cardHeight } = document
            .querySelector('.gallery')
            .firstElementChild.getBoundingClientRect();

          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
  });
}
// функція обервера
function onObserv(entries, observer) {
  let gallery = new SimpleLightbox('.gallery a', {
    navText: ['💫', '💫'],
    captionsData: 'alt',
    captionPosition: '',
    captionDelay: 250,
    closeText: '🙅‍♀️',
    animationSpeed: 300,
    download: 'true',
  });
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('обс', entry);
      currentPage += 1;
      fetchImages(inputValue, currentPage)
        .then(data => {
          galeryVar.insertAdjacentHTML('beforeend', markUper(data));
                    // метод бібліотеки  SimpleLightbox руйнування лайтбоксу
          gallery.refresh();

          //  ****************************/*/*/*/*/
          // console.log(data.views, "tot")
          // ставимо умову щоб вимикати обсервер
          if (data.page === data.total) {
            observer.unobserve(targetForObservVar);
          }
          // Notify.warning(`😒 Нажаль Ви досягли кінця пошуку`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  });
}

export { inputValue, targetForObservVar, galeryVar, observer };
