import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  inputValue,
  currentPage,
  observer,
  targetForObservVar,
} from './index.js';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const MY_KEY = '28539247-0afb9c376c93f2bc11eaacc3c';
const BASE_URL = 'https://pixabay.com/api';

const loaderVar = document.querySelector('.loader');

// функція запиту
async function fetchImages(inputValue, page = 1) {
  loaderVar.removeAttribute('hidden');
  const responseImg = await axios.get(
    `${BASE_URL}/?key=${MY_KEY}&q=${inputValue}&page=${currentPage}`,
    {
      params: {
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: 40,
      },
    }
  );
  // console.log(inputValue, currentPage)
  if (!responseImg.data.totalHits && responseImg.data.hits.length === 0) {
    Notify.warning(`🥺 Шкода, світлин не знайдено спробуйте ще...`);
  }
  console.log(responseImg, '*****хит*****');
  loaderVar.setAttribute('hidden', 'hidden');

  // сповіщення про кількість сторінок
  if (page === 1) {
    Notify.info(`🕵️‍♀️ УРА, Ви знайшли ${responseImg.data.totalHits} світлин`);
  }
  // console.log("page", responseImg.data.total, "88888888", responseImg.data.hits);

  return [responseImg.data.hits, responseImg.data.totalHits];
}

export { fetchImages, loaderVar };
