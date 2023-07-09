import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {inputValue } from './index.js';

// // Описаний в документації
// import SimpleLightbox from "simplelightbox";
// // Додатковий імпорт стилів
// import "simplelightbox/dist/simple-lightbox.min.css";


const MY_KEY = "28539247-0afb9c376c93f2bc11eaacc3c";
const BASE_URL = "https://pixabay.com/api";

const loaderVar = document.querySelector(".loader");

async function fetchImages(inputValue, page=1) {
  
  // запит
  loaderVar.removeAttribute("hidden");
    const responseImg  = await axios
      .get(`${BASE_URL}/?key=${MY_KEY}&q=${inputValue}`,
    {
  params: 
        {
            image_type: "photo", 
          orientation: "horizontal",
          safesearch: "true",
          per_page: 40,
          page: 1,
        }
              })
      if (responseImg.data.hits.length ===0)
      {
        Notify.warning(`🥺 Шкода, світлин не знайдено, змініть запит, спробуйте ще`);
      }
      console.log(responseImg,"респ");
      // console.log(responseImg.data,"дат");
      // console.log(responseImg.data.hits,"*****хит*****");

      loaderVar.setAttribute("hidden", "hidden" );
           return responseImg.data.hits;

    // catch (error) {
    //     Notify.warning(`😒 Сталася помилка завантаженя, спробуйте ще`);
    //     // **********************************************************************
    //   }      
       
      }

export {fetchImages, loaderVar }