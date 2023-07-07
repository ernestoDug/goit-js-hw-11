import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {inputValue, submiterF} from './index.js';


const MY_KEY = "28539247-0afb9c376c93f2bc11eaacc3c";
const BASE_URL = "https://pixabay.com/api";

async function fetchImages(inputValue) {
    // запит
    try {
    const responseImg  = await axios
      .get(`${BASE_URL}/?key=${MY_KEY}&q=${inputValue}`,
    {
  params: 
        {
            image_type: "photo", 
          orientation: "horizontal",
          safesearch: "true"
        }
      })
    //   console.log(responseImg,"daaaaaaaaaaaaaaaaaaa");
    //   console.log(responseImg.data,"da7777777777777777777777");
      console.log(responseImg.data.hits,"***********************");


      return responseImg.data.hits;
    }  
    catch (error) {
        Notify.warning(`😒 сталася помилка, спробуйте ще`);
        // **********************************************************************
      }      
       
      }

export {fetchImages}