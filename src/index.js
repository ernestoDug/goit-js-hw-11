import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './funForResponce.js';

const formVar = document.querySelector('.search-form');

formVar.addEventListener('submit', submiterF);

const galeryVar = document.querySelector(".gallery")

// функція обробки сабміту
function submiterF(event) {
  event.preventDefault();
  const inputValue = event.currentTarget.searchQuery.value;
  console.log(inputValue);
  // виклик функції запиту
  fetchImages(inputValue)
  .then(async resp => {
    const images =await markUper(resp);
    galeryVar.insertAdjacentHTML('beforeEnd',  images);
  })
 
  // console.log(event.currentTarget);
  // console.log(event.currentTarget.searchQuery.value);
}

// функція малівник карток
function markUper(array) {
  return array.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
        comments,
    downloads
  }) => `<div class="photo-card">
  <img class= "image" src="${webformatURL}" alt="${tags}" loading="lazy" width = 350 />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>`).join('');
}

export { inputValue };
