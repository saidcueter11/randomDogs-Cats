let page = 1;
let infiniteScroll;

loadMoreBtn.addEventListener('click', () => {
    if(location.hash == '#dog'){
        location.hash = '#more-dogs';
    }
    else if (location.hash == '#cat'){
        location.hash = '#more-cats';
    }
});

backBtn.addEventListener('click', () => {
    if(location.hash.includes('more')){
        location.hash = '#dog';
    }
})

window.addEventListener('load', navigator);
window.addEventListener('hashchange', navigator);
window.addEventListener('scroll', infiniteScroll, {passive: false});

function navigator() {
    if(infiniteScroll) {
        window.removeEventListener('scroll',infiniteScroll);
        infiniteScroll = undefined;
    }

    if(location.hash.startsWith('#more-cats')) {
        morePageCats();
    } 
    else if(location.hash.startsWith('#more-dogs')) {
        morePageDogs();
    } else if(location.hash.startsWith('#dog') || location.hash.startsWith('#cat')){
        homePage();
    }

    window.scrollTo(0,0);

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {passive: false});
    }
}

function morePageCats() {
    randomImagesSection.style.display = 'none';
    favoritesMichisSection.style.display = 'none';
    genericSection.style.display = "grid";
    backBtn.style.display = 'block';
    changeCat.style.display = 'none';
    changeDog.style.display = 'none';
    loadRandomMichis(page, 20);
    infiniteScroll = loadInfiniteMichis;
}

function morePageDogs() {
    randomImagesSection.style.display = 'none';
    favoritesMichisSection.style.display = 'none';
    genericSection.style.display = "grid";
    backBtn.style.display = 'block';
    changeCat.style.display = 'none';
    changeDog.style.display = 'none';
    loadRandomPuppies(page, 20);
    infiniteScroll = loadInfinitePuppies;
}

function homePage() {
    randomImagesSection.style.display = 'grid';
    favoritesMichisSection.style.display = 'grid';
    genericSection.style.display = 'none';
    backBtn.style.display = 'none';
    changeCat.style.display = 'block';
    changeDog.style.display = 'block';

}
