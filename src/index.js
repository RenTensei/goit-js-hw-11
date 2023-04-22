import { Notify } from 'notiflix';
import { formRef, galleryRef } from './js/refs';
import getCardInfo from './js/request';
import renderImageCard from './js/renderImageCard';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {});

const observer = new IntersectionObserver(handleObserver);

let currentQuery = '';
let currentPage = 1;

function handleObserver(entries, observer) {
  if (entries[0].isIntersecting == true) {
    currentPage++;

    getCardInfo(currentQuery, currentPage)
      .then(data => {
        console.log(data);
        console.log(`Observer ${currentPage} did it's job and was disabled!`);

        if (data.hits == 0) {
          Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
          return;
        }

        data.hits.forEach(renderImageCard);

        resetObserver();
        refreshLightBox();
      })
      .catch(console.log);

    observer.unobserve(entries[0].target);
  }
}

function handleSubmit(e) {
  e.preventDefault();

  currentQuery = formRef.elements['searchQuery'].value;
  currentPage = 1;

  console.log(currentQuery);

  getCardInfo(currentQuery)
    .then(data => {
      if (data.total == 0) {
        Notify.failure('no such images found :(');
      } else {
        Notify.success(`sheesh! we found ${data.total} images!`);
      }
      console.log(data);
      galleryRef.innerHTML = '';
      data.hits.forEach(renderImageCard);

      resetObserver();
      refreshLightBox();
    })
    .catch(console.log);
}

function resetObserver() {
  try {
    const cardsRef = document.querySelectorAll('.card');

    const width = galleryRef.offsetWidth;

    observer.observe(cardsRef[cardsRef.length - getAmountOfRows(width) * 2]);
  } catch (error) {
    console.error('no cards found (prob poor request)');
  }
}

function refreshLightBox() {
  lightbox.refresh();
  console.log('lb was refreshed');
}

function getAmountOfRows(width) {
  if (width > 0 && width < 730) {
    return 1;
  }

  if (width >= 730 && width < 1080) {
    return 2;
  }

  if (width >= 1080 && width < 1430) {
    return 3;
  }

  if (width >= 1430) {
    return 4;
  }
}

formRef.addEventListener('submit', handleSubmit);
