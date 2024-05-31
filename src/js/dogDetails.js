import { loadHeaderFooter,toggleMenu } from './utils.mjs';


document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter().then(() => {
        toggleMenu('#menu', '.navigation');
    });
});