/*==================== typing Animation ==================== */

var typed = new Typed(".typing", {
    strings: ["", "Web Designer", "Web Developer", "Graphic Designer", "UI Designer"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
});

// Get the aside element and navigation links
const aside = document.getElementById('aside');
const menuToggle = document.getElementById('menu-toggle');
const toggleButton = document.querySelector('.toggle-button');

// Toggle aside and toggle button when menu toggle button is clicked
menuToggle.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    aside.classList.toggle('active');
    toggleButton.classList.toggle('tagActive');
});