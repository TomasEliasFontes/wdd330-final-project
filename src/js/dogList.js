// We import the generals funtions
import { loadHeaderFooter, toggleMenu } from "./utils.mjs";

// Call the key and URL of the api of dogs
const apiKey = 'live_v9DzeZfWc4yzop8KpUrAP6DlhUfFeDu1oyAox8JUyy1yPHg5aWLUXr3i715lq87a'
const apiUrl = 'https://api.thedogapi.com/v1/breeds';

const breedsPerPage = 24;

let allBreeds = [];
let currentPageBreeds = [];

// Fetch the list of dog breeds from the API
async function fetchBreeds() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'x-api-key': apiKey
            }
        });
        const data = await response.json();
        allBreeds = data; // Guarda todas las razas
        currentPageBreeds = allBreeds.slice(0, breedsPerPage);
        renderBreeds(currentPageBreeds);
    } catch (error) {
        console.error('Error fetching breeds:', error);
    }
}

// Render the list of breeds on the page
function renderBreeds(breeds) {
    const breedDetailSection = document.getElementById('breed-detail');
    breedDetailSection.innerHTML = ''; // Clear the section before rendering

    breeds.forEach(breed => {
        const breedCard = document.createElement('div');
        breedCard.classList.add('breed-card');

        const breedImage = document.createElement('img');
        breedImage.src = breed.image?.url || 'placeholder.jpg';
        breedImage.alt = breed.name;

        const breedName = document.createElement('h3');
        breedName.textContent = breed.name;

        const detailLink = document.createElement('a');
        detailLink.href = `../dogDetails/dogDetail.html?id=${breed.id}`;
        detailLink.textContent = "View Details";

        breedCard.appendChild(breedImage);
        breedCard.appendChild(breedName);
        breedCard.appendChild(detailLink);
        breedDetailSection.appendChild(breedCard);
    });
}

// Filter the breeds based on the search input
function filterBreeds() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredBreeds = currentPageBreeds.filter(breed => breed.name.toLowerCase().includes(searchTerm));
    renderBreeds(filteredBreeds);
}

// Event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    fetchBreeds();
    document.getElementById('search-input').addEventListener('input', filterBreeds);
    loadHeaderFooter().then(() => {
        toggleMenu("#menu", ".navigation");
    });
});
