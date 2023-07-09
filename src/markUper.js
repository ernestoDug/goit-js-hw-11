// функція малівник карток

export function markUper(array) {
 return array.map(({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
        comments,
    downloads,
    totalHits,
  }) => 
    `<div class="photo-card">  <a href="${largeImageURL}">
  <img class= "image" src="${webformatURL}" alt="${tags}" loading="lazy" width = 350 />
  <div class="info">
    <p class="info-item">
      <b>Likes 💗 ${likes} </b>
    </p>
    <p class="info-item">
      <b>Views 🔍 ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ✍ ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads 💾 ${downloads}</b>
    </p>
  </div>
</div>`).join('');
}


