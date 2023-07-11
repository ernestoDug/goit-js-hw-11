// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

// функція малівник карток
export function markUper(array) {
  // беру перше с масиву респосимедж
  return array[0]
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        totalHits,
        total,
      }) =>
        `<div class="photo-card">  <a href="${largeImageURL}">
  <img class= "image" height = 250 src="${webformatURL}" alt="${tags}" loading="lazy" width = 350 />
  <div class="info">
    <p class="info-item">
      <b>Likes 💗 ${likes} </b>
    </p>
    <p class="info-item">
      <b >Views 🔍 ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ✍ ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads 💾 ${downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');
}
