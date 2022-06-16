const API_KEY_DOG = 'a2a63c2b-8539-4dda-8c1d-816b08664e9a';
const API_KEY_CAT = 'dbd1257a-c74c-434e-b6b6-b6b54f042d68';

const api_dogs = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/',
    Headers: {
        'Content-Type': 'application/json'
    },
    params: {
        'api_key': API_KEY_DOG,
    }
});

const api_cat = axios.create({
  baseURL: 'https://api.thecatapi.com/v1/',
    Headers: {
        'Content-Type': 'application/json'
    },
    params: {
        'api_key': API_KEY_CAT,
    }
});

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {

      if(entry.isIntersecting) {
          const url = entry.target.getAttribute('data-img')
          entry.target.setAttribute('src', url);
      }
  })
});

const spanError = document.getElementById('error')

function createRandomImages(query, container, {lazyLoad = false, clean = true }) { 
  clean ? container.innerHTML = "" : null;
  query.forEach(query => {
    const randomImgContainer = document.createElement('article');
    const randomImg = document.createElement('img');
    const likeIcon = document.createElement('i');

    randomImgContainer.classList.add('randomImageContainer');
    randomImgContainer.classList.add('relative');
    randomImg.classList.add('randomImg');
    likeIcon.classList.add('likeIcon');
    likeIcon.classList.add('fa-solid');
    likeIcon.classList.add('fa-face-smile');

    randomImg.setAttribute(lazyLoad ? 'data-img' : 'src', query.url);
    
    // randomImg.src = query.url;
    
    likeIcon.onclick = () => {
      if(location.hash.includes('cat')){
        saveFavoriteMichis(query.id);
      }
      else if(location.hash.includes('dog'))
      {
        saveFavoritesPuppies(query.id);
      }
      likeIcon.style.color = 'rgb(254 240 138 / 1)';
    }

    if(lazyLoad){
      lazyLoader.observe(randomImg);
    }
    randomImgContainer.appendChild(randomImg);
    randomImgContainer.appendChild(likeIcon);
    container.appendChild(randomImgContainer);

  })
}

function createFavoritesImages(queries, container,{lazyLoad = false, clean = true }) {
  clean ? container.innerHTML = "" : null;
  queries.forEach(query => {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const likeIcon = document.createElement('i');
    
    img.src = query.image.url;

    article.classList.add('relative')
    likeIcon.classList.add('likeIcon');
    likeIcon.classList.add('fa-solid');
    likeIcon.classList.add('fa-face-smile');
    likeIcon.style.color = 'rgb(254 240 138 / 1)';

    likeIcon.onclick = () => {
    likeIcon.style.color = 'white';
    deleteFavoritesMichis(query.id);
    };
    article.appendChild(img);
    article.appendChild(likeIcon);
    container.appendChild(article);
  });  
}

function reloadRandomImages() {
  if(location.hash == '#dog') {
    loadRandomPuppies();
  }
  else {
    loadRandomMichis();
  }
}

// Michis
async function loadRandomMichis(page = 1, limit = 2) {
  const res = await api_cat(`images/search`, {
    params: {
      page,
      limit
    }
  });
  console.log('Random')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else if(limit === 2) {
    console.log('sexo anal')
    createRandomImages(res.data, randomImagesMainContainer, {});
    location.hash = "#cat";
  } else if(limit > 2) {
    createRandomImages(res.data, genericSectionMainContainer, {lazyLoad: true, clean: page == 1});
  }
}

async function loadFavoritesMichis() {
  const res = await api_cat('favourites')
  console.log('Favoritos')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  else{
    createFavoritesImages(res.data, favoriteImagesMainContainer, {})    
  }
}

async function saveFavoriteMichis(id) {
//  const res = await fetch(API_URL_FAVOTITES, {
//      method: 'POST',
//      headers: {
//       'Content-Type': 'application/json',
//       'X-API-KEY': 'dbd1257a-c74c-434e-b6b6-b6b54f042d68',
//      },
//      body: JSON.stringify({
//          image_id: id
//      })
//  })   

 const res = await api_cat.post('favourites', { image_id: id })


 console.log('Save');
 console.log(res);

  if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  else{
    console.log("Michi guardado en favoritos");
    loadFavoritesMichis();
  }

 
}

async function deleteFavoritesMichis(id) {
  // const res = await fetch(API_URL_FAVOTITES_DELETE(id), {
  //   method: 'DELETE',
  //   headers:{
  //     'X-API-KEY': 'dbd1257a-c74c-434e-b6b6-b6b54f042d68',
  //   }
  // }) 

  const res = await api_cat.delete(`favourites/${id}`);

  if (res.status !== 200) {
      spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  else{
    console.log("Michi borrado en favoritos");
    loadFavoritesMichis();
  }
}

async function loadInfiniteMichis() {
  const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
  if((scrollTop + clientHeight ) >= (scrollHeight - 15)) {
      loadRandomMichis(page++, 20);
    }
}

//perritos

async function loadRandomPuppies(page = 1, limit = 2) {
  const res = await api_dogs(`images/search`, {
    params: {
      page,
      limit
    }
  });
  console.log('Random')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status;
  } else if(limit === 2) {
    createRandomImages(res.data, randomImagesMainContainer, {});
    loadFavoritesPuppies();
    location.hash = '#dog';
  } else if(limit > 2) {
    createRandomImages(res.data, genericSectionMainContainer, {lazyLoad: true, clean: page == 1});
  }
}

async function loadInfinitePuppies() {
  const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
  if((scrollTop + clientHeight ) >= (scrollHeight - 15)) {
      loadRandomPuppies(page++, 20);
    }
}

async function loadFavoritesPuppies() {
  const res = await api_dogs('favourites')
  console.log('Favoritos')
  console.log(res)

  if (res.status !== 200) {
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  }
  else{
    createFavoritesImages(res.data, favoriteImagesMainContainer, {})    
  }
}

async function saveFavoritesPuppies(id) {
  const res = await api_dogs.post('favourites', { image_id: id })

  console.log('Save');
  console.log(res);
 
   if (res.status !== 200) {
       spanError.innerHTML = "Hubo un error: " + res.status + data.message;
   }
   else{
     console.log("Puppy guardado en favoritos");
     loadFavoritesPuppies();
   }
}

//Change Api

async function dogApi() {
  await loadRandomPuppies();
  await loadFavoritesPuppies();

  const pageTitle = $('#title');
  const randomImagesTitle = $('.randomImagesTitle');
  pageTitle.innerHTML = 'Puppies App';
  randomImagesTitle.innerHTML = 'Random Puppies';
  favoritesTitle.innerHTML = 'Puppies Favoritos';
}

async function catApi() {
  await loadRandomMichis();
  await loadFavoritesMichis();

  const pageTitle = $('#title');
  const randomImagesTitle = $('.randomImagesTitle');
  pageTitle.innerHTML = 'Michis App';
  randomImagesTitle.innerHTML = 'Random Michis';
  favoritesTitle.innerHTML = 'Michis Favoritos';
}


loadRandomMichis();
loadFavoritesMichis();