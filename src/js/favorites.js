// We import the generals funtions
import { loadHeaderFooter, toggleMenu } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter().then(() => {
        toggleMenu("#menu", ".navigation");
        displayFavorites();
    });
});

function displayFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    favoritesGrid.innerHTML = ''; // Clear section before rendering

    // Get the const of the local storage of the items or the empty list
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.length === 0) {
        const noFavoritesMessage = document.createElement('p');
        noFavoritesMessage.textContent = 'You have no favorite breeds yet.';
        favoritesGrid.appendChild(noFavoritesMessage);
    } else {
        favorites.forEach(breed => {
            const breedCard = document.createElement('div');
            breedCard.classList.add('breed-card');

            const breedImage = document.createElement('img');
            breedImage.src = breed.image?.url || 'placeholder.jpg';
            breedImage.alt = breed.name;

            const breedName = document.createElement('h3');
            breedName.textContent = breed.name;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove from Favorites";
            removeButton.addEventListener('click', () => {
                removeFromFavorites(breed);
                // Remove the card from the grid when the button is clicked
                favoritesGrid.removeChild(breedCard);
            });

            breedCard.appendChild(breedImage);
            breedCard.appendChild(breedName);
            breedCard.appendChild(removeButton);
            favoritesGrid.appendChild(breedCard);
        });
    }
}

function removeFromFavorites(breed) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    // Filter favorites to remove the current dog from the list
    favorites = favorites.filter(favBreed => favBreed.id !== breed.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

