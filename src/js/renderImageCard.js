import { galleryRef } from './refs';

function renderImageCard({
  likes,
  views,
  comments,
  downloads,
  tags,
  webformatURL,
  largeImageURL,
}) {
  const markup = `
    <a href="${largeImageURL}">
      <div class="card">
        <div class="card-image-wrapper">
          <img src="${webformatURL}" alt="${tags}" class="br" width="320" height="213">
        </div>
        <div class="card-details">
          <div class="card-details-content">
            <p class="card-details-content-label">Likes</p>
            <p class="card-details-content-amount">${likes}</p>
          </div>

          <div class="card-details-content">
            <p class="card-details-content-label">Views</p>
            <p class="card-details-content-amount">${views}</p>
          </div>

          <div class="card-details-content">
            <p class="card-details-content-label">Comments</p>
            <p class="card-details-content-amount">${comments}</p>
          </div>

          <div class="card-details-content">
            <p class="card-details-content-label">Downloads</p>
            <p class="card-details-content-amount">${downloads}</p>
          </div>
        </div>

    </div>
    </a>
    
  `;

  galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default renderImageCard;
