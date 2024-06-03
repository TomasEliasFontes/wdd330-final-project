// We import the generals funtions
import { loadHeaderFooter, toggleMenu, addToFavorites } from "./utils.mjs";

// Call the key and URL of the api of dogs
const apiKey = 'live_v9DzeZfWc4yzop8KpUrAP6DlhUfFeDu1oyAox8JUyy1yPHg5aWLUXr3i715lq87a'; 
const apiUrl = 'https://api.thedogapi.com/v1/breeds';

// async use the funtion to load all from the api
async function fetchBreedDetail(id) {
  try {
      // wait for the response that get the url
      const response = await fetch(`${apiUrl}/${id}`, {
          headers: {
              'x-api-key': apiKey
          }
      });
      const breed = await response.json();
      //console.log(breed);
      
      // Call the render breed funtion
      renderBreedDetail(breed);
  } catch (error) {
      console.error('Error fetching breed details:', error);
  }
}

// funtion to created the const of card dog 
function renderBreedDetail(breed) {

    const breedDetailSection = document.getElementById('dog-detail');
    breedDetailSection.innerHTML = '';

    const breedCard = document.createElement('div');
    breedCard.classList.add('breed-card');

    const breedImage = document.createElement('img');
    breedImage.src = breed.image && breed.image.url ? breed.image.url : 'placeholder.jpg';
    breedImage.alt = breed.name;
    
    const breedName = document.createElement('h2');
    breedName.textContent = breed.name;

    const breedDescription = document.createElement('p');
    breedDescription.innerHTML = `Breed for: ${breed.bred_for}<br>Origin: ${breed.origin}<br>Weight: ${breed.weight.metric}kg`;
    

    const breedFun = document.createElement('p');
    breedFun.textContent = `Fun facts: ${breed.temperament}` || "No description available";

    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = "Add to Favorites";
    // Add the dog to the favorites list
    favoriteButton.addEventListener('click', () => {
        // Call the funtion to add the favorite
        addToFavorites(breed);
        favoriteButton.disabled = true; // Disable button after clicking
    });

    //Append all the info and elements to the card of the dog
    breedCard.appendChild(breedImage);
    breedCard.appendChild(breedName);
    breedCard.appendChild(breedDescription);
    breedCard.appendChild(breedFun);
    breedCard.appendChild(favoriteButton);
    breedDetailSection.appendChild(breedCard);
}

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
      toggleMenu("#menu", ".navigation");

      const urlParams = new URLSearchParams(window.location.search);
      const breedId = urlParams.get('id');
      if (breedId) {
          fetchBreedDetail(breedId);
      } else {
          console.error('No breed ID found in URL');
      }
  });
});
