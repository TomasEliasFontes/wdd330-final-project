// We import the generals funtions
import { loadHeaderFooter, toggleMenu } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    toggleMenu("#menu", ".navigation");

    // Add event listener for form submission
    document.getElementById('signup-form').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const email = document.getElementById('email').value;
      // Here you can add code to handle the form submission, such as sending the email to a server for processing
      // For now, let's just log the email to the console
      console.log('Email submitted:', email);
    });
  });
});
