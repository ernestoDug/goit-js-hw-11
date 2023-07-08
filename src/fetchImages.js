import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {inputValue, submiterF} from './index.js';


const MY_KEY = "28539247-0afb9c376c93f2bc11eaacc3c";
const BASE_URL = "https://pixabay.com/api";

async function fetchImages(inputValue, page=1) {
  
  // запит
  try {
  
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
      console.log(responseImg.data,"дат");
      console.log(responseImg.data.hits,"*****хит*****");


      return responseImg.data.hits;
    }  
    catch (error) {
        Notify.warning(`😒 Сталася помилка завантаженя, спробуйте ще`);
        // **********************************************************************
      }      
       
      }

export {fetchImages}