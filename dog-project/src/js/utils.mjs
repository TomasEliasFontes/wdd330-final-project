//any functionality that needs to be shared between modules can be placed in a utility module.
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
  }
  // or a more concise version if you are into that sort of thing:
  // export const qs = (selector, parent = document) => parent.querySelector(selector);
  
  // retrieve data from localstorage
  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  // set a listener for both touchend and click
  export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener('click', callback);
  }
  export function getParams(param){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product = urlParams.get(param)
    // console.log(product);
    return product;
  }
  export function renderListWithTemplate(
    templateFn,
    parentElement,
    list,
    position = 'afterbegin',
    clear = false
  ) {
    const htmlStrings = list.map(templateFn);
    // if clear is true we need to clear out the contents of the parent.
    if (clear) {
      parentElement.innerHTML = '';
    }
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
  }
  
  export function renderWithTemplate(template,parentElement,data,callback) 
  {
    parentElement.insertAdjacentHTML('afterbegin', template)
    // if clear is true we need to clear out the contents of the parent.
    if (callback) {
      callback(data);
    }
  }
  
  async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
  }
  
// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('../partials/header.html');
    const headerElement = document.querySelector('#main-header');
    const footerTemplate = await loadTemplate('../partials/footer.html');
    const footerElement = document.querySelector('#main-footer');

    renderWithTemplate(headerTemplate, headerElement);
    renderWithTemplate(footerTemplate, footerElement);
    
}
// Define the funtion toggleMenu
export function toggleMenu(buttonSelector, navigationSelector) {
    const button = qs(buttonSelector);
    const navigation = qs(navigationSelector);

    if (button && navigation) {
        button.addEventListener('click', () => {
            navigation.classList.toggle('open');
            button.classList.toggle('open');
        });
    } else {
        console.error('Button or navigation element not found');
        console.error(`Button selector: ${buttonSelector}, Navigation selector: ${navigationSelector}`);
    }
}