

const app = document.getElementById('container');

const searchTxt = document.getElementById('search');
const imageType = document.getElementById('image_type');
const imageCat = document.getElementById('image_cat');
const imagesPerScreen = document.getElementById('image_per_screen');
const pagination = document.getElementById('pagination');
const searchBtn = document.querySelector('.search_button');

//get the user selection to add to the GET query 
searchTxt.addEventListener('input', (event) => {
    searchTxt.value = event.target.value;
});
imageType.addEventListener('change', (event) => {
    imageType.value = event.target.value;
});
imageCat.addEventListener('change', (event) => {
    imageCat.value = event.target.value;
});
imagesPerScreen.addEventListener('change', (event) => {
    imagesPerScreen.value = event.target.value;
});

//delete the selections when refreshing the page
if (location.reload) {
    searchTxt.value = '';
    imageType.value = '';
    imageCat.value = '';
    imagesPerScreen.value = '';
}

//pagination
let page = 1;
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
    if(page<500/imagesPerScreen.value) {
        page += 1;
        showPictures();
    }
   
})
previousBtn.addEventListener('click', () => {
    if(1<page<=500/imagesPerScreen.value) {
        page -= 1;
        showPictures();
    }
   
})

const url = 'https://pixabay.com/api/?key=27571642-7916f741279441eb87d17c1c7';

const showPictures = async () => {

    try {
    const response = await fetch(url + `&q=${searchTxt.value}&image_type=${imageType.value}&category=${imageCat.value}&page=${page}&per_page=${imagesPerScreen.value}&order=popular`);
    console.log(response); 
    if( response.status === 200 )  {
        const data = await response.json();

        const hits = data.hits;
        console.log(hits);

        let pictures = '';
        hits.forEach(picture => {
            pictures += `
                <div class="picture_card">
                    <div class="picture_card--img">
                        <img class="img" loading="lazy" src="${picture.webformatURL}">
                    </div>
                    <div class="picture_card--info">
                        <span>Author: ${picture.user}</span>
                        <span>&#10084;&#65039;: ${picture.likes}</span>
                    </div>
                </div>
            `
        });

        app.innerHTML = pictures;

        if(hits.length > 0) {
            pagination.style.display = 'flex';
        }

    }  else {
        console.log('Something went wrong');
    } 
} catch(error) {
    console.log(error);
}

}

searchBtn.addEventListener("click", showPictures);
