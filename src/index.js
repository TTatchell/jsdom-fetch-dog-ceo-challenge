function fetchImages(URL) {
    fetch(URL)
    .then(resp => {return resp.json()})
    .then(json => {
        //console.log(json)
        publishImages(json)})
}

function publishImages(imgArr) {
    //console.log(imgArr.message);
    for (let index = 0; index < imgArr.message.length; index++) {
        //console.log(`Publishing image ${index+1} out of ${imgArr.message.length}.`)
        //console.log(imgArr.message[index])
        let image = document.createElement('img');
        image.src=imgArr.message[index];
        image.alt=`Image ${index+1} out of ${imgArr.message.length}.`
        image.style.width="400px"
        document.querySelector('#dog-image-container').appendChild(image)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function fetchBreeds(URL) {
    fetch(URL)
    .then(resp => {return resp.json()})
    .then(json => {
        globalThis.breedsArr = Object.keys(json.message)
        publishBreedsList()})
}

function publishBreedsList() {
    for (let index = 0; index < breedsArr.length; index++) {
        let listItem = document.createElement('li');
        let itemText = (breedsArr[index]);
        listItem.appendChild(document.createTextNode(itemText));
        listItem.addEventListener('click', function(){listItem.style.color = 'red'})
        document.querySelector('#dog-breeds').appendChild(listItem)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

function clearList() {
    const list =  document.getElementById('dog-breeds')
    list.innerHTML = '';
}

function breedSelector() {
    clearList()
    let filter = document.getElementById('breed-dropdown').value;
    if (filter === "select") {publishBreedsList()}
    else {
        for (let index = 0; index < breedsArr.length; index++) {
            if (breedsArr[index].charAt(0) === filter) {
                let listItem = document.createElement('li');
                let itemText = (breedsArr[index]);
                listItem.appendChild(document.createTextNode(itemText));
                document.querySelector('#dog-breeds').appendChild(listItem)
            }
        }
    }
    
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    fetchImages("https://dog.ceo/api/breeds/image/random/4");
    fetchBreeds('https://dog.ceo/api/breeds/list/all');
  });
  
