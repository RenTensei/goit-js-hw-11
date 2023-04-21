import { Notify } from 'notiflix';
import axios from 'axios';
import renderImageCard from './js/renderImageCard';

const formRef = document.querySelector('.search-form');

const API_KEY = '35616043-ceede7c463ab26a514eff72f6';

async function getCardInfo(query) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo`;
  try {
    const response = await axios.get(url);
    const data = response.data.hits;
    console.log(data);
    data.forEach(renderImageCard);
  } catch (error) {
    console.error(error);
  }
}

console.log(getCardInfo('yellow+flowers'));

function handleSubmit(e) {
  e.preventDefault();
  const query = formRef.inputs;
  console.log(formRef.elements.inputs);
}

formRef.addEventListener('submit', handleSubmit);
