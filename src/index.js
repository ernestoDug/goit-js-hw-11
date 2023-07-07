import axios, { isCancel, AxiosError } from 'axios';

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const MY_KEY = "28539247-0afb9c376c93f2bc11eaacc3c";
const BASE_URL = "https://pixabay.com/api/";

async function fetchBreeds() {
    // запит
    const responseImg  = await axios
      .get(`${BASE_URL}?api-key=${MY_KEY}`, {
        // Headers: {
        //   'x-api-key': `${MY_KEY}`
        // }
      })
              return response;
      }
    //   .then(selecter)
    //   .catch(error => {
    //     Notify.warning(`❌ ОТАКОЇ, КОШАКИ  РОЗБІГЛИСЯ`);
        // **********************************************************************
      